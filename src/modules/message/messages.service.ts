import { ObjectId } from 'mongoose'
import { Injectable, Inject } from '@nestjs/common'
import { IMessage } from './interfaces/message.interface'
import { MessageDto } from './dto/message.dto'
import messageModel from './schemas/message.schema'
import userService from '../user/user.service'

@Injectable()
export class MessageService {
  private model = messageModel
  private readonly userService = userService

  async create(messageData: MessageDto): Promise<IMessage> {
    return await this.model.create(messageData)
  }

  async update(_id: ObjectId, messageData: MessageDto): Promise<IMessage> {
    const message = await this.model.findByIdAndUpdate(_id, messageData, {
      new: true,
    })
    return message
  }

  async delete(_id: ObjectId) {
    const message = await this.model.findByIdAndDelete(_id)
    return message
  }

  async findAll(): Promise<IMessage[]> {
    return await this.model.find()
  }

  async getChatListUser(recipientId: string): Promise<IMessage[]> {
    const listFriendChat = await this.model.aggregate([
      {
        $match: {
          $or: [{ recipientId: recipientId }, { senderId: recipientId }],
        },
      },
      {
        $sort: {
          createdAt: -1, // Sắp xếp theo createdAt giảm dần để lấy tin nhắn mới nhất đầu tiên
        },
      },
      {
        $group: {
          _id: {
            senderId: '$senderId',
            recipientId: '$recipientId',
          },
          newRoot: { $first: '$$ROOT' }, // Lấy tin nhắn đầu tiên (mới nhất) từ mỗi nhóm senderId và recipientId
        },
      },
      {
        $project: {
          _id: '$newRoot._id',
          // senderId: '$_id.senderId',
          // recipientId: '$_id.recipientId',

          otherUserId: {
            $cond: {
              if: { $eq: ['$newRoot.senderId', recipientId] },
              then: '$newRoot.recipientId',
              else: '$newRoot.senderId',
            },
          },
          currentUserId: {
            $cond: {
              if: { $eq: ['$newRoot.recipientId', recipientId] },
              then: '$newRoot.recipientId',
              else: '$newRoot.senderId',
            },
          },
          createdAt: '$newRoot.createdAt',
          lastedMessage: '$newRoot.message',
        },
      },
      {
        $sort: {
          createdAt: -1, // Sắp xếp theo createdAt giảm dần để lấy tin nhắn mới nhất đầu tiên
        },
      },
      {
        $group: {
          _id: {
            otherUserId: '$otherUserId',
          },
          newRoot2: { $first: '$$ROOT' }, // Lấy tin nhắn đầu tiên (mới nhất) từ mỗi nhóm senderId và recipientId
        },
      },
      {
        $replaceRoot: { newRoot: '$newRoot2' },
      },
    ])

    const users = await this.userService.getUserList()

    const result = this.addAvatarPathToListMessages(users, listFriendChat)
    return result
  }

  addAvatarPathToListMessages(users: any[], listMessages: any[]): any[] {
    return listMessages.map((message) => {
      const otherUser = users.find((user) => user.id === message.otherUserId)
      if (otherUser) {
        return {
          ...message,
          avatarPath: otherUser.imageUrl,
          name: otherUser.fullName,
        }
      }
      return message
    })
  }

  async getChatDetail(recipientId: string, senderId: string): Promise<IMessage[]> {
    return await this.model.find({
      $and: [
        { senderId: { $in: [senderId, recipientId] } },
        { recipientId: { $in: [senderId, recipientId] } },
      ],
    })
  }

  async findById(_id: ObjectId): Promise<IMessage> {
    return await this.model.findById(_id)
  }
}

const messageService = new MessageService()
export default messageService
