import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import {PrismaService} from "../../prisma/prisma.service";
import {ChatGateway} from "./socket/chat.gateway";

@Module({
  providers: [ChatService, PrismaService, ChatGateway],
  controllers: [ChatController]
})
export class ChatModule {}
