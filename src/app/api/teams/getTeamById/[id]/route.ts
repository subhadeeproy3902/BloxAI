import { mongoDB } from "@/lib/MongoDB";
import TeamModel from "@/models/team";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    console.log(id)
    if (!id) return new Response("Parameters missing!!", { status: 401 });

    await mongoDB();

    const teams = await TeamModel.findById({ _id: id }).populate("createdBy").populate("files");

    return NextResponse.json(teams, { status: 200 });
  } catch (err) {
    return NextResponse.json(`Err : ${err}`, { status: 500 });
  }
}
