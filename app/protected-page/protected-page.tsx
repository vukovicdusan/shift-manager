"use client";
import React, { useEffect } from "react";
import { ChildrenPropsType } from "@/types/ChildrenPropsType";
import useAuth from "@/hooks/useAuth";

const ProtectedPage = (props: ChildrenPropsType) => {
  const [isAuthorized, , user] = useAuth();

  useEffect(() => {
    isAuthorized();
    return () => isAuthorized();
  }, []);

  if (!user.uid) {
    return null;
  }

  return <>{props.children}</>;
};

export default ProtectedPage;
