import { ObjectId } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { IMessage } from "./interfaces/message.interface";
import { MessageDto } from "./dto/message.dto";
import messageModel from "./schemas/message.schema";

@Injectable()
export class MessageService {
  // constructor(
  //   @Inject("MESSAGE_MODEL")
  //   private messageModel: Model<IMessage>
  // ) {}
  // @Inject("MESSAGE_MODEL")
  private model = messageModel;

  async create(messageData: MessageDto): Promise<IMessage> {
    return await this.model.create(messageData);
  }

  async update(_id: ObjectId, messageData: MessageDto): Promise<IMessage> {
    const message = await this.model.findByIdAndUpdate(_id, messageData, {
      new: true,
    });
    return message;
  }

  async delete(_id: ObjectId) {
    const message = await this.model.findByIdAndDelete(_id);
    return message;
  }

  async findAll(): Promise<IMessage[]> {
    return await this.model.find();
  }

  async findById(_id: ObjectId): Promise<IMessage> {
    return await this.model.findById(_id);
  }
}

const messageService = new MessageService();
export default messageService;
