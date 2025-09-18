import type { CategoryDetails } from "@/types/category/types";
import { Box, Calendar } from "lucide-react";
import { WarningButton } from "./modals/WarningButton";
import { ProductInfo } from "./ProductInfo";

interface ProductsTableProps {
  products: any[];
  categories: CategoryDetails[];
  page: number;
  limit: number;
  deleteAction: (id: string) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ products, categories, page, limit, deleteAction }) => {
  const getCategoryName = (categoryId: number) => categories.find((cat) => cat.id === categoryId)?.name || "-";

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-200">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-gray-600 font-medium text-xs uppercase tracking-wider">#</th>
              <th className="p-3 text-left text-gray-600 font-medium text-xs uppercase tracking-wider">Product</th>
              <th className="p-3 text-left text-gray-600 font-medium text-xs uppercase tracking-wider">Price</th>
              <th className="p-3 text-left text-gray-600 font-medium text-xs uppercase tracking-wider">Status</th>
              <th className="p-3 text-left text-gray-600 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
              <th className="p-3 text-left text-gray-600 font-medium text-xs uppercase tracking-wider">Availability</th>
              <th className="p-3 text-left text-gray-600 font-medium text-xs uppercase tracking-wider hidden lg:table-cell">Posted</th>
              <th className="p-3 text-left text-gray-600 font-medium text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 text-gray-500 font-medium">{(page - 1) * limit + index + 1}</td>
                <td className="p-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Box className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.title}</p>
                      <p className="text-xs text-gray-500 md:hidden">{getCategoryName(product.categoryId)}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800">Rs. {product.price}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {product.status.replace("_", " ")}
                  </span>
                </td>
                <td className="p-3 text-gray-600 hidden md:table-cell">{getCategoryName(product.categoryId)}</td>
                <td className="p-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.isBought ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                  >
                    {product.isBought ? "Sold" : "Available"}
                  </span>
                </td>
                <td className="p-3 text-gray-600 hidden lg:table-cell">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-xs">{new Date(product.postedAt).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <ProductInfo product={product}/>
                    <WarningButton
                      id={product.id}
                      buttonText="Delete"
                      button1="Cancel"
                      button2="Confirm"
                      question="Are you sure you want to delete this product"
                      description="This action will remove the products from the database"
                      onAction={deleteAction}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
