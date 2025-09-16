import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useMyProducts } from "@/hooks/user/useProduct";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ProductRow } from "@/components/user/product/ProductRow";
import { EmptyMessage } from "@/components/common/EmptyMessage";

const ProductManagement = () => {
  const { isLoading, data, refetch, error } = useMyProducts();
  const navigate = useNavigate();
  const products = data?.data;

  if (products && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <EmptyMessage title="No Products" description="You havent listed any products yet" />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-1 md:py-2 lg:py-3 px-2 md:px-4 lg:px-6 rounded-xl text-base font-medium flex items-center justify-center mx-auto transition-colors shadow-md hover:shadow-lg cursor-pointer"
          onClick={() => navigate("/sell")}
        >
          <FiPlus className="mr-2" />
          Add Your First Product
        </button>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage title="Failed to fetch Products" refetch={refetch} />;
  }

  if (isLoading) {
    return <LoadingScreen title="Loading Your Products" subtitle="View all the products listed by you" />;
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Product Management</h1>
            <p className="text-gray-600 text-sm mt-2">Manage all your listed products in one place</p>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-xl text-sm font-medium flex items-center transition-colors shadow-md hover:shadow-lg"
            onClick={() => navigate("/sell")}
          >
            <FiPlus className="mr-2" size={16} />
            Add Product
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-600 border-b border-gray-200">
                  <th className="py-4 px-4 font-semibold text-xs uppercase tracking-wider">SN</th>
                  <th className="py-4 px-4 font-semibold text-xs uppercase tracking-wider">Product</th>
                  <th className="py-4 px-4 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="py-4 px-4 font-semibold text-xs uppercase tracking-wider">Price</th>
                  <th className="py-4 px-4 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Posted Date</th>
                  <th className="py-4 px-4 font-semibold text-xs uppercase tracking-wider">Status</th>
                  <th className="py-4 px-4 font-semibold text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products && products.map((product, index) => <ProductRow key={product.id} product={product} index={index} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
