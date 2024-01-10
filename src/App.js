import { useLocalStorageState } from "./useLocalStorageState";
import Form from "./Form";
import TaskList from "./TaskList";

export default function App() {
  const [tasks, setTasks] = useLocalStorageState([], "task");

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
    console.log(tasks);
  }

  function handleDoneTask(id) {
    setTasks((tasks) =>
      tasks?.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  function handleClearTasks() {
    setTasks([]);
  }

  function handleDeleteTask(id) {
    setTasks((tasks) => tasks?.filter((task) => task.id !== id));
  }

  return (
    <div className="container">
      <div className="app-container">
        <Form tasks={tasks} onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onTaskDone={handleDoneTask}
          onClearTasks={handleClearTasks}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}
