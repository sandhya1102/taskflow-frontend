import {
  UserCircle2,
  Lock,
  Mail,
  User,
  ShieldAlert,
  LogOutIcon,
} from "lucide-react";
import useLogout from "../hooks/useLogout";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axiosInstance";
import { USER_API_END_POINT } from "../utils/constant";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { setUser } from "../redux/authSlice";

const SettingForms = () => {
  const handleLogout = useLogout();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const { data } = await axios.put(
        `${USER_API_END_POINT}/updateProfile`,
        {
          name,
          email,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message || "Profile updated");
      dispatch(setUser(data.user));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col gap-5 ">
      {/* Personal Info */}
      <div className="p-6 bg-white rounded-2xl w-[290px] h-[280px]">
        <div className="flex gap-2 items-center mb-5">
          <UserCircle2 />
          <h1 className="text-md font-semibold">Personal Information</h1>
        </div>
        <form className="space-y-4" onSubmit={handleProfileUpdate}>
          <div>
            <label className="text-sm text-gray-600 flex items-center gap-1">
              <User className="w-4 h-4" /> Fullname
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-gray-100 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 flex items-center gap-1">
              <Mail className="w-4 h-4" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-gray-100 outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Security */}
      <div className="p-6 bg-white rounded-2xl w-[290px] h-[500px]">
        <div className="flex gap-2 items-center mb-5">
          <ShieldAlert />
          <h1 className="text-md font-semibold">Security</h1>
        </div>
        <form className="space-y-4" onSubmit={handleProfileUpdate}>
          <div>
            <label className="text-sm text-gray-600 flex items-center gap-1">
              <Lock className="w-4 h-4" /> Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-gray-100 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 flex items-center gap-1">
              <Lock className="w-4 h-4" /> New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-gray-100 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 flex items-center gap-1">
              <Lock className="w-4 h-4" /> Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-gray-100 outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
          >
            Change Password
          </button>

          <div className="mt-6 border-t border-gray-300 pt-4">
            <div className="flex gap-3">
              <LogOutIcon className="text-red-500" />
              <p className="text-red-500 font-semibold">Danger Zone</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full border border-red-500 text-red-500 hover:bg-red-50 py-2 mt-4 rounded cursor-pointer"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingForms;
