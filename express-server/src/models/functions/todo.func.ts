//these function related to todo collection only will react with the todocollection of mongodb directly
import todoSchema, { ITodo } from "../schemas/todo.schema";

export default class TodoFunctions {
  private todoCollection = todoSchema;

  //add a todo and return the todo id
  public async addTodo(todo: ITodo): Promise<string> {
    const newTodo = new this.todoCollection(todo);
    //save todo to database
    try {
      return (await newTodo.save())._id;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  //remove todo and return nothing!
  public async removeTodo(todoId: string) {
    try {
      await this.todoCollection.findByIdAndDelete(todoId);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  //update todos completed status
  public async updateTodo(todoId: string, completed: boolean) {
    try {
      const updatedTodo = await this.todoCollection.findByIdAndUpdate(
        todoId,
        { completed: completed },
        { new: true }
      );
      return updatedTodo;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
