import {Global, Module} from '@nestjs/common';
import {EncryptService} from "./encrypt.service";


@Global()
@Module({
    providers: [EncryptService]
})
export class EncryptModule {}
