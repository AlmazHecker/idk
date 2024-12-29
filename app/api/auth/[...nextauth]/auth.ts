import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@shared/lib/prisma-client";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          throw new Error("Invalid username or password");
        }

        const user = await prisma.user.findFirst({
          where: { email: credentials.username },
        });

        if (!user) {
          throw new Error("User not found!");
        }

        const passwordCorrect = await compare(
          credentials?.password,
          user.password,
        );

        if (passwordCorrect) {
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.email,
          };
        }

        throw new Error("Invalid username or password");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    error: "/error",
  },
};
