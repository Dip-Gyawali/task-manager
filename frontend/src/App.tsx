import Task from './Task'
import TaskContext from './context/TasksContext';

export default function App() {
  return (
    <TaskContext>
      <Task/>
    </TaskContext>
  )
}
