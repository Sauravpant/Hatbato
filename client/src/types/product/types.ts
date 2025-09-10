export interface CreateProduct {
  title: string;
  description: string;
  price: number;
  address: string;
  status: "new" | "like_new" | "used" | "refurbished" | "damaged" | "for_parts";
  category: string;
  deliveryAvailable: "true" | "false";
  latitude: number;
  longitude: number;
}

export interface Product {
  id:string;
  title: string;
  description: string;
  price: number;
  address: string;
  imageUrl: string;
  deliveryAvailable: boolean;
  status: string;
  postedAt: string | Date;
}