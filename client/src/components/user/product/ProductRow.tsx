import { AlertBox } from "@/components/user/product/DeleteProduct";
import { useDeleteProduct } from "@/hooks/user/useProduct";
import type { GetItems } from "@/types/product/types";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiMapPin, FiInfo, FiBox, FiCalendar, FiShoppingBag, FiTag, FiTruck, FiNavigation } from "react-icons/fi";
import { UpdateProductDetails } from "./UpdateProduct";
interface ProductRowProps {
  product: GetItems;
  index: number;
}

export const ProductRow: React.FC<ProductRowProps> = ({ product, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useDeleteProduct();
  const handleDelete = (id: string) => {
    mutate({ productId: id });
  };

  const statusColor = product.isBought ? "bg-red-100 text-red-800 border-red-200" : "bg-green-100 text-green-800 border-green-200";
  const statusText = product.isBought ? "Sold" : "Not Sold";
  const conditionMap = {
    new: { text: "New", color: "text-green-600 bg-green-50" },
    like_new: { text: "Like New", color: "text-blue-600 bg-blue-50" },
    used: { text: "Used", color: "text-yellow-600 bg-yellow-50" },
    refurbished: { text: "Refurbished", color: "text-purple-600 bg-purple-50" },
    damaged: { text: "Damaged", color: "text-red-600 bg-red-50" },
    for_parts: { text: "For Parts", color: "text-gray-600 bg-gray-50" },
  };

  return (
    <>
      <tr className="hover:bg-gray-50/50 transition-colors">
        <td className="py-4 px-4 font-medium text-gray-700">
          <div className="h-8 w-8 rounded-md bg-blue-50 flex items-center justify-center text-blue-700">{index + 1}</div>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center">
            <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 mr-4 border border-gray-300">
              <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-gray-900 truncate">{product.title}</div>
              <div className="text-gray-500 text-xs md:hidden mt-1 flex items-center">
                <FiTag className="mr-1" size={12} />
                {product.category.name}
              </div>
            </div>
          </div>
        </td>
        <td className="py-4 px-4 text-gray-700 hidden md:table-cell">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {product.category.name}
          </span>
        </td>
        <td className="py-4 px-4 font-semibold text-gray-900">
          <div className="flex items-center">Rs. {product.price.toLocaleString()}</div>
        </td>
        <td className="py-4 px-4 text-gray-500 hidden lg:table-cell">
          <div className="flex items-center">
            <FiCalendar className="mr-1.5 text-gray-400" size={14} />
            {new Date(product.postedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </td>
        <td className="py-4 px-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColor}`}>
            {product.isBought ? <FiShoppingBag className="mr-1" size={12} /> : <div className="w-2 h-2 rounded-full bg-current mr-1.5"></div>}
            {statusText}
          </span>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center gap-2">
            <UpdateProductDetails buttonText="Update" productId={product.id} />
            <AlertBox
              id={product.id}
              buttonText="Delete"
              button1="Cancel"
              button2="Delete"
              question="Are you sure you want to delete this product?"
              description="The action is permanent and will delete the record"
              onAction={handleDelete}
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg text-sm flex items-center transition-colors ${
                isOpen ? "bg-gray-200 text-gray-800" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title="View Details"
            >
              {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </button>
          </div>
        </td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan={7} className="p-1">
            <div className="bg-gray-50 px-6 py-5 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="col-span-full mb-2">
                  <h3 className="font-semibold text-gray-800 flex items-center text-lg">
                    <FiInfo className="mr-2 text-blue-500" />
                    Product Details
                  </h3>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center mb-2 text-gray-500">
                    <FiBox className="mr-2" size={16} />
                    <span className="text-xs font-medium uppercase tracking-wide">Description</span>
                  </div>
                  <p className="text-sm text-gray-800 mt-1">{product.description || "No description provided"}</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center mb-2 text-gray-500">
                    <FiTag className="mr-2" size={16} />
                    <span className="text-xs font-medium uppercase tracking-wide">Condition</span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${conditionMap[product.status].color}`}
                  >
                    {conditionMap[product.status].text}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center mb-2 text-gray-500">
                    <FiTruck className="mr-2" size={16} />
                    <span className="text-xs font-medium uppercase tracking-wide">Delivery</span>
                  </div>
                  <p className={`text-sm font-medium mt-1 ${product.deliveryAvailable ? "text-green-600" : "text-red-600"}`}>
                    {product.deliveryAvailable ? "Available" : "Not Available"}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center mb-2 text-gray-500">
                    <FiMapPin className="mr-2" size={16} />
                    <span className="text-xs font-medium uppercase tracking-wide">Location</span>
                  </div>
                  <p className="text-sm text-gray-800 mt-1 flex items-center">
                    <FiNavigation className="mr-1 text-red-500" size={14} />
                    {product.address}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center mb-2 text-gray-500">
                    <FiCalendar className="mr-2" size={16} />
                    <span className="text-xs font-medium uppercase tracking-wide">Posted Date</span>
                  </div>
                  <p className="text-sm text-gray-800 mt-1">
                    {new Date(product.postedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center mb-2 text-gray-500">
                    <span className="text-xs font-medium uppercase tracking-wide">Product ID</span>
                  </div>
                  <p className="text-xs text-gray-600 font-mono mt-1 bg-gray-50 p-2 rounded-md truncate">{product.id}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
