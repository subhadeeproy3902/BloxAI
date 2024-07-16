import mongoose, { Schema } from "mongoose";

interface Team {
  teamName: string;
  createdBy: any;
  teamMembers: any[];
  files: any[];
}

const TeamSchema = new Schema<Team>(
  {
    teamName: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    teamMembers: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
    files: [{ type: Schema.Types.ObjectId, required: true, ref: "File" }]
  },
  { timestamps: true }
);

const TeamModel =
  mongoose.models?.Team || mongoose.model<Team>("Team", TeamSchema);

export default TeamModel;
