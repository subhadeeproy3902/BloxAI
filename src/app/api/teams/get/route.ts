import { NextResponse } from "next/server";
import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

export const GET = async () => {
  try {
  
    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  
    const teamInfo = await client.query(api.teams.getAllTeam);
  
    return NextResponse.json(teamInfo);
  } catch (err) {
    console.log(err)
  }
};
