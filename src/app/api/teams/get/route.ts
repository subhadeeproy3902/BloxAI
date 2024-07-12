import { mongoDB } from "@/lib/MongoDB";
import { AuthMiddleware } from "@/Middleware/AuthMiddleware";
import TeamModel from "@/models/team";
import { ApiUser } from "@/types/types";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {

    const result = await AuthMiddleware(req);

    if (result instanceof NextResponse) {
        
        try {

            await mongoDB();
      
            const user: ApiUser = JSON.parse(req.headers.get("user") || "{}");
      
            const team = await TeamModel.find({$or:[{createdBy:user._id}, {teamMembers:{$in:[user._id]}}]});
      
            return NextResponse.json(team,{ status: 200 });
        } catch (err) {
            return NextResponse.json(`Err : ${err}`, {status:500});
        }
    } else {
      return result;
    }
};
