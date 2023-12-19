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

export function authenticateLevel(level) {
    return async (req, res, next) => {
        try {
            if(level === 1){
                next()
            } else if (level === 2){
                if(req.user.role === "admin") {
                    next()
                } else {
                    res.status(401).send({ message: 'You are not authorised to perform this action'});
                }
            } else if (level === 3) {
                if(req.user.role === "user") {
                    next()
                } else {
                    res.status(405).send({ message: 'User level required'});
                }
            } else {
                res.status(500).send({ message: 'AuthenticateLevel method error'});
            }
        }
        catch (Error) {
            throw new Exception('AuthenticationLevel failed', 401);
        }
    }
}