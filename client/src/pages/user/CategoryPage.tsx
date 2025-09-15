import CategoryCard from "@/components/common/CategoryCard";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useGetCategory } from "@/hooks/user/useCategory";

const CategoryPage = () => {
  const { isLoading, data, error, refetch } = useGetCategory();

  if (error) {
    return <ErrorMessage title="Error fetching Categories..." refetch={refetch} />;
  }

  if (isLoading) {
    return <LoadingScreen title="Loading Categories" subtitle="Discover amazing products..." />;
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
