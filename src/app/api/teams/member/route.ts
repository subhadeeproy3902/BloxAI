import { mongoDB } from "@/lib/MongoDB";
import { AuthMiddleware } from "@/Middleware/AuthMiddleware";
import TeamModel from "@/models/team";
import { ApiUser } from "@/types/types";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
  ) {
  
    const result = await AuthMiddleware(request);
  
      if (result instanceof NextResponse) {
          
          try {
            const {teamId} = await request.json();
  
              await mongoDB();
              
              const user: ApiUser = JSON.parse(request.headers.get("user") || "{}");

              await TeamModel.updateOne(
                { _id: teamId },
                { $push: { teamMembers: user._id } }
              );
        
              return NextResponse.json('Added SuccessFully!!',{ status: 200 });
          } catch (err) {
              return NextResponse.json(`Err : ${err}`, {status:500});
          }
      } else {
        return result;
      }
  }