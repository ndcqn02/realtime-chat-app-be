import { IsDate, IsString } from 'class-validator';
import Schema from 'mongoose';


export class MessageDto {
  @IsString()
  _id?: Schema.Types.ObjectId;

  @IsString()
  message: number;

  @IsDate()
  createdAt: Date = new Date();

  @IsString()
  // userId: { type: Schema.Types.ObjectId };
  userId: string;
}


