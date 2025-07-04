import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../api/axiosInstance.js";
import { USER_API_END_POINT } from "../utils/constant.js";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice.js";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onEventHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-gif.flaticon.com/15591/15591446.gif"
            alt="Taskflow"
            className="w-16 mx-auto"
          />
          <h2 className="text-2xl font-bold text-purple-700 mt-2">
            Log In to TaskFlow
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Welcome back! Please login to your account.
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={input.email}
              onChange={onEventHandler}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full mt-1 outline-none bg-gray-200 text-black p-2"
            />
          </div>

          {/* Password with toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                value={input.password}
                onChange={onEventHandler}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input input-bordered w-full mt-1 pr-10 outline-none bg-gray-200 text-black p-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-lg"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Remember me and forgot password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center cursor-pointer text-black">
              <input
                type="checkbox"
                className="checkbox checkbox-success text-black mr-2"
              />
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-400 p-2 text-white w-full mt-2 rounded-lg cursor-pointer 
             hover:bg-gradient-to-l hover:from-blue-800 hover:to-purple-500 hover:rounded-none transition-all duration-300"
          >
            Login
          </button>

          {/* Signup Redirect */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
