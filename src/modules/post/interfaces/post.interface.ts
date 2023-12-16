import { Document, Schema } from "mongoose";

export interface IPost {
  _id?: Schema.Types.ObjectId;
  content: String;
  images :String;
  createdAt?: Date;
  creatorId: String;
  numberLike:number;
  numberComment:number;
}
