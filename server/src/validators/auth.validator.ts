import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(5, "Name is too short").max(30, "Name is too long"),
  email: z.email({ pattern: z.regexes.email }),
  address: z.string().min(10, "Enter the detailed address"),
  contactNumber: z.string().length(10, "Phone number must be exactly 10 digits").regex(/^\d+$/, "Phone number must contain only numeric digits"),
  password: z
    .string()
    .min(8)
    .max(15)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

export const loginSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
  password: z
    .string()
    .min(8, "Password must be of 8 digits")
    .max(15, "Password can be at most 15 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});
