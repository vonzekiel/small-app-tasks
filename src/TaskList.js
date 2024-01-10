import { useState } from "react";
import Task from "./Task";

export default function TaskList({
  tasks,
  onTaskDone,
  onClearTasks,
  onDeleteTask,
}) {
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
