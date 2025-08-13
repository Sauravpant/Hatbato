import { SquareArrowUpRight } from "lucide-react";
const data = [
  {
    id: 1,
    description: "Seamless buying and selling experience",
  },
  {
    id: 2,
    description: "Wide range of products and services in one place",
  },
  {
    id: 3,
    description: "Secure transactions with trusted payment options",
  },
  {
    id: 4,
    description: "Grow your business in just a click",
  },
];
export const SideScreen = () => {
  return (
    <div className="max-w-2xl w-full">
      <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
        Why Choose HatBato?
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {data.map((d) => (
          <div
            key={d.id}
            className="group relative overflow-hidden rounded-xl p-6 cursor-pointer bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-purple-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <SquareArrowUpRight className="w-8 h-8 mb-4 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
              <p className="text-lg text-gray-200 group-hover:text-white transition-colors duration-300">{d.description}</p>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400/50 rounded-xl transition-all duration-700 pointer-events-none">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 left-0 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-0 right-0 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: "0.3s" }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-purple-600/10 blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-indigo-600/10 blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
};
