import { passwordRepeatChecker } from "@/helpers/workerHandlers/passwordRepeatChecker";
import { auth } from "@/public/firebase/firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";

const useWorker = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    passwordRepeatChecker(input.password, input.repeatPassword)
      ? setPasswordError(false)
      : setPasswordError(true);
  }, [input.password, input.repeatPassword]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createWorkerInFirebase = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return [inputHandler, createWorkerInFirebase, passwordError] as const;
};

export default useWorker;
