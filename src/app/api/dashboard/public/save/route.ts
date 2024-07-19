import FileModel from "@/models/file";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
        const {whiteboard, document, fileId} = await req.json();
        console.log(document,whiteboard)

        await FileModel.updateOne({_id:fileId},{whiteboard, document});

      return NextResponse.json({ status: "Updated" }, { status: 200 });
  } catch (error) {
    console.error("Error in health endpoint:", error);
    return NextResponse.json({ message: 'Error occurred!' }, { status: 500 });
  }
};