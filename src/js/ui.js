import storage from './storage';
import Task from './task';
import Project from './project';

const UI = (() => {
  const btnCreateProject = document.getElementById('create-project');

  const createProject = () => {
    const nameProject = document.getElementById('project-name').value;
    if (nameProject !== '' && !storage.allNamesProjects().includes(nameProject)) {
      const newProject = Project({ title: nameProject });
      storage.create(newProject.title, newProject);
    }
  };


  const loadListeners = () => {
    btnCreateProject.addEventListener('click', createProject);
  };

  return {
    loadListeners,
  };
}

)();

export default UI;