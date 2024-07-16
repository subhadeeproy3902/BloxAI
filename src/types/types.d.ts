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

export interface TEAM {
  teamMembers:any[];
  files:any[];
  _id:string;
  teamName:string;
  createdBy:string;
  createdAt:string;
}

export interface FILE {
  _id:string;
  filePrivate:boolean;
  fileName:string;
  createdBy:{
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
  };
  createdAt:string;
  writtenBy:any[];
  readBy:any[];
  teamId:string;
  archive:boolean;
  whiteboard:string;
  document:string;
}