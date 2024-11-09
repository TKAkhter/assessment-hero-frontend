import { JwtPayload } from "jwt-decode";

export interface AuthState {
  token: string | null;
  userId: string | null;
  username: string | null;
}
export interface StoreRootState {
  user: AuthState;
}

export interface AuthMiddlewareProps {
  children: React.ReactNode;
}

export interface JwtUserPayload extends JwtPayload {
  username: string;
  userId: string;
}
