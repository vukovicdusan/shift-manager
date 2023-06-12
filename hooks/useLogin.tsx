import React, { useState } from "react";
import { auth } from "@/public/firebase/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const router = useRouter();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("login handler called");
    signInWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("user is logged");
        // ...
      } else {
        // User is signed out
        // ...
        console.log("user is logged");
      }
    });
  };

  return [inputHandler, input, loginHandler, logoutHandler, checkUser] as const;
};

export default useLogin;
