import {
  ChartNetworkIcon,
  CircleCheckBig,
  CircleDashed,
  Loader2,
  Target,
} from "lucide-react";
import { useSelector } from "react-redux";

const TaskStatistics = () => {
  const { taskList } = useSelector((store) => store.task);

  const total = taskList?.length || 0;
  const pending =
    taskList?.filter((task) => task.status === "in-progress").length || 0;
  const completed =
    taskList?.filter((task) => task.status === "completed").length || 0;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="text-center text-gray-500
     bg-white p-10 rounded-2xl shadow">
      <div className="flex gap-2">
        <ChartNetworkIcon className="text-purple-600" />
        <h2 className="text-md font-semibold  bg-gradient-to-r from-purple-600 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent mb-4">
          Task Statistics
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
          <CircleDashed className="text-purple-500" />
          <p className="text-sm text-gray-500 mt-1">Total Tasks</p>
          <p className="text-lg font-bold text-purple-700">{total}</p>
        </div>

        <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
          <CircleCheckBig className="text-green-500" />
          <p className="text-sm text-gray-500 mt-1">Completed</p>
          <p className="text-lg font-bold text-green-600">{completed}</p>
        </div>

        <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
          <Loader2 className="text-yellow-500" />
          <p className="text-sm text-gray-500 mt-1">Pending</p>
          <p className="text-lg font-bold text-yellow-600">{pending}</p>
        </div>

        <div className="border rounded-lg p-3 flex flex-col items-center justify-center">
          <Target className="text-blue-500" />
          <p className="text-sm text-gray-500 mt-1 text-center">
            Completion Rate
          </p>
          <p className="text-lg font-bold text-blue-600">{completionRate}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">Task Progress</p>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-purple-500 h-2 rounded-full"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">
          {completed}/{total}
        </p>
      </div>
    </div>
  );
};

export default TaskStatistics;
