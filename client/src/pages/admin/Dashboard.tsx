import React from "react";
import { useUserStats, useProductStats, useOrderStats, useReportStats, useCategoryInfo } from "@/hooks/admin/useDashboard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, CartesianGrid, Area } from "recharts";

const COLORS = ["#4F46E5", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#F97316", "#14B8A6", "#22D3EE", "#A3E635", "#EAB308"];

const Dashboard = () => {
  const { data: userData } = useUserStats();
  const { data: productData } = useProductStats();
  const { data: orderData } = useOrderStats();
  const { data: reportData } = useReportStats();
  const { data: categoryData } = useCategoryInfo();

  const userChart = userData
    ? [
        { name: "Active Users", value: userData.data.activeUsers },
        { name: "Inactive Users", value: userData.data.inactiveUsers },
      ]
    : [];

  const productChart = productData
    ? [
        { name: "Sold Products", value: productData.data.sold },
        { name: "Unsold Products", value: productData.data.unsold },
      ]
    : [];

  const orderChart = orderData
    ? [
        { name: "Accepted", value: orderData.data.acceptedOrders },
        { name: "Rejected", value: orderData.data.rejectedOrders },
        { name: "Pending", value: orderData.data.totalOrders - orderData.data.acceptedOrders - orderData.data.rejectedOrders },
      ]
    : [];

  const reportChart = reportData
    ? [
        { name: "Resolved", value: reportData.data.resolvedReports },
        { name: "Pending", value: reportData.data.pendingReports },
      ]
    : [];

  const categoryChart = categoryData ? categoryData.data.map((ctg) => ({ name: ctg.name, value: ctg.products.length })) : [];

  const usersOverMonth =
    userData?.data.registrationsOverMonth.map((reg) => ({
      name: reg.date,
      value: reg.count,
    })) || [];

  const totalUsers = userData?.data.totalUsers ?? 0;
  const totalProducts = productData?.data.totalProducts ?? 0;
  const totalReports = reportData?.data.totalReports ?? 0;
  const totalOrders = orderData?.data.totalOrders ?? 0;

  return (
    <div className="p-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <BarChartCard title="Users Overview" total={totalUsers} data={userChart} />
      <BarChartCard title="Products Overview" total={totalProducts} data={productChart} />
      <AreaChartCard title="User Registrations" total={totalUsers} data={usersOverMonth} />
      <BarChartCard title="Orders Overview" total={totalOrders} data={orderChart} />
      <BarChartCard title="Reports Overview" total={totalReports} data={reportChart} />
      <PieChartCard title="Category Overview" total={totalProducts} data={categoryChart} />
    </div>
  );
};

export default Dashboard;

interface ThinBarChartProps {
  title: string;
  total: number;
  data: { name: string; value: number }[];
  height?: number;
}

const BarChartCard: React.FC<ThinBarChartProps> = ({ title, total, data, height = 180 }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 w-full transition-all hover:shadow-md">
    <h3 className="text-base font-semibold text-gray-800 mb-1">{title}</h3>
    <div className="text-xs text-gray-500 mb-3 font-medium">Total: {total}</div>
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} barCategoryGap="40%" barGap={4}>
        <XAxis dataKey="name" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            fontSize: "12px",
          }}
        />
        <Bar dataKey="value" barSize={20} radius={[4, 4, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

interface PieChartCardProps {
  title: string;
  total: number;
  data: { name: string; value: number }[];
  height?: number;
}

const PieChartCard: React.FC<PieChartCardProps> = ({ title, total, data, height = 215 }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 w-full transition-all hover:shadow-md">
    <h3 className="text-base font-semibold text-gray-800 mb-1">{title}</h3>
    <div className="text-xs text-gray-500 mb-3 font-medium">Total: {total}</div>
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={60}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            fontSize: "12px",
          }}
        />
        <Legend verticalAlign="bottom" height={45} iconSize={5} fontSize={5} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

interface AreaChartCardProps {
  title: string;
  total: number;
  data: { name: string; value: number }[];
  height?: number;
}

const AreaChartCard: React.FC<AreaChartCardProps> = ({ title, total, data, height = 200 }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 w-full transition-all hover:shadow-md">
    <h3 className="text-base font-semibold text-gray-800 mb-1">{title}</h3>
    <div className="text-xs text-gray-500 mb-3 font-medium">Total: {total}</div>
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey="name" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            fontSize: "12px",
          }}
        />
        <Area type="monotone" dataKey="value" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.2} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
