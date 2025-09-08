import type { CategoryDetails } from "@/types/category/types";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ data }: { data: CategoryDetails }) => {

  const navigate = useNavigate();

  const handleCategory = (category: string) => {
    navigate(`/products/${category}`);
  };

  const getCategoryColor = (name: string) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-green-500 to-green-600",
      "from-purple-500 to-purple-600",
      "from-amber-500 to-amber-600",
      "from-rose-500 to-rose-600",
      "from-indigo-500 to-indigo-600",
      "from-cyan-500 to-cyan-600",
      "from-emerald-500 to-emerald-600",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const gradientClass = getCategoryColor(data.name);

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer border border-gray-100 group"
      onClick={() => handleCategory(data.slug)}
    >
      <div
        className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-2 bg-gradient-to-br ${gradientClass} group-hover:scale-110 transition-transform duration-300`}
      >
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="text-2xl text-white">📦</span>
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">{data.name}</h1>
      </div>
      <div className="h-12 overflow-hidden">
        <p className="text-sm text-gray-600 font-medium leading-tight">{data.slogan}</p>
      </div>
      <div className="h-16 overflow-hidden">
        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{data.description}</p>
      </div>
      <div className="w-full pt-4 border-t border-gray-100 mt-2">
        <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors flex items-center justify-center gap-1">
          Browse <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
