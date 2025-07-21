
import { allProjects, createNewTask, removeTask, createNewProject, 
         removeProject, moveTask } from "./interface.js"

const mainContainer = document.getElementsByClassName("main-container");

function renderUI(allProjects){

};

function buildProjectBlock(projectIndex){
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    mainContainer.appendChild(projectContainer);

    const projectHeader = document.createElement("h3")
    

}

function buildTask(task){

}

function buildTaskCheck(task){

}

function buildDatePriority(task){

}