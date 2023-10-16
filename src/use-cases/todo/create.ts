import Todo, { ITodo } from '../../models/Todo'

export const create = async (title: string, userId: string): Promise<ITodo> => {
    const todo = await Todo.create({
        title,
        done: false,
        userId
    });

    return todo;
}