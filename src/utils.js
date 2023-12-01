import path from 'path';
import { fileURLToPath } from 'url';
import config from './config/envConfig.js';
import JWT from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);


export const tokenGenerator = (user) => {
    const {
        _id,
        firstName,
        lastName,
        age,
        email,
        role,
        cart
    } = user;    
    const payload = {
        _id,
        firstName,
        lastName,
        email,
        age,
        role,
        cart,
    };
    return JWT.sign(payload, config.jwtSecret, { expiresIn: '30m' });
}

export class Exception extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
};