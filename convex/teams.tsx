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
  args: { teamName: v.string(), createdBy: v.string() },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("teams", args);
    return result;
  },
});
