import { AnyAction } from "redux";

//payload
export type IsAuntheticated = boolean;

//state
export interface AuthState {
  isAuthenticated: IsAuntheticated;
}

//action
export interface AuthAction extends AnyAction {
  type: string;
  payload?: IsAuntheticated;
}
