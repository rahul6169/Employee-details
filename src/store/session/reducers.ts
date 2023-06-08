import { ActionType, Session, SessionAction } from "./session.model";

const initialState: Session = {
  hasSession: false,
  isAuthenticated: false,
  user: null,
};

const session = (state = initialState, action: SessionAction): Session => {
  switch (action.type) {
    case ActionType.LOGGED_OUT: {
      return {
        ...initialState,
        hasSession: true,
      };
    }

    case ActionType.LOGGED_IN: {
      return {
        ...state,
        hasSession: true,
        user: action?.data?.user,
        isAuthenticated: true,
      };
    }

    default:
      return state;
  }
};

export { session };
