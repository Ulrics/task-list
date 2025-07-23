console.log("test test");
import './styles.css';
import { allProjects, createNewTask, removeTask, createNewProject, removeProject, moveTask } from './interface.js';
import { renderUI } from "./renderer.js";

const newTaskButton = document.getElementById("createNewTaskBtn");
const taskModal = document.getElementById("taskModal");
const taskForm = document.getElementById("taskForm");
const closeTaskModal = taskModal.querySelector("[data-action = closeModal]");

newTaskButton.addEventListener("click", startNewTaskModal);
closeTaskModal.addEventListener("click", closeNewTaskModal);

function closeNewTaskModal(){
    clearProjectOptions();
    taskForm.reset();
    taskModal.close();
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

function submitNewTask(event){
    event.preventDefault();

    const taskTitle = document.querySelector("[data-value = taskTitle]").value;
    const description = document.querySelector("[data-value = taskDescription]").value;
    const dueDate = document.querySelector("[data-value = taskDueDate").value;
    const priority = document.getElementById("taskPriority").value;
    const projectID = document.getElementById("projectSelect").value;

    createNewTask(taskTitle, description, dueDate, priority, projectID);
}

renderUI(allProjects);