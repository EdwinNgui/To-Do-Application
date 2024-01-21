import { Reducer } from "redux";
import { AuthAction, AuthState } from "../types/Auth.Types";

//we will always dispatch a todo object from pur actions as payload!
//no more changes
export const AuthReducer: Reducer<AuthState, AuthAction> = (
  state = { isAuthenticated: false },
  action
) => {
  switch (action.type) {
    case "IS_AUNTHENTICATED":
      if (action.payload) {
        return { isAuthenticated: action.payload };
      }
      return state;
    default:
      return state;
  }
};
