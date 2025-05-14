
export default function todoController(database) {
    const todoCollection = database.collection("todos");


    const fetchTodos = (req, res, next) => {
        todoCollection.find({}).toArray()
            .then((todos) => {
                res.status(200).json(todos);
            })
            .catch((error) => {
                console.error("Error fetching todos:", error);
                res.status(500).json({ error: "Internal server error" });
            });
    }

    return {
        fetchTodos,
    }
}