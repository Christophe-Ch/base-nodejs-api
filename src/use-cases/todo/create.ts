import Todo, { ITodo } from '../../models/Todo';

/**
 * Create a new todo for a user.
 * @param title Title
 * @param userId User ID
 * @returns The created todo.
 */
export const create = async (title: string, userId: string): Promise<ITodo> => {
    const todo = await Todo.create({
        title,
        done: false,
        userId,
    });

    return todo;
};
