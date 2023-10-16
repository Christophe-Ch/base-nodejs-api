import { NotFoundError } from '../../errors/not-found.error';
import Todo, { ITodo } from '../../models/Todo'

export const update = async (id: string, title: string, done: boolean, userId: string): Promise<ITodo> => {
    const todo = await Todo.findById(id);

    if (!todo || todo.userId !== userId) {
        throw new NotFoundError(id);
    }

    todo.title = title ?? todo.title;
    todo.done = done ?? todo.done;

    await todo.save();

    return todo;
}