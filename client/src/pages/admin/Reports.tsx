import { EmptyMessage } from "@/components/common/EmptyMessage";
import PaginationWrapper from "@/components/common/PaginationWrapper";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useAllReports, useDeleteReport, useResolveReport } from "@/hooks/admin/useReports";
import type { ReportParams } from "@/types/admin/types";
import { useSearchParams } from "react-router-dom";
import { WarningButton } from "@/components/admin/modals/WarningButton";
import { Calendar, Filter, AlertCircle, CheckCircle, User, Flag } from "lucide-react";
import { ReportsDetails } from "@/components/admin/ReportDetails";

const Reports = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams: ReportParams = Object.fromEntries(searchParams.entries());
  queryParams.page ||= "1";
  queryParams.limit ||= "10";

  const { data, isLoading, error, refetch } = useAllReports(queryParams);
  const { mutate } = useDeleteReport();
  const { mutate: resolveMutate } = useResolveReport();

  const updateFilters = (key: string, value: string) => {
    const updated = new URLSearchParams(searchParams);
    value ? updated.set(key, value) : updated.delete(key);
    updated.set("page", "1");
    setSearchParams(updated);
  };

  const goToPage = (page: number) => {
    const updated = new URLSearchParams(searchParams);
    updated.set("page", String(page));
    setSearchParams(updated);
  };

  const handleReportDelete = (id: string) => {
    mutate({ id });
  };

  const handleResolveReport = (id: string) => {
    resolveMutate({ id });
  };

  if (error) return <ErrorMessage title="Failed to fetch reports" refetch={refetch} />;
  const reports = data?.data.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Report Management</h1>
            <p className="text-sm text-gray-500 mt-1">Review and manage all user-submitted reports</p>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
            Showing {reports?.length ?? 0} of {data?.data.total ?? 0} reports
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={queryParams.status || ""}
              onChange={(e) => updateFilters("status", e.target.value)}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="relative">
            <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 pl-9 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={queryParams.reportFor || ""}
              onChange={(e) => updateFilters("reportFor", e.target.value)}
            >
              <option value="">All Reports</option>
              <option value="user">User</option>
              <option value="product">Product</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <LoadingScreen title="Loading reports" subtitle="Loading report details..." />
        ) : reports && reports.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">#</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">Reason</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">Description</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider hidden md:table-cell">Reported For</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">Status</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider hidden lg:table-cell">Reported By</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">Created</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report, index) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-gray-500 font-medium">{(Number(queryParams.page) - 1) * Number(queryParams.limit) + index + 1}</td>
                      <td className="p-3 font-medium text-gray-800">{report.reason}</td>
                      <td className="p-3 text-gray-600 max-w-xs truncate"><ReportsDetails reason={report.reason} description={report.description}/></td>
                      <td className="p-3 text-gray-600 capitalize hidden md:table-cell">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {report.reportFor}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            report.status === "resolved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {report.status === "resolved" ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                          {report.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600 hidden lg:table-cell">
                        <div className="flex items-center">
                          <User className="h-3 w-3 text-gray-400 mr-1" />
                          <span>{report.reportedBy?.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-xs">{new Date(report.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col gap-2">
                          {report.status !== "resolved" && (
                            <button
                              onClick={() => handleResolveReport(report.id)}
                              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lg bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Resolve
                            </button>
                          )}
                          <WarningButton
                            id={report.id}
                            buttonText="Delete"
                            button1="Cancel"
                            button2="Confirm"
                            question="Are you sure you want to delete this report?"
                            description="This action will permanently remove the report from the database."
                            onAction={handleReportDelete}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyMessage title="Reports not found" description="No reports exist for the selected filters" />
        )}

        <div className="mt-6">
          {data && data.data ? (
            <PaginationWrapper totalPages={data.data.totalPages} currentPage={Number(queryParams.page)} goToPage={goToPage} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Reports;


