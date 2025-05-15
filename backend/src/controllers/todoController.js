const findAll = require('../domain/usecase/findAll');

export default function todoController(
    todoRepository,
    todoDbRepositoryImpl,
) {
    const dbRepo = todoRepository(todoDbRepositoryImpl);

    const fetchAllTodos = (req, res, next) => {
        response = {};
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