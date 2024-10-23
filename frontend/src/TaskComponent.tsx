import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useContext } from 'react';
import { taskContext } from './context/TasksContext';
import { NavLink } from 'react-router-dom';
import UpdateTask from './UpdateTask';

type TaskData = {
    _id:string,
    name: string,
    completed: boolean
  }
  
  export default function TaskComponent({oneTask}:{oneTask:TaskData}) {

    const {tasks,dispatch} = useContext(taskContext);

    const deleteData = async(id:string)=>{
      try{
        const deletedTask = await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`);
        dispatch({type:'DELETE_TASKS', payload:deletedTask.data.data})
      }
      catch(err){
        console.log(err)
      }
    }

    return (
      <div className="flex items-center w-[400px] justify-between">
        <input type="checkbox" />
         <h1 className="text-xl">{oneTask.name.charAt(0).toUpperCase() + oneTask.name.slice(1)}</h1>
         {/* logos */}
         <div className='flex gap-5 cursor-pointer'>
          <NavLink to={`/update/${oneTask._id}`}>
           <FontAwesomeIcon icon={faPenToSquare}/>
          </NavLink>
           <FontAwesomeIcon icon={faTrash} onClick={()=>deleteData(oneTask._id)}/>
         </div>
      </div>
    )
  }
  