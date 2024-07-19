import { mongoDB } from "@/lib/MongoDB";
import { AuthMiddleware } from "@/Middleware/AuthMiddleware";
import FileModel from "@/models/file";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await AuthMiddleware(request);

    const { id } = params;

    if (!id) return new Response("Parameters missing!!", { status: 401 });

    await mongoDB();

    const files = await FileModel.findById({ _id: id }).populate("createdBy");

    if (!files.filePrivate) return NextResponse.json(files, { status: 200 });

    if (result instanceof NextResponse) {
      return NextResponse.json(files, { status: 200 });
    } else {
      return result;
    }
  } catch (err) {
    return NextResponse.json(`Err : ${err}`, { status: 500 });
  }
}
