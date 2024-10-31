import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaService} from "../../prisma/prisma.service";
import {EncryptService} from "../encrypt/encrypt.service";

@Module({
  providers: [UserService, PrismaService, EncryptService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
