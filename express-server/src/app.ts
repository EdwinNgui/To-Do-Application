import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

//versions
import v1 from "./versions/api.version1";

//express app server
const app = express();

//middlewares

//any routes can access our api
app.use(
  cors({
    origin: "*",
  })
);

//logging which request a comming in
app.use(morgan("combined"));

//parsing request body & cookies to request.body & request.cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//we are using the version 1 (v1 router) of our api which has the user and todo routers
app.use("/v1", v1);

//exporting app to be used by our server
export default app;
