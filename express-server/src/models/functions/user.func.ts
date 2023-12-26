//These functions are used to perform CRUD operations on the user collection of mongodb directly

import { UserLoginDTO } from "../../dtos/user.dto";
import userSchema from "../schemas/user.schema";
import bcryptjs from "bcryptjs";

export default class UserFunctions {
  private userCollection = userSchema;

  //algorithm to hash password
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    try {
      const hashedPassword = await bcryptjs.hash(password, saltRounds);
      return hashedPassword;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  //add a new user to our user collection
  public async addUser(registerProps: UserLoginDTO): Promise<string> {
    //check if user already exists
    try {
      const user = await this.userCollection.findOne({
        email: registerProps.email,
      });
      if (user !== null) {
        throw new Error("User already exists!!!");
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }

    //hash the password
    const hashedPassword = await this.hashPassword(registerProps.password);

    //add user to user collection
    const newUser = new this.userCollection({
      email: registerProps.email,
      password: hashedPassword,
      todos: [],
    });

    //save user to database
    try {
      return (await newUser.save())._id;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  //get a user by its ID
  public async getUser(userId: string) {
    try {
      return await this.userCollection.findById(userId);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  //login a User and return userId
  public async verifyUser(loginProps: UserLoginDTO): Promise<string | null> {
    try {
      //try to find user by email and check if password matches
      const user = await this.userCollection.findOne({
        email: loginProps.email,
      });

      //if user exists, check if password matches
      if (user) {
        const match = await bcryptjs.compare(
          loginProps.password,
          user.password
        );
        if (match) {
          return user._id;
        } else {
          return null;
        }
      }
      //if user does not exist, return null
      else {
        return null;
      }
    } catch (err) {
      //for any  database error, throw an error
      throw new Error((err as Error).message);
    }
  }

  //remove user
  public async removeUser(userId: string) {
    //remove user from user collection
    try {
      await this.userCollection.findByIdAndDelete(userId);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  //append todoId to user todos array
  public async appendTodoId(userId: string, todoId: string) {
    try {
      await this.userCollection.findByIdAndUpdate(userId, {
        $addToSet: { todos: todoId },
      });
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  //remove todoId from user todos array
  public async removeTodoId(userId: string, todoId: string) {
    try {
      await this.userCollection.findByIdAndUpdate(userId, {
        $pull: { todos: todoId },
      });
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  //get all todos of a User
  public async getUserTodos(userId: string) {
    try {
      const user = await this.userCollection
        .findById(userId)
        .populate("todos")
        .exec();
      return user?.todos;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
