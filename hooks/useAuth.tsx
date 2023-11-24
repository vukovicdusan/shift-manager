import { auth } from "@/firebase/firebase";
import { userHandler } from "@/store/slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface userType {
  uid?: string;
  email?: string;
}

const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState<userType>({ uid: "", email: "" });

  const isAuthorized = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
      }
      if (firebaseUser) {
        if (firebaseUser.email) {
          setUser({ uid: firebaseUser?.uid, email: firebaseUser?.email! });
          if (firebaseUser?.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
            dispatch(
              userHandler({
                isAdmin: false,
                email: firebaseUser?.email,
                isLoggedIn: true,
              })
            );
          } else
            dispatch(
              userHandler({ isAdmin: true, email: "admin", isLoggedIn: true })
            );
        }
      }
    });
  };

  const isAdmin = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser?.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
        router.push("/");
        setUser({ uid: "", email: "" });
      } else {
        setUser({ uid: firebaseUser?.uid, email: firebaseUser?.email! });
        dispatch(
          userHandler({ isAdmin: true, email: "admin", isLoggedIn: true })
        );
      }
    });
  };

  return [isAuthorized, isAdmin, user] as const;
};

export default useAuth;
