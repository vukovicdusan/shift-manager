"use client";
import useAuth from "@/hooks/useAuth";
import { ChildrenPropsType } from "@/types/ChildrenPropsType";
import React, { useEffect } from "react";

const AdminProtectedPage = ({ children }: ChildrenPropsType) => {
  const [, isAdmin, user] = useAuth();

  useEffect(() => {
    isAdmin();
    return () => isAdmin();
  }, []);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default AdminProtectedPage;
