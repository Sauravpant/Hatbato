import React from "react";
import type { FiltersSidebarProps } from "@/types/product/types";
const statusOptions = ["new", "used", "like_new", "refurbished", "damaged", "for_parts"];

const sortOptions = [
  { label: "Date: Latest", value: "desc" },
  { label: "Date: Older", value: "asc" },
];

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  queryParams,
  updateFilters,
  radius,
  setRadius,
  applyRadiusFilter,
  filtersOpen,
  clearAllFilters,
}) => {
  const hasActiveFilters = Object.keys(queryParams).some((key) => !["page", "limit"].includes(key) && queryParams[key] !== "");

  return (
    <div className={`${filtersOpen ? "block" : "hidden"} md:block md:w-64 flex-shrink-0 md:sticky md:top-8 md:self-start`}>
      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Filters</h2>
          {hasActiveFilters && (
            <button onClick={clearAllFilters} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              Clear All
            </button>
          )}
        </div>
        <div className="mb-5">
          <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={queryParams.minPrice || ""}
              onChange={(e) => updateFilters("minPrice", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={queryParams.maxPrice || ""}
              onChange={(e) => updateFilters("maxPrice", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mb-5">
          <h3 className="font-medium text-gray-700 mb-2">Condition</h3>
          <div className="grid grid-cols-2 gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => updateFilters("status", status)}
                className={`px-3 py-2 rounded-lg transition-all text-sm ${
                  queryParams.status === status ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                }`}
              >
                {status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-5">
          <h3 className="font-medium text-gray-700 mb-2">Sort By</h3>
          <select
            value={queryParams.sort || ""}
            onChange={(e) => updateFilters("sort", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Default</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <h3 className="font-medium text-gray-700 mb-2">Location Radius</h3>
          <input
            type="range"
            min="0"
            max="50"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">{radius} km</span>
            <button onClick={applyRadiusFilter} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
