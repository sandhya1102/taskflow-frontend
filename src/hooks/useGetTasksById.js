import axios from "../api/axiosInstance";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { TASKS_API_END_POINT } from "../utils/constant";
import { setSingleTask } from "../redux/taskSlice";


const useGetTasksById = (taskId) =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleTask = async ()=>{
            try {
                const res = await axios.get(`${TASKS_API_END_POINT}/get/${taskId}`,
                    {
                        withCredentials:true
                    }
                );
                if(res.data.success){
                    dispatch(setSingleTask(res.data.task))
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchSingleTask();
    },[taskId,dispatch])
}

export default useGetTasksById;