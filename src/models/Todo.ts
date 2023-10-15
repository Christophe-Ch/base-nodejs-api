import { Schema, model } from "mongoose";

export interface ITodo {
    title: string,
    done: boolean
}

const todoSchema = new Schema<ITodo>({
    title: String,
    done: Boolean
});

export default model('Todo', todoSchema);