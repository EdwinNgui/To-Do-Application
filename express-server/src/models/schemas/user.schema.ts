//This is the schema of the user collection

import mongoose, { Document, Schema } from "mongoose";
import { ITodo } from "./todo.schema";

export interface IUser extends Document {
  email: string;
  password: string;
  todos: ITodo["_id"][]; // Array of Todo IDs
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }], // Reference to Todo model
});

export default mongoose.model<IUser>("User", UserSchema);
