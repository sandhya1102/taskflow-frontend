import { useState } from "react";
import { Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout.js";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const toggleDropdown = () => setShowDropdown(!showDropdown); 

  const handleLogout = useLogout();

  return (
    <div className="fixed z-60 top-0 left-0 right-0 bg-white h-[90px] shadow-sm flex justify-between items-center px-6">
      {/* Left logo */}
      <div onClick={() => navigate("/")} className="">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-fuchsia-300 bg-clip-text text-transparent animate-gradient-x">
          Task<span className="">Flow.</span>
        </h1>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-6 relative">
        {/* Settings Icon */}
        <Settings
          onClick={() => navigate("/settings")}
          className="hover:text-black cursor-pointer hidden lg:block md:block sm:block"
          size={24}
        />

        {/* Profile with dropdown */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer "
            onClick={toggleDropdown}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-300 text-white font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 shadow-lg rounded-md p-2 z-50 bg-white">
              <button
                onClick={() => navigate("/settings")}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 hover:text-black rounded-md"
              >
                <Settings size={16} /> Profile Setting
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
              >
                <LogOut size={16} className="text-red-600" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
