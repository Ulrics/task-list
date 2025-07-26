export {Task};
import { format, parse } from "date-fns";

class Task{
    constructor(taskTitle, description, dueDate, priority, projectID){
        this.taskTitle = taskTitle;
        this.descript = description;
        this.priority = priority;
        this.projectID = projectID;
        this.dueDate = dueDate;

        this.isCompleted = false;
        this.id = crypto.randomUUID();
    }
    completedTask(){
        this.isCompleted = true;
    }
    getFormattedDate(){
        if(this.dueDate != "" && this.dueDate != null){
            const dateHolder = parse(this.dueDate, "yyyy-MM-dd", new Date());
            return format(dateHolder, "MMM dd, yy");
        }
        return "No Due Date";
    }
    getDateValue(){
        if(!this.dueDate){
            return "";
        }
        const dateHolder = parse(this.dueDate, "yyyy-MM-dd", new Date());
        return format(dateHolder, "yyyy-MM-dd");
    } 
};