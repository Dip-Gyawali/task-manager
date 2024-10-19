import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type TaskData = {
    name: string,
    completed: boolean
  }
  
  export default function TaskComponent({tasks}:{tasks:TaskData}) {
    return (
      <div className="flex items-center w-[400px] justify-between">
        <input type="checkbox" />
         <h1 className="text-xl">{tasks.name}</h1>
         {/* logos */}
         <div className='flex gap-5 cursor-pointer'>
           <FontAwesomeIcon icon={faEye}/>
           <FontAwesomeIcon icon={faPenToSquare}/>
           <FontAwesomeIcon icon={faTrash}/>
         </div>
      </div>
    )
  }
  