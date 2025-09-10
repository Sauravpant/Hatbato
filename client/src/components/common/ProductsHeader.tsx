import React from "react";
import type { ProductsHeaderProps } from "@/types/product/types";
const ProductsHeader: React.FC<ProductsHeaderProps> = ({ queryParams, filtersOpen, setFiltersOpen }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        {queryParams.category
          ? `Products in "${queryParams.category}"`
          : queryParams.search
            ? `Search results for "${queryParams.search}"`
            : "All Products"}
      </h1>

      <button className="md:hidden px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2" onClick={() => setFiltersOpen(!filtersOpen)}>
        {filtersOpen ? "Hide Filters" : "Show Filters"}
      </button>
    </div>
  );
};

export default ProductsHeader;
