import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  refreshToken?: string;
  image?: string;
}

const UserSchema = new Schema<User>(
  {
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: String,
    lastName: String,
    refreshToken: String,
    image:String
  },
  { timestamps: true }
);

UserSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          username: this.username
      },
      process.env.NEXTAUTH_SECRET!,
      {
          expiresIn: process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY
      }
  )
}
UserSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
      },
      process.env.NEXTAUTH_SECRET!,
      {
          expiresIn: process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY
      }
  )
}

const UserModel =
  mongoose.models?.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
