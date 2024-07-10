import { mongoDB } from "@/lib/MongoDB";
import { AuthMiddleware } from "@/Middleware/AuthMiddleware";
import FileModel from "@/models/file";
import { ApiUser } from "@/types/types";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {

    const result = await AuthMiddleware(req);

    if (result instanceof NextResponse) {
        
        try {
            const { fileName, filePrivate } = await req.json();

            await mongoDB();
      
            const user: ApiUser = JSON.parse(req.headers.get("user") || "{}");
      
            const file = await FileModel.create({
              fileName,
              filePrivate,
              createdBy:user._id,
              readBy:[user._id],
              writtenBy:[user._id]
            });
      
            return NextResponse.json({ status: 200 });
        } catch (err) {
            return NextResponse.json(`Err : ${err}`, {status:500});
        }
    } else {
      return result;
    }
};