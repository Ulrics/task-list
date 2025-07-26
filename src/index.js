import './styles.css';
import { allProjects, createNewTask, removeTask, createNewProject, removeProject, moveTask, editTask, findProjectIndex, sortTasksByDate } from './interface.js';
import { renderUI, rerenderTasks, buildProjectBlock, mainContainer } from "./renderer.js";
import trashIcon from "./assets/trash.svg";

export { startEditTaskModal, startEditProjectModal };

const newTaskBtn = document.getElementById("createNewTaskBtn");
const taskModal = document.getElementById("taskModal");
const taskForm = document.getElementById("taskForm");
const closeTaskModalBtn = taskModal.querySelector("[data-action = closeModal]");
const taskModalSubmitBtn = taskModal.querySelector("[data-action = submitBtn]");
const taskModalFtrContainer = taskModal.querySelector("[data-element = footer]");

const newProjectBtn = document.getElementById("createNewProjectBtn");
const projectModal = document.getElementById("projectModal");
const projectForm = document.getElementById("projectForm")
const closeProjectModalBtn = projectModal.querySelector("[data-action = closeModal]");
const projectSubmitBtn = projectModal.querySelector("[data-action = submitBtn]");

newTaskBtn.addEventListener("click", startNewTaskModal);
closeTaskModalBtn.addEventListener("click", () => closeTaskModal(taskForm, taskModal));
taskModalSubmitBtn.addEventListener("click", submitTask);

newProjectBtn.addEventListener("click", () => projectModal.showModal());
closeProjectModalBtn.addEventListener("click", () => closeProjectModal(projectForm, projectModal));
projectSubmitBtn.addEventListener("click", submitProject);

const taskHeader = taskModal.querySelector("[data-element = taskHeader]");
const taskTitleInput = taskModal.querySelector("[data-value = taskTitle]");
const taskDescripInput= taskModal.querySelector("[data-value = taskDescription]");
const taskDateInput = taskModal.querySelector("[data-value = taskDueDate]");
const taskPrioritySelect = document.getElementById("taskPriority");
const taskProjectSelect = document.getElementById("projectSelect");

const projectModalHeader = projectModal.querySelector("[data-element = projectHeader]");
const projectNameInput = projectModal.querySelector("[data-value = projectTitle]");
const projectModalFtrContainer = projectModal.querySelector("[data-element = footer]");

function startNewTaskModal(){
    populateProjectOptions();
    taskModal.showModal();
}

function populateProjectOptions(){
    const projectSelect = document.getElementById("projectSelect");
    for (let i = 0; i < allProjects.length; i++){
        let option = document.createElement("option");
        option.value = allProjects[i].id;
        option.textContent = allProjects[i].projectTitle;
        projectSelect.appendChild(option);
    }
}

function clearProjectOptions(){
    const projectSelect = document.getElementById("projectSelect");
    projectSelect.innerHTML = "";
}

let currentProjectEdit = null;
let currentTaskEdit = null;
let currentProjectID = null;

function submitTask(event){
    event.preventDefault();

    const taskTitle = taskTitleInput.value;
    const description = taskDescripInput.value;
    const dueDate = taskDateInput.value;
    const priority = taskPrioritySelect.value;
    const projectID = taskProjectSelect.value;

    if (currentTaskEdit === null){
        console.log(dueDate);
        createNewTask(taskTitle, description, dueDate, priority, projectID);
        sortTasksByDate(allProjects[findProjectIndex(projectID)]);
        rerenderTasks(projectID, findProjectTasksContainer(projectID));
    }
    else{
        editTask(currentTaskEdit, taskTitle, description, dueDate, priority);
        if(currentProjectID != projectID){
            moveTask(currentTaskEdit, projectID);
            rerenderTasks(currentProjectID, findProjectTasksContainer(currentProjectID));
            sortTasksByDate(allProjects[findProjectIndex(projectID)]);
            rerenderTasks(projectID, findProjectTasksContainer(projectID));
        }
        else{
            sortTasksByDate(allProjects[findProjectIndex(projectID)]);
            rerenderTasks(projectID, findProjectTasksContainer(projectID));
        }
    }
    closeTaskModal(taskForm, taskModal);
}

function deleteTask(event){
    event.preventDefault();

    removeTask(currentTaskEdit);
    rerenderTasks(currentProjectID, findProjectTasksContainer(currentProjectID));

    resetTaskModal();
    closeModal(taskForm, taskModal);
}

function startEditTaskModal(task){
    currentProjectID = task.projectID;
    currentTaskEdit = task;

    taskTitleInput.value = task.taskTitle;
    taskDescripInput.value = task.descript;
    taskDateInput.value = task.getDateValue();
    taskPrioritySelect.value = task.priority;

    startNewTaskModal();
    taskHeader.textContent = "Edit Task";
    taskModalSubmitBtn.textContent = "Save Edit";
    taskProjectSelect.value = task.projectID;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", deleteTask);

    const deleteIcon = document.createElement("img");
    deleteIcon.classList.add("lg-icon");
    deleteIcon.src = trashIcon;

    taskModalFtrContainer.classList.remove("right-align");
    taskModalFtrContainer.classList.add("space-between");

    taskModalFtrContainer.insertBefore(deleteBtn, taskModalSubmitBtn);
    deleteBtn.appendChild(deleteIcon);
}


function submitProject(event){
    event.preventDefault();

    const projectTitle = projectModal.querySelector("[data-value = projectTitle").value;

    if (currentProjectEdit === null){
        const newProject = createNewProject(projectTitle);
        console.log(newProject);
        const newProjectIndex = findProjectIndex(newProject.id);
        buildProjectBlock(newProjectIndex);
    }
    else {
        currentProjectEdit.projectTitle = projectTitle;
        const projectHeader = document.querySelector(`[data-projectid="${currentProjectEdit.id}"][data-element="projectHeader"]`);
        projectHeader.textContent = projectTitle;
    }

    closeProjectModal(projectForm, projectModal);
}

function startEditProjectModal(project){
    projectModalHeader.textContent = "Edit Project";
    projectSubmitBtn.textContent = "Save Edit";

    projectNameInput.value = project.projectTitle;
    currentProjectEdit = project;

    projectModal.showModal()
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", deleteProject);

    const deleteIcon = document.createElement("img");
    deleteIcon.classList.add("lg-icon");
    deleteIcon.src = trashIcon;

    projectModalFtrContainer.classList.remove("right-align");
    projectModalFtrContainer.classList.add("space-between");

    projectModalFtrContainer.insertBefore(deleteBtn, projectSubmitBtn);
    deleteBtn.appendChild(deleteIcon);
}

function deleteProject(event){
    event.preventDefault();

    removeProject(currentProjectEdit);
    mainContainer.removeChild(document.querySelector(`[data-projectid="${currentProjectEdit.id}"][data-element="projectContainer"]`))

    resetProjectModal();
    closeModal(projectForm, projectModal);
}


function closeModal(form, modal){
    clearProjectOptions();
    form.reset();
    modal.close();
}

function resetTaskModal(){
    taskHeader.textContent = "Create New Task";
    taskModalSubmitBtn.textContent = "Create Task";

    taskModalFtrContainer.classList.remove("right-align", "space-between");
    taskModalFtrContainer.classList.add("right-align");

    const deleteBtn = taskModalFtrContainer.querySelector(".delete-btn");
    if (deleteBtn) {
        taskModalFtrContainer.removeChild(deleteBtn);
    }

    currentTaskEdit = null;
    currentProjectID = null;
}

function resetProjectModal(){
    projectModalHeader.textContent = "Create New Project";
    projectSubmitBtn.textContent = "Create Project";

    projectModalFtrContainer.classList.remove("right-align", "space-between");
    projectModalFtrContainer.classList.add("right-align");

    const deleteBtn = projectModalFtrContainer.querySelector(".delete-btn");
    if (deleteBtn) {
        projectModalFtrContainer.removeChild(deleteBtn);
    }
    currentProjectEdit = null;
}

function closeTaskModal(form, modal){
    closeModal(form, modal);
    resetTaskModal();
}

function closeProjectModal(form, modal){
    closeModal(form, modal);
    resetProjectModal();
}

function findProjectTasksContainer(projectID){
    const taskContainer = document.querySelector(`[data-projectid="${projectID}"][data-element="taskContainer"]`);
    return taskContainer;
}

renderUI();