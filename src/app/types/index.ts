import { JwtPayload } from "jwt-decode";

export interface AuthState {
  token: string | null;
  userId: string | null;
  username: string | null;
}

export interface FileState {
  isFileUploaded: boolean;
}
export interface StoreRootState {
  user: AuthState;
  file: FileState;
}

export interface AuthMiddlewareProps {
  children: React.ReactNode;
}

export interface JwtUserPayload extends JwtPayload {
  username: string;
  userId: string;
}
