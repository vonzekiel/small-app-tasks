import { useState } from "react";
import Status from "./Status";

export default function Form({ tasks, onAddTask }) {
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
