import { HomeIcon, Clock, CheckCircle, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItemClass = (path, activeClasses, hoverClasses) =>
    `w-full flex items-center gap-3 px-4 py-2 rounded-2xl transition-all cursor-pointer 
    ${location.pathname === path ? activeClasses : hoverClasses}`;

  const SidebarContent = () => (
    <div className="space-y-2">
      <button
        onClick={() => {
          navigate("/");
          setIsOpen(false);
        }}
        className={navItemClass(
          "/",
          "bg-gray-100 border-l-8 border-purple-600",
          "hover:bg-gray-100"
        )}
      >
        <HomeIcon size={18} className="text-purple-600" />
        <span className="text-gray-800 font-medium">Dashboard</span>
      </button>

      <button
        onClick={() => {
          navigate("/pendingPage");
          setIsOpen(false);
        }}
        className={navItemClass(
          "/pendingPage",
          "bg-yellow-100 border-l-8 border-yellow-500",
          "hover:bg-yellow-100"
        )}
      >
        <Clock size={18} className="text-yellow-600" />
        <span className="text-gray-800 font-medium">Pending Tasks</span>
      </button>

      <button
        onClick={() => {
          navigate("/completedPage");
          setIsOpen(false);
        }}
        className={navItemClass(
          "/completedPage",
          "bg-green-100 border-l-8 border-green-500",
          "hover:bg-green-100"
        )}
      >
        <CheckCircle size={18} className="text-green-600" />
        <span className="text-gray-800 font-medium">Completed Tasks</span>
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-[90px] h-[calc(100vh-90px)] w-[260px] bg-white shadow-lg px-4 py-6 z-60 flex-col justify-between">
        <div>
          {/* Profile Info */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-300 text-white font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-fuchsia-300 bg-clip-text text-transparent">
                Hi, {user?.name}
              </h1>
              <p className="text-sm font-semibold text-purple-500">
                Conquer your to-dos!
              </p>
            </div>
          </div>
          <hr className="mb-6 border-gray-300" />
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden px-4 py-3 fixed top-[90px] right-0 z-50">
        <button
          className="bg-purple-500 rounded-full p-2 text-white shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed top-[90px] left-0 w-[85%] max-w-[280px] h-[calc(100vh-90px)] bg-white shadow-xl px-4 py-6 z-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-300 text-white font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-fuchsia-300 bg-clip-text text-transparent">
                Hi, {user?.name}
              </h1>
              <p className="text-sm font-semibold text-purple-500">
                Conquer your to-dos!
              </p>
            </div>
          </div>
          <SidebarContent />
        </div>
      )}
    </>
  );
};

export default Sidebar;
