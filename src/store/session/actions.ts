import { getAuth } from "firebase/auth";
import { Dispatch } from "redux";
import { client } from "../../app/apollo";
import { FirebaseLoginService } from "../../firebase";
import { ActionType, Session } from "./session.model";

const { getCurrentUser } = new FirebaseLoginService();
const initSession =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    getAccessToken(dispatch);
  };

const logout =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    client.resetStore();
    getAuth().signOut();
    dispatch({
      type: ActionType.LOGGED_OUT,
    });
  };

const onLoggedIn =
  (user: Session["user"]) =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: ActionType.LOGGED_IN,
      data: { user: user?.toJSON() },
    });
  };

const getAccessToken = async (dispatch: Dispatch): Promise<void> => {
  try {
    const user = getCurrentUser();
    if (!user) return logout()(dispatch);

    onLoggedIn(user)(dispatch);
  } catch (error) {
    console.log(error);
    logout()(dispatch);
  }
};

export { initSession, getAccessToken, onLoggedIn, logout };
