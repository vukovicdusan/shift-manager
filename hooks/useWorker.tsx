import { passwordRepeatChecker } from "@/helpers/workerHandlers/passwordRepeatChecker";
import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { deleteUser } from "@/actions/deleteUser";
import { useRouter } from "next/navigation";
import { capitalize } from "@/helpers/capitalize";
import { WorkersFirebaseType } from "@/types/WorkersFirebaseType";

type TUsernameCheckerParams = {
  error: boolean;
  message: string;
};

const useWorker = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [passwordError, setPasswordError] = useState(false);

  const [usernameError, setUsernameError] = useState<TUsernameCheckerParams>({
    error: false,
    message: "",
  });

  const [emailError, setEmailError] = useState<TUsernameCheckerParams>({
    error: false,
    message: "",
  });

  const inputChecker = (username?: string, email?: string) => {
    const usernamePattern = /^[a-zA-Z0-9]+$/;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (username) {
      if (usernamePattern.test(username)) {
        setUsernameError({
          error: false,
          message: "",
        });
      } else {
        setUsernameError({
          error: true,
          message: "Name should include only letters.",
        });
      }
    }

    if (email) {
      if (emailPattern.test(email)) {
        setEmailError({
          error: false,
          message: "",
        });
      } else {
        setEmailError({
          error: true,
          message: "Please enter a real mail.",
        });
      }
    }
  };

  useEffect(() => {
    inputChecker(input.username, input.email);

    passwordRepeatChecker(input.password, input.repeatPassword)
      ? setPasswordError(false)
      : setPasswordError(true);
  }, [input.password, input.repeatPassword, input.email, input.username]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createWorkerInFirebase = async (
    e: React.MouseEvent<HTMLFormElement>,
    workersNames: string[]
  ) => {
    e.preventDefault();

    if (!workersNames.includes(input.username.toLowerCase())) {
      await createUserWithEmailAndPassword(auth, input.email, input.password)
        .then((userCredential) => {
          addDoc(collection(db, "workers"), {
            name: input.username,
            email: input.email,
            uid: userCredential.user.uid,
          });
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode === "auth/email-already-in-use") {
            let message = capitalize(error.code.split("-").join(" "));
            setEmailError({
              error: true,
              message: message ? message : "",
            });
          }
        });
    } else {
      setUsernameError({
        error: true,
        message: "The worker with this name already exists.",
      });
    }
  };

  const removeWorkerFromFirebase = async (
    workerId: string,
    workerUid: string
  ) => {
    await deleteDoc(doc(db, "workers", workerId));
    await deleteUser(workerUid);
    router.refresh();
  };

  return [
    inputHandler,
    createWorkerInFirebase,
    passwordError,
    removeWorkerFromFirebase,
    usernameError,
    emailError,
    input,
  ] as const;
};

export default useWorker;
