import createTodoHTML from './createTodoHTML';
import createEditHTML from './createEditHTML';
import displayTodos from './index';

export default function createTodoElements(todos) {
  const arr = [];
  todos.forEach((todo) => {
    const element = createTodoHTML(todo);
    element.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-edit')) {
        const editForm = createEditHTML(todo);
        editForm.addEventListener('submit', (e) => {
          e.preventDefault();
          todo.title = editForm.querySelector('.edit-todo-header').value;
          todo.dueDate = editForm.querySelector('.edit-todo-date').valueAsDate;
          todo.project = editForm.querySelector('#edit-project').value;
          element.innerHTML = '';
          element.appendChild(createTodoHTML(todo));
        });
        editForm.querySelector('.fa-x').addEventListener('click', (e) => {
          element.innerHTML = '';
          element.appendChild(createTodoHTML(todo));
        });
        element.classList.remove('todo');
        element.innerHTML = '';
        console.log(editForm);
        element.appendChild(editForm);
        editForm.querySelector('.edit-todo-header').focus();
        return;
      }
      if (e.target.classList.contains('fa-trash')) {
        const index = todos.findIndex((y) => y === todo);
        todos.splice(index, 1);
        displayTodos(todos);
      }
      if (e.target.classList.contains('fa-check-circle')) {
        console.log(e.currentTarget.classList);
        if (e.currentTarget.classList.contains('todo')) {
          e.currentTarget.classList.toggle('complete');
        } else {
          console.log('hi');
          e.currentTarget.querySelector('.todo').classList.toggle('complete');
        }
      }
    });
    arr.push(element);
  });
  return arr;
}
