import {IsArray, IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateChatDto {
    @ApiProperty({example: 'Chat lohov', description: 'Name for chat'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsDate()
    createdAt: Date;

    @ApiProperty({example: '[12312312, 31231231, 31231231]', description: 'ids users', type:[Number] })
    userIds: number[];

    @ApiProperty({example: 'fsdfsdfsdfsdf', description: 'key' })
    @IsString()
    encryptedChatKey: string;


}

export class ChatDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsDate()
    createdAt: Date;

    @IsString({ each: true })
    messages: string[];

    @IsString()
    encryptedChatKey: string;
}

export class ChatDtoRes {
    @ApiProperty({ example: '4', description: 'Chat Id' })
    id: number;

    @ApiProperty({ example: 'new chat...', description: 'name' })
    name: string;

    @ApiProperty({ example: '22.3432.4234', description: 'Cteated at' })
    createdAt: Date;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'Access token for the user' })
    encryptedChatKey: string;
}

export class addMessageDto {
    @ApiProperty({example: 'Chat ID', description: '3434523453'})
    @IsNotEmpty()
    @IsNumber()
    chatId: number;

    @ApiProperty({example: 'Sender Id', description: '4234234'})
    @IsNotEmpty()
    @IsNumber()
    senderId: number;


    @ApiProperty({example: 'Sender name', description: 'DenSLRR'})
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({example: 'encrypted - content', description: '34234sdjabjh3v24gv23jhb4kj3bk4hb23gv4j2b3423'})
    @IsNotEmpty()
    @IsString()
    encryptedContent: string;
}

export class AddMessageRes {
    @ApiProperty({ description: 'ID of the added message' })
    id: number;

    @ApiProperty({ description: 'Content of the message' })
    content: string;

    @ApiProperty({ description: 'ID of the chat to which the message was sent' })
    chatId: number;

    @ApiProperty({ description: 'ID of the sender' })
    senderId: number;
    
    @ApiProperty({example: 'Sender name', description: 'DenSLRR'})
    username: string;

    @ApiProperty({ description: 'Timestamp when the message was sent' })
    sentAt: Date;
}

export class addUserToChatDto {
    @ApiProperty({example: '1', description: 'ChatId'})
    @IsNotEmpty()
    @IsNumber()
    chatId: number;

    @ApiProperty({example: '1', description: 'userId'})
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}


