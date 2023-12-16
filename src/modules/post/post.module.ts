import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../database/database.module";
import { PostService } from "./posts.service";
import { PostProviders } from "./post.providers";
import { PostController } from "./post.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [PostService, ...PostProviders],
})
export class PostModule {}
