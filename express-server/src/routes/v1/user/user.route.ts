import express from "express";
import UserController from "./user.controller";
import { sessionMiddlewares } from "../../../sessions/jwt.session";

//this is the router for user routes where we will send requests
export default class UserRouter {
  public UsersRouter = express.Router();
  public UserController = new UserController();

  //initializing the routes
  constructor() {
    this.routes();
  }

  //defining api routes
  public routes() {
    this.UsersRouter.post("/register", this.UserController.registerUser);
    this.UsersRouter.post("/login", this.UserController.loginUser);
    this.UsersRouter.get("/logout", this.UserController.logoutUser);
    this.UsersRouter.get(
      "/session",
      sessionMiddlewares.verifyUser,
      this.UserController.getUserSession
    );
    this.UsersRouter.delete(
      "/unregister",
      sessionMiddlewares.verifyUser,
      this.UserController.unregisterUser
    );
  }
}
