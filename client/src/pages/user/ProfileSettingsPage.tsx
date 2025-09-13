import { removeProfilePicture, setProfilePicture, setUser } from "@/features/auth/authSlice";
import { deleteProfilePicture, updateProfile, updateProfilePicture } from "@/services/userServices";
import type { AppDispatch, RootState } from "@/store/store";
import { Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";

const ProfileSettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <CiUser className="h-6 w-6" />
        Profile Settings
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Picture</h2>
        <ProfileImageSection />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Information</h2>
        <ProfileInfoForm />
      </div>
    </div>
  );
};

const ProfileImageSection = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [profileImage, setProfileImage] = useState<string | null>(user?.imageUrl || null);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setLoadingUpdate(true);
      const response = await updateProfilePicture(file!);
      dispatch(setProfilePicture(response));
      setLoadingUpdate(false);
      toast.success("Profile Picture updated successfully");
    } catch (err: any) {
      toast.error("Failed to update profile picture");
      setLoadingUpdate(false);
      setProfileImage(user?.imageUrl || null);
    }
  };

  const handleDeleteImage = async () => {
    try {
      setLoadingDelete(true);
      const response = await deleteProfilePicture();
      dispatch(removeProfilePicture());
      setProfileImage(null);
      setLoadingDelete(false);
      toast.success(response.message || "Profile Picture update successfully");
    } catch (err: any) {
      setLoadingDelete(false);
      toast.error("Failed to delete profile picture");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="flex-shrink-0">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <CiUser className="h-16 w-16 text-gray-400" />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Update Profile Picture</label>
          <label className="cursor-pointer">
            <span className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 inline-block">
              {loadingUpdate ? <Loader className="animate-spin h-5 w-5 mx-auto" /> : "Choose Image"}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </span>
          </label>
        </div>

        <div>
          <button
            onClick={handleDeleteImage}
            disabled={!user?.imageUrl || loadingDelete}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
              profileImage ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loadingDelete ? <Loader className="animate-spin h-5 w-5 mx-auto" /> : "Delete Profile Picture"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileInfoForm = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState(user?.name || "");
  const [contactNumber, setContactNumber] = useState(user?.contactNumber || "");
  const [address, setAddress] = useState(user?.address || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: Record<string, string> = {};
    if (name.trim()) payload.name = name.trim();
    if (contactNumber.trim()) payload.contactNumber = contactNumber.trim();
    if (address.trim()) payload.address = address.trim();

    try {
      setLoading(true);
      const response = await updateProfile(payload);
      dispatch(setUser(response));
      toast.success("Profile updated successfully");
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder={user?.name || "Enter full name"}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="text"
            id="phone"
            value={contactNumber}
            placeholder={user?.contactNumber || "Enter contact number"}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            placeholder={user?.address || "Enter address"}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? <Loader className="animate-spin h-5 w-5 mx-auto" /> : "Update Profile"}
        </button>
      </div>
    </form>
  );
};

export default ProfileSettingsPage;
