//These is the core heart of our datbase functions
//We will not use our database functions directly in our routes(functions directory)
//Rater will expose some final functions  from them to this database instance

//This Database classes contains all methods that will be used by our controllers to interact with our database
import TodoFunctions from "./functions/todo.func";
import UserFunctions from "./functions/user.func";
import mongoose from "mongoose";
import { ITodo } from "./schemas/todo.schema"; //ITodo is also a kind of dto
import { UserLoginDTO } from "../dtos/user.dto";

class Database {
  private todoFunctions = new TodoFunctions();
  private userFunctions = new UserFunctions();

  //used for connecting to our mongodb database
  public async connect() {
    // Connect to database
    mongoose.connect(process.env.MONGO_URL as string);

    // Check db connection
    mongoose.connection.once("open", () => {
      console.log("DB is ready!");
    });

    // Check db errors
    mongoose.connection.on("error", (err) => {
      console.error(err);
    });
  }

  //used for disconnecting from our mongodb database
  public async disconnect() {
    // Disconnect from database
    mongoose.disconnect();
  }

  //___________common functions that requires to use both user and todo functions_____________

  //add todo to todo collection & append todo id to user.todos in user-collection
  public async pushTodo(userId: string, todo: ITodo): Promise<string> {
    try {
      const todoId = await this.todoFunctions.addTodo(todo);
      await this.userFunctions.appendTodoId(userId, todoId);
      return todoId;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  //remove todo from todo collection & remove todo id from user @ user-collection
  public async popTodo(userId: string, todoId: string) {
    try {
      await this.todoFunctions.removeTodo(todoId);
      await this.userFunctions.removeTodoId(userId, todoId);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  //update todo completed status
  public async completedTodo(todoId: string, completed: boolean) {
    return this.todoFunctions.updateTodo(todoId, completed);
  }

  //entrying a new user to user collection
  public async registerUser(user: UserLoginDTO): Promise<string> {
    return this.userFunctions.addUser(user);
  }

  //remove user from user collection
  public async unregisterUser(userId: string) {
    await this.userFunctions.removeUser(userId);
  }

  //verify user by email and password
  public async verifyUser(user: UserLoginDTO): Promise<string | null> {
    return await this.userFunctions.verifyUser(user);
  }

  //get all todos of a user from todos collection
  public async getUserTodos(userId: string) {
    return await this.userFunctions.getUserTodos(userId);
  }

  //delete all todos of a user from todos collection & user from user collection
  public async deleteUser(userId: string) {
    try {
      const user = await this.userFunctions.getUser(userId);
      if (user) {
        const todos = user.todos;
        todos.forEach(async (todoId: string) => {
          await this.todoFunctions.removeTodo(todoId);
        });
      }
      await this.userFunctions.removeUser(userId);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}

//exporting a single instance of our database to be used by our controllers of whole application
export const myMongo = new Database();
