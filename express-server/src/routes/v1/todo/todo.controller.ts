import { UserSessionDTO } from "../../../dtos/user.dto";
import { ITodo } from "../../../models/schemas/todo.schema";
import { myMongo } from "./../../../models/mongodb";
import { Request, Response } from "express";

//this is used to add user property to the request object type
declare module "express-serve-static-core" {
  interface Request {
    user: UserSessionDTO;
  }
}

//this is the controller for todo routes
export default class TodoController {
  //get all todos of the user from the user.todos array
  async getAllTodos(req: Request, res: Response) {
    const userId = (req.user as UserSessionDTO).userID;
    try {
      const todos = (await myMongo.getUserTodos(userId)) as ITodo[];
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).json({
        message: (err as Error).message,
      });
    }
  }

  //add a todo to the todo collection & append todo id to user.todos in user collection
  async addTodo(req: Request, res: Response) {
    const todo = req.body as ITodo;
    const userId = (req.user as UserSessionDTO).userID;
    try {
      const todoId = await myMongo.pushTodo(userId, todo);
      res.status(201).json({
        message: "Todo added!!",
        todoId,
      });
    } catch (err) {
      res.status(500).json({
        message: (err as Error).message,
      });
    }
  }

  //update todo completed status of a specific todo object in todo collection
  async updateTodo(req: Request, res: Response) {
    const todoId = req.params.id;
    const completed = req.body.completed;
    try {
      await myMongo.completedTodo(todoId, completed);
      res.status(200).json({
        message: "Todo updated!!",
      });
    } catch (err) {
      res.status(500).json({
        message: (err as Error).message,
      });
    }
  }

  //remove a todo from the todo collection & remove todo id from user.todos in user collection
  async removeTodo(req: Request, res: Response) {
    const todoId = req.params.id;
    const userId = (req.user as UserSessionDTO).userID;
    try {
      await myMongo.popTodo(userId, todoId);
      res.status(200).json({
        message: "Todo removed!!",
      });
    } catch (err) {
      res.status(500).json({
        message: (err as Error).message,
      });
    }
  }
}
