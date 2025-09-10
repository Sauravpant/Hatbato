import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/product.services";
import ProductsHeader from "@/components/common/ProductsHeader";
import FiltersSidebar from "@/components/sidebar/FiltersSidebar";
import ProductsGrid from "@/components/common/ProductsGrid";
import PaginationWrapper from "@/components/common/PaginationWrapper";
import { SearchContext } from "@/store/searchContext";
import type { Search } from "@/store/searchContext";

const Products = () => {
  const context = useContext<Search | undefined>(SearchContext);
  const searchData = context?.search;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [radius, setRadius] = useState<number>(Number(searchParams.get("radius")) || 0);

  const queryParams: Record<string, string> = Object.fromEntries(searchParams.entries());
  queryParams.page = queryParams.page || "1";
  queryParams.limit = queryParams.limit || "10";

  const {
    data: products,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => getAllProducts(queryParams),
  });

  const totalPages = isSuccess ? products.pagination.totalPages : 0;

  const updateFilters = (filter: string, value: string) => {
    const updated = new URLSearchParams(searchParams);
    if (value) updated.set(filter, value);
    else updated.delete(filter);
    updated.set("page", "1");
    setSearchParams(updated);
  };

  const applyRadiusFilter = () => {
    if (radius > 0 && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const updated = new URLSearchParams(searchParams);
        updated.set("lat", String(pos.coords.latitude));
        updated.set("lng", String(pos.coords.longitude));
        updated.set("radius", String(radius));
        updated.set("page", "1");
        setSearchParams(updated);
      });
    } else {
      const updated = new URLSearchParams(searchParams);
      updated.delete("lat");
      updated.delete("lng");
      updated.delete("radius");
      setSearchParams(updated);
    }
  };
  const clearAllFilters = () => {
    const updated = new URLSearchParams();
    updated.set("page", "1");
    updated.set("limit", "10");
    setSearchParams(updated);
    setRadius(0);
  };

  const goToPage = (page: number) => {
    const updated = new URLSearchParams(searchParams);
    updated.set("page", String(page));
    setSearchParams(updated);
  };

  useEffect(() => {
    if (searchData !== undefined) {
      const updated = new URLSearchParams(searchParams);
      if (searchData) updated.set("search", searchData);
      else updated.delete("search");
      updated.set("page", "1");
      setSearchParams(updated);
    }
  }, [searchData]);
  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <ProductsHeader queryParams={queryParams} filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen} />
        <div className="flex flex-col md:flex-row gap-6">
          <FiltersSidebar
            queryParams={queryParams}
            updateFilters={updateFilters}
            radius={radius}
            setRadius={setRadius}
            applyRadiusFilter={applyRadiusFilter}
            filtersOpen={filtersOpen}
            clearAllFilters={clearAllFilters}
          />

          <div className="flex-1">
            <ProductsGrid products={products} isLoading={isLoading} error={error} />
            <PaginationWrapper totalPages={totalPages} currentPage={Number(queryParams.page)} goToPage={goToPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
