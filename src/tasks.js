export {Task};
import { format, parse } from "date-fns";

class Task{
    constructor(taskTitle, description, dueDate, priority, projectID){
        this.taskTitle = taskTitle;
        this.descript = description;
        this.priority = priority;
        this.projectID = projectID;

        if(dueDate != null){
            this.dueDate = parse(dueDate, "yyyy-MM-dd", new Date());
        }
        
        this.isCompleted = false;
        this.id = crypto.randomUUID();
    }
    completedTask(){
        this.isCompleted = true;
    }
    getFormattedDate(){
        if(this.dueDate != null){
            return format(this.dueDate, "MMM dd, yy");
        }
        return null;
    }
};