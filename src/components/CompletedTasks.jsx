import { Calendar1 } from "lucide-react";
import { useSelector } from "react-redux";

const CompletedTasks = () => {
  const { taskList, sortOrder, priorityFilter } = useSelector(
    (store) => store.task
  );

  let filteredTasks = taskList.filter(
    (task) => task.status?.toLowerCase() === "completed"
  );

  // Apply priority filter
  if (priorityFilter) {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority?.toLowerCase() === priorityFilter.toLowerCase()
    );
  }

  // Apply sort order
  if (sortOrder === "new") {
    filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOrder === "old") {
    filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center text-gray-500 bg-white p-10 rounded-2xl shadow">
        <img
          src="https://cdn-icons-gif.flaticon.com/14684/14684439.gif"
          alt="sad"
          className="w-20 h-20 mx-auto mb-4 text-purple-400"
          size={48}
        />
        <p className="text-lg font-semibold">No Completed Tasks Found</p>
        <p className="mb-4">Finish your pending task</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
      {filteredTasks.map((task) => (
        <div
          key={task._id}
          className="bg-white p-4 rounded-xl shadow-md border-l-4 border-purple-400"
        >
          <div className="flex">
            <h2 className="text-lg font-semibold text-purple-700">
              {task.title}
            </h2>
            <span
              className={`font-medium ml-4 text-sm px-2 py-1 rounded 
    ${task?.priority === "Low" ? "bg-green-100 text-green-600" : ""}
    ${task?.priority === "Medium" ? "bg-yellow-100 text-yellow-600" : ""}
    ${task?.priority === "High" ? "bg-red-100 text-red-600" : ""}`}
            >
              {task?.priority}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          <div className="flex justify-end items-center mt-3 text-sm text-gray-500">
            <p className="text-xs text-gray-400 flex items-center gap-2 justify-end">
              <Calendar1 className="w-5 h-5" /> {task?.dueDate?.slice(0, 10)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasks;
