import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export class FirebaseLoginService {
  initialize(firebaseConfig: any) {
    if (!getApps().length) initializeApp(firebaseConfig);
  }
  getCurrentUser() {
    if (!getAuth().currentUser) return null;
    return getAuth().currentUser;
  }
}
