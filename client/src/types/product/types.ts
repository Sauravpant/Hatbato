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
export interface PaginationWrapperProps {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
}

export interface ProductsGridProps {
  products: any;
  isLoading: boolean;
  error: any;
}

export interface ProductsHeaderProps {
  queryParams: Record<string, string>;
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
}

export interface FiltersSidebarProps {
  queryParams: Record<string, string>;
  updateFilters: (filter: string, value: string) => void;
  radius: number;
  setRadius: (value: number) => void;
  applyRadiusFilter: () => void;
  filtersOpen: boolean;
  clearAllFilters: () => void;
}

export interface User {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  email: string;
  isVerified: boolean;
  imageUrl: string | null;
  averageRating: number | null;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  imagePublicId: string;
  deliveryAvailable: boolean;
  status: "new" | "like_new" | "used" | "refurbished" | "damaged" | "for_parts";
  postedAt: string | Date;
  isBought: boolean;
  userId: string;
  categoryId: string;
  category: Category;
  user: User;
  totalProducts: number;
}

export interface Category {
  name: string;
}

export interface ProductResponse {
  data: Product;
}

export interface UpdatedProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  imagePublicId: string;
  deliveryAvailable: boolean;
  status: "new" | "like_new" | "used" | "refurbished" | "damaged" | "for_parts";
  postedAt: Date;
  isBought: boolean;
  userId: string;
  categoryId: string;
}

export interface UpdateProduct {
  title?: string;
  description?: string;
  price?: number;
  address?: string;
  category?: string;
  status?: "new" | "like_new" | "used" | "refurbished" | "damaged" | "for_parts";
}

export interface GetItems {
  category: {
    name: string;
  };
  id: string;
  imageUrl: string;
  imagePublicId: string;
  address: string;
  title: string;
  description: string;
  price: number;
  status: "new" | "like_new" | "used" | "refurbished" | "damaged" | "for_parts";
  deliveryAvailable: boolean;
  latitude: number;
  longitude: number;
  postedAt: Date;
  isBought: boolean;
  userId: string;
  categoryId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  successCode: number;
  data: T;
}
