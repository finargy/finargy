import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import {dbUsers} from "../../../database";

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          required: true,
        },
        password: {
          label: "Contraseña",
          type: "password",
          required: true,
        },
      },
      async authorize(credentials) {
        return await dbUsers.checkUserEmailPassword(credentials?.email, credentials?.password);
      },
    }),
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

        case "credentials":
          token.user = user;
          break;
      }

      return token;
    },
  },
});
