import { api } from "@/lib/axios";
export const getCategory = async () => {
  const response = await api.get("/category/get");
  console.log("api called")
  return response.data.data;
};
