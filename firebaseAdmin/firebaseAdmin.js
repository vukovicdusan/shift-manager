// import admin from "firebase-admin";
export const admin = require("firebase-admin");
import { initializeApp, getApps, cert } from "firebase-admin/app";

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.NEXT_FIREBASE_PRIVATE_KEY
      ? process.env.NEXT_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined,
  }),
};
export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
