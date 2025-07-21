export { allProjects, createNewTask, removeTask, createNewProject, removeProject, moveTask }

import { Project } from "src/projects.js";
import { Task } from "src/tasks.js";
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
    removeTask(task);
    const newProjectIndex = findProjectIndex(newProjectID);
    allProjects[newProjectIndex].push(task);
    sortTasksByDate(allProjects[newProjectIndex]);
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

