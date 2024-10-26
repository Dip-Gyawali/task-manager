import { createContext, useReducer } from "react"
type TaskData = {
    _id:string;
    name: string,
    completed: boolean
  }

export const taskContext = createContext();

const reducer = (state,action)=>{
   switch(action.type){
    case 'GET_TASKS':
        return{
            tasks: action.payload
        }
    case 'ADD_TASKS':
        return{
            tasks: [action.payload,...state.tasks]
        }

    case 'EDIT_DATA':
      return{
         tasks: [...state.tasks,action.payload]
      }

    case 'DELETE_TASKS':
        return{
            tasks: state.tasks.filter((element)=> element._id!== action.payload._id)
        }

    default:
        return state
   }
}

export default function context({children}:{children:React.ReactNode}) {
  const [state,dispatch] = useReducer(reducer,{tasks:null})
  return (
    <taskContext.Provider value={{...state,dispatch}}>
      {children}
    </taskContext.Provider>
  )
}
