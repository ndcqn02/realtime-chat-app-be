import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { MessageModule } from "./modules/message/message.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development.local", ".env.development", ".env"],
      load: [configuration],
    }),
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
