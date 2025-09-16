import { AlertBox } from "@/components/common/AlertBox";
import { EmptyMessage } from "@/components/common/EmptyMessage";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useAcceptOrder, useCancelOrder, useMyRequests, useRejectOrder, useUserOrders } from "@/hooks/user/useOrder";
import React from "react";

const OrderManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-4 lg:p-6">
      <div className="max-w-screen mx-auto space-y-8">
        <MyOrders />
        <UserOrders />
      </div>
    </div>
  );
};

export default OrderManagement;

const MyOrders = () => {
  const { data, error, isLoading, refetch } = useMyRequests();
  const { mutate } = useCancelOrder();
  const requests = data?.data;
  const handleCancelOrder = (id: string) => {
    mutate({ orderId: id });
  };
  if (requests?.length === 0) {
    return <EmptyMessage title="No Orders yet" description="You havent ordered any product yet " />;
  }
  if (isLoading) {
    return <LoadingScreen title="Loading Orders" subtitle="Loading the orders you have requested" />;
  }
  if (error) {
    return <ErrorMessage title="Failed to fetch orders" refetch={refetch} />;
  }
  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">My Orders</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Seller</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests &&
              requests.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={order.product.imageUrl} alt={order.product.title} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{order.product.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.seller.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.seller.contactNumber}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rs. {order.product.price}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    {order.status === "pending" && (
                      <AlertBox
                        id={order.id}
                        button="Cancel"
                        question="Are you sure you want to cancel this order ?"
                        description="This action will cancel your order request"
                        cancelButton="Cancel"
                        confirmButton="Confirm"
                        onSubmit={handleCancelOrder}
                      />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const UserOrders = () => {
  const { data, error, isLoading, refetch } = useUserOrders();
  const { mutate: acceptMutate } = useAcceptOrder();
  const { mutate: rejectMutate } = useRejectOrder();
  const handleConfirmOrder = (orderId: string) => {
    acceptMutate({ orderId });
  };

  const handleRejectOrder = (orderId: string) => {
    rejectMutate({ orderId });
  };
  const requests = data?.data;
  if (requests?.length === 0) {
    return <EmptyMessage title="No Orders yet" description="You havent received any orders " />;
  }
  if (isLoading) {
    return <LoadingScreen title="Loading Orders" subtitle="Loading the orders you have received" />;
  }
  if (error) {
    return <ErrorMessage title="Failed to fetch your orders" refetch={refetch} />;
  }
  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Orders Received</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Buyer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Contact</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Address</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests &&
              requests.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.buyer.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={order.product.imageUrl} alt={order.product.title} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{order.product.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.buyer.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.buyer.contactNumber}</td>
                   <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.buyer.address}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rs. {order.product.price}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {order.status === "pending" && (
                      <>
                        <AlertBox
                          id={order.id}
                          button="Accept"
                          question="Are you sure you want to accept this order ?"
                          description={`Accept the order request from ${order.buyer.name} `}
                          cancelButton="Cancel"
                          confirmButton="Confirm"
                          onSubmit={handleConfirmOrder}
                        />
                        <AlertBox
                          id={order.id}
                          button="Reject"
                          question="Are you sure you want to reject this order ?"
                          description={`Reject the order request from ${order.buyer.name} `}
                          cancelButton="Cancel"
                          confirmButton="Confirm"
                          onSubmit={handleRejectOrder}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "accepted":
      return "bg-blue-100 text-blue-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
