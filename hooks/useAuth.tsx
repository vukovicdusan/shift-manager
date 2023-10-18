import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface userType {
  uid?: string;
  email?: string;
}

const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<userType>({ uid: "", email: "" });

  const isAuthorized = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
      setUser({ uid: user?.uid, email: user?.email! });
    });
  };

  const isAdmin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
        router.push("/");
        setUser({ uid: "", email: "" });
      } else setUser({ uid: user?.uid, email: user?.email! });
    });
  };

  return [isAuthorized, isAdmin, user] as const;
};

export default useAuth;
