import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthMiddlewareProps, StoreRootState } from "../types";
import { jwtDecode } from "jwt-decode";

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const token = useSelector((state: StoreRootState) => state.user.token);
  const history = useHistory();
  const decodedToken = jwtDecode(token as string);
  const currentTime = Date.now() / 1000;
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    if (!token || decodedToken.exp! < currentTime) {
      dispatch({
        type: "CLEAR_TOKEN",
      });
      history.push("/login");
    }
  }, [token, history]);

  return <>{children}</>;
};

export default AuthMiddleware;
