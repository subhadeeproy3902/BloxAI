import { mongoDB } from "@/lib/MongoDB";
import { AuthMiddleware } from "@/Middleware/AuthMiddleware";
import FileModel from "@/models/file";
import { ApiUser } from "@/types/types";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request
) {

  const result = await AuthMiddleware(request);

    if (result instanceof NextResponse) {

        try {
            await mongoDB();
            
            const {fileName, filePrivate, fileId, archive} = await request.json()

            if(!fileName || filePrivate === undefined || archive === undefined || !fileId){
                return NextResponse.json(`Access Denied!!`, {status:404});
            }

            const user: ApiUser = JSON.parse(request.headers.get("user") || "{}");
            
            const file = await FileModel.findById({_id:fileId});

            if(file.createdBy !== user._id && !file.writtenBy.includes(user._id)){
                return NextResponse.json(`Access Denied!!`, {status:401});
            }

            await FileModel.updateOne({_id:fileId},{
                fileName,
                filePrivate,
                archive
            })

            return NextResponse.json('',{status:200});
        } catch (err) {
            return NextResponse.json(`Err : ${err}`, {status:500});
        }
    } else {
      return result;
    }
}