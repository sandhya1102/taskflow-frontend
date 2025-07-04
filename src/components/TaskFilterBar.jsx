// components/TaskFilterBar.jsx
import { ListFilter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSortOrder, setPriorityFilter } from "../redux/taskSlice";

const TaskFilterBar = () => {
  const dispatch = useDispatch();
  const { sortOrder, priorityFilter } = useSelector((state) => state.task);

  return (
    <div className="bg-white p-4 m-4  rounded-xl shadow flex gap-2">
      <h3 className="lg:flex md:flex gap-2 items-center hidden">
        <ListFilter className="text-purple-600 " /> Sort by
      </h3>
      <select
        className="px-3 py-1 rounded-lg border border-gray-200 text-sm"
        value={sortOrder}
        onChange={(e) => dispatch(setSortOrder(e.target.value))}
      >
        <option value="">Sort by Date</option>
        <option value="new">Newest First</option>
        <option value="old">Oldest First</option>
      </select>
      <select
        className="px-3 py-1 rounded-lg border border-gray-200 text-sm"
        value={priorityFilter}
        onChange={(e) => dispatch(setPriorityFilter(e.target.value))}
      >
        <option value="">Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default TaskFilterBar;
