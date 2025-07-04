import { Flame, Home } from "lucide-react";
import { useSelector } from "react-redux";

const SummaryCards = () => {
  const { taskList } = useSelector((store) => store.task);

  const total = taskList?.length || 0;
  const low = taskList?.filter((task) => task.priority === "Low").length || 0;
  const medium =
    taskList?.filter((task) => task.priority === "Medium").length || 0;
  const high = taskList?.filter((task) => task.priority === "High").length || 0;

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-2 grid-cols-1 flex-wrap justify-around gap-4 items-center mt-6 ">
      {/* Total */}
      <div className="bg-white p-3 flex gap-4 rounded-2xl items-center shadow-md min-w-[150px]">
        <p className="bg-purple-100 p-2 rounded-xl">
          <Home className="text-purple-600 w-5 h-5" />
        </p>
        <div>
          <p className="text-purple-500 font-bold text-2xl">{total}</p>
          <h3 className="text-sm text-gray-700">Total Tasks</h3>
        </div>
      </div>

      {/* Low Priority */}
      <div className="bg-white p-3 flex gap-4 rounded-2xl items-center shadow-md min-w-[150px]">
        <p className="bg-green-100 p-2 rounded-xl">
          
          <Flame className="text-green-600 w-5 h-5" />
        </p>
        <div>
          <p className="text-green-500 font-bold text-2xl">{low}</p>
          <h3 className="text-sm text-gray-700">Low Priority</h3>
        </div>
      </div>

      {/* Medium Priority */}
      <div className="bg-white p-3 flex gap-4 rounded-2xl items-center shadow-md min-w-[150px]">
        <p className="bg-yellow-100 p-2 rounded-xl">
          
          <Flame className="text-yellow-600 w-5 h-5" />
        </p>
        <div>
          <p className="text-yellow-500 font-bold text-2xl">{medium}</p>
          <h3 className="text-sm text-gray-700">Medium Priority</h3>
        </div>
      </div>

      {/* High Priority */}
      <div className="bg-white p-3 flex gap-4 rounded-2xl items-center shadow-md min-w-[150px]">
        <p className="bg-red-100 p-2 rounded-xl">
         
          <Flame className="text-red-600 w-5 h-5" />
        </p>
        <div>
          <p className="text-red-500 font-bold text-2xl">{high}</p>
          <h3 className="text-sm text-gray-700">High Priority</h3>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
