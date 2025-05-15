import findAll from "../domain/usecase/findAll.js"

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
            })
    };
    
    return {
      fetchAllTodos,
    };
}