import { IUser } from "src/modules/user/interfaces/user.interface";
import { IUserRes } from "src/modules/user/interfaces/userRes.interface";

export function mapUserToUserRes(user: any): IUserRes {
  return {
    id: user.id,
    createdAt: new Date(user.createdAt),
    imageUrl: user.imageUrl,
    hasImage: user.hasImage,
    gender: user.gender,
    birthday: user.birthday ? new Date(user.birthday) : null,
    fullName: `${user.firstName} ${user.lastName}`,
    emailAddress: user.emailAddresses.length > 0 ? user.emailAddresses[0].emailAddress : '',
  };
}

export function mapUsersToUserResArray(users: any[]): IUserRes[] {
  return users.map(mapUserToUserRes);
}