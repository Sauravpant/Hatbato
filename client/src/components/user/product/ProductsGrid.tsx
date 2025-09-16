import React from "react";
import ProductCard from "@/components/user/product/ProductCard";
import Spinner from "@/components/ui/Spinner";
import type { Product } from "@/types/product/types";
import type { ProductsGridProps } from "@/types/product/types";

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, isLoading, error }) => {
  if (isLoading)
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center gap-3 bg-white rounded-xl shadow-sm">
        <Spinner />
        <p className="text-gray-700 text-lg">Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[300px] flex items-center justify-center bg-white rounded-xl shadow-sm">
        <p className="text-red-500 text-lg">Failed to load products. Please try again.</p>
      </div>
    );

  if (!products.products || products.products.length === 0)
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
        <div className="text-gray-300 text-6xl mb-4">📦</div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">No products found</h3>
        <p className="text-gray-500">Try changing your filters or check back later.</p>
      </div>
    );

  return (
    <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-6">
      {products.products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
