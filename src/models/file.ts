import mongoose, { Schema } from "mongoose";

interface File {
  fileName: string;
  createdBy: any;
  archive: boolean;
  document: {
    time: number;
    blocks: {
      id: string;
      type: string;
      data: {
        text: string;
        level: number;
      };
    }[];
    version: string;
  };
  whiteboard: any[];
  filePrivate: boolean;
  writtenBy: any[];
  readBy: any[];
  teamId:any;
}

const FileSchema = new Schema<File>(
  {
    fileName: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    archive: { type: Boolean },
    document: { type: Schema.Types.Mixed },
    whiteboard: { type: Schema.Types.Mixed },
    filePrivate: { type: Boolean, required: true },
    writtenBy: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
    readBy: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
    teamId:{ type: Schema.Types.ObjectId, required: true, ref: "Team" },
  },
  { timestamps: true }
);

const FileModel =
  mongoose.models?.File || mongoose.model<File>("File", FileSchema);

export default FileModel;
