import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";
import { mongoDB } from "@/lib/MongoDB";

export const options: NextAuthOptions = {
  providers: [
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
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        image: token.image as string | undefined,
      };
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

        token.id = user._id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
       
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;

        token.image = user.image
      }
      return token;
    }
  },
};
