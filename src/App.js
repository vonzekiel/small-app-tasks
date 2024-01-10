import { useEffect, useState } from "react";

export default function App() {
  // const [tasks, setTasks] = useState([]);
  const [tasks, setTasks] = useState(
    function () {
      const storedTask = localStorage.getItem("tasks");
      return JSON.parse(storedTask);
    } || []
  );

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

  useEffect(
    function () {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    [tasks]
  );

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

function Form({ tasks, onAddTask }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !description) return;
    const newTask = {
      id: Date.now(),
      name,
      description,
      priority,
      done: false,
    };
    console.log(newTask);
    onAddTask(newTask);
  }
  return (
    <div className="form-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
        >
          <option value={3}>Low</option>
          <option value={2}>Medium</option>
          <option value={1}>High</option>
        </select>
        <button>Add</button>
      </form>

      <Status tasks={tasks} />
    </div>
  );
}

function Task({ task, onTaskDone, onDeleteTask }) {
  const handleDoneTask = () => {
    onTaskDone(task.id);
  };

  function handleDeleteTask() {
    onDeleteTask(task.id);
  }
  let priority = task.priority;
  if (task.priority === 1) priority = "High";
  if (task.priority === 2) priority = "Medium";
  if (task.priority === 3) priority = "Low";
  return (
    <div className={!task.done ? "task" : "task-done"}>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Priority: {priority}</p>
      <button onClick={handleDoneTask}>
        {!task.done ? "Done" : "Not Done"}
      </button>
      <button onClick={handleDeleteTask}>Delete</button>
    </div>
  );
}

function TaskList({ tasks, onTaskDone, onClearTasks, onDeleteTask }) {
  const [sortBy, setSortBy] = useState("priority");

  let sortedTasks;

  function handleClearTasks() {
    onClearTasks();
  }

  if (sortBy === "input") sortedTasks = tasks;
  if (sortBy === "description")
    sortedTasks = tasks.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "status")
    sortedTasks = tasks.slice().sort((a, b) => a.done - b.done);
  if (sortBy === "priority")
    sortedTasks = tasks.slice().sort((a, b) => a.priority - b.priority);

  return (
    <div className="task-container">
      <div className="filter">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by name order</option>
          <option value="status">Sort by status</option>
          <option value="priority">Sort by priority</option>
        </select>
        <button onClick={handleClearTasks}>Clear Tasks</button>
      </div>
      <div className="task-list">
        {sortedTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onTaskDone={onTaskDone}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

function Status({ tasks }) {
  const numtasks = tasks.filter((task) => !task.done).length;
  return (
    <footer>
      <h3>You have {numtasks} tasks.</h3>
    </footer>
  );
}
