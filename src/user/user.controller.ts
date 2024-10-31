import {Body, Controller, Get, NotFoundException, Param, Post, Query} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {LoginDtoRes, RegistrationDtoRes} from "../auth/dto/auth.dto";
import {ChatDtoRes} from "../chat/dto/chat.dto";


@ApiTags('User')

@Controller('user')
export class UserController {

    constructor(private readonly _user: UserService) {}


    @Get('chats')
    @ApiOperation({ summary: 'Sign in' })
    @ApiResponse({
        status: 201,
        description: 'Get all chats success',
        type: ChatDtoRes,
    })
   async getAllChats(@Query('userId') userId: number) {

        if (userId === undefined) {
            throw new NotFoundException("User ID is required.");
        }

        return this._user.getAllUserChats(+userId)
   }

    @Get(':userId')
    async getUserById(@Param('userId') userId: number) {
        if (!userId) {
            throw new NotFoundException("User ID is required.");
        }
        const user = await this._user.getById(+userId);
        if (!user) {
            throw new NotFoundException("User not found.");
        }
        return user;
    }
}