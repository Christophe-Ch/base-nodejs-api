import User, { IUser } from '../../models/User';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export interface ITokenResult {
    token: string;
    refreshToken: string;
}

/**
 * Generate JWT and refresh tokens for a user.
 * @param user User to generate a token for.
 * @returns The generated JWT and refresh tokens.
 */
export const generateToken = async (user: IUser): Promise<ITokenResult> => {
    const payload = {
        sub: user.email,
        iss: process.env.JWT_ISSUER,
        aud: process.env.JWT_AUDIENCE,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '30m',
    });

    const userModel = await User.findById(user.id);
    const refreshToken = uuidv4();
    userModel!.refreshToken = refreshToken;
    await userModel!.save();

    return { token, refreshToken };
};
