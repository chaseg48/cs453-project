import { pool } from "./pool";

export async function getTasks(_req) {
    let result = {status: 0, rows: Array()};
    const query = await pool.query(
        `SELECT id,
                title,
                description,
                status,
                created_at AS "createdAt",
                updated_at AS "updatedAt"
            FROM tasks
            ORDER BY id `,
    );
    console.log(query.rows);
    if (query.rows[0]) {
        result.status = 200;
        result.rows = query.rows;
    }
    else {
        result.status = 400;
        result.rows[0] = null;
    }
    return result;
}

export async function getTask(_req) {
    let result = { status: 0, rows: Array()};
    const text = `SELECT * FROM tasks WHERE id = $1`;
    const value = [_req.params.id];
    const query = await pool.query(text, value);
    if (query.rows[0]) {
        result.status = 200;
        result.rows = query.rows;
    }
    else {
        result.status = 404;
        result.rows[0] = null;
    }
    return result;
}

export async function createTask(_req) {
    let result = { status: 0, rows: Array()};
    const text = `INSERT INTO tasks (id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING id, title, description, status`;
    const values = [_req.params.id, _req.body.title, _req.body.description, _req.body.status];
    const query = await pool.query(text, values);
    console.log(query.rows)
    if (query.rows[0]) {
        result.status = 201;
        result.rows = query.rows;
    }
    else {
        result.status = 400;
        result.rows[0] = null;
    }
    return result;
}

export async function updateTask(_req) {
    let result = { status: 0, rows: Array()};
    let taskToUpdate = await getTask(_req);
    if (taskToUpdate.rows[0]) {
        const text = `UPDATE tasks SET title = $2, description = $3, status = $4 WHERE id = $1 RETURNING id, title, description, status`;
        const values = [_req.params.id, _req.body.title, _req.body.description, _req.body.status];
        const query = await pool.query(text, values);
        result.status = 200;
        result.rows = query.rows;
        console.log(result.rows);
    } 
    else {
        result.status = 404;
        result.rows[0] = null;
    }
    return result;
}

export async function deleteTask(_req) {
    let result = { status: 0, rows: Array()};
    const taskToDelete = await getTask(_req);
    if (taskToDelete.rows[0]) {
        const text = `DELETE FROM tasks WHERE id = $1`;
        const values = [_req.params.id];
        const query = await pool.query(text, values);
        result.status = 204;
        result.rows = query.rows;
    }
    else {
        result.status = 404;
        result.rows[0] = null;
    }
    return result;
}