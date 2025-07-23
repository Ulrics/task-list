export { renderUI }

import { allProjects, createNewTask, removeTask, createNewProject, removeProject, moveTask } from "./interface.js"


const mainContainer = document.querySelector(".main-container");

function renderUI(allProjects){
  for(let i = 0; i < allProjects.length; i++){
    buildProjectBlock(i)
  }
};

function buildProjectBlock(projectIndex){
  const projectContainer = document.createElement("section");
  projectContainer.classList.add("project-container");

  const projectHeader = document.createElement("h3")
  projectHeader.textContent = allProjects[projectIndex].projectTitle;
  projectHeader.classList.add("project-title");

  const divider = document.createElement("div");
  divider.classList.add("divider");

  const tasksContainer = document.createElement("div");

  mainContainer.appendChild(projectContainer);
  projectContainer.appendChild(projectHeader);
  projectContainer.appendChild(divider);
  projectContainer.appendChild(tasksContainer);

}

function buildTask(task){
  const singleTaskContainer = document.createElement("div");
  singleTaskContainer.classList.add("task-container");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox"

  const taskInfoContainer = document.createElement("div");
  taskInfoContainer.classList.add("row-container", "gap16");

  const taskLabel = document.createElement("label");
  taskLabel.textContent = task.taskTitle;

  const taskDate = document.createElement("p");
  taskDate.classList.add("task-date");

  const priorityCircle = document.createElement("div");
  priorityCircle.classList.add(getPriorityClass(task.priority));
  
  singleTaskContainer.appendChild(checkbox);
  singleTaskContainer.appendChild(datePriorityContainer);
  datePriorityContainer.appendChild(taskDate);
  datePriorityContainer.appendChild(priorityCircle);
  singleTaskContainer.appendChild()
  
  return singleTaskContainer;
}

function buildCheck(task, singleTaskContainer){
;

  const checkboxLabel = document.createElement("label");
  checkboxLabel.textContent = task.taskTitle;

  singleTaskContainer.appendChild(checkboxTitleContainer);

}

function buildDatePriority(task, singleTaskContainer){

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

function updateModalToTask(){

}