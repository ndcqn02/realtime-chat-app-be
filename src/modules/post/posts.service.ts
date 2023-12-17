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

  async getAllPost() {
    const posts = await this.model.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments',
        },
      },
    ])

    const users = await this.userService.getUserList()
    // const postComments = this.addAvatarAndNameToComments(posts, users)
    const result = this.addUserToPost(users, posts)
    return result
  }

  addUserToPost(users: any[], posts: any[]): any[] {
    return posts.map((post) => {
      this.addAvatarAndNameToComments(post, users);
      const userPost = users.find((user) => user.id === post.creatorId)
      return {
        ...post,
        avatarPath: userPost.imageUrl || '',
        name: userPost.fullName || '',
      }
    })
  }

  addAvatarAndNameToComments(post, listUser) {
    post.comments.forEach(comment => {
      const user = listUser.find(u => u.id === comment.creatorId);
      if (user) {
        comment.avatarPath = user.imageUrl;
        comment.name = user.fullName;
      }
    });
  }
  
}

const postService = new PostService()
export default postService
