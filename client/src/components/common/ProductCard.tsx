import React, { useState } from "react";
import { ShoppingCart, MapPin, Truck, Clock } from "lucide-react";
import type { Product } from "@/types/product/types";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group">
      <div className="relative h-32 w-full overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl"></div>}
        <img
          src={product.imageUrl}
          alt={product.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute top-2 left-2">
          <span
            className={`px-1 lg:px-2 xl:px-2.5 py-1 lg:py-1.5 text-xs font-semibold rounded-full ${getStatusStyle(product.status)} transition-all duration-300 group-hover:scale-105`}
          >
            {formatStatusText(product.status)}
          </span>
        </div>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 min-h-[2rem]">
          <h3 className="font-semibold text-xs sm:text-sm  lg:text-lg text-gray-900 line-clamp-1 pr-2 flex-1 transition-colors group-hover:text-blue-600">
            {product.title}
          </h3>
          <p className="text-xs sm:text-sm  lg:text-lg font-bold text-blue-600  pl-1 transition-colors group-hover:text-blue-700">
            Rs.{product.price}
          </p>
        </div>
        <p className="text-gray-600 text-xs lg:tesxt-sm mb-3 line-clamp-2 leading-relaxed transition-colors group-hover:text-gray-700">
          {product.description}
        </p>

        <div className="flex items-center text-gray-500 text-xs mb-2 transition-colors group-hover:text-gray-600">
          <MapPin size={12} className="mr-1.5 text-blue-400 flex-shrink-0 transition-colors group-hover:text-blue-500" />
          <span className="truncate font-medium">{product.address}</span>
        </div>

        <div className="flex items-center text-gray-500 text-xs mb-3 transition-colors group-hover:text-gray-600">
          <Clock size={12} className="mr-1.5 text-blue-400 flex-shrink-0 transition-colors group-hover:text-blue-500" />
          <span className="font-medium">{formatDate(product.postedAt)}</span>
        </div>
        <div className="mb-3 font-medium">
          {product.deliveryAvailable ? (
            <div className="flex items-center text-green-600 text-xs transition-colors group-hover:text-green-700">
              <Truck size={12} className="mr-1.5 transition-transform group-hover:scale-110" />
              <span>Delivery Available</span>
            </div>
          ) : (
            <div className="text-gray-500 text-xs transition-colors group-hover:text-gray-600">
              <span>Pickup Only</span>
            </div>
          )}
        </div>
        <button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs sm:text-sm font-medium py-1 md:py-1.5 lg:py-2 xl:2.5 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-[1.02] active:scale-95 mt-auto cursor-pointer "
          onClick={(e) => {
            e.preventDefault();
            navigate(`/product/${product.id}`);
          }}
        >
          <ShoppingCart className="mr-1.5 transition-transform group-hover/btn:scale-110" />
          <span className="font-semibold">Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

const formatDate = (date: string | Date) => {
  const postDate = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  return postDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "new":
      return "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg";
    case "like_new":
      return "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg";
    case "used":
      return "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg";
    case "refurbished":
      return "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg";
    case "damaged":
      return "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg";
    case "for_parts":
      return "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg";
    default:
      return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg";
  }
};

const formatStatusText = (status: string) => {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
