import { Document, Schema } from "mongoose";

export interface IMessage {
  _id?: Schema.Types.ObjectId;
  message: string;
  createdAt?: Date;
  senderId: String;
  recipientId: String;
}
