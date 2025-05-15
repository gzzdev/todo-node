export default function todoRepository(repository) {
    const findAll = (params) => repository.findAll(params);
    const countAll = (params) => repository.countAll(params);
    const add = (todo) => repository.add(todo);
    const updateById = (id, todo) => repository.updateById(id, todo);
    const deleteById = (id) => repository.deleteById(id);
    return {
        findAll,
        countAll,
        add,
        updateById,
        deleteById
    };
}