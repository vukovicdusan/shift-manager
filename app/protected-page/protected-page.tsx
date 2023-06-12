"use client";
import React, { useEffect } from "react";
import { auth } from "@/public/firebase/firebase";
import { ChildrenPropsType } from "@/types/ChildrenPropsType";
import useLogin from "@/hooks/useLogin";

const ProtectedPage = (props: ChildrenPropsType) => {
  const [, , , , isAuthorized] = useLogin();
  useEffect(() => {
    isAuthorized();
    return () => isAuthorized();
  }, []);
  if (!auth.currentUser) {
    return null;
  }
  return <>{props.children}</>;
};

export default ProtectedPage;
