import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    // ...add more providers here
  ],
  secret: process.env.SECRET as string,
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/home",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    updateAge: (30 * 24 * 60 * 60 * 1000) / 2, // 30 days
  },
  debug: true,
});
