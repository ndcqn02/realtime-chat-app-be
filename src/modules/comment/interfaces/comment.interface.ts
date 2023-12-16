import { Document, Schema } from "mongoose";

export interface IComment {
  _id?: Schema.Types.ObjectId;
  comment: string;
  createdAt?: Date;
  creatorId: String;
  postId: Schema.Types.ObjectId;
}
