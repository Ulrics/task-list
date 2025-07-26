export {Task};
import { format, parse } from "date-fns";

class Task{
    constructor(taskTitle, description, dueDate, priority, projectID){
        this.taskTitle = taskTitle;
        this.descript = description;
        this.priority = priority;
        this.projectID = projectID;

        if(dueDate != ""){
            this.dueDate = parse(dueDate, "yyyy-MM-dd", new Date());
        }
        else{
            this.dueDate = null;
        }
        
        this.isCompleted = false;
        this.id = crypto.randomUUID();
    }
    completedTask(){
        this.isCompleted = true;
    }
    getFormattedDate(){
        if(this.dueDate != "" && this.dueDate != null){
            return format(this.dueDate, "MMM dd, yy");
        }
        return "No Due Date";
    }
    getDateValue(){
        if(!this.dueDate){
            return "";
        }
        return format(this.dueDate, "yyyy-MM-dd");
    }
};