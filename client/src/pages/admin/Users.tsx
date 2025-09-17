import { EmptyMessage } from "@/components/common/EmptyMessage";
import PaginationWrapper from "@/components/common/PaginationWrapper";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/input";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useAllUsers, useDeleteUser } from "@/hooks/admin/useUsers";
import type { UserParams } from "@/types/admin/types";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { WarningButton } from "@/components/admin/modals/WarningButton";
import { Search, User, Mail, Phone, MapPin, Calendar, Shield, ShieldOff } from "lucide-react";

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const queryParams: UserParams = Object.fromEntries(searchParams.entries());
  queryParams.page ||= "1";
  queryParams.limit ||= "10";

  const { data, isLoading, error, refetch } = useAllUsers(queryParams);
  const { mutate } = useDeleteUser();

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

  // Debouncing (Improves performance as each key stroke leads to api call without debouncing)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters("search", searchTerm);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleuserDelete = (id: string) => {
    mutate({ id });
  };

  if (error) return <ErrorMessage title="Failed to fetch users" refetch={refetch} />;
  const users = data?.data.users;
  if (!isLoading && (!users || users.length === 0)) return <EmptyMessage title="Users not found" description="No users exist" />;

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-4">
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">User Management</h1>
            <p className="text-sm text-gray-500 mt-1">View and Manage all system users</p>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
            Showing {users && users.length} of {data && data.data.total} users
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search users by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-2 text-sm"
            />
          </div>
        </div>

        {isLoading ? (
          <LoadingScreen title="Loading users" subtitle="Loading user details..." />
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">#</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">User</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider hidden md:table-cell">ID</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">Contact</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider hidden lg:table-cell">Email</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider hidden xl:table-cell">Address</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">Status</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider hidden lg:table-cell">Joined</th>
                    <th className="p-3 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users && users.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-gray-500">{(Number(queryParams.page) - 1) * Number(queryParams.limit) + index + 1}</td>
                      <td className="p-3">
                        <div className="flex items-center">
                          {user.imageUrl ? (
                            <img src={user.imageUrl || undefined} alt={user.name.charAt(0)} className="h-10 w-10 rounded-full" />
                          ) : (
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                          )}
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500 md:hidden">{user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600 hidden md:table-cell">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{user.id}</span>
                      </td>
                      <td className="p-3 text-gray-600">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{user.contactNumber}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600 hidden lg:table-cell">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="truncate max-w-[160px]">{user.email}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600 hidden xl:table-cell">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1 flex-shrink-0" />
                          <span className="truncate max-w-[180px]">{user.address}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                        >
                          {user.isVerified ? (
                            <>
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </>
                          ) : (
                            <>
                              <ShieldOff className="h-3 w-3 mr-1" />
                              Not Verified
                            </>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-gray-600 hidden lg:table-cell">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <WarningButton
                          id={user.id}
                          buttonText="Delete"
                          button1="Cancel"
                          button2="Confirm"
                          question="Are you sure you want to delete this user?"
                          description="This action will remove all the records related to this user from the database"
                          onAction={handleuserDelete}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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

export default Users;
