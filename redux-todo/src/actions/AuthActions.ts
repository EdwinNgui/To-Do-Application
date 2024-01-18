import { Dispatch } from "redux";
import { RootState } from "../types/Root.Types";
import { AnyAction } from "redux";
import axios from "axios";

//See is user is auntheticated and then decide the state of the app
export function AuntheticationAction(
  email: string,
  password: string,
  activity: string
) {
  return async function (dispatch: Dispatch<AnyAction>, _: () => RootState) {
    try {
      const body = {
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:8000/v1/users/" + activity,
        body,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch<AnyAction>({
          type: "IS_AUNTHENTICATED",
          payload: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function IsAuntheticatedAction() {
  return async function (dispatch: Dispatch<AnyAction>, _: () => RootState) {
    try {
      const response = await axios.get(
        "http://localhost:8000/v1/users/session",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch<AnyAction>({
          type: "IS_AUNTHENTICATED",
          payload: true,
        });
      }
    } catch (error) {
      console.log("Session Expired");
    }
  };
}
