export const getAllTodos: string = `SELECT * FROM todos`
export const getTodo: string = `SELECT * FROM todos  where id=$1 LIMIT 1`
export const createTodo: string = `INSERT INTO todos (title) VALUES ($1) RETURNING id;`
export const updateTodo: string = `UPDATE todos SET title=$2 WHERE id=$1 RETURNING id,updated_at;`
export const deleteTodo: string = `DELETE FROM todos WHERE id=$1;`