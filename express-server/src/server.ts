import { myMongo } from "./models/mongodb";
import http from "http";
import app from "./app";
import dotenv from "dotenv";

//load dev environment variables using dotenv
if (process.env.NODE_ENV !== "prod") dotenv.config();

const PORT = process.env.PORT || 80;
const server = http.createServer(app); //using our app instance to create a server

//start server
async function startServer() {
  //connect to database
  try {
    await myMongo.connect();
  } catch (err) {
    throw new Error((err as Error).message);
  }

  //start server
  server.listen(PORT, () => {
    console.log("listening to port :", PORT);
  });
}

startServer();
