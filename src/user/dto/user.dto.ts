import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsDate, IsEmail, IsNumber, IsObject, IsString} from "class-validator";


export class MessageDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsArray()
    content: string[];

    @ApiProperty()
    @IsDate()
    sentAt: Date;

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    user: UserDto;
}

export class UserDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsDate()
    createdAt: Date;

    @ApiProperty({ type: [MessageDto] })
    messages: MessageDto[];
}



