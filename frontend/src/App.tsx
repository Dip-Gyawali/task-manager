import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Task from './Task'
import TaskContext from './context/TasksContext';
import UpdateTask from './UpdateTask';

const route = createBrowserRouter([
  {
    path:'/',
    element:<Task/>
  },
  {
    path:'/update/:id',
    element:<UpdateTask/>
  }
])
export default function App() {
  return (
    <TaskContext>
      <RouterProvider router={route}/>
    </TaskContext>
  )
}
