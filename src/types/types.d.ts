import { User } from "@/models/user";

type USER = {
    isAuth: boolean;
    id:string;
    firstName: string;
    lastName: string;
    email: string;
    refreshToken:string;
    accessToken:string;
    image:string | undefined;
  };

interface ApiUser extends User{
  _id:string;
} 