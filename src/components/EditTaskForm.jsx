import { Edit, X } from "lucide-react";
import { TASKS_API_END_POINT } from "../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axiosInstance.js";
import toast from "react-hot-toast";
import { setTaskList } from "../redux/taskSlice";
import { useState } from "react";

const EditTaskForm = ({ task, onClose }) => {
  const [editedTask, setEditedTask] = useState({ ...task });
  const { taskList } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${TASKS_API_END_POINT}/update/${task._id}`,
        editedTask,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data?.success) {
        toast.success("Task updated!");
        const updatedList = taskList.map((t) =>
          t._id === task._id ? res.data.task : t
        );
        dispatch(setTaskList(updatedList));
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-6 lg:w-full lg:max-w-md rounded-xl shadow-xl w-[300px]">
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Edit className="text-purple-500" />
            <h2 className="text-xl font-bold text-gray-900">Edit Task</h2>
          </div>
          <X onClick={onClose} className="cursor-pointer hover:text-red-500" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-100 outline-none border-none"
            placeholder="Title"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 rounded bg-gray-100 outline-none border-none"
            placeholder="Description"
          />
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className="w-full p-2 rounded bg-green-100 outline-none border-none"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate?.slice(0, 10)}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 outline-none border-none"
          />
          <button
            type="submit"
            className=" w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 mt-4 rounded font-medium hover:opacity-90"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
