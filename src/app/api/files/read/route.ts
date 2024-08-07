import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../../convex/_generated/dataModel";
import { AuthMiddleware } from "@/Middleware/AuthMiddleware";
import { NextResponse } from "next/server";
import FileModel from "@/models/file";
import { ApiUser } from "@/types/types";
import { mongoDB } from "@/lib/MongoDB";


// Remove read access from the user
export async function PUT(
  request: Request
) {

  const result = await AuthMiddleware(request);

  if (result instanceof NextResponse) {

    try {
      await mongoDB();

      const { userId, fileId } = await request.json();

      if (!userId || !fileId) {
        return NextResponse.json(`Access Denied!!`, { status: 404 });
      }

      const user: ApiUser = JSON.parse(request.headers.get("user") || "{}");

      const file = await FileModel.findById({ _id: fileId });

      if(file.createdBy == userId){
        return NextResponse.json(`Operation not possible!`, { status: 401 });
      }

      if (file.createdBy != user._id) {
        return NextResponse.json(`Access Denied!!`, { status: 401 });
      }

      await FileModel.updateOne(
        { _id: fileId },
        { $pull: { readBy: userId } }
      );

      return NextResponse.json('Read access removed!', { status: 200 });
    } catch (err) {
      return NextResponse.json(`Err : ${err}`, { status: 500 });
    }
  } else {
    return result;
  }
}


// Give user read access
export async function POST(
  request: Request
) {

  const result = await AuthMiddleware(request);

    if (result instanceof NextResponse) {

        try {
            await mongoDB();
            
            const {userId, fileId} = await request.json()

            if(!userId || !fileId){
                return NextResponse.json(`Access Denied!!`, {status:404});
            }

            const user: ApiUser = JSON.parse(request.headers.get("user") || "{}");
            
            const file1 = await FileModel.findById({_id:fileId});
            
            if(file1.createdBy == userId){
              return NextResponse.json(`Operation not possible!`, { status: 401 });
            }

            if(file1.createdBy != user._id){
                return NextResponse.json(`Owner can only change team settings!!`, {status:401});
            }

            await FileModel.updateOne(
              { _id: fileId },
              { $push: { readBy: userId } }
            );

            return NextResponse.json('Read access granted!',{status:200});
        } catch (err) {
            return NextResponse.json(`Err : ${err}`, {status:500});
        }
    } else {
      return result;
    }
}