import TodoModel from '../model/todo.js';

export default function todoRepositoryMongoDB() {
    const findAll = (params) => TodoModel.find();
    const add = (todo) => TodoModel.create(todo);
    return {
        findAll,
        add
    };
}