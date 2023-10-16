import Todo, { ITodo } from '../../models/Todo'

export const findAll = async (userId: string): Promise<ITodo[]> => {
    return await Todo.find({ userId });
}