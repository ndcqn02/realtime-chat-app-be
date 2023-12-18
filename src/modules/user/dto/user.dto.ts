import { IsDate, IsOptional, IsString } from 'class-validator';
import Schema from 'mongoose';


export class UserDto {
  @IsOptional()
  @IsString()
  _id?: Schema.Types.ObjectId;


  firstName?: string;
  lastName?: string;
  hashPassword?: string;
}
