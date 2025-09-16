import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const useAuthUser = () => useSelector((state: RootState) => state.auth.user);
