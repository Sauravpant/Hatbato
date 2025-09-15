import { useQuery } from "@tanstack/react-query";
import { getCategory } from "@/services/categoryServices";
import type { CategoryDetails } from "@/types/category/types";


export const useGetCategory = () => {
  return useQuery<CategoryDetails[], unknown>({
    queryFn: getCategory,
    queryKey: ["category"],
    staleTime: Infinity,
  });
};
