import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  teams: defineTable({
    teamName: v.string(),
    createdBy: v.string(),
    teamMembers: v.array(v.string()),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
  }),
  files: defineTable({
    fileName: v.string(),
    teamId: v.id("teams"),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
    private: v.string(),
    writtenBy: v.array(v.string()),
    readBy: v.array(v.string()),
    write:v.boolean(),
    read:v.boolean()
  }),
});
