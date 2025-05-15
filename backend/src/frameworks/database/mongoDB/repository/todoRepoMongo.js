import TodoModel from '../model/todo.js';

export default function todoRepositoryMongoDB() {
    const findAll = (params) => TodoModel.find();
    return {
        findAll
    };
}