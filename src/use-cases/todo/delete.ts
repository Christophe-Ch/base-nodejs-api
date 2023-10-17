import { NotFoundError } from '../../errors/not-found.error';
import Todo from '../../models/Todo'

/**
 * Delete a todo for a user.
 * @param id Todo ID
 * @param userId User ID
 */
export const deleteTodo = async (id: string, userId: string): Promise<void> => {
    const todo = await Todo.findById(id);

    if (!todo || todo.userId !== userId) {
        throw new NotFoundError(id);
    }

    await todo.deleteOne();
}