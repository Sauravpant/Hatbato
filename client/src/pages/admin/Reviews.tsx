import { useAllReviews, useDeleteReview } from "@/hooks/admin/useReviews";
import type { ReviewsParams } from "@/types/admin/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Star, User, MessageSquare, Calendar } from "lucide-react";
import PaginationWrapper from "@/components/common/PaginationWrapper";
import { EmptyMessage } from "@/components/common/EmptyMessage";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ReviewFilterBar } from "@/components/admin/ReviewsFilter";

const Reviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("userName") || "");
  const queryParams: ReviewsParams = Object.fromEntries(searchParams.entries());
  queryParams.page = queryParams.page || "1";
  queryParams.limit = queryParams.limit || "10";

  const { data, isLoading, error, refetch } = useAllReviews(queryParams);
  const { mutate } = useDeleteReview();

  const updateFilters = (filter: string, value: string) => {
    const updated = new URLSearchParams(searchParams);
    value ? updated.set(filter, value) : updated.delete(filter);
    updated.set("page", "1");
    updated.set("limit", "10");
    setSearchParams(updated);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSearchParams(new URLSearchParams({ page: "1", limit: "10" }));
  };

  const goToPage = (page: number) => {
    const updated = new URLSearchParams(searchParams);
    updated.set("page", String(page));
    setSearchParams(updated);
  };

  useEffect(() => {
    const timer = setTimeout(() => updateFilters("userName", searchTerm), 700);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const reviews = data?.data.data;
  const totalPages = data?.data.totalPages ?? 1;
  const currentPage = Number(queryParams.page);

  const handleDeleteReview = (id: string) => {
    mutate({ id });
  };
  if (error) {
    return <ErrorMessage title="Error fethcing reviews." refetch={refetch} />;
  }
  return (
    <div className="flex flex-col gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Review Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and monitor customer reviews</p>
          </div>
        </div>
        <ReviewFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          queryParams={queryParams}
          updateFilters={updateFilters}
          resetFilters={resetFilters}
        />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-16 bg-white rounded-xl border border-gray-200">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        </div>
      )}

      {!isLoading && !error && reviews?.length === 0 && (
        <EmptyMessage title="No Reviews Found" description="Try adjusting your filters or search query." />
      )}

      {!isLoading && !error && reviews && reviews.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">#{review.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{review.reviewer.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{review.seller.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-gray-700">{review.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 truncate">{review.comment || "-"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-xs">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {reviews && reviews.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <PaginationWrapper currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
        </div>
      )}
    </div>
  );
};

export default Reviews;
