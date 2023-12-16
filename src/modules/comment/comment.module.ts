import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../database/database.module";
import { CommentService } from "./comments.service";
import { CommentProviders } from "./comment.providers";
import { CommentController } from "./comment.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CommentController],
  providers: [CommentService, ...CommentProviders],
})
export class CommentModule {}
