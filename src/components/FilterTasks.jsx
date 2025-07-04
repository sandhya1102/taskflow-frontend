import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredTasks } from "../redux/taskSlice";
import { AppWindow } from "lucide-react";

const FilterTasks = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const { taskList } = useSelector((store) => store.task);
  const dispatch = useDispatch();

  const today = new Date().toISOString().slice(0, 10);

  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case "High":
        return taskList.filter((task) => task.priority === "High");
      case "Medium":
        return taskList.filter((task) => task.priority === "Medium");
      case "Low":
        return taskList.filter((task) => task.priority === "Low");
      case "Today":
        return taskList.filter(
          (task) => task.dueDate?.slice(0, 10) === today
        );
      default:
        return taskList;
    }
  }, [activeFilter, taskList]);

  // Sync filtered tasks to Redux on change
  useEffect(() => {
    dispatch(setFilteredTasks(filteredTasks));
  }, [filteredTasks, dispatch]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-2xl shadow flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Title */}
      <div className="flex items-center gap-2 text-purple-700 font-semibold text-sm lg:text-base">
        <AppWindow className="w-5 h-5" />
        <p>All Tasks</p>
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden">
        <select
          value={activeFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="w-full p-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
        >
          {["All", "Today", "High", "Medium", "Low"].map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Filter Buttons */}
      <div className="hidden lg:flex gap-3 bg-gray-50 px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
        {["All", "Today", "High", "Medium", "Low"].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-4 py-1.5 rounded-full border transition-all duration-200
              ${
                activeFilter === filter
                  ? "bg-purple-100 border-purple-600 text-purple-700 font-semibold shadow"
                  : "border-transparent text-gray-600 hover:bg-purple-50 hover:text-purple-700"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTasks;
