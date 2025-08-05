import { z } from "zod";

export const reportSchema = z.object({
  reason: z.string().min(5, "Reason is too short").max(50, "Reason is too long"),
  description: z.string().min(5, "Description is too short").max(500, "Description is too long"),
});

export type ReportType = z.infer<typeof reportSchema>;
