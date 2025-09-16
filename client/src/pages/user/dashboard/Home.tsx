import { useGetUserStats } from "@/hooks/user/useUser";
import { useGetNotifications } from "@/hooks/user/useNotification";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { EmptyMessage } from "@/components/common/EmptyMessage";
import { FiBell, FiBox, FiAlertCircle, FiStar, FiShoppingCart, FiTruck, FiTrendingUp } from "react-icons/fi";

const Home = () => {
  const { data: statsRes, isLoading: statsLoading, error: statsError, refetch: statsRefetch } = useGetUserStats();
  const { data: notificationsRes, isLoading: notifLoading, error: notifError, refetch: notifRefetch } = useGetNotifications();

  if (statsLoading || notifLoading) return <LoadingScreen title="Loading dashboard" subtitle="Fetching your stats and notifications..." />;
  if (statsError) return <ErrorMessage title="Failed to fetch user stats" refetch={statsRefetch} />;
  if (notifError) return <ErrorMessage title="Failed to fetch notifications" refetch={notifRefetch} />;

  const stats = statsRes?.data;
  const notifications = notificationsRes || [];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center gap-2 text-gray-500">
          <FiTrendingUp className="w-5 h-5" />
          <span className="text-sm font-medium">Real-time Stats</span>
        </div>
      </div>
      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
              <FiBox className="text-blue-600 text-xl md:text-2xl" />
            </div>
            <span className="text-2xl font-bold text-blue-600">{stats?.totalProducts || 0}</span>
          </div>
          <h3 className="text-gray-500 text-sm mt-4 font-medium">Products Listed</h3>
          <p className="text-xs text-gray-400 mt-1">Total items in your catalog</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-200">
              <FiAlertCircle className="text-red-600 text-xl md:text-2xl" />
            </div>
            <span className="text-2xl font-bold text-red-600">{stats?.totalReportsMade || 0}</span>
          </div>
          <h3 className="text-gray-500 text-sm mt-4 font-medium">Reports Made</h3>
          <p className="text-xs text-gray-400 mt-1">Issues reported by you</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors duration-200">
              <FiStar className="text-amber-600 text-xl md:text-2xl" />
            </div>
            <span className="text-2xl font-bold text-amber-600">{stats?.totalReviewsReceived || 0}</span>
          </div>
          <h3 className="text-gray-500 text-sm mt-4 font-medium">Reviews Received</h3>
          <p className="text-xs text-gray-400 mt-1">Feedback from customers</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors duration-200">
              <FiShoppingCart className="text-green-600 text-xl md:text-2xl" />
            </div>
            <span className="text-2xl font-bold text-green-600">{stats?.productsBought || 0}</span>
          </div>
          <h3 className="text-gray-500 text-sm mt-4 font-medium">Products Bought</h3>
          <p className="text-xs text-gray-400 mt-1">Your purchases</p>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors duration-200">
              <FiShoppingCart className="text-purple-600 text-xl md:text-2xl" />
            </div>
            <span className="text-2xl font-bold text-purple-600">{stats?.totalOrdersMade || 0}</span>
          </div>
          <h3 className="text-gray-500 text-sm mt-4 font-medium">Orders Made</h3>
          <p className="text-xs text-gray-400 mt-1">Your purchase orders</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors duration-200">
              <FiTruck className="text-indigo-600 text-xl md:text-2xl" />
            </div>
            <span className="text-2xl font-bold text-indigo-600">{stats?.totalOrdersReceived || 0}</span>
          </div>
          <h3 className="text-gray-500 text-sm mt-4 font-medium">Orders Received</h3>
          <p className="text-xs text-gray-400 mt-1">Orders from customers</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors duration-200">
              <FiStar className="text-amber-600 text-xl md:text-2xl" />
            </div>
            <span className="text-2xl font-bold text-amber-600">{stats?.totalReviewsGiven || 0}</span>
          </div>
          <h3 className="text-gray-500 text-sm mt-4 font-medium">Reviews Given</h3>
          <p className="text-xs text-gray-400 mt-1">Your feedback to others</p>
        </div>
      </section>
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 md:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FiBell className="text-gray-600" />
            </div>
            Notifications
          </h2>
          {notifications.length > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">{notifications.length} New</span>
          )}
        </div>

        {notifications.length === 0 ? (
          <EmptyMessage title="No new notifications" description="You have no notifications yet" />
        ) : (
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li key={n.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50/50 transition-colors duration-150 group">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm md:text-base">{n.message}</p>
                    <p className="text-gray-400 text-xs mt-1.5">{new Date(n.createdAt).toLocaleString()} ago</p>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 mt-1.5 group-hover:animate-pulse"></div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Home;
