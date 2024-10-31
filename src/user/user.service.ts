import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from "../../prisma/prisma.service";
import {RegisterDto} from "../auth/dto/auth.dto";
import {hash} from "argon2";
import {EncryptService} from "../encrypt/encrypt.service";

@Injectable()
export class UserService {
    constructor(
        private readonly _db: PrismaService,
        private readonly _crypt: EncryptService
    ) {}

    async getById(id: number) {
        return this._db.user.findUnique({
            where: { id: id },
            include: { chats: true },
        });
    }

    async getByEmail(email: string) {
        return  this._db.user.findUnique({
            where: { email },
            include: {
                chats: true,
            },
        });

    }

    async getAllUserChats(userId: number) {

        const user = await this.getById(userId);

        if (!user) {
            throw new NotFoundException("User not found.");
        }

        return user.chats || [];

    }



    async create(dto: RegisterDto) {

        const  {publicKey,privateKey} =  this._crypt.generateKeyPair()

        console.log(publicKey)
        const user = {
            email: dto.email,
            password: await hash(dto.password),
            username: dto.username,
            publicKey: publicKey,
        }
        return this._db.user.create({
            data: user,
        })

    }
}
