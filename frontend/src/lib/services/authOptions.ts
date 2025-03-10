import { axiosClient } from "@/lib/services/axiosClient";
import { AuthUser } from "@/lib/types/authTypes";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { useUserStore } from "@/store/user/UserStore";
import DiscordProvider from "next-auth/providers/discord";

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
        accessToken: { label: "Access Token", type: "text" },
        refreshToken: { label: "Refresh Token", type: "text" },
        id: { label: "ID", type: "text" },
        name: { label: "Name", type: "text" },
        image: { label: "Image", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        if (credentials.email && credentials.password) {
          try {
            const response = await axiosClient.post("/auth/login/", {
              email: credentials.email,
              password: credentials.password,
            });

            if (response.data) {
              return {
                id: response.data.user?.id || "unknown",
                name: response.data.user?.username || null,
                email: response.data.user?.email || null,
                image: response.data.user?.pfp_url || null,
                accessToken: response.data.access,
                refreshToken: response.data.refresh,
              };
            }
          } catch (error: any) {
            console.error("Login failed:", error);

            throw new Error(
              error.response?.data?.non_field_errors?.[0] ||
                error.response?.data?.email?.[0] ||
                error.response?.data?.password?.[0] ||
                "Invalid email or password"
            );
          }
        }

        if (credentials.accessToken && credentials.refreshToken) {
          return {
            id: credentials.id,
            name: credentials.name,
            email: credentials.email,
            image: credentials.image,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
          };
        }
        return null;
      },
    }),

    GoogleProvider({
      checks: ["none"],
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

    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "identify email",
          prompt: "consent",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }): Promise<string | boolean> {
      if (account?.provider === "credentials") {
        if (!user) {
          return false;
        }

        return true;
      }

      if (account?.provider === "discord") {
        const { access_token } = account;
        if (!access_token) {
          console.error("No access token found for Discord");
          return false;
        }

        try {
          const response = await axiosClient.post("social/login/discord/", {
            access_token,
          });

          const apiAccessToken = response.data.access_token;
          const apiRefreshToken = response.data.refresh_token;
          const id = response.data.user?.id;

          if (!apiAccessToken) {
            console.error("No access token returned from backend");
            return false;
          }

          (user as AuthUser).image = response.data.user?.pfp_url || null;
          (user as AuthUser).id = id;
          (user as AuthUser).accessToken = apiAccessToken;
          (user as AuthUser).refreshToken = apiRefreshToken;
          return true;
        } catch (error) {
          console.error("Error signing in with Discord", error);
          return false;
        }
      }

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
          const apiAccessToken = response.data.access_token;
          const apiRefreshToken = response.data.refresh_token;
          const id = response.data.user?.id;

          if (!apiAccessToken) {
            console.error("No access token found in response");
            return false;
          }
          (user as AuthUser).image = response.data.user?.pfp_url || null;
          (user as AuthUser).id = id;
          (user as AuthUser).accessToken = apiAccessToken;
          (user as AuthUser).refreshToken = apiRefreshToken;
          return true;
        } catch (error) {
          console.error("Error signing in with Google", error);
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
        token.image = user.image || null;

        token.accessToken = (user as AuthUser).accessToken || token.accessToken;
        token.refreshToken =
          (user as AuthUser).refreshToken || token.refreshToken;
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.user = {
        id: (token.id ?? "") as string,
        name: token.name ?? null,
        email: token.email ?? null,
        image: typeof token.image === "string" ? token.image : null,
      };

      const {
        setSession,
        user: storedSession,
        setAccessToken,
        accessToken,
      } = useUserStore.getState();
      if (
        !storedSession ||
        storedSession.id !== session.user.id ||
        storedSession.name !== session.user.name ||
        storedSession.email !== session.user.email ||
        storedSession.image !== session.user.image ||
        accessToken !== session.accessToken
      ) {
        setSession({
          id: session.user?.id,
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
        });

        setAccessToken(session.accessToken);
      }

      return session;
    },

  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
