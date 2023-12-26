//express
import express from "express";
import TodoRouter from "../routes/v1/todo/todo.router";
import UserRouter from "../routes/v1/user/user.route";

//routing
const todoRouter = new TodoRouter().TodosRouter;
const userRouter = new UserRouter().UsersRouter;

//v1; (we will be using versioning in our api to expand in future!)
const v1 = express.Router();

//routes
v1.use("/todos", todoRouter);
v1.use("/users", userRouter);

export default v1;
