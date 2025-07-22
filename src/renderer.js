
import { allProjects, createNewTask, removeTask, createNewProject, 
         removeProject, moveTask } from "./interface.js"

const mainContainer = document.getElementsByClassName("main-container");

function renderUI(allProjects){

};

function buildProjectBlock(projectIndex){
    const projectContainer = document.createElement("section");
    projectContainer.classList.add("project-container");
    mainContainer.appendChild(projectContainer);

    const projectHeader = document.createElement("h3")
    projectHeader.textContent = allProjects[projectIndex].projectTitle;
    projectHeader.classList.add("project-title");
    projectContainer.appendChild(projectHeader);

    const divider = document.createElement("div");
    divider.classList.add("divider");
    projectContainer.appendChild(divider);
  
}

function buildTask(task){
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    buildTaskCheck(task);
    buildDatePriority(task);

    
}

function buildTaskCheck(task){
    const checkboxTitleContainer = document.createElement("div");
    checkboxTitleContainer.classList.add("row-container", "width-100");
    taskContainer.appendChild(checkboxTitleContainer);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const checkboxLabel = document.createElement("label");
    checkboxLabel.textContent = task.taskTitle;
    checkboxTitleContainer.appendChild(checkboxLabel);
}

function buildDatePriority(task){
    const datePriorityContainer = document.createElement("div");
    datePriorityContainer.classList.add("row-container", "gap16");
    taskContainer.appendChild(datePriorityContainer);

    const taskDate = document.createElement("p");
    taskDate.classList.add("task-date");
    datePriorityContainer.appendChild(taskDate);

    const priorityCircle = document.createElement("div");
    priorityCircle.classList.add(getPriorityClass(task.priority));
    datePriorityContainer.appendChild(priorityCircle);
}

const priorityClassMap = {
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low',
  none: 'priority-none',
};

function getPriorityClass(priorityValue) {
  return priorityClassMap[priorityValue] || 'priority-none';
}

function updateModalToTask(){

}