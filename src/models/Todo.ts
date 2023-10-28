import { Schema, model } from 'mongoose';

export interface ITodo {
    title: string;
    done: boolean;
    userId: string;
}

const todoSchema = new Schema<ITodo>({
    title: String,
    done: Boolean,
    userId: String,
});

export default model('Todo', todoSchema);
