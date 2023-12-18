import { Connection } from "mongoose";
import { postSchema } from "./schemas/post.schema";

export const PostProviders = [
  {
    provide: "POST_MODEL",
    useFactory: (connection: Connection) =>
      connection.model("Posts", postSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
