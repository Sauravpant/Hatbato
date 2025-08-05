import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(3, "Title is too short").max(100, "Title is too long"),
  description: z.string().min(10, "Enter detailed description").max(800),
  price: z.coerce.number().positive("Price must be a positive number"),
  address: z.string().min(5, "Address is too short").max(100),
  status: z.enum(["new", "like_new", "used", "refurbished", "damaged", "for_parts"]),
  category: z.string(),
  //Convert the string true/false into boolean
  deliveryAvailable: z.preprocess((val) => {
    if (typeof val === "string") {
      return val.toLowerCase() === "true";
    }
    return val;
  }, z.boolean()),
  latitude: z.coerce.number().min(-90, "Invalid latitude").max(90, "Invalid latitude"),
  longitude: z.coerce.number().min(-180, "Invalid longitude").max(180, "Invalid longitude"),
});

export const updateProductSchema = z.object({
  title: z.string().min(3, "Title is too short").max(100, "Title is too long").optional(),
  description: z.string().min(10, "Enter detailed description").max(800).optional(),
  price: z.coerce.number().positive("Price must be a positive number").optional(),
  address: z.string().min(5, "Address is too short").max(100).optional(),
  status: z.enum(["new", "like_new", "used", "refurbished", "damaged", "for_parts"]).optional(),
  category: z.string().optional(),
});

export const getProductSchema = z.object({
  search:z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  status: z.enum(["new", "like_new", "used", "refurbished", "damaged", "for_parts"]).optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  radius: z.coerce.number().optional(),
  category: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
});

export type GetProduct = z.infer<typeof getProductSchema>;
