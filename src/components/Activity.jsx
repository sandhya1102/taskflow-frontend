import { Timer } from "lucide-react";
import { useSelector } from "react-redux";
import moment from "moment";

const Activity = () => {
  const { taskList } = useSelector((store) => store.task);

  const recentTasks = [...(taskList || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md h-full ">
      <div className="flex gap-2 items-center mb-4">
        <Timer className="text-purple-600" />
        <h1 className="text-md font-semibold bg-gradient-to-r from-purple-600 via-blue-500 to-fuchsia-500 bg-clip-text text-transparent">
          Recent Activity
        </h1>
      </div>

      {/* Recent Task Activity List */}
      <div className="space-y-5">
        {recentTasks.length === 0 ? (
          <p className="text-gray-400 text-sm">No recent activity</p>
        ) : (
          recentTasks.map((task) => (
            <div
              key={task._id}
              className="border border-gray-200 rounded-lg p-2 hover:shadow transition"
            >
              <p className="text-sm font-semibold text-purple-700 truncate">
                {task.title}
              </p>
              <div className="text-xs text-gray-500 flex justify-between">
                <span>Status: {task.status}</span>
                <span>{moment(task.createdAt).fromNow()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Activity;
