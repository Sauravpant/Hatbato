import { EmptyMessage } from "@/components/common/EmptyMessage";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useAllReports, useDeleteReport } from "@/hooks/user/useReport";
import { AlertTriangle, X, Calendar, User, Package, FileText, Shield } from "lucide-react";

const ReportsManagement = () => {
  const { data, isLoading, error, refetch } = useAllReports();
  const { mutate } = useDeleteReport();

  if (error) {
    return <ErrorMessage title="Error fetching reports. Try again" refetch={refetch} />;
  }
  if (isLoading) {
    return <LoadingScreen title="Fetching your reports" subtitle="View all the reports done by you" />;
  }
  const reports = data?.data;
  if (reports?.length === 0) {
    return <EmptyMessage title="No reports found" description="You haven't reported any user" />;
  }

  const handleCancelReport = (id: string) => {
    mutate({ reportId: id });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Your Reports</h2>
            <p className="text-sm text-gray-500 mt-1">Manage all the reports you've submitted</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/60">
            <tr>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reason</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Product ID</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">User ID</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Date</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/80">
            {reports &&
              reports.map((report, index) => (
                <tr key={report.id} className="hover:bg-gray-50/50 transition-colors duration-200 group">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-700 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-blue-50 rounded-md">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{report.reason}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200/60">
                      <Shield className="w-3.5 h-3.5" />
                      {report.reportFor}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-gray-100 rounded">
                        <Package className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      {report.reportedProductId ? (
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-md">{report.reportedProductId}</span>
                      ) : (
                        <span className="text-gray-400 italic">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-gray-100 rounded">
                        <User className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      {report.reportedUserId ? (
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-md">{report.reportedUserId}</span>
                      ) : (
                        <span className="text-gray-400 italic">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    <div className="flex items-center gap-2 bg-gray-100/50 px-2.5 py-1.5 rounded-lg">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-medium">{new Date(report.createdAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 border border-gray-200 shadow-xs cursor-pointer flex items-center gap-2 group-hover:border-red-200 transition-all duration-200"
                      onClick={() => handleCancelReport(report.id)}
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsManagement;
