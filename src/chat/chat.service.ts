import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {addMessageDto, addUserToChatDto, ChatDtoRes, CreateChatDto} from "./dto/chat.dto";

@Injectable()
export class ChatService {
    constructor(private readonly _db: PrismaService) {}


    async  createChat(dto: CreateChatDto): Promise<ChatDtoRes> {
        return this._db.chat.create({
            data: {

                name: dto.name,
                createdAt: new Date(),
                participants: {
                    connect: dto.userIds.map((id) => ({ id })),
                },
                encryptedChatKey: dto.encryptedChatKey,
            },
        })
    }

    async addMessage(dto: addMessageDto): Promise<any> {

        if(dto.chatId && dto.encryptedContent && dto.senderId && dto.username) {
            return this._db.message.create({
                data: {
                    chatId: dto.chatId,
                    senderId: dto.senderId,
                    content: dto.encryptedContent,
                    username: dto.username
                },
            });
        }

        throw new BadRequestException('Not provided field');

    }

    async addUsetToChat(dto: addUserToChatDto): Promise<ChatDtoRes> {

        const chat = await this._db.chat.findUnique({
            where: { id: dto.chatId },
        });

        if (!chat) {
            throw new NotFoundException('Chat not found');
        }

        const user = await this._db.user.findUnique({
            where: { id: dto.userId },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }


        return this._db.chat.update({
            where: { id: dto.chatId },
            data: {
                participants: {
                    connect: { id: dto.userId },
                },
            },
            include: { participants: true },
        });
    }


}


