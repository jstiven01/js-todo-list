import storage from './storage';
import Task from './task';
import Project from './project';

const UI = (() => {
  const btnCreateProject = document.getElementById('create-project');
  const projectsUser = document.getElementById('projects-user');
  const currentProject = document.getElementById('current-project');
  const btnAddTask = document.getElementById('add-task');
  const projectTasks = document.getElementById('project-tasks');
  const currentTask = document.getElementById('current-task');
  const detailsTask = document.getElementById('detail-task');
  const inputDueDate = document.getElementById('due-date');
  const selectPriority = document.getElementById('select-priority');
  const inputNote = document.getElementById('note');
  const btnEdit = document.getElementById('edit-task');

  let chosenProject;
  let actualTask;

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

      button.setAttribute('class', 'btn-small btn-primary delete');
      button.setAttribute('data-task', `${chosenProject.tasks[i].title}`);
      button.innerHTML = 'Delete';
      divCheck.setAttribute('class', 'form-check form-check-inline');
      checkIsDone.type = 'checkbox';
      checkIsDone.setAttribute('class', 'form-check-input');
      checkIsDone.setAttribute('data-task', `${chosenProject.tasks[i].title}`);
      div.setAttribute('class', 'item my-1 d-flex');
      span.innerHTML = chosenProject.tasks[i].title;
      if (chosenProject.tasks[i].isDone) {
        span.setAttribute('class', 'name-task flex-grow-1 line-through');
      } else {
        span.setAttribute('class', 'name-task flex-grow-1');
      }

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

  const itemActive = (container) => {
    const items = container.getElementsByClassName('item');
    for (let i = 0; i < items.length; i += 1) {
      items[i].classList.remove('active');
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
      itemActive(projectsUser);
      e.target.parentNode.classList.add('active');
      renderTasks();
    } else if (e.target.classList.contains('remove')) {
      storage.remove(e.target.dataset.name);
      renderProjects();
    }
  };


  const AddTaskToProject = () => {
    const nameTask = document.getElementById('name-task').value;
    if (nameTask !== '' && chosenProject && chosenProject.tasks.filter((task) => task.title === nameTask).length === 0) {
      const newTask = Task({ title: nameTask });
      chosenProject.tasks.push(newTask);
      storage.update(chosenProject.title, chosenProject);
      renderTasks();
    }
  };

  const selectedTask = (e) => {
    if (e.target.classList.contains('name-task')) {
      currentTask.innerText = e.target.innerText;
      actualTask = Task(chosenProject.findTask(e.target.innerText));
      inputDueDate.value = actualTask.dueDate;
      selectPriority.value = actualTask.priority;
      inputNote.value = actualTask.note;
      itemActive(projectTasks);
      e.target.parentNode.classList.add('active');
      detailsTask.classList.remove('d-none');
    } else if (e.target.classList.contains('delete')) {
      const chosenTask = chosenProject.tasks.filter((task) => task.title !== e.target.dataset.task);
      chosenProject.tasks = chosenTask;
      storage.update(chosenProject.title, chosenProject);
      renderTasks();
    } else if (e.target.classList.contains('form-check-input')) {
      const taskToCheck = e.target.dataset.task;
      for (let i = 0; i < chosenProject.tasks.length; i += 1) {
        if (chosenProject.tasks[i].title === taskToCheck) {
          chosenProject.tasks[i].isDone = !chosenProject.tasks[i].isDone;
          storage.update(chosenProject.title, chosenProject);
          renderTasks();
          return;
        }
      }
    }
  };

  const editTask = () => {
    actualTask.dueDate = inputDueDate.value;
    actualTask.priority = selectPriority.value;
    actualTask.note = inputNote.value;
    for (let i = 0; i < chosenProject.tasks.length; i += 1) {
      if (chosenProject.tasks[i].title === actualTask.title) {
        chosenProject.tasks[i] = actualTask;
        storage.update(chosenProject.title, chosenProject);
        renderTasks();
        alert('Task was edited successfully'); // eslint-disable-line no-alert
        return;
      }
    }
  };

  const loadListeners = () => {
    renderProjects();
    btnCreateProject.addEventListener('click', createProject);
    projectsUser.addEventListener('click', selectedProject);
    btnAddTask.addEventListener('click', AddTaskToProject);
    projectTasks.addEventListener('click', selectedTask);
    btnEdit.addEventListener('click', editTask);
  };

  return {
    loadListeners,
  };
}

)();

export default UI;