import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

export const GET = async () => {
  try {
    console.log(process.env.NEXT_PUBLIC_CONVEX_URL!)
  
    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  
    const teamInfo = await client.query(api.teams.getAllTeam);
  
    return Response.json(teamInfo);
  } catch (err) {
    console.log(err)
  }
};
