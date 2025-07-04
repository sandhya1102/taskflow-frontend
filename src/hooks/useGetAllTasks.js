import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TASKS_API_END_POINT } from "../utils/constant";
import { setTaskList } from "../redux/taskSlice";
import axios from "../api/axiosInstance";

const useGetAllTasks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        const res = await axios.get(`${TASKS_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setTaskList(res.data.tasks));
        }
      } catch (error) {
        console.error("Error in fetching tasks:", error);
      }
    };

    fetchAllTask();
  }, []);
};

export default useGetAllTasks;
