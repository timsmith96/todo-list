import format from 'date-fns/format';

export default function createTodoHTML(todo) {
  const element = document.createElement('div');
  element.classList.add('todo');
  element.classList.add('todo');
  if (todo.completed) element.classList.add('complete');
  const todoHeader = document.createElement('p');
  todoHeader.classList.add('todo-header');
  todoHeader.textContent = todo.title;

  const todoDue = document.createElement('p');
  todoDue.classList.add('todo-due');
  todoDue.textContent = format(todo.dueDate, 'do LLL');

  const todoControls = document.createElement('div');
  todoControls.classList.add('todo-controls');

  const editTodo = document.createElement('i');
  editTodo.classList.add('fas');
  editTodo.classList.add('fa-edit');
  editTodo.classList.add('edit-todo');
  editTodo.ariaHidden = true;

  const deleteTodo = document.createElement('i');
  deleteTodo.classList.add('fas');
  deleteTodo.classList.add('fa-trash');
  deleteTodo.classList.add('edit-todo');
  deleteTodo.ariaHidden = true;

  const todoComplete = document.createElement('i');
  todoComplete.classList.add('fas');
  todoComplete.classList.add('edit-todo');
  todoComplete.classList.add('fa-check-circle');

  todoControls.appendChild(editTodo);
  todoControls.appendChild(deleteTodo);
  todoControls.appendChild(todoComplete);

  element.appendChild(todoHeader);
  element.appendChild(todoDue);
  element.appendChild(todoControls);

  return element;
}
