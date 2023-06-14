import { auth } from "@/public/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<string>();

  const isAuthorized = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
      setUser(user?.uid);
    });
  };

  const isAdmin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
        router.push("/");
      }
      setUser(user?.uid);
    });
  };

  return [isAuthorized, isAdmin, user] as const;
};

export default useAuth;
