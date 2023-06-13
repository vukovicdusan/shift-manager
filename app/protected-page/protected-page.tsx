"use client";
import React, { useEffect } from "react";
import { ChildrenPropsType } from "@/types/ChildrenPropsType";
import LoaderComponent from "@/components/Loader/LoaderComponent";
import Center from "@/components/Center/Center";
import useAuth from "@/hooks/useAuth";

const ProtectedPage = (props: ChildrenPropsType) => {
  const [isAuthorized, isLoggedIn, ,] = useAuth();

  useEffect(() => {
    isAuthorized();
    return () => isAuthorized();
  }, []);

  if (!isLoggedIn) {
    return (
      <Center>
        <LoaderComponent></LoaderComponent>
      </Center>
    );
  }

  return <>{props.children}</>;
};

export default ProtectedPage;
