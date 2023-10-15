import { NotFoundError } from "../../errors/not-found.error";
import Todo from "../../models/Todo"

export const deleteTodo = async (id: string): Promise<void> => {
    const todo = await Todo.findById(id);

    if (!todo) {
        throw new NotFoundError(id);
    }

    await todo.deleteOne();
}