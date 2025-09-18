import type { ProductSearch } from "@/types/admin/types";
import type { CategoryDetails } from "@/types/category/types";
import { Filter, Search, Tag, TrendingUp, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductsFilterProps {
  queryParams: ProductSearch;
  categories: CategoryDetails[];
  updateFilters: (key: string, value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  clearAllFilters: () => void;
}

export const ProductsFilter: React.FC<ProductsFilterProps> = ({ queryParams, categories, updateFilters, searchTerm, setSearchTerm, clearAllFilters }) => {
  const [debouncedSearch, setDebouncedSearch] = useState<string>(searchTerm);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 700);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Sync debounced value to URL params
  useEffect(() => {
    updateFilters("search", debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Product Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all products in your inventory</p>
        </div>
        <button
          onClick={clearAllFilters}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mt-4 md:mt-0"
        >
          <X className="h-4 w-4 mr-1" />
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={queryParams.status || ""}
            onChange={(e) => updateFilters("status", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="like_new">Like New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
            <option value="damaged">Damaged</option>
            <option value="for_parts">For Parts</option>
          </select>
        </div>

        <div className="relative">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={queryParams.category || ""}
            onChange={(e) => updateFilters("category", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={queryParams.sort || ""}
            onChange={(e) => updateFilters("sort", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};