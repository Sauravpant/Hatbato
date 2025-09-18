import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type React from "react";
import { Eye, Tag, Calendar, FileText, Box } from "lucide-react";

interface ProductDetailsProps {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    status: string;
    categoryId: number;
    postedAt: string;
    imageUrl?: string;
  };
}

export const ProductInfo: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border-blue-200 flex items-center gap-1 transition-colors text-xs px-2 py-1"
        >
          <Eye className="h-3 w-3" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto p-0 rounded-lg border">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
          <div className="flex items-start gap-3">
            {product.imageUrl && (
              <div className="flex-shrink-0">
                <img src={product.imageUrl} alt={product.title} className="h-12 w-12 object-cover rounded-md border border-white shadow-xs" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-gray-900 truncate">{product.title}</h2>
              <p className="text-xs text-gray-600 mt-0.5">ID: #{product.id}</p>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
            </div>
            <div className="bg-gray-50 p-3 rounded-md border">
              <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-md border hover:shadow-xs transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div>
                  <h4 className="text-xs font-medium text-gray-700">Price</h4>
                  <p className="text-lg font-bold text-gray-900">Rs. {product.price}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded-md border hover:shadow-xs transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-green-100 rounded-md">
                  <Tag className="h-3.5 w-3.5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-700">Status</h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {product.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded-md border hover:shadow-xs transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-purple-100 rounded-md">
                  <Box className="h-3.5 w-3.5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-700">Category</h4>
                  <p className="text-xs text-gray-900">ID: {product.categoryId}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded-md border hover:shadow-xs transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-orange-100 rounded-md">
                  <Calendar className="h-3.5 w-3.5 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-700">Posted</h4>
                  <p className="text-xs text-gray-900">
                    {new Date(product.postedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
