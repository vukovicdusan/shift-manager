import { openModal } from "@/store/slices/modalSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const useCloseModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const closeModal = () => {
    dispatch(
      openModal({
        isOpen: false,
        formType: "",
        data: {
          start: "",
          end: "",
          alreadyAssignedWorkers: [],
          id: "",
          title: "",
          classNames: [""],
        },
      })
    );
  };

  const reload = () => {
    setTimeout(() => {
      router.refresh();
    }, 200);
  };

  return [closeModal, reload] as const;
};
