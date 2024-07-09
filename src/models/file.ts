import mongoose, { Schema } from "mongoose";

interface File {
  fileName: string;
  createdBy: any;
  archive: boolean;
  document: string;
  whiteboard: string;
  private: boolean;
  writtenBy: any[];
  readBy: any[];
  write: boolean;
  read: boolean;
}

const FileSchema = new Schema<File>(
  {
    fileName: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    archive: { type: Boolean },
    document: { type: String },
    whiteboard: { type: String },
    private: { type: Boolean, required: true },
    writtenBy: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
    readBy: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
    write: { type: Boolean },
    read: { type: Boolean },
  },
  { timestamps: true }
);

const FileModel =
  mongoose.models?.File || mongoose.model<File>("File", FileSchema);

export default FileModel;
