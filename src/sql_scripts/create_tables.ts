export const CreateTables = {
  text: `CREATE TABLE IF NOT EXISTS todos (
            id serial PRIMARY KEY UNIQUE,
            title  TEXT  NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS todolists (
            id serial PRIMARY KEY UNIQUE,
            title  TEXT  NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS listitems (
           list_id int NOT NULL references todolists,
           todo_id int NOT NULL references todos,
           primary key (list_id, todo_id)
        );
        CREATE OR REPLACE FUNCTION trigger_set_timestamp()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
        DROP TRIGGER IF EXISTS set_todo_timestamp on todos;
        DROP TRIGGER IF EXISTS set_todolist_timestamp on todolists;
        CREATE TRIGGER set_todo_timestamp
        BEFORE UPDATE ON todos
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();
        CREATE TRIGGER set_todolist_timestamp
        BEFORE UPDATE ON todolists
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();`,
}