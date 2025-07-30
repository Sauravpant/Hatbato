import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(5, "Name is too short").max(30, "Name is too long").optional(),
  contact: z.string().min(10, "Phone number must be exactly 10 digits").max(10, "Phone number must be exactly 10 digits").optional(),
  address: z.string().max(30, "Address is too long").optional(),
});
