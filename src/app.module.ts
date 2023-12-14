import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { MessageModule } from "./modules/message/message.module";
import { AppGateway } from './app/app.gateway';
import { EventsModule } from "./app/app.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development.local", ".env.development", ".env"],
      load: [configuration],
    }),
    MessageModule,
    EventsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
