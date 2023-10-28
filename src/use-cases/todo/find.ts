import { NotFoundError } from '../../errors/not-found.error';
import Todo, { ITodo } from '../../models/Todo';

/**
 * Find a todo.
 * @param id Todo ID
 * @param userId User ID
 * @returns The todo.
 */
export const find = async (
    id: string,
    userId: string,
): Promise<ITodo | null> => {
    const todo = await Todo.findById(id);

    if (!todo || todo.userId !== userId) {
        throw new NotFoundError(id);
    }

    return todo;
};
