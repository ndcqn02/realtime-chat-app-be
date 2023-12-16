import { ObjectId } from 'mongoose'
import { Injectable, Inject } from '@nestjs/common'
import { IPost } from './interfaces/post.interface'
import { PostDto } from './dto/post.dto'
import postModel from './schemas/post.schema'
import userService from '../user/user.service'

@Injectable()
export class PostService {
  private model = postModel
  private readonly userService = userService

  async create(postData: PostDto): Promise<IPost> {
    return await this.model.create(postData)
  }

  async update(_id: ObjectId, postData: PostDto): Promise<IPost> {
    const post = await this.model.findByIdAndUpdate(_id, postData, {
      new: true,
    })
    return post
  }

  async delete(_id: ObjectId) {
    const post = await this.model.findByIdAndDelete(_id)
    return post
  }

  async findAll(): Promise<IPost[]> {
    return await this.model.find()
  }

  
}

const postService = new PostService()
export default postService
