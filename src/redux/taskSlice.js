import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    taskList: [],
    singleTask: null,
    filteredTasks: [],
    sortOrder: "",
    priorityFilter:"",
  },
  reducers: {
    setTaskList: (state, action) => {
      state.taskList = action.payload;
        state.filteredTasks = action.payload;
    },
    setSingleTask: (state, action) => {
      state.singleTask = action.payload;
    },
    setFilteredTasks: (state, action) => {
      state.filteredTasks = action.payload;
    },
      setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
  },
});

export const { setTaskList, setSingleTask,setFilteredTasks,setPriorityFilter,setSortOrder } = taskSlice.actions;
export default taskSlice.reducer;
