/* global Buffer */

// import crypto from 'crypto';

// import {serverConst} from '../data-base-const';

// const algorithm = 'aes-256-ctr';
// const randomBytes = crypto.randomBytes(16);

// export function getRandomString(): string {
//     return crypto.randomBytes(16).toString('hex');
// }

/*
export function getHash(value: string): string {
    const sha256PasswordHmac = crypto.createHmac('sha256', serverConst.secretKey);

    return sha256PasswordHmac.update(value).digest('hex');
}
*/

/*
export function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, serverConst.secretKey, randomBytes);

    return Buffer.concat([cipher.update(text), cipher.final()]).toString('hex');
}

export function decrypt(hash: string): string {
    const decipher = crypto.createDecipheriv(
        algorithm,
        serverConst.secretKey,
        Buffer.from(randomBytes.toString('hex'), 'hex')
    );

    return Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]).toString();
}
*/

/*
export function parseCookie(value: string): Record<string, string> {
    const result: Record<string, string> = {};

    value
        .split(';')
        .map((keyValue: string): string => keyValue.trim())
        .filter(Boolean)
        .forEach((keyValue: string) => {
            const [cookieKey = '', cookieValue = ''] = keyValue.split('=');

            result[cookieKey.trim()] = cookieValue.trim();
        });

    return result;
}
*/
