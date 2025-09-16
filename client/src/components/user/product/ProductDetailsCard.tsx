import React from "react";
import type { Product } from "@/types/product/types";
import { SeeMore } from "../../ui/SeeMore";
import { Star, MapPin, Phone, Mail, Shield, Calendar, Tag, ShoppingCart } from "lucide-react";
import { DialogBox } from "../../ui/DialogBox";
import { useReportProduct, useReportUser } from "@/hooks/user/useReport";
import { usePlaceOrder } from "@/hooks/user/useOrder";
import { AlertBox } from "@/components/common/AlertBox";

interface ProductDetailsCardProps {
  product: Product;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({ product }) => {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  const { mutate } = usePlaceOrder();
  const reportUserMutation = useReportUser();

  const handleBuy = (id: string) => {
    mutate({ productId: id });
  };

  const reportProductMutation = useReportProduct();
  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-gray-100 backdrop-blur-sm bg-opacity-95">
      <div className="w-full mb-6">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-52 object-contain rounded-2xl mx-auto shadow-md transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-xl font-bold flex-1 mr-3 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {product.title}
          </h1>
          <span
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border-2 ${
              product.status === "new"
                ? "bg-green-50 text-green-700 border-green-200 shadow-green-sm"
                : product.status === "like_new"
                  ? "bg-blue-50 text-blue-700 border-blue-200 shadow-blue-sm"
                  : product.status === "used"
                    ? "bg-amber-50 text-amber-700 border-amber-200 shadow-amber-sm"
                    : "bg-gray-50 text-gray-700 border-gray-200 shadow-gray-sm"
            }`}
          >
            {product.status.replace("_", " ")}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Rs. {product.price.toLocaleString(`en-US`)}
          </span>
          <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            {new Date(product.postedAt).toLocaleDateString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-xl border border-gray-200">
            <Tag className="h-4 w-4 mr-2 text-blue-500" />
            <span className="font-medium">{product.category.name}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-xl border border-gray-200">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            <span className="font-medium truncate">{product.address}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
          Description
        </h3>
        <div className="text-sm text-gray-700 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100 shadow-inner break-words whitespace-pre-line max-h-40 overflow-y-auto">
          <SeeMore text={product.description} limit={100} />
        </div>
      </div>

      <div className="mb-6 p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-3 text-blue-600" />
          Seller Information
        </h3>

        <div className="flex items-center mb-4">
          {product.user?.imageUrl ? (
            <img
              src={product.user.imageUrl}
              alt={product.user.name}
              className="w-12 h-12 rounded-full object-cover mr-4 border-3 border-white shadow-lg"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center mr-4 border-3 border-white shadow-lg">
              <span className="text-white font-bold text-lg">{getInitials(product.user.name)}</span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <p className="text-base font-bold text-gray-900 truncate">{product.user.name}</p>
              {product.user.isVerified && <Shield className="h-5 w-5 text-blue-500 flex-shrink-0" />}
            </div>

            {product.user.averageRating !== null ? (
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.user.averageRating!) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 font-semibold">({product.user.averageRating?.toFixed(1)})</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500 mt-2">No ratings yet</span>
            )}
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <Mail className="h-4 w-4 mr-3 text-blue-500" />
            <span className="truncate font-medium">{product.user.email}</span>
          </div>
          <div className="flex items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <Phone className="h-4 w-4 mr-3 text-blue-500" />
            <span className="truncate font-medium">{product.user.contactNumber}</span>
          </div>
          <div className="flex items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <MapPin className="h-4 w-4 mr-3 text-blue-500" />
            <span className="truncate font-medium">{product.user.address}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <ShoppingCart />
          <AlertBox
            id={product.id}
            button="Buy Now"
            cancelButton="Cancel"
            confirmButton="Confirm"
            question="Are you sure you want to buy this product ?"
            description="This will send a purchase request to the sellerr"
            onSubmit={handleBuy}
          />
        </div>
        <DialogBox
          buttonText="Report Seller"
          title="Report This Seller"
          description="Are you sure you want to report this seller"
          onSubmit={(data) => reportUserMutation.mutate({ userId: product.user.id, data })}
          isSubmitting={reportUserMutation.isPending}
        />
        <DialogBox
          buttonText="Report Product"
          title="Report This Product"
          description="Are you sure you want to report this product"
          onSubmit={(data) => reportProductMutation.mutate({ productId: product.id, data })}
          isSubmitting={reportProductMutation.isPending}
        />
      </div>
    </div>
  );
};

export default ProductDetailsCard;
