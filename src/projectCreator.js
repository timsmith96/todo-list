export default function projectCreator(project) {
  const arr = [];
  todos.forEach((todo) => {
    if (todo.project === project) {
      arr.push(todo);
    }
  });
  return arr;
}
