import type { OrderParams } from "@/types/admin/types";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "../ui/select";
import { Button } from "../ui/button";
import type React from "react";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  queryParams: OrderParams;
  updateFilters: (filter: string, value: string) => void;
  resetFilters: () => void;
}

export const OrderFilterBar: React.FC<FilterBarProps> = ({ searchTerm, setSearchTerm, queryParams, updateFilters, resetFilters }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-60 pl-9 rounded-lg" />
      </div>

      <Select value={queryParams.status || ""} onValueChange={(value) => updateFilters("status", value === "all" ? "" : value)}>
        <SelectTrigger className="w-40 rounded-lg border-gray-300">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="rounded-lg">
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Select value={queryParams.sortOrder || ""} onValueChange={(value) => updateFilters("sortOrder", value === "default" ? "" : value)}>
        <SelectTrigger className="w-40 rounded-lg border-gray-300">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="rounded-lg">
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="asc">Oldest First</SelectItem>
          <SelectItem value="desc">Newest First</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={resetFilters} className="flex items-center gap-1 rounded-lg">
        <X className="h-4 w-4" />
        Reset
      </Button>
    </div>
  );
};
