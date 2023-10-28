import User, { IUser } from '../../models/User';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { PRIVATE_KEY } from '../../utils/jwt-keys';

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
    const token = jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: '30m',
        algorithm: process.env.JWT_ALGORITHM as jwt.Algorithm,
    });

    const userModel = await User.findById(user.id);
    const refreshToken = uuidv4();
    userModel!.refreshToken = refreshToken;
    await userModel!.save();

    return { token, refreshToken };
};
