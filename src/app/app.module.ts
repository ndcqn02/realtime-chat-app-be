import { Module } from "@nestjs/common";
import { AppGateway } from "./app.gateway";
import { MessageService } from "src/modules/message/messages.service";

@Module({
  providers: [AppGateway, MessageService],
})
export class EventsModule {}