import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'

import { MessageDto } from './dto/message.dto'
import { ObjectId } from 'mongoose'
import type { Request, Response } from 'express-serve-static-core';
import { createResponse } from 'src/utils/response'
import messageService from './messages.service'

// @UseGuards(RolesGuard)messageData
@Controller('api/messages')
export class MessageController {
  private readonly service = messageService

  @Post()
  // @Roles(['admin'])
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() messageData: MessageDto, @Res() res: Response) {
    const message = await this.service.create(messageData)
    return res.json(createResponse(message))
  }

  @Put('/:_id')
  async update(@Param('_id') _id: ObjectId, @Body() messageData: MessageDto, @Res() res: Response) {
    const message = await this.service.update(_id, messageData)
    return res.json(createResponse(message))
  }

  @Delete('/:_id')
  async delete(@Param('_id') _id: ObjectId, @Res() res: Response) {
    const message = await this.service.delete(_id)
    return res.json(createResponse(message))
  }

  @Get()
  async findAll(@Res() res: Response) {
    const messages = await this.service.findAll()
    return res.json(createResponse(messages))
  }

  @Get('getChatListUser/:recipientId')
  async getChatListUser(@Param('recipientId') recipientId: string, @Res() res: Response) {
    const message = await this.service.getChatListUser(recipientId)
    return res.json(createResponse(message))
  }

  @Get('chat/:recipientId/:senderId')
  async getChatDetail(
    @Param('recipientId') recipientId: string,
    @Param('senderId') senderId: string,
    @Res() res: Response,
  ) {
    const chat = await this.service.getChatDetail(recipientId.trim(), senderId.trim())
    return res.json(createResponse(chat))
  }

  @Get('/:_id')
  async findById(@Param('_id') _id: ObjectId, @Res() res: Response) {
    const message = await this.service.findById(_id)
    return res.json(createResponse(message))
  }
}
