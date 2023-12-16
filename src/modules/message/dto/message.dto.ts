import { IsDate, IsOptional, IsString } from 'class-validator';
import Schema from 'mongoose';


export class MessageDto {
  @IsOptional()
  @IsString()
  _id?: Schema.Types.ObjectId;

  @IsString()
  message: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date = new Date();

  @IsString()
  senderId: string;

  @IsString()
  recipientId: string;
}


