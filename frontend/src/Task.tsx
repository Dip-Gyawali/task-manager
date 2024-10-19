import axios from "axios";
import { useContext, useEffect, useState } from "react";
import TaskComponent from "./TaskComponent";
import { taskContext } from "./context/TasksContext";

type TaskData = {
  name: string,
  completed: boolean
}


export default function Task() {
  const {tasks,dispatch} = useContext(taskContext);
  
  const getData = async()=>{
    try{
      const res = await axios.get('http://localhost:5000/api/v1/tasks');
      console.log(res.data.data);
      dispatch({type:'GET_TASKS',payload:res.data.data})
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <>
      <div className="h-[100vh] w-[100vw] flex flex-col items-center mt-36 ">
        <form className="p-5 border-2 border-black rounded-md">
          <div className="flex items-center flex-col gap-2">
            <h1 className="font-bold text-xl">Tasks</h1>
            <input
              type="text"
              placeholder="Add Tasks.."
              className="border-[1px] rounded-sm px-3 py-2 w-[400px]"
            />
            <button
              type="button"
              value="submit"
              className="bg-green-500 p-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="mt-12 flex flex-col gap-5">
      {task.map((singleTask,index)=>(
        <TaskComponent key={index} tasks={singleTask}/>
      ))}
        </div>
      </div>
    </>
  );
}
