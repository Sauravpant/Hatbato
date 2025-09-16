import { FiBox } from "react-icons/fi";

interface EmptyScreenProps {
  title: string;
  description: string;
}

export const EmptyMessage: React.FC<EmptyScreenProps> = ({ title, description }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-sm w-full text-center bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
        <div className="mx-auto h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
          <FiBox className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
        </div>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex justify-center">
          <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
