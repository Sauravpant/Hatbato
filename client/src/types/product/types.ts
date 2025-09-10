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
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  imageUrl: string;
  deliveryAvailable: boolean;
  status: string;
  postedAt: string | Date;
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