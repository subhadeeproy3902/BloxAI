import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      accessToken?: string;
      refreshToken?: string;
      firstName:string;
      lastName:string;
      image?:string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    accessToken?: string;
    refreshToken?: string;
    firstName:string;
    lastName:string;
    email: string;
    image?:string;
  }
}