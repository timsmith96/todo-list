export default class Todo {
  constructor(title, dueDate, project = 'none', completed = false) {
    this.title = title;
    this.dueDate = dueDate;
    this.project = project;
    this.completed = completed;
  }
}
