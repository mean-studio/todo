export const selectAlltodoLists: string = `SELECT * FROM todolists`
export const selectTodoLists: string = `SELECT * FROM todolists where id=$1`
export const selectTodoListsItems: string = `SELECT id,title,updated_at,completed FROM todos INNER JOIN listitems ON listitems.todo_id=todos.id WHERE listitems.list_id=$1`
export const createTodoList: string = `INSERT INTO todolists (title) VALUES ($1) RETURNING id;`
export const updateTodoList: string = `UPDATE todolists, set (title) VALUES ($1) RETURNING id;`
export const deleteTodoList: string = `DELETE FROM todolists, WHERE id=$1;`
export const addItemToTodoList: string = `INSERT INTO listitems (list_id,todo_id) VALUES ($1,$2) RETURNING list_id,todo_id;`
export const removeItemFromTodoList: string = `DELETE FROM listitems WHERE list_id=$1 AND todo_id=$2;`