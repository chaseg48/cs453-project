import { Request } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { pool } from "../db/pool";

export async function getTasks(req: Request) {
    let result = {status: 0, rows: Array(), rowCount: 0};
    let text = `SELECT *
         FROM tasks
         ORDER BY id `;
    const query = await pool.query(text);
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
    }
    return result;
}

export async function getTask(req: Request) {
    let result = { status: 0, rows: Array()};
    const text = `SELECT * FROM tasks WHERE id = $1`;
    const value = [req.params.id];
    const query = await pool.query(text, value);
    if (query.rows[0]) {
        if (query.rows[0].assigned_to == req.session.userId || req.session.role == "admin") {
            result.status = 200;
            result.rows = query.rows[0];
        } else {
            result.status = 403;
        }
    }
    else {
        result.status = 404;
    }
    return result;
}

export async function createTask(req: Request) {
    let result = { status: 0, rows: Array()};
    const text = `INSERT INTO tasks (title, description, status, project_id, assigned_to)
                  VALUES ($1, $2, $3, $4, $5)
                  RETURNING id, title, description, status`;
    const values = [req.body.title, req.body.description, req.body.status, req.body.project, req.session.userId];
    const query = await pool.query(text, values);
    if (query.rows[0]) {
        result.status = 201;
        result.rows = query.rows[0];
    }
    else {
        result.status = 400;
    }
    return result;
}

export async function updateTask(req: Request) {
    let result = { status: 0, rows: Array()};
    let text = `SELECT * FROM tasks WHERE id = $1`;
    let values = [Number(req.params.id)];
    let query = await pool.query(text, values);
    if (query.rows[0]) {
        if (req.session.role == "admin" || query.rows[0].assigned_to == req.session.userId) {
            text = `UPDATE tasks
                        SET title = COALESCE($2, title), description = COALESCE($3, description), status = COALESCE($4, status)
                        WHERE id = $1
                        RETURNING id, title, description, status`;
            values = [req.params.id, req.body.title, req.body.description, req.body.status];
            query = await pool.query(text, values);
            if (query.rows[0]) {
                result.status = 200;
                result.rows = query.rows;
            }
        } else {
            result.status = 403;
        } 
    } else {
        result.status = 404;
    }
    return result;
}

export async function deleteTask(req: Request) {
    let result = { status: 0, rows: Array()};
    let text = `SELECT * FROM tasks WHERE id = $1`;
    let values = [Number(req.params.id)];
    let query = await pool.query(text, values);
    if (query.rows[0]) {
        if (req.session.role == "admin" || query.rows[0].assigned_to == req.session.userId) {
            text = `DELETE FROM tasks WHERE id = $1 RETURNING id, title, description, status`;
            values = [Number(req.params.id)];
            query = await pool.query(text, values);
            if (query.rows[0]) {
                result.status = 204;
                result.rows = query.rows;
            }
        } else {
            result.status = 403;
        }
    } else {
        result.status = 404;
    }
    return result;
}