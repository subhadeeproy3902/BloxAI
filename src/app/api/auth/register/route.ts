
import UserModel from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { mongoDB } from "@/lib/MongoDB";

type MyData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password }: MyData = await request.json();
    const hashedPass = await bcrypt.hash(password,10);
    await mongoDB();
    await UserModel.create({firstName,lastName,email,password:hashedPass});

    return NextResponse.json({ email }, { status: 200 });
  } catch (e) {
    console.log(e)
    return NextResponse.json({ "message":"Error occured !!" }, { status: 500 });
  }
}
