import todoController from "../../../controllers/todoController";
import todoRepository from "../../../domain/repositories/todoRepository";



export default function todoRouter(express) {
    const router = express.Router();
    const controller = todoController();

    
    router.route.get('/api/todos', controller.fetchAllTodos);
    return router;

}