import {
  Calendar1,
  DeleteIcon,
  FileEditIcon,
  MoreVertical,
  NotepadText,
  Plus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useGetAllTasks from "../hooks/useGetAllTasks.js";
import { useState } from "react";
import axios from "../api/axiosInstance.js";
import { TASKS_API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import { setTaskList } from "../redux/taskSlice.js";
import EditTaskForm from "./EditTaskForm";

const AllTasks = ({ onClick, filteredTasks }) => {
  useGetAllTasks();
  const dispatch = useDispatch();
  const { taskList } = useSelector((store) => store.task);
  const [showMenu, setShowMenu] = useState(null);
  const [editingModalTask, setEditingModalTask] = useState(null);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${TASKS_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Task deleted successfully!");
        const updatedList = taskList.filter((task) => task._id !== id);
        dispatch(setTaskList(updatedList));
      } else {
        toast.error(res.data.message || "Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Something went wrong.");
    }
  };

  const handleStatusToggle = async (task) => {
  try {
    const updatedStatus =
      task.status === "completed" ? "in-progress" : "completed";

    const res = await axios.put(
      `${TASKS_API_END_POINT}/update/${task._id}`,
      { ...task, status: updatedStatus },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (res.data.success) {
      const updatedList = taskList.map((t) =>
        t._id === task._id ? res.data.task : t 
      );
      dispatch(setTaskList(updatedList));
      toast.success("Status updated!");
    }
  } catch (error) {
    console.error("Error toggling status:", error);
    toast.error("Failed to update status.");
  }
};


  if (!filteredTasks || filteredTasks.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500 bg-white p-10 rounded-2xl shadow h-full">
        <NotepadText className="mx-auto mb-4 text-purple-400" size={48} />
        <p className="text-lg font-semibold">No Tasks Found</p>
        <p className="mb-4">Start by creating your first task</p>
        <button
          onClick={onClick}
          className="flex items-center justify-center mx-auto bg-gradient-to-r from-purple-500 to-pink-400 rounded-3xl px-4 py-2 text-white hover:shadow-md transition-all"
        >
          <Plus className="w-5 mr-2" />
          <span>Add New Task</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:gap-6 gap-10">
      {filteredTasks.map((task) => (
        <div
          key={task._id}
          className="bg-white rounded-xl p-5 shadow-md border-l-4 border-purple-400 hover:shadow-lg transition"
        >
          <div className="relative flex justify-between items-start">
            <h2 className="text-xl font-semibold text-purple-700 ">
              {task?.title}
              <span
                className={`font-medium ml-4 text-sm px-2 py-1 rounded 
                  ${task?.priority === "Low" ? "bg-green-100 text-green-600" : ""}
                  ${task?.priority === "Medium" ? "bg-yellow-100 text-yellow-600" : ""}
                  ${task?.priority === "High" ? "bg-red-100 text-red-600" : ""}`}
              >
                {task?.priority}
              </span>
            </h2>

            <button
              onClick={() => handleStatusToggle(task)}
              className={`absolute -top-9 left-20  lg:static  lg:top-auto  lg:left-auto px-4 py-2 font-bold rounded text-white text-xs transition-all duration-200 shadow-sm cursor-pointer 
                ${
                  task.status === "completed"
                    ? "bg-gradient-to-r from-blue-600 to-blue-500"
                    : "bg-gradient-to-r from-red-600 to-red-500"
                }`}
            >
              {task.status === "completed" ? "Completed" : "In Progress"}
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-1">{task?.description}</p>

          <div className="mt-2 text-sm text-gray-500 flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <Calendar1 className="w-5 h-5" /> {task?.dueDate?.slice(0, 10)}
              </p>

              <div className="relative">
                <button
                  onClick={() =>
                    setShowMenu(showMenu === task._id ? null : task._id)
                  }
                >
                  <MoreVertical className="text-gray-500 hover:text-black cursor-pointer" />
                </button>
                {showMenu === task._id && (
                  <div className="absolute right-9 top-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-md z-10">
                    <button
                      className="w-full gap-2 px-4 py-2 text-left hover:bg-gray-100 flex text-sm cursor-pointer"
                      onClick={() => setEditingModalTask(task)}
                    >
                      <FileEditIcon className="w-5 h-5" /> Edit
                    </button>
                    <button
                      className="flex gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 text-sm cursor-pointer"
                      onClick={() => handleDelete(task._id)}
                    >
                      <DeleteIcon className="w-5 h-5" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {editingModalTask && (
        <EditTaskForm
          task={editingModalTask}
          onClose={() => setEditingModalTask(null)}
        />
      )}
    </div>
  );
};

export default AllTasks;
