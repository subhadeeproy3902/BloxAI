import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import TeamModel from "@/models/team";
import { AuthMiddleware } from "@/Middleware/AuthMiddleware";
import { NextResponse } from "next/server";
import { mongoDB } from "@/lib/MongoDB";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {

  const result = await AuthMiddleware(request);

    if (result instanceof NextResponse) {
        
        try {
          
            const { id } = params;

            if (!id) return new Response("Parameters missing!!", { status: 401 });

            await mongoDB();
            
            const TeamWithMembersData = await TeamModel.findOne({_id:id}).populate({
              path: 'teamMembers',
              select: 'email firstName lastName createdAt updatedAt',
            });
      
            return NextResponse.json(TeamWithMembersData.teamMembers,{ status: 200 });
        } catch (err) {
            return NextResponse.json(`Err : ${err}`, {status:500});
        }
    } else {
      return result;
    }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const {email} = await request.json();

  if (!id) return new Response("Parameters missing!!", { status: 401 });

  const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  const teamInfo = await client.query(api.teams.getTeamById,{_id:id as Id<"teams">});

  if(!teamInfo.teamMembers.includes(email)) return new Response("Not the member of team!!", { status: 404 });

  if(teamInfo.createdBy === email) return new Response("Owner of the team!!", { status: 404 });

  const updatedTeamMembers = teamInfo.teamMembers.filter((writer: any) => writer !== email);

  await client.mutation(api.teams.addMember, { _id: id as Id<"teams">, memberArray:updatedTeamMembers });

  return new Response("Member removd!!", { status: 200 });

}
