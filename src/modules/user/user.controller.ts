import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'

import type { Request, Response } from 'express-serve-static-core';
import { createResponse } from 'src/utils/response'
import userService from './user.service'

@Controller('api/users')
export class UserController {
  private userService = userService

  @Get()
  async getUserList(@Res() res: Response) {
    const users = await this.userService.getUserList()
    return res.json(createResponse(users))
  }

  @Get('getSessionList')
  async getSessionList(@Res() res: Response) {
    const sessions = await this.userService.getSessionList()
    return res.json(createResponse(sessions))
  }

  @Get('getToken/:sessionId')
  async getToken(@Param('sessionId') sessionId: string, @Res() res: Response) {
    const template = 'test'
    const session = await this.userService.getToken(sessionId, template)
    return res.json(createResponse(session))
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: string, @Res() res: Response) {
    const user = await this.userService.getUser(userId)
    return res.json(createResponse(user))
  }
}
