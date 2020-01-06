import storage from './storage';
import Task from './task';
import Project from './project';

const UI = (() => {
  const btnCreateProject = document.getElementById('create-project');
  const projectsUser = document.getElementById('projects-user');
  const currentProject = document.getElementById('current-project');
  const btnAddTask = document.getElementById('add-task');
  const projectTasks = document.getElementById('project-tasks');


  let chosenProject;

  const renderProjects = () => {
    const projects = storage.allNamesProjects().sort();
    projectsUser.innerHTML = '';

    projects.forEach((project) => {
      const content = `
      <div class="item my-1 d-flex justify-content-between">
        <span>${project}</span>
        <button class="remove btn-small btn-primary" data-name="${project}">Delete</button>
      </div>
      `;
      projectsUser.insertAdjacentHTML('beforeend', content);
    });
  };

  const renderTasks = () => {
    projectTasks.innerHTML = '';
    for (let i = 0; i < chosenProject.tasks.length; i += 1) {
      const div = document.createElement('div');
      const divCheck = document.createElement('div');
      const button = document.createElement('button');
      const spanDate = document.createElement('span');
      const span = document.createElement('span');
      const checkIsDone = document.createElement('input');

      button.setAttribute('class', 'btn-small btn-primary');
      button.setAttribute('data-task', `${chosenProject.tasks[i].title}`);
      button.innerHTML = 'Delete';
      divCheck.setAttribute('class', 'form-check form-check-inline');
      checkIsDone.type = 'checkbox';
      checkIsDone.setAttribute('class', 'form-check-input');
      div.setAttribute('class', 'item my-1 d-flex');
      span.innerHTML = chosenProject.tasks[i].title;
      span.setAttribute('class', 'name-task');

      divCheck.appendChild(checkIsDone);
      div.appendChild(divCheck);
      div.appendChild(span);
      if (chosenProject.tasks[i].dueDate !== '') {
        spanDate.innerHTML = chosenProject.tasks[i].dueDate;
        div.appendChild(spanDate);
      }
      div.appendChild(button);
      projectTasks.appendChild(div);
    }
  };

  const createProject = () => {
    const nameProject = document.getElementById('project-name').value;
    if (nameProject !== '' && !storage.allNamesProjects().includes(nameProject)) {
      const newProject = Project({ title: nameProject });
      storage.create(newProject.title, newProject);
    }
    renderProjects();
  };


  const selectedProject = (e) => {
    if (e.target.tagName.toLowerCase() === 'span') {
      currentProject.innerText = e.target.innerText;
      chosenProject = Project(storage.read(e.target.innerText));
      renderTasks();
    } else if (e.target.classList.contains('remove')) {
      storage.remove(e.target.dataset.name);
      renderProjects();
    }
  };


  const AddTaskToProject = () => {
    const nameTask = document.getElementById('name-task').value;
    if (nameTask !== '') {
      const newTask = Task({ title: nameTask });
      chosenProject.tasks.push(newTask);
      storage.update(chosenProject.title, chosenProject);
    }
    renderTasks();
  };

  const loadListeners = () => {
    renderProjects();
    btnCreateProject.addEventListener('click', createProject);
    projectsUser.addEventListener('click', selectedProject);
    btnAddTask.addEventListener('click', AddTaskToProject);
  };

  return {
    loadListeners,
  };
}

)();

export default UI;