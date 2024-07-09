import mongoose, { Schema } from "mongoose";

interface Team {
  teamName: string;
  createdBy: any;
  teamMembers: any[];
}

const TeamSchema = new Schema<Team>(
  {
    teamName: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    teamMembers: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
  },
  { timestamps: true }
);

const TeamModel =
  mongoose.models?.Team || mongoose.model<Team>("Team", TeamSchema);

export default TeamModel;
