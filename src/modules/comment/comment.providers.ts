import { Connection } from "mongoose";
import { commentSchema } from "./schemas/comment.schema";

export const CommentProviders = [
  {
    provide: "COMMENT_MODEL",
    useFactory: (connection: Connection) =>
      connection.model("Comments", commentSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
