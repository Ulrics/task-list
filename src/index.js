import './styles.css';
import { allProjects, createNewTask, removeTask, createNewProject, removeProject, moveTask, editTask, findProjectIndex } from './interface.js';
import { renderUI, rerenderTasks, buildProjectBlock } from "./renderer.js";

export { startEditTaskModal };

const newTaskBtn = document.getElementById("createNewTaskBtn");
const taskModal = document.getElementById("taskModal");
const taskForm = document.getElementById("taskForm");
const closeTaskModal = taskModal.querySelector("[data-action = closeModal]");
const taskModalSubmitBtn = taskModal.querySelector("[data-action = submitBtn]");

const newProjectBtn = document.getElementById("createNewProjectBtn");
const projectModal = document.getElementById("projectModal");
const projectForm = document.getElementById("projectForm")
const closeProjectModal = projectModal.querySelector("[data-action = closeModal]");
const taskProjectSubmitBtn = projectModal.querySelector("[data-action = submitBtn]");

newTaskBtn.addEventListener("click", startNewTaskModal);
closeTaskModal.addEventListener("click", () => closeModal(taskForm, taskModal));
taskModalSubmitBtn.addEventListener("click", submitTask);

newProjectBtn.addEventListener("click", () => projectModal.showModal());
closeProjectModal.addEventListener("click", () => closeModal(projectForm, projectModal));
taskProjectSubmitBtn.addEventListener("click", submitNewProject);

const taskHeader = taskModal.querySelector("[data-element = taskHeader]");
const taskTitleInput = taskModal.querySelector("[data-value = taskTitle]");
const taskDescripInput= taskModal.querySelector("[data-value = taskDescription]");
const taskDateInput = taskModal.querySelector("[data-value = taskDueDate]");
const taskPrioritySelect = document.getElementById("taskPriority");
const taskProjectSelect = document.getElementById("projectSelect");

function closeModal(form, modal){
    clearProjectOptions();
    form.reset();
    modal.close();
}

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

let currentTaskEdit = null;
let currentProjectID = null;

function submitTask(event){
    event.preventDefault();

    const taskTitle = taskTitleInput.value;
    const description = taskDescripInput.value;
    const dueDate = taskDateInput.value;
    const priority = taskPrioritySelect.value;
    const projectID = taskProjectSelect.value;

    console.log("Original:", currentProjectID);
    console.log("Selected:", taskProjectSelect.value);

    if (currentTaskEdit === null){
        createNewTask(taskTitle, description, dueDate, priority, projectID);
        rerenderTasks(projectID, findProjectContainer(projectID));
    }
    else{
        editTask(currentTaskEdit, taskTitle, description, dueDate, priority);
        if(currentProjectID != projectID){
            moveTask(currentTaskEdit, projectID);
            rerenderTasks(currentProjectID, findProjectContainer(currentProjectID));
            rerenderTasks(projectID, findProjectContainer(projectID));
        }
        else{
            rerenderTasks(projectID, findProjectContainer(projectID));
        }
    }
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
}


function submitNewProject(event){
    event.preventDefault();

    const projectTitle = projectModal.querySelector("[data-value = projectTitle").value;
    createNewProject(projectTitle);
    const newProjectIndex = allProjects.length - 1;
    console.log(allProjects[newProjectIndex].projectTitle);
    buildProjectBlock(newProjectIndex);

    closeModal(projectForm, projectModal);
}

function resetTaskModal(){
    taskHeader.textContent = "Create New Task";
    taskModalSubmitBtn.textContent = "Create Task";
    currentTaskEdit = null;
    currentProjectID = null;
}

function findProjectContainer(projectID){
    const taskContainer = document.querySelector(`[data-projectid="${projectID}"]`);
    return taskContainer;
}



createNewProject("test project");
createNewTask("01 test task", " 01 description", "2025-09-23", "low", allProjects[1].id);
createNewTask("02 test task", "02 default description", "2025-10-23", "high", "default");
renderUI();