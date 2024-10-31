import { Module } from '@nestjs/common';
import {PrismaModule} from "../prisma/prisma.module";
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import { EncryptService } from './encrypt/encrypt.service';
import { EncryptModule } from './encrypt/encrypt.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ConfigModule.forRoot(),PrismaModule, AuthModule, UserModule, EncryptModule, ChatModule],
  controllers: [AuthController],
  providers: [EncryptService],
  exports: [EncryptService]
})
export class AppModule {}
