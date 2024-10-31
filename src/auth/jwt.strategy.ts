import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import {ConfigService} from "@nestjs/config";
import {UserService} from "../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor (
        private _config: ConfigService,
        private _user: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: _config.get('JWT_SECRET'),
        })
    }
    async validate({id}: {id: number}) {
        return this._user.getById(id)
    }


}
