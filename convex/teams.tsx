import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeam = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("createdBy"), args.email))
      .collect();
    return result;
  },
});

export const deleteTeam = mutation({
  args: {
    _id: v.id("teams"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.delete(args._id);
    return result;
  },
});

export const createTeam = mutation({
  args: { teamName: v.string(), createdBy: v.string(), teamMembers:v.array(v.string()) },
  handler: async (ctx, args) => {
    const {teamName, teamMembers, createdBy} = args;

    const result = await ctx.db.insert("teams", {
      teamName,createdBy,teamMembers
    });
    return result;
  },
});

export const getTeamById = query({
  args: {
    _id: v.id("teams"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args._id);
    return result;
  },
})

export const addMember = mutation({
  args: { _id: v.id("teams"), userEmail: v.string()},
  handler: async (ctx,args) => {
    const { _id,userEmail } = args;

    const teamData = await await ctx.db.get(args._id);

    const membersArray = teamData.teamMembers.push(userEmail);

    const res = await ctx.db.patch(_id,{teamMembers: membersArray})

    return res;
  }
})

export const getAllTeam =  query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.db.query("teams").collect()

    const userTeams = result.filter((team:any)=> team.teamMembers.includes(args.email))

    return userTeams;
  },
});
