import React, { useState } from "react";
import { auth } from "@/public/firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
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

  return [inputHandler, input, loginHandler, logoutHandler] as const;
};

export default useLogin;
