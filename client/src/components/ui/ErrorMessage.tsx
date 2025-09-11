import React from "react";

interface ErrorMessageProps {
  title: string;
  refetch: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, refetch }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-4 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">Some Error Occured. Try again</p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md" onClick={() => refetch()}>
          Try Again
        </button>
      </div>
    </div>
  );
};
