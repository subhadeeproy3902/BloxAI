import { AuthMiddleware } from "@/Middleware/AuthMiddleware";
import FileModel from "@/models/file";
import { ApiUser } from "@/types/types";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    const result = await AuthMiddleware(req);
    // If middleware returns NextResponse.next(), proceed with API logic
    if (result instanceof NextResponse) {
      
      const {whiteboard, document, fileId} = await req.json();
      console.log(whiteboard,document)
        

        if(!whiteboard || !document || !fileId){
            return NextResponse.json(`Access Denied!!`, {status:404});
        }

        const user: ApiUser = JSON.parse(req.headers.get("user") || "{}");

        await FileModel.updateOne({_id:fileId},{whiteboard, document});

      return NextResponse.json({ status: "Updated" }, { status: 200 });
    } else {
      // Handle any errors from the middleware
      return result;
    }
  } catch (error) {
    console.error("Error in health endpoint:", error);
    return NextResponse.json({ message: 'Error occurred!' }, { status: 500 });
  }
};