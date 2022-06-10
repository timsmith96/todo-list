export default class ProjectsList {
  constructor(projects) {
    this.projects = projects;
  }
  add(project) {
    this.projects.push(project);
  }
  createProjectOption(project) {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    const a = document.createElement('a');
    a.dataset.project = project;
    a.id = project;
    a.href = '#';
    a.textContent = project;
    div.appendChild(a);
    return div;
  }
}

