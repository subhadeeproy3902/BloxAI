import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../../convex/_generated/dataModel";
import { v } from "convex/values";

// Give user read access
export const POST = async (req: Request) => {
  try {
    const { teamId, email, memberEmail, readBy, fileId } = await req.json();

    console.log(teamId, email, memberEmail, readBy, fileId);

    if (!teamId || !memberEmail || !email || !fileId)
      return new Response("Parameters missing!!", { status: 401 });

    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    const teamInfo = await client.query(api.teams.getTeamById, { _id: teamId as Id<"teams">});

    
    if (!teamInfo.teamMembers.includes(memberEmail)) {
      return new Response("User is not member of the team", { status: 400 });
    }
    
    if (teamInfo.createdBy !== email) {
      return new Response("Only owner can make changes!!", { status: 400 });
    }
    
    
    const updatedReadBy:string[]  = readBy.push(memberEmail);

    const res = await client.mutation(api.files.updateRead, { _id: fileId as Id<"files">, readBy:updatedReadBy });
    console.log(res)
    console.log(teamInfo)
    return new Response("Changed to Public!!", { status: 200 });
  } catch (err) {
    console.log(err)
    return new Response(`Error: ${err}`, {status:500})

  }
};

// Remove read access from the user
export const PUT = async (req: Request) => {
  try {
    const { teamId, email, memberEmail, readBy, fileId } = await req.json();

    if (!teamId || !memberEmail || !email || !fileId)
      return new Response("Parameters missing!!", { status: 401 });

    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    const teamInfo = await client.query(api.teams.getTeamById, { _id: teamId });

    if (!teamInfo.teamMembers.includes(memberEmail)) {
      return new Response("User is not member of the team", { status: 400 });
    }

    if (teamInfo.createdBy !== email) {
      return new Response("Only owner can make changes!!", { status: 400 });
    }

    const updatedReadBy = Array.isArray(readBy)
      ? readBy.filter(writer => writer !== memberEmail)
      : [];

    await client.mutation(api.files.updateRead, { _id: fileId, readBy:updatedReadBy });

    return new Response("Changed to Public!!", { status: 200 });
  } catch (err) {
    return new Response(`Error: ${err}`, {status:500})

  }
};