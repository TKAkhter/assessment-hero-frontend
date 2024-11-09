import { AuthState } from "../types";

const storedToken = localStorage.getItem("token");
const storedUserName = localStorage.getItem("username");
const storedUserId = localStorage.getItem("userId");

const initialState: AuthState = {
  token: storedToken ? storedToken : null,
  userId: storedUserId ? storedUserId : null,
  username: storedUserName ? storedUserName : null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("username", action.payload.username);
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        username: action.payload.username,
      };
    case "CLEAR_TOKEN": {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      return {
        ...state,
        token: null,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
