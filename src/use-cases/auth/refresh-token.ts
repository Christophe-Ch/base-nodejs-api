import User from '../../models/User';
import { NotFoundError } from '../../errors/not-found.error';
import { ITokenResult, generateToken } from './generate-token';

export const refreshToken = async (
    refreshToken: string,
): Promise<ITokenResult> => {
    const user = await User.findOne({ refreshToken });
    if (!user) {
        throw new NotFoundError(refreshToken);
    }

    return await generateToken(user);
};
