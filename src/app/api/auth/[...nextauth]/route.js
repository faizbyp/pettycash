import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios, { isAxiosError } from "axios";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const auth = await axios.post(`${process.env.APPURL}/user/login`, {
            username: credentials?.username,
            password: credentials?.password,
          });
          const user = auth.data.data;

          return user;
        } catch (error) {
          if (isAxiosError(error)) {
            console.error(error.response?.data.message);
            console.error(error.response);
            throw new Error(
              JSON.stringify({
                message: error.response?.data.message,
              })
            );
          } else {
            console.error(error);
            throw new Error(
              JSON.stringify({
                message: error.message,
              })
            );
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        const userObject = session.user;
        return { ...token, ...userObject };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
