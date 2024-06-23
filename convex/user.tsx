import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUser = query({
  args: {
    email: v.string(),
  },

  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    return result;
  },
});

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
    .query("user")
    .filter((q) => q.eq(q.field("email"), args.email))
    .collect();

    if(user) return "Already exist!!";

    return await ctx.db.insert("user", args);
  },
});

export const updateUser = mutation({
  args: {
    _id: v.id("user"),
    name: v.string(),
    email: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    const { _id } = args;
    return await ctx.db.patch(_id, args);
  },
});
