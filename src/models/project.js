export class Project {
    constructor(title = '', description = '', date = '', status = 'new') {
        this.title = title;
        this.description = description;
        this.date = date;
        this.status = status;
        this.tasks = [];
        this.id = Math.random();
    }
}