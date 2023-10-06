import { dashboardNavHandler } from "@/store/slices/dashboardNavSlice";
import { useDispatch } from "react-redux";

export const useElementValue = () => {
  const dispatch = useDispatch();

  const valueHandler = (value: string) => {
    dispatch(dashboardNavHandler(value));
  };
  return [valueHandler] as const;
};
