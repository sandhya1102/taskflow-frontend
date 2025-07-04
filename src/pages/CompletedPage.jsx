import { CheckCheckIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskStatistics from "../components/TaskStatistics";
import Activity from "../components/Activity";
import CompletedTasks from "../components/CompletedTasks";
import TaskFilterBar from "../components/TaskFilterBar";

const CompletedPage = () => {
  return (
    <>
      <Navbar />

      {/* Page Layout */}
      <div className="flex lg:flex-row flex-col bg-gray-50">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-[90px] h-[calc(100vh-90px)] z-20">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row w-full lg:ml-[260px] mt-[120px] px-4 sm:px-6 pb-10 gap-6">
          {/* Left Section */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex lg:flex-row flex-col items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCheckIcon className="text-purple-700" />
                <h1 className="text-2xl font-medium">Completed Tasks</h1>
              </div>
              <TaskFilterBar />
            </div>

            {/* Completed Task List */}
            <CompletedTasks />
          </div>

          {/* Right Stats Panel */}
          <div className="flex flex-col gap-6 lg:w-[300px]">
            <TaskStatistics />
            <Activity />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletedPage;
