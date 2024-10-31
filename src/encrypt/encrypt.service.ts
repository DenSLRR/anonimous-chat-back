import { Injectable } from '@nestjs/common';
import { generateKeyPairSync } from 'crypto';

@Injectable()
export class EncryptService {
    generateKeyPair() {
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048, // Длина ключа
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });

        return {
            publicKey,
            privateKey,
        };
    }
}
