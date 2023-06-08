import { User as FirebaseUser } from "@firebase/auth";

export interface Session {
  hasSession: boolean;
  isAuthenticated: boolean;
  user?: FirebaseUser | null;
}

export enum ActionType {
  SESSION_INIT = "SESSION_INIT",
  LOGGED_OUT = "LOGGED_OUT",
  LOGGED_IN = "LOGGED_IN",
}

export interface SessionAction {
  type: string;
  data?: Partial<Session>;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface Store {
  session: Session;
}
