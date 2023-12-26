//data type of our json for communicating user objects!
export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserSessionDTO {
  userID: string;
}
