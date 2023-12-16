import {
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
  // constructor(private appService: AppService) {}
  private appService: AppService
  private message = messageService

  @WebSocketServer() server: Server

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, @MessageBody() data: MessageDto): Promise<void> {
    try {
      if (data.recipientId && data.senderId) {
        if (data.message) {
          await this.message.create(data)
        }
        const chatDetail = await this.message.getChatDetail(data.recipientId, data.senderId)
        console.log(`client id sendMessage >>> ${client}`)

        client.emit('messageResponse', chatDetail)
      }
    } catch (error) {
      console.error('Error handling sendMessage:', error)
      client.emit('errorMessage', { error: 'An error occurred while processing the message.' })
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

  handleConnection(client: Socket, ...args: any[]) {
    console.log('CONNECTED')
    console.log(`Connected ${client.id}`)
    //Do stuffs
  }
}
