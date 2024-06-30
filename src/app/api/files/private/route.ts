import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

export const PUT = async(req: Request) => {
  try {
    const { teamId, email, fileId } = await req.json();

    console.log(teamId,email,fileId)

    if (!teamId || !email || !fileId) return new Response('Parameters missing!!',{status: 401});
    
    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  
    const teamInfo = await client.query(api.teams.getTeamById,{_id:teamId});

    if (teamInfo.createdBy !== email) return new Response('Only owner can make changes!!',{status: 400});

  
    await client.mutation(api.files.changeToPrivate,{_id:fileId});
  
    return new Response('Changed to Private!!',{status: 200});
  } catch (err) {
    console.log(err)
  }
}
