import clerkClient from '@clerk/clerk-sdk-node'
import { Injectable } from '@nestjs/common'
import { mapUserToUserRes, mapUsersToUserResArray } from 'src/utils/mapUserToUserRes'

@Injectable()
export class UserService {
  async getUserList() {
    const users = await clerkClient.users.getUserList()
    const userConverted = mapUsersToUserResArray(users)
    return userConverted
  }

  async getSessionList() {
    return await clerkClient.sessions.getSessionList()
  }

  async getToken(sessionId: string, template: string) {
    return await clerkClient.sessions.getToken(sessionId, template)
  }

  async getUser(userId: string) {
    const user = await clerkClient.users.getUser(userId)
    const userRes = mapUserToUserRes(user)
    return userRes
  }
}

const userService = new UserService()
export default userService
