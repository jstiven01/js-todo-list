import './scss/style.scss';
import storage from './js/storage'
console.log('Basic Setup');

let project1 = {
    title: 'Amanda Project1',
    tasks: [
        {name: "task 1"}, {name: "task 2"}
    ]
}

storage.create(project1.title, project1);
project1.tasks[0].name = "task updated";
storage.update(project1.title, project1);
// console.log(storage.remove(project1.title));
// console.log(storage.read(project1.title));
// console.log(storage.create(project1.title, project1));