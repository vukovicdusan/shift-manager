import { auth } from "@/public/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();
  const user = auth.currentUser;

  const isAuthorized = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
  };

  const isAdmin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
        router.push("/");
      }
    });
  };

  return [isAuthorized, isAdmin, user] as const;
};

export default useAuth;
