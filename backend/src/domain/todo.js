class Todo {
    constructor(id, title, completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
    
    static create(id, title) {
        return new Todo(id, title, false);
    }

}