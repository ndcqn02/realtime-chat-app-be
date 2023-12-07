import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../database/database.module";
import { MessageService } from "./messages.service";
import { messageProviders } from "./message.providers";
import { MessageController } from "./message.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [MessageController],
  providers: [MessageService, ...messageProviders],
})
export class MessageModule {}
