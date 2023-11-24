import React, { useState } from "react";
import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/helpers/workerHandlers/isAdmin";
import { useDispatch } from "react-redux";
import { userHandler } from "@/store/slices/userSlice";

const useLogin = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setError(false);
        isAdmin();
        router.push("/");
      })
      .catch((error) => {
        setError(true);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(userHandler({ isAdmin: false, email: "", isLoggedIn: false }));
      })
      .catch((error) => {});
  };

  return [inputHandler, input, loginHandler, logoutHandler, error] as const;
};

export default useLogin;
