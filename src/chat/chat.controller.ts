import {Body, Controller, Param, ParseIntPipe, Post} from '@nestjs/common';
import {ChatService} from "./chat.service";
import {addMessageDto, AddMessageRes, addUserToChatDto, ChatDtoRes, CreateChatDto} from "./dto/chat.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";


@ApiTags('chat')

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post('create')
    @ApiOperation({ summary: 'Create a new chat' })
    @ApiResponse({
        status: 201,
        description: 'Chat successfully created',
        type: ChatDtoRes,
    })
    async create(@Body() dto: CreateChatDto) {
        return this.chatService.createChat(dto);
    }

    @Post('message')
    @ApiOperation({ summary: 'Add a message to a chat' })
    @ApiResponse({
        status: 201,
        description: 'Chat successfully created',
        type: AddMessageRes,
    })
    async addMessage(@Body() dto: addMessageDto) {
        return this.chatService.addMessage(dto);
    }

    @Post('add-user')
    @ApiOperation({ summary: 'Add user to chat' })
    @ApiResponse({
        status: 200,
        description: 'User added to chat successfully',
        type: ChatDtoRes,
    })
    async addUserToChat(
        @Body() dto: addUserToChatDto,
    ): Promise<ChatDtoRes> {
        return this.chatService.addUsetToChat(dto);
    }

}
