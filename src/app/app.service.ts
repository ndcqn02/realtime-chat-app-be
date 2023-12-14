import { Injectable } from "@nestjs/common";
import { IMessage } from "src/modules/message/interfaces/message.interface";
import messageModel from "src/modules/message/schemas/message.schema";

@Injectable()
export class AppService {
  private model = messageModel;
  async createMessage(chat: IMessage): Promise<IMessage> {
    return await this.model.create(chat);
  }

  async getMessages(): Promise<IMessage[]> {
    return await this.model.find();
  }
}
