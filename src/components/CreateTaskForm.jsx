import { useState } from "react";
import { CalendarDays, Flag, PlusCircle, X } from "lucide-react";
import { TASKS_API_END_POINT } from "../utils/constant.js"
import axios from "../api/axiosInstance.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTaskList } from "../redux/taskSlice";

const CreateTaskForm = ({ onClose }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    status: "in-progress",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {taskList} = useSelector((state) => state.task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${TASKS_API_END_POINT}/createTask`, task, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data?.success) {
        toast.success("Task created!");
       dispatch(setTaskList([res.data.task, ...taskList]));
        onClose();
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-2xl">
        <div className="bg-white p-6 lg:w-full lg:max-w-md rounded-xl shadow-xl w-[300px] mt-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <PlusCircle className="text-purple-600" />
              Create New Task
            </h2>
            <button
              onClick={() => {
                onClose();
              }}
            >
              <X className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer " />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Task Title
              </label>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className="w-full p-2 mt-1 rounded bg-gray-100 outline-none"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <span className="text-purple-600">☰</span> Description
              </label>
              <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                rows={3}
                placeholder="Add details about your task"
                className="w-full p-2 mt-1 rounded bg-gray-100 outline-none resize-none"
              />
            </div>

            {/* Priority & Due Date */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Flag className="w-4 h-4 text-pink-600" /> Priority
                </label>
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded bg-green-100 outline-none"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <CalendarDays className="w-4 h-4 text-purple-600" /> Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 rounded bg-gray-100 outline-none"
                />
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-4 mt-3">
              <label className="text-sm font-medium text-purple-700">
                Status
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="status"
                  value="completed"
                  checked={task.status === "completed"}
                  onChange={handleChange}
                />
                Completed
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="status"
                  value="in-progress"
                  checked={task.status === "in-progress"}
                  onChange={handleChange}
                />
                In Progress
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 mt-4 rounded font-medium hover:opacity-90"
            >
              + Create Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTaskForm;
