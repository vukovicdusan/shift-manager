import { auth } from "@/public/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const router = useRouter();

  const isAuthorized = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsLoggedIn(false);
        router.push("/login");
      }
      setIsLoggedIn(true);
    });
  };

  const isAdmin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
        setAdmin(false);
        router.push("/");
      }
      setAdmin(true);
    });
  };
  return [isAuthorized, isLoggedIn, isAdmin, admin] as const;
};

export default useAuth;
