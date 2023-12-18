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

import { CommentDto } from './dto/comment.dto'
import { ObjectId } from 'mongoose'
import type { Request, Response } from 'express-serve-static-core';
import { createResponse } from 'src/utils/response'
import commentService from './comments.service'

// @UseGuards(RolesGuard)messageData
@Controller('api/comments')
export class CommentController {
  private readonly service = commentService

  @Post()
  // @Roles(['admin'])
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() commentData: CommentDto, @Res() res: Response) {
    const comment = await this.service.create(commentData)
    return res.json(createResponse(comment))
  }

  @Put('/:_id')
  async update(@Param('_id') _id: ObjectId, @Body() commentData: CommentDto, @Res() res: Response) {
    const comment = await this.service.update(_id, commentData)
    return res.json(createResponse(comment))
  }

  @Delete('/:_id')
  async delete(@Param('_id') _id: ObjectId, @Res() res: Response) {
    const comment = await this.service.delete(_id)
    return res.json(createResponse(comment))
  }

  @Get()
  async findAll(@Res() res: Response) {
    const comment = await this.service.findAll()
    return res.json(createResponse(comment))
  }

}
