import { axiosClient } from "@/lib/axiosClient";
import { AuthUser } from "@/lib/types/authTypes";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
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
          const response = await axiosClient.post("/social/login/google/", {
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
      return false;
    },

    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT;
      user: AuthUser;
      account: any;
      profile?: any;
      isNewUser?: boolean;
    }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      } else if (account) {
        token.accessToken = account.access_token;
      }
      console.log("JWT Callback Params:", {
        token,
        user,
        account,
        profile,
        isNewUser,
      });
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
