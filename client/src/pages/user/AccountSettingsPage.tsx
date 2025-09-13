import { removeUser, setVerify } from "@/features/auth/authSlice";
import { changePassword, forgetPassword, verifyAccount } from "@/services/authServices";
import { getNotifications } from "@/services/notificationServices";
import { deactivateAccount, deleteAccount } from "@/services/userServices";
import type { AppDispatch, RootState } from "@/store/store";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AccountSettingsPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>
      {!user?.isVerified && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Verify Your Account</h2>
          <VerifyAccountSection />
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Change Password</h2>
        <ChangePasswordForm />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Deactivate Account</h2>
        <p className="text-gray-600 mb-4">Temporarily disable your account. You can reactivate it anytime by logging back in.</p>
        <DeactivateAccountButton />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Delete Account</h2>
        <p className="text-gray-600 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
        <DeleteAccountButton />
      </div>
    </div>
  );
};

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await changePassword({ oldPassword, newPassword });
      toast.success("Password Changed successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to Change the password");
    } finally {
      setOldPassword("");
      setNewPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showOldPassword ? "text" : "password"}
            id="currentPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2">
            {showOldPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2">
            {showNewPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        Change Password
      </button>
    </form>
  );
};

const DeactivateAccountButton = () => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleDeactivate = async (e: React.MouseEvent) => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    try {
      const response = await deactivateAccount();
      toast.success(response?.message || "Account deactivated successfully");
      dispatch(removeUser());
      navigate("/auth/login", { replace: true });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Account Deativation failed");
    }
  };

  return (
    <div>
      {isConfirming ? (
        <div className="flex items-center space-x-4">
          <p className="text-red-600 font-medium">Are you sure?</p>
          <button
            onClick={handleDeactivate}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Confirm Deactivation
          </button>
          <button
            onClick={() => setIsConfirming(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleDeactivate}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
        >
          Deactivate Account
        </button>
      )}
    </div>
  );
};

const DeleteAccountButton = () => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = async (e: React.MouseEvent) => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    try {
      const response = await deleteAccount();
      toast.success(response?.message || "Account deactivated successfully");
      dispatch(removeUser());
      navigate("/auth/login", { replace: true });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Account deletion failed");
    }
  };

  return (
    <div>
      {isConfirming ? (
        <div className="flex items-center space-x-4">
          <p className="text-red-600 font-medium">This action cannot be undone. Are you sure?</p>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Permanently Delete Account
          </button>
          <button
            onClick={() => setIsConfirming(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
        >
          Delete Account
        </button>
      )}
    </div>
  );
};

const VerifyAccountSection = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);

  const handleSendOtp = async () => {
    try {
      const response = await forgetPassword(user?.email!);
      setIsOtpSent(true);
      toast.success(response?.message || "OTP sent to your email");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await verifyAccount(otp);
      dispatch(setVerify());
      toast.success(response?.message || "Account verified successfully");
      await getNotifications();
      setIsVerifying(false);
      setIsOtpSent(false);
      setOtp("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div>
      {!isVerifying ? (
        <button
          onClick={() => setIsVerifying(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
        >
          Verify Your Account
        </button>
      ) : (
        <div className="space-y-4">
          {!isOtpSent ? (
            <div className="flex items-center space-x-4">
              <p className="text-gray-600">We'll send a verification code to your email</p>
              <button
                onClick={handleSendOtp}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                Send OTP
              </button>
              <button
                onClick={() => setIsVerifying(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtp} className="flex items-end space-x-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter verification code"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                Verify OTP
              </button>
              <button
                onClick={() => {
                  setIsVerifying(false);
                  setIsOtpSent(false);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountSettingsPage;
