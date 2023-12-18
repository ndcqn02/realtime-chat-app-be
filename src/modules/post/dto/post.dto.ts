import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import Schema from 'mongoose';

export class PostDto {
  @IsOptional()
  @IsString()
  _id?: Schema.Types.ObjectId;

  @IsString()
  content: string;

  @IsString()
  images: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date = new Date();

  @IsString()
  creatorId: string;

  @IsNumber()
  numberLike: number;
  
  @IsNumber()
  numberComment: number;
}


