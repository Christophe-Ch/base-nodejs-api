import Todo, { ITodo } from '../../models/Todo'

export const findAll = async (): Promise<ITodo[]> => {
    return await Todo.find();
}