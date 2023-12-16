import { model, Schema } from "mongoose";
import { IComment } from "../interfaces/comment.interface";

export const commentSchema = new Schema<IComment>({
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    creatorId: { type: String, required: true, ref: "Users" },
    postId: { type: String, required: true, ref: "posts" },
});

const commentModel = model<IComment>("comments", commentSchema);
export default commentModel;
