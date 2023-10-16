import { IUser } from '../../models/User'
import jwt from 'jsonwebtoken';

export const generateToken = (user: IUser): string => {
    const payload = { sub: user.email, iss: process.env.JWT_ISSUER, aud: process.env.JWT_AUDIENCE };
    const token = jwt.sign(payload, process.env.JWT_SECRET!);
    return token;
}