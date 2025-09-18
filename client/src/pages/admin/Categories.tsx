import { useAllCategories, useDeleteCategory } from "@/hooks/admin/useCategories";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { CreateNewCategory, UpdateCategoryInfo } from "@/components/admin/CategoryComponents";
import { WarningButton } from "@/components/admin/modals/WarningButton";
import { Loader2, FolderOpen, Calendar } from "lucide-react";

const Categories = () => {
  const { data, isLoading, error, refetch } = useAllCategories();
  const { mutate } = useDeleteCategory();
  const categories = data?.data || [];

  if (error) {
    return <ErrorMessage title="Error fetching categories" refetch={refetch} />;
  }
  const handleCategoryDelete = (id: string) => {
    mutate({ id });
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FolderOpen className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
              <p className="text-sm text-gray-500 mt-1">Manage product categories and organization</p>
            </div>
          </div>
          <CreateNewCategory />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
          </div>
        )}

        {!isLoading && !error && (
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Slug</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Slogan</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <FolderOpen className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <p className="font-medium text-gray-900">{cat.name}</p>
                            <p className="text-xs text-gray-500 md:hidden">{cat.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{cat.slug}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{cat.slogan}</td>
                      <td className="px-4 py-3 text-gray-600 hidden xl:table-cell max-w-xs truncate">{cat.description}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(cat.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <UpdateCategoryInfo categoryId={cat.id} />
                          <WarningButton
                            buttonText="Delete"
                            button1="Cancel"
                            button2="Confirm"
                            question="Are you sure you want to delete this category"
                            description="This action will remove all the category details from the database"
                            id={cat.id}
                            onAction={handleCategoryDelete}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {categories.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center">
                        <div className="text-gray-400 flex flex-col items-center">
                          <FolderOpen className="h-12 w-12 mb-2" />
                          <p className="text-sm">No categories found</p>
                          <p className="text-xs mt-1">Create your first category to get started</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
