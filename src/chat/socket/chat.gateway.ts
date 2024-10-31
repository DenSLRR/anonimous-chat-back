import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from "socket.io";
import {ChatService} from "../chat.service";
import {addMessageDto, AddMessageRes} from "../dto/chat.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";


@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly chatService: ChatService) {}

    @SubscribeMessage('sendMessage')
    @ApiOperation({ summary: 'Send a message to a chat' })
    @ApiResponse({
        status: 200,
        description: 'Message sent successfully',
        type: AddMessageRes,
    })
    async handleMessage(
        @MessageBody() data: addMessageDto,
        @ConnectedSocket() client: Socket,
    ) {

         const message = await this.chatService.addMessage(data);

        this.server.to(`chat-${data.chatId}`).emit('newMessage', message);

    }

    @SubscribeMessage('joinChat')
    @ApiOperation({ summary: 'Join a chat room' })
    @ApiResponse({
        status: 200,
        description: 'Successfully joined the chat room',
    })
    handleJoinChat(@MessageBody() chatId: number, @ConnectedSocket() client: Socket) {
        client.join(`chat-${chatId}`);
    }

}