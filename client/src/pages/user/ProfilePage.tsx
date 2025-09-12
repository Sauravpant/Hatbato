import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { CheckCircle, XCircle, Calendar, MapPin, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center p-4 bg-blue-50">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-sm">
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 p-5 text-center">
          <div className="flex justify-center mb-3">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/20 p-1">
                <div className="bg-white rounded-full p-1">
                  {user?.imageUrl ? (
                    <img src={user.imageUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                </div>
              </div>
              {user?.isVerified && (
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
                  <CheckCircle className="w-4 h-4 text-green-500" fill="currentColor" />
                </div>
              )}
            </div>
          </div>

          <h1 className="text-lg font-semibold text-white">{user?.name}</h1>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center p-2.5 bg-blue-50 rounded-lg">
            <div className="bg-blue-100 p-1.5 rounded-full mr-3">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div>
              <p className="text-[11px] text-gray-500">Email</p>
              <p className="text-xs font-medium text-gray-800">{user?.email}</p>
            </div>
          </div>

          {user?.contactNumber && (
            <div className="flex items-center p-2.5 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 p-1.5 rounded-full mr-3">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div>
                <p className="text-[11px] text-gray-500">Phone Number</p>
                <p className="text-xs font-medium text-gray-800">+977 {user.contactNumber}</p>
              </div>
            </div>
          )}

          {user?.address && (
            <div className="flex items-center p-2.5 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 p-1.5 rounded-full mr-3">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div>
                <p className="text-[11px] text-gray-500">Address</p>
                <p className="text-xs font-medium text-gray-800">{user.address}</p>
              </div>
            </div>
          )}

          <div className="flex items-center p-2.5 bg-blue-50 rounded-lg">
            <div className="bg-blue-100 p-1.5 rounded-full mr-3">
              {user?.isVerified ? <CheckCircle className="w-3.5 h-3.5 text-green-600" /> : <XCircle className="w-3.5 h-3.5 text-red-600" />}
            </div>
            <div>
              <p className="text-[11px] text-gray-500">Status</p>
              <p className="text-xs font-medium text-gray-800">{user?.isVerified ? "Verified" : "Not Verified"}</p>
            </div>
          </div>

          {user?.createdAt && (
            <div className="flex items-center p-2.5 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 p-1.5 rounded-full mr-3">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div>
                <p className="text-[11px] text-gray-500">Joined</p>
                <p className="text-xs font-medium text-gray-800">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 pt-0 flex gap-2">
          <button
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-3 rounded-lg text-sm font-medium cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/settings");
            }}
          >
            Edit Profile
          </button>
          <button
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/settings");
            }}
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
