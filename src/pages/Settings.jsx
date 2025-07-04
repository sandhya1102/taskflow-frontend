import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskStatistics from "../components/TaskStatistics";
import Activity from "../components/Activity";
import { MoveLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SettingForms from "../components/SettingForms";

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <Navbar />

      <div className="flex lg:flex-row flex-col bg-gray-50">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-[90px] h-[calc(100vh-90px)] z-20">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row w-full lg:ml-[260px] mt-[120px] px-4 sm:px-6 pb-10 gap-6">
          {/* Settings Section */}
          <div className="flex-1">
            {/* Back Button and Header */}
            <div className="flex items-center mb-4">
              <MoveLeftIcon
                onClick={() => navigate("/")}
                className="text-purple-700 cursor-pointer"
              />
              <h1 className="text-xl font-medium ml-3">Back To Dashboard</h1>
            </div>

            {/* Profile Header */}
            <div className="flex items-center gap-3 mt-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-300 text-white font-bold text-xl">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-semibold">Account Settings</h1>
                <p className="text-sm text-gray-600">
                  Manage your profile and security settings
                </p>
              </div>
            </div>

            {/* Forms Section */}
            <div className="mt-6">
              <SettingForms />
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-6 lg:w-[300px]">
            <TaskStatistics />
            <Activity />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
