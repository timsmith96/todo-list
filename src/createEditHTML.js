import config from './config';

export default function createEditHTML(todo) {
  const editForm = document.createElement('form');
  editForm.classList.add('edit-container');

  const editHeader = document.createElement('input');
  editHeader.type = 'text';
  editHeader.classList.add('edit-todo-header');
  editHeader.value = todo.title;
  editHeader.autocomplete = 'off';
  editHeader.autocorrect = 'off';
  editHeader.autocapitalize = 'off';
  editHeader.spellcheck = false;

  editForm.appendChild(editHeader);

  const editDate = document.createElement('input');
  editDate.type = 'date';
  editDate.classList.add('edit-todo-date');
  console.log(todo.dueDate);
  editDate.valueAsDate = todo.dueDate;
  editForm.appendChild(editDate);

  const editProject = document.createElement('select');
  editProject.id = 'edit-project';
  editProject.innerHTML = '<option>None</option>';
  config.PROJECTS.forEach((project) => {
    const element = document.createElement('option');
    element.value = project;
    element.textContent = project;
    if (todo.project === project) {
      element.selected = 'selected';
    }
    editProject.appendChild(element);
  });
  editForm.appendChild(editProject);

  const editControlsContainer = document.createElement('div');
  editControlsContainer.classList.add('edit-controls-container');

  const editComplete = document.createElement('i');
  editComplete.classList.add('fa-solid');
  editComplete.classList.add('fa-check');
  editComplete.type = 'submit';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.appendChild(editComplete);

  editControlsContainer.appendChild(submitBtn);

  const cancelEdit = document.createElement('i');
  cancelEdit.classList.add('fa-solid');
  cancelEdit.classList.add('fa-x');
  editControlsContainer.appendChild(cancelEdit);

  editForm.appendChild(editControlsContainer);

  return editForm;
}
