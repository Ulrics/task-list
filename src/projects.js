export {Project, editProjectName};

class Project{
    constructor(projectTitle){
        this.projectTitle = projectTitle;
        this.projectTasks = [];
        this.id = crypto.randomUUID();
    }
};

function editProjectName(project, newName){
    project.projectTitle = newName;
};