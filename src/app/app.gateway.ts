import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Socket } from 'dgram'
import { Server } from 'http'
import { AppService } from './app.service'
import { IMessage } from 'src/modules/message/interfaces/message.interface'
import messageService from 'src/modules/message/messages.service'
import { MessageDto } from 'src/modules/message/dto/message.dto'

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
    console.log(' handleSendMessage ~ data:', data)

    const result = await this.message.create(data)
    console.log('🚀 ~ file: app.gateway.ts:48 ~ result:', result)
    this.server.emit('sendMessage', data)
  }

  afterInit(server: Server) {
    // console.log("server",server );
    //Do stuffs.,
  }

  handleDisconnect(client: Socket) {
    console.log('DISCONNECTED')
    // console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('CONNECTED')
    // console.log(`Connected ${client.id}`);
    //Do stuffs
  }
}