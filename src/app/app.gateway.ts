import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket } from "dgram";
import { Server } from "http";
import { AppService } from "./app.service";
import { IMessage } from "src/modules/message/interfaces/message.interface";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})


export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // constructor(private appService: AppService) {}
  private appService: AppService

  @WebSocketServer() server: Server;




  @SubscribeMessage("sendMessage")
  async handleSendMessage(client: Socket, payload: IMessage, @MessageBody() data: string): Promise<void> {
    console.log("🚀 ~ file: app.gateway.ts:30 ~ handleSendMessage ~ client:", client)
    console.log("🚀 ~ file: app.gateway.ts:30 ~ handleSendMessage ~ payload:", payload)
    console.log("🚀 ~ file: app.gateway.ts:30 ~ handleSendMessage ~ data:", data)
    await this.appService.createMessage(payload);
    this.server.emit("sendMessage", payload);
  }

  afterInit(server: Server) {
    console.log("server",server );
    //Do stuffs., 
  }

  handleDisconnect(client: Socket) {
    console.log("DISCONNECTED");
    // console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log("CONNECTED");
    // console.log(`Connected ${client.id}`);
    //Do stuffs
  }
}
