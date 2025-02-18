import { axiosClient } from "@/lib/axiosClient";
import { AuthUser } from "@/lib/types/authTypes";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const response = await axiosClient.post("/auth/login/", {
            email: credentials.email,
            password: credentials.password,
          });

          const user = response.data;
          if (user) {
            return user;
          }
        } catch (error) {
          console.error("Login failed:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }): Promise<string | boolean> {
      if (account?.provider === "google") {
        const { access_token, refresh_token } = account;

        if (!access_token || !refresh_token) {
          console.error("No access token or refresh token found");
          return false as boolean;
        }

        try {
          const response = await axiosClient.post("social/login/google/", {
            access_token,
            refresh_token,
          });

          const apiAccessToken =
            response.data.access_token || response.data.key;

          if (!apiAccessToken) {
            console.error("No access token found in response");
            return false;
          }

          (user as AuthUser).accessToken = apiAccessToken;
          return true;
        } catch (error) {
          console.error("Error signing in with Google", error);
          return false;
        }
      }

      if (account?.provider === "twitter") {
        const { oauth_token, oauth_token_secret } = account;

        if (!oauth_token || !oauth_token_secret) {
          console.error("No OAuth token found for Twitter");
          return false;
        }

        try {
          const response = await axiosClient.post("social/login/twitter/", {
            oauth_token,
            oauth_token_secret,
          });

          const apiAccessToken =
            response.data.access_token || response.data.key;
          if (!apiAccessToken) {
            console.error("No access token found in response");
            return false;
          }

          (user as AuthUser).accessToken = apiAccessToken;
          return true;
        } catch (error) {
          console.error("Error signing in with Twitter", error);
          return false;
        }
      }

      return false;
    },

    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.expiresAt = account.expires_at;
      }

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = (token.accessToken ?? "") as string;
      session.user = {
        id: (token.id ?? "") as string,
        name: token.name ?? null,
        email: token.email ?? null,
        image: session.user?.image ?? null,
      };

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
