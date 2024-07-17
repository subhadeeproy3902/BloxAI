import { mongoDB } from "@/lib/MongoDB";
import { AuthMiddleware } from "@/Middleware/AuthMiddleware";
import TeamModel from "@/models/team";
import { ApiUser } from "@/types/types";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {

    const result = await AuthMiddleware(req);

    if (result instanceof NextResponse) {
        
        try {
            const { teamName } = await req.json();

            await mongoDB();
      
            const user: ApiUser = JSON.parse(req.headers.get("user") || "{}");
      
            const team = await TeamModel.create({
              teamName,
              createdBy:user._id,
              teamMembers:[user._id],
              files:[]
            });

            return NextResponse.json({teamId:team._id,teamName:team.teamName},{ status: 200 });
        } catch (err) {
            return NextResponse.json(`Err : ${err}`, {status:500});
        }
    } else {
      return result;
    }
};
