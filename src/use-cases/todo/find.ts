import { NotFoundError } from '../../errors/not-found.error';
import Todo, { ITodo } from '../../models/Todo'

export const find = async (id: string, userId: string): Promise<ITodo | null> => {
    const todo = await Todo.findById(id);

    if (!todo || todo.userId !== userId) {
        throw new NotFoundError(id);
    }

    return todo;
}