import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";
import { mongoDB } from "@/lib/MongoDB";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-cool-email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        //retrieve user data
        const { email, password }: any = credentials;
        try {
          await mongoDB();
          const user = await UserModel.findOne({ email });
          if (!user) {
            throw new Error("Not Registered!");
          }
          const passCheck = await bcrypt.compare(password, user.password);

          if (!passCheck) throw new Error("Incorrect Password!");

          return user;
        } catch (e) {
          console.log(e)
        }
      },
    }),
  ],
  session:{
    strategy:"jwt",
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
    async jwt({ token, user }:any) {
      if (user) {
        // Generate access and refresh tokens when the user is defined
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save the refresh token to the user document
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        token.user = {
          id: user._id,
          email: user.email,
        };
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
      }
      return token;
    }
  },
};
