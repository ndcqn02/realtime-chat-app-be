import { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  _id?: Schema.Types.ObjectId;
  message: string;
  createdAt: Date;
  userId: Schema.Types.ObjectId;
}
