const Task = ({
  title, dueDate = '', note = '', priority = 'normal', isDone = false,
}) => ({
  title, dueDate, note, priority, isDone,
});

export default Task;