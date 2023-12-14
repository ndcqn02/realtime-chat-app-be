import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { MessageModule } from "./modules/message/message.module";
import { AppGateway } from './app/app.gateway';
import { EventsModule } from "./app/app.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development", ".env"],
      isGlobal: true,
      load: [configuration],
    }),
    MessageModule,
    EventsModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
