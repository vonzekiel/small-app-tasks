export default function Task({ task, onTaskDone, onDeleteTask }) {
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
