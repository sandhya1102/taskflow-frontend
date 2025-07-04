import { Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskStatistics from "../components/TaskStatistics";
import Activity from "../components/Activity";
import PendingTasks from "../components/PendingTasks";
import TaskFilterBar from "../components/TaskFilterBar";

const PendingPage = () => {
  return (
    <>
      <Navbar />

      {/* Full page wrapper */}
      <div className="flex lg:flex-row flex-col bg-gray-50">
        {/* Sidebar fixed on large screens */}
        <div className="fixed left-0 top-[90px] h-[calc(100vh-90px)] z-20">
          <Sidebar />
        </div>

        {/* Main content & right panel */}
        <div className="flex flex-col lg:flex-row w-full lg:ml-[260px] mt-[120px] px-4 sm:px-6 pb-10 gap-6">
          {/* Main Section */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="text-purple-700" />
                <h1 className="lg:text-2xl text-xl font-medium">Pending Tasks</h1>
              </div>
              <TaskFilterBar />
            </div>

            {/* Pending Task List */}
            <PendingTasks />
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-6 lg:w-[300px]">
            <TaskStatistics />
            <Activity />
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingPage;
