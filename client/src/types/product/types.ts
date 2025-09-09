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
