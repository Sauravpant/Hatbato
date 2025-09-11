import Spinner from "./Spinner";

interface LoadingScreenProps {
  title: string;
  subtitle: string | undefined;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <Spinner />
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};
