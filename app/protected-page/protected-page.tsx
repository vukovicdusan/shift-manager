"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/public/firebase/firebase";
import { ChildrenPropsType } from "@/types/ChildrenPropsType";

const ProtectedPage = (props: ChildrenPropsType) => {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        router.push("/login");
      }
    });
  });
  return <>{props.children}</>;
};

export default ProtectedPage;
