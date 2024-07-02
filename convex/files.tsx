import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    const { fileName, createdBy, teamId, archive, document, whiteboard } = args;
    const result = await ctx.db.insert("files", {
      fileName,
      createdBy,
      teamId,
      archive,
      document,
      whiteboard,
      private: false,
      read:true,
      write:false,
      writtenBy:[createdBy],
      readBy:[createdBy]
    });
    return result;
  },
});

export const renameFile = mutation({
  args: {
    _id: v.id("files"),
    newName: v.string(),
  },
  handler: async (ctx, args) => {
    const { _id, newName } = args;
    const res = await ctx.db.patch(_id, { fileName: newName });
    return res;
  },
});

export const getAllFiles = query({
  args: {},
  handler: async (ctx, args) => {
    const result = ctx.db.query("files").order("desc").collect();

    return result;
  },
});

export const getFiles = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .order("desc")
      .collect();

    return result;
  },
});

export const updateDocument = mutation({
  args: {
    _id: v.id("files"),
    document: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, { document: args.document });
    return result;
  },
});

export const updateWhiteboard = mutation({
  args: {
    _id: v.id("files"),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, {
      whiteboard: args.whiteboard,
    });
    return result;
  },
});

export const getFileById = query({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args._id);
    return result;
  },
});

export const deleteFile = mutation({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.delete(args._id);
    return result;
  },
});

export const addToArchive = mutation({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const { _id } = args;
    const res = await ctx.db.patch(_id, { archive: true });
    return res;
  },
});

export const removeFromArchive = mutation({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const { _id } = args;
    const res = await ctx.db.patch(_id, { archive: false });
    return res;
  },
});

export const getPrivateFiles = query({
  args: {
    teamId: v.id("teams"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const { teamId, email } = args;

    const teamInfo = await await ctx.db.get(teamId);

    if (!teamInfo.teamMembers.includes(email)) {
      return { status: 401 };
    }

    const result = await ctx.db
      .query("files")
      .filter((q) =>
        q.and(q.eq(q.field("teamId"), teamId), q.eq(q.field("private"), true))
      )
      .order("desc")
      .collect();
    return result;
  },
});

export const changeToPrivate = mutation({
  args: {
    _id: v.id("files")
  },
  handler: async (ctx, args) => {
    const { _id } = args;
    const res = await ctx.db.patch(_id, { private: true });
    return res;
  },
});

export const changeToPublic = mutation({
  args: {
    _id: v.id("files")
  },
  handler: async (ctx, args) => {
    const { _id  } = args;
    const res = await ctx.db.patch(_id, { private: false });
    return res;
  },
});

export const updateWrite = mutation({
  handler: async (ctx, args:{_id : Id<"files">, writtenBy:string[]}) => {
    const { _id,writtenBy } = args;
    const res = await ctx.db.patch(_id, { writtenBy, write:true, read:true });
    return res;
  },
});

export const updateRead = mutation({
  handler: async (ctx, args:{_id : Id<"files">, readBy:string[]}) => {
    const { _id,readBy } = args;
    const res = await ctx.db.patch(_id, { readBy:readBy, write:false, read:true });
    return res;
  },
});