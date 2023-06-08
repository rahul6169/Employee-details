import { getApps, initializeApp } from "firebase/app";

export class FirebaseLoginService {
  initialize(firebaseConfig: any) {
    if (!getApps().length) initializeApp(firebaseConfig);
  }
}
