export { allProjects, createNewTask, removeTask, createNewProject, removeProject, moveTask, editTask, findProjectIndex, sortTasksByDate }

import { Project } from "./projects.js";
import { Task } from "./tasks.js";
import { compareAsc } from "date-fns";

let allProjects = [];
let savedProjects = localStorage.getItem("allProjects");

if(savedProjects){
  savedProjects = JSON.parse(savedProjects);
  allProjects = savedProjects.map(project => {
    const proj = new Project(project.projectTitle);
    proj.id = project.id;

    proj.projectTasks = project.projectTasks.map(savedTasks => {
        const task = new Task(
            savedTasks.taskTitle,
            savedTasks.descript,
            savedTasks.dueDate,
            savedTasks.priority,
            savedTasks.projectID,
        )
        task.id = savedTasks.id;
        return task;
    })
    return proj;
  })
}
else {
  const defaultProject = new Project("Tasklist");
  defaultProject.id = "default";
  allProjects = [defaultProject];
  createNewProject("Example Project");
  createNewTask("This is a example task - click me to view or edit task", "In here you can edit or view contents. To delete this task click the trash icon in the bottom-left of this modal. To edit or delete projects, click the icon to the left of the project name.", "2025-01-01", "low", allProjects[1].id);
  createNewTask("This is where your tasks go by default", "Tasklist is your default project if you don't choose a custom project.", "2025-01-01", "low", "default");
}

function sortTaskIntoProject(taskObject){
    const matchedProject = allProjects.find(
        (project) => project.id === taskObject.projectID
    );
    matchedProject.projectTasks.push(taskObject);
}

function sortTasksByDate(projectObject){
    console.log("projectObject passed into sortTasksByDate:", projectObject);
    projectObject.projectTasks.sort((taskA, taskB) =>{
        if (!taskA.dueDate && !taskB.dueDate) return 0;
        if (!taskA.dueDate) return 1;
        if (!taskB.dueDate) return -1;

        return compareAsc(taskA.dueDate, taskB.dueDate);
    });
}

function removeTask(taskObject){
    const matchedProject = allProjects.find(
        (project) => project.id === taskObject.projectID
    );
    const index = matchedProject.projectTasks.findIndex(
        (task) => taskObject.id === task.id
    ); 
    matchedProject.projectTasks.splice(index, 1);
    saveToLocalStorage();
}

function createNewTask(taskTitle, description, dueDate, priority, projectID){
    const newTask = new Task(taskTitle, description, dueDate, priority, projectID);
    sortTaskIntoProject(newTask);
    sortTasksByDate(allProjects[findProjectIndex(newTask.projectID)]);
    saveToLocalStorage();
}

function moveTask(task, newProjectID){
    const oldProjectIndex = findProjectIndex(task.projectID);
    const newProjectIndex = findProjectIndex(newProjectID);

    const oldProject = allProjects[oldProjectIndex];
    const newProject = allProjects[newProjectIndex];

    oldProject.projectTasks = oldProject.projectTasks.filter(t => t.id !== task.id);

    newProject.projectTasks.push(task);
    task.projectID = newProjectID;
    sortTasksByDate(newProject);
    saveToLocalStorage();
}

function createNewProject(projectTitle){
    const newProject = new Project(projectTitle);
    allProjects.push(newProject);
    saveToLocalStorage();
    return newProject;
}

function removeProject(projectObject){
    const index = allProjects.findIndex(
        (project) => project.id === projectObject.id
    ); 
    allProjects.splice(index, 1); 
    saveToLocalStorage();
}

function findProjectIndex(projectID){
    return allProjects.findIndex(   
        (project) => project.id === projectID
    );
}

function editTask(task, taskTitle, description, dueDate, priority){
    task.taskTitle = taskTitle;
    task.descript = description;
    task.dueDate = dueDate;
    task.priority = priority;
    localStorage.setItem("allProjects", JSON.stringify(allProjects));
}

function saveToLocalStorage(){
    localStorage.setItem("allProjects", JSON.stringify(allProjects));
}