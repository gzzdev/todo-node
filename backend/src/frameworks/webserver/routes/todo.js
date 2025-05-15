import todoController from "../../../controllers/todoController.js";
import todoRepository from "../../../domain/todoRepository.js";
import todoRepoMongo from "../../database/mongoDB/repository/todoRepoMongo.js"


export default function todoRouter(express) {
    const router = express.Router();
    const controller = todoController(todoRepository, todoRepoMongo);
    
    router.route("/").get(controller.fetchAllTodos);
    return router;

}