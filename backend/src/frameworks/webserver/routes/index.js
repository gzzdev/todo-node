import todoRouter from "./todo.js";;

export default function routes(app, express) {
    app.use('/api/v1/todos', todoRouter(express));
}