import findAll from "../domain/usecase/findAll.js";
import addTodo from "../domain/usecase/addTodo.js";

export default function todoController(
    todoRepository,
    todoDbRepositoryImpl,
) {
    const dbRepo = todoRepository(todoDbRepositoryImpl());

    const fetchAllTodos = (req, res, next) => {
        const response = {};
        console.log("fetchAllTodos");
        console.log(req.query);
        findAll(req.query, dbRepo)
            .then((todos) => {
                response.todos = todos;
                return res.json(response);
            })
            .catch((error) => {
                next(error);
            });
    };

    const createTodo = (req, res, next) => {
        const response = {};
        const todo = req.body;
        console.log("createtodo");
        console.log(todo);
        addTodo(todo, dbRepo)
            .then((result) => {
            console.log("result add");
            console.log(result);
            response.message = "Todo added successfully";
            return res.status(201).json(response);
            })
            .catch((error) => {
            next(error);
            });
    };
    
    return {
      fetchAllTodos,
      createTodo
    };
}