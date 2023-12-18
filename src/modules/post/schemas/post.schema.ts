import { model, Schema } from "mongoose";
import { IPost } from "../interfaces/post.interface";

export const postSchema = new Schema<IPost>({
    content: { type: String, required: true },
    images: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    numberLike:{ type: Number, required: true },
    numberComment:{ type: Number, required: true },
    creatorId: { type: String, required: true, ref: "Users" },
});

const postModel = model<IPost>("posts", postSchema);
export default postModel;
