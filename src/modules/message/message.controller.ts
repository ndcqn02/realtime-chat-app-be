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
  HttpStatus
} from "@nestjs/common";

import { MessageDto } from "./dto/message.dto";
import { ObjectId } from "mongoose";
import { MessageService } from "./messages.service";
import { Request, Response } from "express";
import { createResponse } from "src/utils/response";

// @UseGuards(RolesGuard)messageData
@Controller("messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  // @Roles(['admin'])
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() messageData: MessageDto, @Res() res: Response) {
    const message = await this.messageService.create(messageData);
    return res.json(createResponse(message));
  }

  @Put("/:_id")
  async update(
    @Param("_id") _id: ObjectId,
    @Body() messageData: MessageDto,
    @Res() res: Response
  ) {
    const message = await this.messageService.update(_id, messageData);
    return res.json(createResponse(message));
  }

  @Delete("/:_id")
  async delete(@Param("_id") _id: ObjectId, @Res() res: Response) {
    const message = await this.messageService.delete(_id);
    return res.json(createResponse(message));
  }

  @Get()
  async findAll(@Res() res: Response) {
    const messages = await this.messageService.findAll();
    return res.json(createResponse(messages));
  }

  @Get("/:_id")
  async findById(@Param("_id") _id: ObjectId, @Res() res: Response) {
    const message = await this.messageService.findById(_id);
    return res.json(createResponse(message));
  }
}
