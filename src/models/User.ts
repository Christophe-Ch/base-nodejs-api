import { Schema, model } from 'mongoose';

export interface IUser {
    id: string,
    email: string,
    password: string
}

const userSchema = new Schema<IUser>({
    email: String,
    password: String
});

export default model('User', userSchema);