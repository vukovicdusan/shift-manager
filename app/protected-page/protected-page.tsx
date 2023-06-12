"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/public/firebase/firebase";
import { ChildrenPropsType } from "@/types/ChildrenPropsType";

const ProtectedPage = (props: ChildrenPropsType) => {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);
  if (!auth.currentUser) {
    return null;
  }
  return <>{props.children}</>;
};

export default ProtectedPage;
