import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {LoginDto, RegisterDto} from "./dto/auth.dto";
import {verify} from "argon2";
import {UserDto} from "../user/dto/user.dto";
import {Response} from "express";
import * as http from "node:http";

@Injectable()
export class AuthService {
    EXPIRE_DAY_REFRESH_TOKEN = 1
    REFRESH_TOKEN_NAME = 'refreshToken'

    constructor(private readonly _jwt: JwtService, private readonly userService: UserService) {}


    async login(dto: LoginDto) {
        const {password, ...user} = await this.validateUser(dto)
        const tokens =  this.issueToken(user.id)

        return {
            user,
            ...tokens
        }
    }

    async register(dto: RegisterDto) {

         const oldUser = await this.userService.getByEmail(dto.email)

        if(oldUser) throw new BadRequestException("User already exists")

        const {password, ...user} = await this.userService.create(dto)

        const tokens =  this.issueToken(user.id)

        return {
            user,
            ...tokens
        }
    }

    private issueToken(userId: number) {
        const data = {id: userId}


        const accessToken = this._jwt.sign(data, {
            expiresIn: '10m'
        })
        const refreshToken = this._jwt.sign(data, {
            expiresIn: '1h'
        })

        return {
            accessToken,
            refreshToken
        }
    }

    private async validateUser(dto: LoginDto) {
        const user = await this.userService.getByEmail(dto.email)

        if(!user) throw new NotFoundException('User not found')

        const isValid = await verify(user.password, dto.password)

        if (!isValid) throw new UnauthorizedException('Invalid password')

        return user
    }

    addRefreshTokenToResponse (res: Response, refreshToken: string) {
        const expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: 'localhost',
            expires: expiresIn,
            secure: false,
            sameSite: 'none'
        })

    }

    removeRefreshTokenToResponse (res: Response) {
        res.cookie(this.REFRESH_TOKEN_NAME, {
            httpOnly: true,
            domain: 'localhost',
            expires: new Date(0),
            secure: false,
            sameSite: 'none'
        })
    }

    async getNewTokens(refreshToken: string) {
        const result = await this._jwt.verifyAsync(refreshToken)

        if(!result) throw new UnauthorizedException('Invalid token')

        const {password, ...user } = await this.userService.getById(result.id)
        const tokens =  this.issueToken(user.id)

        return {
            user,
            ...tokens
        }

    }

}
