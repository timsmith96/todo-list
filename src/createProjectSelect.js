import config from './config';

export default function createProjectSelect() {
  const arr = [];
  config.PROJECTS.forEach((project) => {
    const element = document.createElement('option');
    element.value = project;
    element.textContent = project;
    arr.push(element);
  });
  console.log(arr);
  return arr;
}
