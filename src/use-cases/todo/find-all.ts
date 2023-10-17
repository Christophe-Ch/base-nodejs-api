import Todo, { ITodo } from '../../models/Todo'

/**
 * Find all todos for a user.
 * @param userId User ID
 * @returns All todos belonging to the user.
 */
export const findAll = async (userId: string): Promise<ITodo[]> => {
    return await Todo.find({ userId });
}