import storage from './storage';
import Task from './task';
import Project from './project';

const UI = (() => {
  const btnCreateProject = document.getElementById('create-project');
  const projectsUser = document.getElementById('projects-user');

  const createProject = () => {
    const nameProject = document.getElementById('project-name').value;
    if (nameProject !== '' && !storage.allNamesProjects().includes(nameProject)) {
      const newProject = Project({ title: nameProject });
      storage.create(newProject.title, newProject);
    }
    renderProjects();
  };

  const renderProjects = () => {
    let projects = storage.allNamesProjects().sort();
    projectsUser.innerHTML = '';

    projects.forEach(project => {
      const content = `
      <div>
        <span>${project}</span>
      </div>
      `;
      projectsUser.insertAdjacentHTML('beforeend', content);
    })
  }


  const loadListeners = () => {
    renderProjects();
    btnCreateProject.addEventListener('click', createProject);
  };

  return {
    loadListeners,
  };
}

)();

export default UI;