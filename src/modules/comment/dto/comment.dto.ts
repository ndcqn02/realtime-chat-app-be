import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import Schema from 'mongoose';

export class CommentDto {
  @IsOptional()
  @IsString()
  _id?: Schema.Types.ObjectId;

  @IsString()
  comment: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date = new Date();

  @IsString()
  creatorId: string;

  @IsOptional()
  postId: ObjectId;
}
