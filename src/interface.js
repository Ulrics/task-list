export { allProjects, createNewTask, removeTask, createNewProject, removeProject, moveTask, editTask, findProjectIndex }

import { Project } from "./projects.js";
import { Task } from "./tasks.js";
import { compareAsc } from "date-fns";

const defaultTaskList = new Project("Tasklist");
defaultTaskList.id = "default";

const allProjects = [defaultTaskList];

function sortTaskIntoProject(taskObject){
    const matchedProject = allProjects.find(
        (project) => project.id === taskObject.projectID
    );
    matchedProject.projectTasks.push(taskObject);
}

function sortTasksByDate(projectObject){
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
}

function createNewTask(taskTitle, description, dueDate, priority, projectID){
    const newTask = new Task(taskTitle, description, dueDate, priority, projectID);
    sortTaskIntoProject(newTask);
    sortTasksByDate(allProjects[findProjectIndex(newTask.projectID)]);
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
}

function createNewProject(projectTitle){
    const newProject = new Project(projectTitle);
    allProjects.push(newProject);
}

function removeProject(projectObject){
    const index = allProjects.findIndex(
        (project) => project.id === projectObject.id
    ); 
    allProjects.splice(index, 1); 
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
}