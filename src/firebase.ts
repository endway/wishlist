import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { firebaseConfig } from "./config/firebase";

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
