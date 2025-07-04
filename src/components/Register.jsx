import axios from "../api/axiosInstance.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    }
    setInput({
      name: "",
      email: "",
      password: "",
    });
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
            Create an Account
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Register to start managing your tasks.
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {/* fullname */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fullname
            </label>
            <input
              value={input.name}
              onChange={onEventHandler}
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 outline-none bg-gray-200 text-black p-2 rounded"
            />
          </div>

          {/* Email */}
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
              className="w-full mt-1 outline-none bg-gray-200 text-black p-2 rounded"
            />
          </div>

          {/* Password */}
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
                placeholder="Create a strong password"
                className="input input-bordered w-full mt-1 pr-10 outline-none bg-gray-200 text-black p-2"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-lg"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-400 p-2 text-white w-full mt-2 rounded-lg cursor-pointer 
             hover:bg-gradient-to-l hover:from-blue-800 hover:to-purple-500 hover:rounded-none transition-all duration-300"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
