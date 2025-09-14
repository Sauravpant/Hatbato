import { Decimal } from "@prisma/client/runtime/library";
import { Prisma } from "../../generated/prisma/index.js";
export interface ProductType {
  userid: string;
  title: string;
  description: string;
  price: number;
  address: string;
  status: "new" | "like_new" | "used" | "refurbished" | "damaged" | "for_parts";
  category: string;
  deliveryAvailable: boolean;
  latitude: number;
  longitude: number;
  productImage: string;
}

export interface ProductResult {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  deliveryAvailable: boolean;
  status: "new" | "like_new" | "used" | "refurbished" | "damaged" | "for_parts";
  postedAt: Date;
  userId: string;
  categoryId: string;
}

export interface UpdateProduct {
  title?: string;
  description?: string;
  price?: number;
  status?: "new" | "like_new" | "used" | "refurbished" | "damaged" | "for_parts";
  category?: string;
}
interface UserInfo {
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  isVerified: boolean;
  imageUrl: string | null;
  averageRating: number | null;
}

interface CategoryInfo {
  name: string;
}

export interface ProductById {
  id: string;
  title: string;
  description: string;
  price: number | Decimal;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  imagePublicId: string | null;
  deliveryAvailable: boolean;
  status: string;
  postedAt: Date;
  userId: string;
  categoryId: string;
  category: CategoryInfo;
  user: UserInfo;
  totalProducts: number;
}

export type GetItems = Prisma.ProductGetPayload<{
  include: {
    category: {
      select: {
        name: true;
      };
    };
  };
}>;
