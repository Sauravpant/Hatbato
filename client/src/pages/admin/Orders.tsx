import { useAllOrders } from "@/hooks/admin/useOrders";
import type { OrderParams } from "@/types/admin/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, Calendar, User, CreditCard } from "lucide-react";
import PaginationWrapper from "@/components/common/PaginationWrapper";
import { EmptyMessage } from "@/components/common/EmptyMessage";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { OrderFilterBar } from "@/components/admin/OrdersFilter";

const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("search") || "");
  const queryParams: OrderParams = Object.fromEntries(searchParams.entries());
  queryParams.page = queryParams.page || "1";
  queryParams.limit = queryParams.limit || "10";

  const updateFilters = (filter: string, value: string) => {
    const updated = new URLSearchParams(searchParams);
    if (value === "all" || value === "default" || !value) {
      updated.delete(filter);
    } else {
      updated.set(filter, value);
    }
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
    const timer = setTimeout(() => updateFilters("search", searchTerm), 700);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, error, refetch } = useAllOrders(queryParams);
  const orders = data?.data.data;
  const totalPages = data?.data.totalPages ?? 1;
  const currentPage = Number(queryParams.page);

  if (error) {
    return <ErrorMessage title="Error fetching orders. Try again" refetch={refetch} />;
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Order Management</h1>
            <p className="text-sm text-gray-500 mt-1">Track and manage all customer orders</p>
          </div>
        </div>
        <OrderFilterBar
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

      {!isLoading && !error && orders?.length === 0 && (
        <EmptyMessage title="No Orders Found" description="Try adjusting your filters or search query." />
      )}

      {!isLoading && !error && orders && orders.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900">{order.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{order.product.title}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{order.buyer.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{order.seller.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-xs">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {orders && orders.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <PaginationWrapper currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
        </div>
      )}
    </div>
  );
};

export default Orders;
