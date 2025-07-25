export { renderUI, rerenderTasks, buildProjectBlock }

import { allProjects, findProjectIndex } from "./interface.js"
import { startEditTaskModal } from "./index.js";


const mainContainer = document.querySelector(".main-container");

function renderUI(){
  for(let i = 0; i < allProjects.length; i++){
    buildProjectBlock(i)
  }
};

function buildProjectBlock(projectIndex){
  const projectContainer = document.createElement("section");
  projectContainer.classList.add("project-container");

  const titleDividerContainer = document.createElement("div")
  titleDividerContainer.classList.add("title-divider-container")

  const projectHeader = document.createElement("h3")
  projectHeader.textContent = allProjects[projectIndex].projectTitle;
  projectHeader.classList.add("project-title");

  const divider = document.createElement("div");
  divider.classList.add("divider");

  const tasksContainer = document.createElement("div");
  tasksContainer.classList.add("tasks-container");
  tasksContainer.dataset.projectid = allProjects[projectIndex].id;
  
  mainContainer.appendChild(projectContainer);
  projectContainer.appendChild(titleDividerContainer)
  titleDividerContainer.appendChild(projectHeader);
  titleDividerContainer.appendChild(divider);
  projectContainer.appendChild(tasksContainer);

  let currentProject = allProjects[projectIndex];
  let numOfTasks = currentProject.projectTasks.length;

  for(let a = 0; a < numOfTasks; a++){
    let currentTask = currentProject.projectTasks[a]
    buildTask(currentTask, tasksContainer);
  }
}

function buildTask(task, projectContainer){
  const singleTaskContainer = document.createElement("div");
  singleTaskContainer.classList.add("single-task-container");
  singleTaskContainer.addEventListener("click", () => startEditTaskModal(task));

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "taskCompletion";

  const taskInfoContainer = document.createElement("div");
  taskInfoContainer.classList.add("task-info");

  const taskLabel = document.createElement("div");
  taskLabel.classList.add("task-title")
  taskLabel.textContent = task.taskTitle;
  taskLabel.for = "taskCompletion";

  const taskDate = document.createElement("p");
  taskDate.classList.add("task-date");
  taskDate.textContent = task.getFormattedDate();

  const priorityCircle = document.createElement("div");
  priorityCircle.classList.add(getPriorityClass(task.priority));

  projectContainer.appendChild(singleTaskContainer)
  singleTaskContainer.appendChild(checkbox);
  singleTaskContainer.appendChild(taskInfoContainer);
  taskInfoContainer.appendChild(taskLabel);
  taskInfoContainer.appendChild(taskDate);
  taskInfoContainer.appendChild(priorityCircle);
}

const priorityClassMap = {
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low',
  //none: 'priority-none',
};

function getPriorityClass(priorityValue) {
  return priorityClassMap[priorityValue];
}

function rerenderTasks(projectID, tasksContainer){
  const projectIndex = findProjectIndex(projectID);
  tasksContainer.innerHTML = "";
  let project = allProjects[projectIndex];
  let numOfTasks = project.projectTasks.length;

  for(let a = 0; a < numOfTasks; a++){
    let currentTask = project.projectTasks[a]
    buildTask(currentTask, tasksContainer);
  }
}