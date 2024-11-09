import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthMiddlewareProps, StoreRootState } from "../types";

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const token = useSelector((state: StoreRootState) => state.user.token);
  const history = useHistory();

  React.useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token, history]);

  return <>{children}</>;
};

export default AuthMiddleware;
