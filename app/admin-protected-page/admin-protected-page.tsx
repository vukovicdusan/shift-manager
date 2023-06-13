import Center from "@/components/Center/Center";
import LoaderComponent from "@/components/Loader/LoaderComponent";
import useAuth from "@/hooks/useAuth";
import { ChildrenPropsType } from "@/types/ChildrenPropsType";
import React, { useEffect } from "react";

const AdminProtectedPage = ({ children }: ChildrenPropsType) => {
  const [, , isAdmin, admin] = useAuth();

  useEffect(() => {
    isAdmin();
    return () => isAdmin();
  }, []);

  if (!admin) {
    return (
      <Center>
        <LoaderComponent></LoaderComponent>
      </Center>
    );
  }

  return <>{children}</>;
};

export default AdminProtectedPage;
