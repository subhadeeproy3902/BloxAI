import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
   const {id} = params;
    
   
   if (!id) return new Response('Parameters missing!!',{status: 401});
    
   const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
 
   const teamInfo = await client.query(api.teams.getTeamById,{_id:id as Id<"teams">});

   const memberDataPromises = teamInfo.teamMembers.map((mem:string) =>
    client.query(api.user.getUser, { email: mem })
  );

  const results = await Promise.all(memberDataPromises);

  const memberData = results.flatMap((result) => result || []);

  return Response.json({memberData});

}
