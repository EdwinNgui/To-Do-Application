import express from "express";
import TodoController from "./todo.controller";
import { sessionMiddlewares } from "../../../sessions/jwt.session";

//this is the router for todo routes where we will send requests
export default class TodoRouter {
  public TodosRouter = express.Router();
  public TodoController = new TodoController();

  //initializing the routes
  constructor() {
    this.routes();
  }

  //defining api routes
  public routes() {
    this.TodosRouter.get(
      "/",
      sessionMiddlewares.verifyUser,
      this.TodoController.getAllTodos
    );
    this.TodosRouter.post(
      "/",
      sessionMiddlewares.verifyUser,
      this.TodoController.addTodo
    );
    this.TodosRouter.put(
      "/:id",
      sessionMiddlewares.verifyUser,
      this.TodoController.updateTodo
    );
    this.TodosRouter.delete(
      "/:id",
      sessionMiddlewares.verifyUser,
      this.TodoController.removeTodo
    );
  }
}
