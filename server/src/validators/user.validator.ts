import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(5, "Name is too short").max(30, "Name is too long").optional(),
  contact: z.string().min(10, "Phone number must be exactly 10 digits").max(10, "Phone number must be exactly 10 digits").optional(),
  address: z.string().max(30, "Address is too long").optional(),
});

export const emailSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
});

export const resetPasswordSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
  newPassword: z
    .string()
    .min(8, "Password must be 8 digits")
    .max(15, "Paassword can be at most 15 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  confirmNewPassword: z
    .string()
    .min(8, "Password must be 8 digits")
    .max(15, "Paassword can be at most 15 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  otp: z.string().max(6, "OTP must be of 6 digits").min(6, "OTP must be of 6 digits"),
});

export const submitFormSchema = z.object({
  name: z.string().min(5, "Name is too short").max(30, "Name is too long"),
  email: z.email({ pattern: z.regexes.email }),
  category: z.enum(["general_enquiry", "report_an_issue", "partnership"]),
  contact: z.string().min(10, "Phone number must be exactly 10 digits").max(10, "Phone number must be exactly 10 digits"),
  message: z.string().min(5, "Message is too short").max(300, "Address is too long"),
});
