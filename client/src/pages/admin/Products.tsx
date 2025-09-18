import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useGetCategory } from "@/hooks/user/useCategory";
import PaginationWrapper from "@/components/common/PaginationWrapper";
import type { ProductSearch } from "@/types/admin/types";
import { getProducts } from "@/services/adminServices";
import { useDeleteProduct } from "@/hooks/admin/useProducts";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { ProductsFilter } from "@/components/admin/ProductsFilter";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams: ProductSearch = Object.fromEntries(searchParams.entries());
  queryParams.page ||= "1";
  queryParams.limit ||= "10";

  const [searchTerm, setSearchTerm] = useState<string>(queryParams.search || "");

  const { data: categories } = useGetCategory();
  const { data: productsData } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => getProducts(queryParams),
  });
  const { mutate } = useDeleteProduct();

  const products = productsData?.products || [];
  const totalPages = productsData?.pagination?.totalPages || 0;

  const updateFilters = (key: string, value: string) => {
    const updated = new URLSearchParams(searchParams);
    value ? updated.set(key, value) : updated.delete(key);
    updated.set("page", "1");
    setSearchParams(updated);
  };

  const clearAllFilters = () => {
    const updated = new URLSearchParams();
    updated.set("page", "1");
    updated.set("limit", "10");
    setSearchParams(updated);
  };

  const goToPage = (page: number) => {
    const updated = new URLSearchParams(searchParams);
    updated.set("page", String(page));
    setSearchParams(updated);
  };

  const handleProductDelete = (id: string) => {
    mutate({ id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <ProductsFilter
        queryParams={queryParams}
        categories={categories || []}
        updateFilters={updateFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        clearAllFilters={clearAllFilters}
      />

      <ProductsTable
        products={products}
        categories={categories || []}
        page={Number(queryParams.page)}
        limit={Number(queryParams.limit)}
        deleteAction={handleProductDelete}
      />

      <div className="mt-6">
        <PaginationWrapper totalPages={totalPages} currentPage={Number(queryParams.page)} goToPage={goToPage} />
      </div>
    </div>
  );
};

export default ProductsPage;
