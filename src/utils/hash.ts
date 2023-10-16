import bcrypt from 'bcrypt';

let bcryptHashSalt: string;

export async function getSalt(): Promise<string> {
    if (bcryptHashSalt) return bcryptHashSalt;

    bcryptHashSalt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS!));
    return bcryptHashSalt;
}