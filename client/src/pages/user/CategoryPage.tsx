import CategoryCard from "@/components/common/CategoryCard";
import Spinner from "@/components/ui/Spinner";
import { getCategory } from "@/services/categoryServices";
import type { CategoryDetails } from "@/types/category/types";
import { useQuery } from "@tanstack/react-query";

const CategoryPage = () => {
  const { isLoading, data, error, refetch } = useQuery<CategoryDetails[]>({
    queryKey: ["category"],
    queryFn: getCategory,
    staleTime:Infinity, 
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-4 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to load categories</h2>
          <p className="text-gray-600 mb-4">Please check your connection and try again</p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md" onClick={() => refetch()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Spinner />
          <h2 className="text-xl font-semibold text-gray-700">Loading Categories</h2>
          <p className="text-gray-500 mt-1">Discover amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Browse Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Explore our diverse range of products and find exactly what you need</p>
        </div>

        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data.map((category) => (
              <CategoryCard key={category.id} data={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
            <div className="text-gray-300 text-6xl mb-4">📂</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No categories available</h3>
            <p className="text-gray-500">New categories will be added soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
