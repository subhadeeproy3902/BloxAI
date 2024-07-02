import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../../convex/_generated/dataModel";

// Give write read access
export const POST = async (req: Request) => {
  try {
    const { teamId, email, memberEmail, writtenBy, fileId } = await req.json();

    if (!teamId || !memberEmail || !email || !fileId || !writtenBy)
      return new Response("Parameters missing!!", { status: 401 });

    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    const teamInfo = await client.query(api.teams.getTeamById, { _id: teamId as Id<"teams">});
 
    if (!teamInfo.teamMembers.includes(memberEmail)) {
      return new Response("User is not member of the team", { status: 400 });
    }
    
    if (teamInfo.createdBy !== email) {
      return new Response("Only owner can make changes!!", { status: 400 });
    }
    
    writtenBy.push(memberEmail);

    await client.mutation(api.files.updateWrite, { _id: fileId as Id<"files">, writtenBy:writtenBy });

    return new Response("Read Access given!!", { status: 200 });
  } catch (err) {

    return new Response(`Error: ${err}`, {status:500})

  }
};


// Remove write access from the user
export const PUT = async (req: Request) => {
  try {
    const { teamId, email, memberEmail, writtenBy, fileId } = await req.json();

    if (!teamId || !memberEmail || !email || !fileId || !writtenBy)
      return new Response("Parameters missing!!", { status: 401 });

    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    const teamInfo = await client.query(api.teams.getTeamById, { _id: teamId });

    if (!teamInfo.teamMembers.includes(memberEmail)) {
      return new Response("User is not member of the team", { status: 400 });
    }

    if (teamInfo.createdBy !== email) {
      return new Response("Only owner can make changes!!", { status: 400 });
    }

    const updatedWrittenBy = Array.isArray(writtenBy)
    ? writtenBy.filter(writer => writer !== memberEmail)
    : [];

    await client.mutation(api.files.updateWrite, { _id: fileId, writtenBy:updatedWrittenBy });

    return new Response("Read access removed!!", { status: 200 });
  } catch (err) {
    console.log(err);
  }
};