import axios from "axios";
import { useContext, useEffect, useState } from "react";
import TaskComponent from "./TaskComponent";
import { taskContext } from "./context/TasksContext";

type TaskData = {
  _id:string,
  name: string,
  completed: boolean
}


export default function Task() {
  const {tasks,dispatch} = useContext(taskContext);
  const [newTask,setNewTask] = useState<string>("");
  
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

  const AddData = async ()=>{
    if(newTask === ''){
      return;
    }
    try{
     const addData = await axios.post('http://localhost:5000/api/v1/tasks', {
       name: newTask,
       completed: false
     })
     dispatch({type:'ADD_TASKS', payload:addData.data.data})
     setNewTask("");
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
        <form className="p-5 border-2 border-black rounded-md" onSubmit={AddData}>
          <div className="flex items-center flex-col gap-2">
            <h1 className="font-bold text-xl">Tasks</h1>
            <input
              type="text"
              placeholder="Add Tasks.."
              className="border-[1px] rounded-sm px-3 py-2 w-[400px]"
              onChange={(e)=> setNewTask(e.target.value)}
            />
            <button
              type="button"
              value="submit"
              className="bg-green-500 p-2 rounded-lg"
              onClick={AddData}
            >
              Submit
            </button>
          </div>
        </form>

        <div className="mt-12 flex flex-col gap-5">
      {tasks?.map((singleTask,index)=>(
        <TaskComponent key={index} oneTask={singleTask}/>
      ))}
        </div>
      </div>
    </>
  );
}
