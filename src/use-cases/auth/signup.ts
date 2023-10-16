import { AlreadyRegisteredError } from '../../errors/already-registered.error';
import User from '../../models/User';
import { getSalt } from '../../utils/hash';
import { ITokenResult, generateToken } from './generate-token';
import bcrypt from 'bcrypt';

export const signup = async (email: string, password: string): Promise<ITokenResult> => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AlreadyRegisteredError(email);
    }

    const newUser = await User.create({
        email,
        password: await bcrypt.hash(password, await getSalt())
    });

    return await generateToken(newUser);
}