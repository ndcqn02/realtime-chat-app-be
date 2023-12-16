import { ObjectId } from 'mongoose'
import { Injectable, Inject } from '@nestjs/common'
import { IComment } from './interfaces/comment.interface'
import { CommentDto } from './dto/comment.dto'
import commentModel from './schemas/comment.schema'
import userService from '../user/user.service'

@Injectable()
export class CommentService {
  private model = commentModel
  private readonly userService = userService

  async create(commentData: CommentDto): Promise<IComment> {
    return await this.model.create(commentData)
  }

  async update(_id: ObjectId, commentData: CommentDto): Promise<IComment> {
    const comment = await this.model.findByIdAndUpdate(_id, commentData, {
      new: true,
    })
    return comment
  }

  async delete(_id: ObjectId) {
    const comment = await this.model.findByIdAndDelete(_id)
    return comment
  }

  async findAll(): Promise<IComment[]> {
    return await this.model.find()
  }

  
}

const commentService = new CommentService()
export default commentService
