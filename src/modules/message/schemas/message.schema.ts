import { model, Schema } from "mongoose";
import { IMessage } from "../interfaces/message.interface";

export const messageSchema = new Schema<IMessage>({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
});

const messageModel = model<IMessage>("messages", messageSchema);
export default messageModel;
