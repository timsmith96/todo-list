import Todo from './todo';
import createTodoElements from './createToDos';
import createProjectSelect from './createProjectSelect';
import ProjectsList from './projects';
import isSameDay from 'date-fns/isSameDay';
import isTomorrow from 'date-fns/isTomorrow';
import createProjectOption from './createProjectOption';
import config from './config';

// ==================
// SELECTING ELEMENTS
// ==================

document.getElementById('dueDate').valueAsDate = new Date();
const modalContainer = document.querySelector('.modal-container');
const closeModalBtn = document.querySelector('#close');
const form = document.querySelector('.form');
const newTaskBtn = document.querySelector('#new-todo');
const formProjectSubmitBtn = document.getElementById('form-project-label');

// Form fields
const title = document.querySelector('#title');
const dueDate = document.querySelector('#dueDate');
const projectSelect = document.getElementById('project-select');

const newTaskInput = document.querySelector('#new-project');
const newTaskInputAdd = document.querySelector('#new-project-label');

const todosContainer = document.querySelector('.todos-container');

// Menu items
const allTodosOption = document.getElementById('all-todos');
const todaysTodosOption = document.getElementById('todays-todos');
const tomorrowsTodosOption = document.getElementById('tomorrows-todos');

// Projects
const newProjectBtn = document.getElementById('new-project-label');
const newProjectInput = document.getElementById('new-project');
const projectsContainer = document.getElementById('projects-container');
const formNewProject = document.getElementById('form-new-project');

// ==================
// FUNCTIONS
// ==================

const saveToStorage = (todo) => {
  localStorage.setItem(todo.title, JSON.stringify(todo));
};

export default function displayTodos(arr) {
  todosContainer.innerHTML = '';
  const todosToDisplay = createTodoElements(arr);
  todosToDisplay.forEach((todo) => {
    todosContainer.appendChild(todo);
  });
}

const handleNewProject = () => {
  const newProjectName = newProjectInput.value;
  config.PROJECTS.push(newProjectName);
  const newProject = createProjectOption(newProjectName);
  newProject.addEventListener('click', (e) => {
    todosContainer.innerHTML = '';
    const arr = [];
    config.TODOS.forEach((todo) => {
      if (todo.project === e.target.dataset.project) {
        arr.push(todo);
      }
    });
    displayTodos(arr);
  });
  projectsContainer.appendChild(newProject);
  newProjectInput.value = '';
};

// ==================
// EVENT LISTENERS
// ==================

newTaskBtn.addEventListener('click', () => {
  title.focus();
  projectSelect.innerHTML = '<option value="none">None</option>';
  createProjectSelect().forEach((project) =>
    projectSelect.appendChild(project)
  );
  modalContainer.classList.add('show');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const date = dueDate.valueAsDate;
  const project = projectSelect.value;
  const newTodo = new Todo(title.value, date, project);
  config.TODOS.push(newTodo);
  saveToStorage(newTodo, project);
  setTimeout(() => {
    displayTodos(config.TODOS);
  }, 50);
  modalContainer.classList.remove('show');
  title.value = '';
  formNewProject.value = '';
});

closeModalBtn.addEventListener('click', () => {
  modalContainer.classList.remove('show');
  title.value = '';
});

document.body.addEventListener('click', () => {
  if (document.activeElement === newTaskInput) {
    newTaskInputAdd.classList.add('show');
  } else {
    newTaskInputAdd.classList.remove('show');
  }
});

// menu options
allTodosOption.addEventListener('click', (e) => {
  displayTodos(config.TODOS);
});

todaysTodosOption.addEventListener('click', (e) => {
  const list = config.TODOS.filter((todo) =>
    isSameDay(new Date(), todo.dueDate)
  );
  displayTodos(list);
});

tomorrowsTodosOption.addEventListener('click', (e) => {
  const list = config.TODOS.filter((todo) => isTomorrow(todo.dueDate));
  displayTodos(list);
});

// Projects
newProjectBtn.addEventListener('click', (e) => {
  if (newProjectInput.value.length > 0) {
    handleNewProject();
  }
});

window.addEventListener('load', (e) => {
  const projects = [];
  Object.keys(localStorage).forEach(function (key) {
    const data = JSON.parse(localStorage.getItem(key));
    data.dueDate = new Date(data.dueDate);
    config.TODOS.push(data);
    projects.push(data.project);
  });
  projects.forEach((project) => {
    config.PROJECTS.push(project);
    const myNewProject = createProjectOption(project);
    myNewProject.addEventListener('click', (e) => {
      todosContainer.innerHTML = '';
      const arr = [];
      config.TODOS.forEach((todo) => {
        if (todo.project === e.target.dataset.project) {
          arr.push(todo);
        }
      });
      displayTodos(arr);
    });
    projectsContainer.appendChild(myNewProject);
  });

  displayTodos(config.TODOS);
});

formProjectSubmitBtn.addEventListener('click', (e) => {
  if (formNewProject.value.length > 0) {
    const newProjectName = formNewProject.value;
    config.PROJECTS.push(newProjectName);
    projectSelect.innerHTML = '<option value="none">None</option>';
    createProjectSelect().forEach((project) =>
      projectSelect.appendChild(project)
    );
    const newProject = createProjectOption(newProjectName);
    newProject.addEventListener('click', (e) => {
      todosContainer.innerHTML = '';
      const arr = [];
      config.TODOS.forEach((todo) => {
        if (todo.project === e.target.dataset.project) {
          arr.push(todo);
        }
      });
      displayTodos(arr);
    });
    projectsContainer.appendChild(newProject);
    console.log(newProjectName);
  }
});

// KEYBOARD EVENT LISTENERS
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement === newTaskInput) {
    handleNewProject();
  }
});
