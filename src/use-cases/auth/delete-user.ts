import { NotFoundError } from '../../errors/not-found.error';
import User from '../../models/User';
import Todo from '../../models/Todo';

/**
 * Delete a user.
 * @param id User ID
 * @param user Logged user
 */
export const deleteUser = async (userId: string): Promise<void> => {
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
        throw new NotFoundError(userId);
    }

    await Todo.deleteMany({ userId });
    await userToDelete.deleteOne();
};
