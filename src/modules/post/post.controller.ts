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

import { PostDto } from './dto/post.dto'
import { ObjectId } from 'mongoose'
import { Request, Response } from 'express'
import { createResponse } from 'src/utils/response'
import postService from './posts.service'

// @UseGuards(RolesGuard)messageData
@Controller('api/posts')
export class PostController {
  private readonly service = postService

  @Post()
  // @Roles(['admin'])
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() postData: PostDto, @Res() res: Response) {
    const post = await this.service.create(postData)
    return res.json(createResponse(post))
  }

  @Put('/:_id')
  async update(@Param('_id') _id: ObjectId, @Body() postData: PostDto, @Res() res: Response) {
    const post = await this.service.update(_id, postData)
    return res.json(createResponse(post))
  }

  @Delete('/:_id')
  async delete(@Param('_id') _id: ObjectId, @Res() res: Response) {
    const post = await this.service.delete(_id)
    return res.json(createResponse(post))
  }

  @Get()
  async findAll(@Res() res: Response) {
    const posts = await this.service.findAll()
    return res.json(createResponse(posts))
  }

  @Get('getAllPost')
  async getAllPost(@Res() res: Response) {
    const posts = await this.service.getAllPost()
    return res.json(createResponse(posts))
  }

}
