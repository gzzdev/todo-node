import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const TodoModel = mongoose.model('Todo', todoSchema);

export default TodoModel;