import Activity from "./Activity";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Taskoverview from "./Taskoverview";
import TaskStatistics from "./TaskStatistics";

const Layout = () => {
  return (
    <>
      <Navbar />

      {/* Full page wrapper */}
      <div className="flex lg:flex-row flex-col bg-gray-50">
        {/* Sidebar fixed for larger screens */}
        <div className="fixed left-0 top-[90px] h-[calc(100vh-90px)] z-20">
          <Sidebar />
        </div>

        {/* Main Content Wrapper */}
        <div className="flex flex-col lg:flex-row w-full lg:ml-[260px] mt-[120px] px-4 sm:px-6 pb-10 gap-2">
          {/* Main Dashboard */}
          <div className="flex-1">
            <Taskoverview />
          </div>

          {/* Right Stats Section */}
          <div className="flex flex-col gap-6 lg:w-[300px]">
            <TaskStatistics />
            <Activity />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
