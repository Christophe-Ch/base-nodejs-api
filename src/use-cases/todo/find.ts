import Todo, { ITodo } from '../../models/Todo'

export const find = async (id: string): Promise<ITodo | null> => {
    return await Todo.findById(id);
}