export { renderUI, rerenderTasks, buildProjectBlock, mainContainer }

import { allProjects, findProjectIndex } from "./interface.js"
import { startEditTaskModal, startEditProjectModal } from "./index.js";
import editIconSvg from "./assets/square-pen.svg";


const mainContainer = document.querySelector(".main-container");

function renderUI(){
  for(let i = 0; i < allProjects.length; i++){
    buildProjectBlock(i)
  }
  const taskListEdit = document.getElementById("delete-me");
  taskListEdit.remove();
};

function buildProjectBlock(projectIndex){
  const projectContainer = document.createElement("section");
  projectContainer.dataset.projectid = allProjects[projectIndex].id;
  projectContainer.dataset.element = "projectContainer";
  projectContainer.classList.add("project-container");

  const titleDividerContainer = document.createElement("div")
  titleDividerContainer.classList.add("title-divider-container")

  const projectHeader = document.createElement("h3")
  projectHeader.dataset.projectid = allProjects[projectIndex].id;
  projectHeader.dataset.element = "projectHeader";
  projectHeader.textContent = allProjects[projectIndex].projectTitle;
  projectHeader.classList.add("project-title");

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  if (projectIndex === 0){
    editBtn.setAttribute("id", "delete-me")
  }
  editBtn.addEventListener("click", () => startEditProjectModal(allProjects[projectIndex]));
  
  const editIcon = document.createElement("img");
  editIcon.src = editIconSvg;
  editIcon.classList.add("med-icon");

  const headerContainer = document.createElement("div");
  headerContainer.classList.add("project-header-container");

  const divider = document.createElement("div");
  divider.classList.add("divider");

  const tasksContainer = document.createElement("div");
  tasksContainer.classList.add("tasks-container");
  tasksContainer.dataset.projectid = allProjects[projectIndex].id;
  tasksContainer.dataset.element = "taskContainer";
  
  mainContainer.appendChild(projectContainer);
  projectContainer.appendChild(titleDividerContainer);
  titleDividerContainer.appendChild(headerContainer);
  headerContainer.appendChild(projectHeader);
  headerContainer.appendChild(editBtn);
  editBtn.appendChild(editIcon);
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
  checkbox.checked = task.isCompleted;

  const taskInfoContainer = document.createElement("div");
  taskInfoContainer.classList.add("task-info");

  const taskLabel = document.createElement("div");
  taskLabel.classList.add("task-title")
  taskLabel.textContent = task.taskTitle;
  taskLabel.for = "taskCompletion";

  const taskDate = document.createElement("p");
  taskDate.classList.add("task-date");
  taskDate.textContent = task.getFormattedDate();

  if (task.isCompleted) {
      taskLabel.classList.add("completed");
      taskDate.classList.add("completed");
  }
  checkbox.addEventListener("click", (event) => {
      event.stopPropagation();
      task.isCompleted = checkbox.checked;

      if (task.isCompleted) {
          taskLabel.classList.add("completed");
          taskDate.classList.add("completed");
      } else {
          taskLabel.classList.remove("completed");
          taskDate.classList.remove("completed");
      }
      rerenderTasks(task.projectID, projectContainer)
  });

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