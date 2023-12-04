import { passwordRepeatChecker } from "@/helpers/workerHandlers/passwordRepeatChecker";
import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { deleteUser } from "@/actions/deleteUser";
import { useRouter } from "next/navigation";

const useWorker = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [passwordError, setPasswordError] = useState(false);
  const [inputError, setInputError] = useState(false);

  // const inputChecker = (username, email) => {
  //   username
  // };

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

  const createWorkerInFirebase = async (
    e: React.MouseEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

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
        const errorMessage = error.message;
      });
  };

  const removeWorkerFromFirebase = async (
    workerId: string,
    workerUid: string
  ) => {
    // e.preventDefault();
    await deleteDoc(doc(db, "workers", workerId));
    await deleteUser(workerUid);
    router.refresh();
  };

  return [
    inputHandler,
    createWorkerInFirebase,
    passwordError,
    removeWorkerFromFirebase,
  ] as const;
};

export default useWorker;
