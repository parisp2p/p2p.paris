import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_APP_ID!,
      clientSecret: process.env.GITHUB_APP_SECRET!,
    }),
  ],
  pages: {
    signIn: "/editor/login",
  },
});
