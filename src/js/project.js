const Project = ({ title, tasks = [] }) => {
  const findTask = (titleTask) => tasks.filter((task) => task.title === titleTask)[0];
  const removeTask = (titleTask) => {
    const updatedTasks = tasks.filter((task) => task.title !== titleTask);
    return updatedTasks;
  };
  return {
    title, tasks, findTask, removeTask,
  };
};

export default Project;