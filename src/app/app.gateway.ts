import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'

import { Server } from 'http'
import { AppService } from './app.service'
import { IMessage } from 'src/modules/message/interfaces/message.interface'
import messageService from 'src/modules/message/messages.service'
import { MessageDto } from 'src/modules/message/dto/message.dto'
import { Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private message = messageService

  @WebSocketServer() server: Server

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ): Promise<void> {
    console.log(`Connected sendMessage ${client.id}`)

    if (data.recipientId && data.senderId) {
      if (data.message) {
        await this.message.create(data)
      }
      const chatDetail = await this.message.getChatDetail(data.recipientId, data.senderId)
      if (chatDetail) {
        this.server.emit('replyMessageRes', chatDetail)
      }
    }
  }

  @SubscribeMessage('getMessage')
  async handleGetMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessageDto,
  ): Promise<void> {
    if (data.recipientId && data.senderId) {
      const chatDetail = await this.message.getChatDetail(data.recipientId, data.senderId)
      // const conversations = await this.message.getChatListUser(data.recipientId)

      this.server.emit('replyMessageRes', chatDetail)
    }
  }

  afterInit(server: Server) {
    // console.log("server",server );
    //Do stuffs.,
    // server.on()
  }

  handleDisconnect(client: Socket) {
    console.log('DISCONNECTED')
    // console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  async handleConnection(client: Socket, ...args: any[]) {
    console.log('CONNECTED')
    // console.log(`Connected ${client.id}`)
    //Do stuffs
  }
}
