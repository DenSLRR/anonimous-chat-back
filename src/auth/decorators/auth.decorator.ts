import {UseGuards} from "@nestjs/common";
import {JWTGuard} from "../guards/jwt.guard";


export const Auth = () => UseGuards(JWTGuard);