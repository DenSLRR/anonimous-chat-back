import {
    Body,
    Controller,
    HttpCode,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto, LoginDtoRes, RegisterDto, RegistrationDtoRes} from "./dto/auth.dto";
import {Request, Response} from "express";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AddMessageRes} from "../chat/dto/chat.dto";

@ApiTags('authorization')
@Controller('auth')
export class AuthController {

    constructor (private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @ApiOperation({ summary: 'Sign in' })
    @ApiResponse({
        status: 201,
        description: 'Login success',
        type: LoginDtoRes,
    })
    @Post('sign-in')
    async login (@Body() dto: LoginDto, @Res({passthrough: true }) res: Response) {
        const {refreshToken, ...response} = await this.authService.login(dto)

        this.authService.addRefreshTokenToResponse(res ,refreshToken)

        return response
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @ApiOperation({ summary: 'Sign in' })
    @ApiResponse({
        status: 201,
        description: 'Registration success',
        type: RegistrationDtoRes,
    })
    @Post('sign-up')
    async register (@Body() dto: RegisterDto, @Res({passthrough: true }) res: Response) {

        const {refreshToken, ...response} = await this.authService.register(dto)

        this.authService.addRefreshTokenToResponse(res ,refreshToken)

        return response
    }


    @HttpCode(200)
    @Post('logout')
    async logout (@Res({passthrough: true}) res: Response) {
        this.authService.removeRefreshTokenToResponse(res)

        return true
    }

    @HttpCode(200)
    @Post('access-token')
    async getNewTokens(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        const refreshTokenFromCookies = req.cookies[this.authService.REFRESH_TOKEN_NAME]

        if (!refreshTokenFromCookies) {
            this.authService.removeRefreshTokenToResponse(res)
            throw new UnauthorizedException('Refresh token not passed')
        }

        const {refreshToken, ...response} = await  this.authService.getNewTokens(refreshTokenFromCookies)

        this.authService.addRefreshTokenToResponse(res, refreshToken)

        return response
    }



}
