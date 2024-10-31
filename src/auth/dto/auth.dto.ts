import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import {UserDto} from "../../user/dto/user.dto";
import {ChatDto} from "../../chat/dto/chat.dto";

class userDto {
    @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
    id: number;

    @ApiProperty({ example: 'DenSLRR', description: 'Username of the user' })
    username: string;

    @ApiProperty({ example: 'test@gmail.com', description: 'Email of the user' })
    email: string;

    @ApiProperty({
        example: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AM...QAB\n-----END PUBLIC KEY-----\n',
        description: 'Public key of the user for encryption purposes'
    })
    publicKey: string;
}



export class RegisterDto {
    @ApiProperty({ example: 'Username', description: 'User login' })
    @IsString()
    @IsNotEmpty()
    username: string;


    @ApiProperty({ example: 'eugen.soobchak@gmail.com', description: 'User email' })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'stro312ngpassword123', description: 'User password' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;

  

}



export class LoginDto {
    @ApiProperty({ example: 'eugen.soobchak@gmail.com', description: 'User email' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'stro312ngpassword123', description: 'User password' })
    @IsString()
    password: string;
}

export class LoginDtoRes {
    @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
    id: number;

    @ApiProperty({ example: 'DenSLRR', description: 'Username of the user' })
    username: string;

    @ApiProperty({ example: 'test@gmail.com', description: 'Email of the user' })
    email: string;

    @ApiProperty({
        example: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AM...QAB\n-----END PUBLIC KEY-----\n',
        description: 'Public key of the user for encryption purposes'
    })
    publicKey: string;

    @ApiProperty({ type: [ChatDto], description: 'List of chats the user is part of' })
    chats: ChatDto[];

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'Access token for the user' })
    accessToken: string;
}





export class RegistrationDtoRes {
    @ApiProperty({ example: 'user', description: 'user description' })

    user: userDto;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'Access token for the user' })
    accessToken: string;

}

