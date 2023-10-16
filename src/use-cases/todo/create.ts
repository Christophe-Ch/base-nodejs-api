import Todo, { ITodo } from '../../models/Todo'

export const create = async (title: string): Promise<ITodo> => {
    const todo = await Todo.create({
        title,
        done: false
    });

    return todo;
}