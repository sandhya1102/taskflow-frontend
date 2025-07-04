// src/hooks/useLogout.js
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "../api/axiosInstance";
import toast from "react-hot-toast";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      toast.success(res.data?.message || "Logout successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return handleLogout;
};

export default useLogout;
