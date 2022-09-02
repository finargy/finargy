import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import {dbUsers} from "../../../database";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_SECRET_ID || "",
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  session: {
    maxAge: 86400, // 1 day
  },
  callbacks: {
    async session({session, token}) {
      session.user = token.user as any;

      return session;
    },

    async jwt({token, user, account}) {
      switch (account?.type) {
        case "oauth":
          token.user = await dbUsers.oAuthToDbUser(user?.email || "", user?.name || "");
          break;
      }

      return token;
    },
  },
});
