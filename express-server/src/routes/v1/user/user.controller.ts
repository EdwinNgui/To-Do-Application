import { myMongo } from "../../../models/mongodb";
import { Request, Response } from "express";
import { sessionMiddlewares } from "../../../sessions/jwt.session";
import { UserLoginDTO } from "../../../dtos/user.dto";

//this is the controller for user routes
export default class UserController {
  //login user & set jwt in cookies
  async loginUser(req: Request, res: Response) {
    const user = req.body as UserLoginDTO;
    try {
      const userID = await myMongo.verifyUser(user);
      if (!userID) {
        res.status(401).json({
          message: "Invalid credentials!!",
        });
      } else {
        sessionMiddlewares.setJWT({ userID }, res);
        res.status(200).json({
          message: "User logged in!!",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: (err as Error).message,
      });
    }
  }

  //register user & set jwt in cookies
  async registerUser(req: Request, res: Response) {
    const user = req.body as UserLoginDTO;
    try {
      const userID = await myMongo.registerUser(user);
      sessionMiddlewares.setJWT({ userID }, res);
      res.status(200).json({
        message: "User signed in!!",
      });
    } catch (err) {
      res.status(500).json({
        message: (err as Error).message,
      });
    }
  }

  //get user session from jwt in cookies
  async getUserSession(req: Request, res: Response) {
    return res.status(200).json(req.user);
  }

  //unregister user & clear jwt from cookies
  async unregisterUser(req: Request, res: Response) {
    const userID = req.user.userID;
    try {
      await myMongo.deleteUser(userID);
      sessionMiddlewares.clearJWT(res);
      res.status(200).json({
        message: "User unregistered!!",
      });
    } catch (err) {
      res.status(500).json({
        message: (err as Error).message,
      });
    }
  }

  //logout user by clearing jwt from cookies
  logoutUser(req: Request, res: Response) {
    //clear jwt from cookies
    sessionMiddlewares.clearJWT(res);
  }
}
