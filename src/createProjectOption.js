import config from './config';

export default function createProjectOption(project) {
  const div = document.createElement('div');
  div.classList.add('menu-item');
  const a = document.createElement('a');
  a.dataset.project = project;
  a.id = project;
  a.href = '#';
  a.classList.add('project');
  a.textContent = project;
  const i = document.createElement('i');
  i.classList.add('fa');
  i.classList.add('fa-trash');
  i.classList.add('remove-project-btn');
  i.id = project;
  i.addEventListener('click', (e) => {
    div.remove();
    const index = config.PROJECTS.findIndex(
      (project) => project === e.target.id
    );
    config.PROJECTS.splice(index, 1);
    config.TODOS.forEach((todo) => {
      if (todo.project === e.target.id) {
        todo.project = 'none';
      }
    });
  });
  div.appendChild(a);
  div.appendChild(i);
  return div;
}
