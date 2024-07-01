import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) return new Response("Parameters missing!!", { status: 401 });

  const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  const teamInfo = await client.query(api.teams.getTeamById, {
    _id: id as Id<"teams">,
  });

  const memberDataPromises = teamInfo.teamMembers.map((mem: string) =>
    client.query(api.user.getUser, { email: mem })
  );

  const results = await Promise.all(memberDataPromises);

  const memberData = results.flatMap((result) => result || []);

  return Response.json({ memberData });
}

export async function DELETE(
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

  return new Response("Member removed!!", { status: 200 });

}
