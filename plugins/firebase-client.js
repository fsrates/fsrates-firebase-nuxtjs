import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const config = {
  apiKey: "AIzaSyCado-rFkBejI3CB6s1lR9xLizgv5MYGJg",
  authDomain: "fs-exchange.firebaseapp.com",
  databaseURL:
    "https://fs-exchange-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fs-exchange",
  storageBucket: "fs-exchange.appspot.com",
  messagingSenderId: "632523912329",
  appId: "1:632523912329:web:985b8505780d84af328258",
  measurementId: "G-H0HSG8LEC6"
};

const app = !getApps().length ? initializeApp(config) : getApp();

export const auth = getAuth(app);
export const database = getDatabase(app);
