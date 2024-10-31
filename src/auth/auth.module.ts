import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthController} from "./auth.controller";
import {UserModule} from "../user/user.module";
import {JwtStrategy} from "./jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getJwtConfig} from "../config/jwt.config";

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [UserModule, ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getJwtConfig
  })],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
