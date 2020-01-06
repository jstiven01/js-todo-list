const Task = ({
  title, dueDate = '', note = '', priority, isDone = false,
}) => ({
  title, dueDate, note, priority, isDone,
});

export default Task;