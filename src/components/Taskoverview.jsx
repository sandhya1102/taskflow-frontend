import { HomeIcon, Plus } from "lucide-react";
import SummaryCards from "./SummaryCards";
import AllTasks from "./AllTasks";
import { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";
import FilterTasks from "./FilterTasks";
import { useSelector } from "react-redux";

const Taskoverview = () => {
  const {filteredTasks} = useSelector(store=>store.task)
  const [showForm, setShowForm] = useState(false);
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className="pr-6 pb-6 w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex lg:flex-row items-center lg:justify-between flex-col">
        <div className="flex items-center">
          <HomeIcon className="text-purple-700" />
          <h1 className="text-3xl font-bold ml-3">Dashboard</h1>
        </div>
        <button
          onClick={handleOpenForm}
          className="flex items-center bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl px-4 py-2 text-white hover:shadow-md transition-all lg:w-[160px] md:w-[150px] w-full mt-4"
        >
          <Plus className="w-5 mr-2" />
          <span>Add New Task</span>
        </button>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Filters */}
        <FilterTasks />
     <AllTasks filteredTasks={filteredTasks} onClick={handleOpenForm} />

      {showForm && <CreateTaskForm onClose={handleCloseForm} />}
    </div>
  );
};

export default Taskoverview;
