import storage from './storage';
import Task from './task';
import Project from './project';

const UI = (() => {
  const btnCreateProject = document.getElementById('create-project');
  const projectsUser = document.getElementById('projects-user');
  const currentProject = document.getElementById('current-project');
  const btnDelete = document.querySelector('.remove');
  let chosenProject;

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
      <div class="item my-1">
        <span>${project}</span>
        <button class="remove btn-small btn-primary" data-name="${project}">Delete</button>
      </div>
      `;
      projectsUser.insertAdjacentHTML('beforeend', content);
    })
  };



  const selectedProject = (e) => {
      console.log(e.target.tagName);
      if (e.target.tagName.toLowerCase()=== 'span') {
          currentProject.innerText = e.target.innerText;
          chosenProject = Project(storage.read(e.target.innerText));
      } else if (e.target.classList.contains('remove')) {
        storage.remove(e.target.dataset.name);
        renderProjects();
      }
  };

  const loadListeners = () => {
    renderProjects();
    btnCreateProject.addEventListener('click', createProject);
    projectsUser.addEventListener('click', selectedProject);
  };

  return {
    loadListeners,
  };
}

)();

export default UI;