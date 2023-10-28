import { Schema, model } from 'mongoose';

export interface IUser {
    id: string;
    email: string;
    password: string;
    refreshToken: String;
}

const userSchema = new Schema<IUser>({
    email: String,
    password: String,
    refreshToken: String,
});

export default model('User', userSchema);
