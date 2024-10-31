import {ConfigService} from "@nestjs/config";
import {JwtModuleOptions} from "@nestjs/jwt";


export const getJwtConfig = async (_config: ConfigService): Promise<JwtModuleOptions> => ({
    secret: _config.get('JWT_SECRET')
})



