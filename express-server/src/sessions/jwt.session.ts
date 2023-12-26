//we will use jwt to store our login session in client so that user dont need to login again and again
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserSessionDTO } from "../dtos/user.dto";

//this class handles all the session related middlewares and functionality
class SessionMiddlewares {
  //check if user is logged in or not from jwt in cookies(retireve session)
  verifyUser(req: Request, res: Response, next: NextFunction) {
    const userToken = req.cookies.user as string;

    if (!userToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    try {
      const decodedUser = jwt.verify(
        userToken,
        process.env.JWT_SECRET as string
      ) as UserSessionDTO;
      req.user = decodedUser;
      next();
    } catch (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  }

  //set jwt in cookies (add session)
  setJWT(user: UserSessionDTO, res: Response) {
    const token = jwt.sign(user, process.env.JWT_SECRET as string);
    res.cookie("user", token, { maxAge: 900000, httpOnly: true });
  }

  //clear jwt from cookies (clear session)
  clearJWT(res: Response) {
    res.clearCookie("user");
    res.json({ message: "Logout successful" });
  }
}

//this instance of SessionMiddleware Class will be used by our whole application to manage sessions related tasks
export const sessionMiddlewares = new SessionMiddlewares();
