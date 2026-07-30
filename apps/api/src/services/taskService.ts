import { Request } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { pool } from "../db/pool";

export async function getTasks(_req: Request) {
    let result = {status: 0, rows: Array(), rowCount: 0};
    let text = `SELECT *
         FROM tasks
         WHERE assigned_to = $1
         ORDER BY id `;
    let value = [_req.session.userId];
    const query = await pool.query(text, value);
    if (query.rows[0] || query.rowCount == 0) {
        result.status = 200;
        result.rows = query.rows;
        if (query.rowCount == null) {
            result.rowCount = 0;
        }
        else {
            result.rowCount = Number(query.rowCount);
        }
    }
    else {
        result.status = 400;
        result.rows[0] = null;
    }
    return result;
}

export async function getTask(_req: Request) {
    let result = { status: 0, rows: Array()};
    const text = `SELECT * FROM tasks WHERE id = $1`;
    const value = [_req.params.id];
    const query = await pool.query(text, value);
    if (query.rows[0]) {
        result.status = 200;
        result.rows = query.rows[0];
    }
    else {
        result.status = 404;
        result.rows[0] = null;
    }
    return result;
}

export async function createTask(_req: Request) {
    let result = { status: 0, rows: Array()};
    const text = `INSERT INTO tasks (title, description, status, project_id, assigned_to)
                  VALUES ($1, $2, $3, $4, $5)
                  RETURNING id, title, description, status`;
    const values = [_req.body.title, _req.body.description, _req.body.status, _req.body.project, _req.session.userId];
    const query = await pool.query(text, values);
    if (query.rows[0]) {
        result.status = 201;
        result.rows = query.rows[0];
    }
    else {
        result.status = 400;
        result.rows[0] = null;
    }
    return result;
}

export async function updateTask(_req: Request) {
    let result = { status: 0, rows: Array()};
    const text = `UPDATE tasks
                  SET title = COALESCE($2, title), description = COALESCE($3, description), status = COALESCE($4, status)
                  WHERE id = $1
                  RETURNING id, title, description, status`;
    const values = [_req.params.id, _req.body.title, _req.body.description, _req.body.status];
    const query = await pool.query(text, values);
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

export async function deleteTask(_req: Request) {
    let result = { status: 0, rows: Array()};
    const text = `DELETE FROM tasks WHERE id = $1 RETURNING id, title, description, status`;
    const values = [_req.params.id];
    const query = await pool.query(text, values);
    if (query.rows[0]) {
        result.status = 204;
        result.rows = query.rows;
    }
    else {
        result.status = 404;
        result.rows[0] = null;
    }
    return result;
}