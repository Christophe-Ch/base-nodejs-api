import bcrypt from 'bcrypt';

let bcryptHashSalt: string;

/**
 * Get the salt used for hashing passwords.
 * @returns The salt for hashing passwords.
 */
export async function getSalt(): Promise<string> {
    if (bcryptHashSalt) return bcryptHashSalt;

    bcryptHashSalt = await bcrypt.genSalt(
        parseInt(process.env.BCRYPT_SALT_ROUNDS!),
    );
    return bcryptHashSalt;
}
