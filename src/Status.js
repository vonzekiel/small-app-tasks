export default function Status({ tasks }) {
  const numtasks = tasks.filter((task) => !task.done).length;
  return (
    <footer>
      <h3>You have {numtasks} tasks.</h3>
    </footer>
  );
}
