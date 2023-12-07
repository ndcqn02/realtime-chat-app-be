import { Connection } from "mongoose";
import { messageSchema } from "./schemas/message.schema";

export const messageProviders = [
  {
    provide: "MESSAGE_MODEL",
    useFactory: (connection: Connection) =>
      connection.model("Messages", messageSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
