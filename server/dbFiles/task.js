class Task{
    constructor(text, status, priority, userId, dueDate, category){
        this.text = text;
        this.status = status;
        this.priority = priority;
        this.userId = userId;
        this.dueDate = dueDate;
        this.category = category;
    }
}

module.exports = Task;