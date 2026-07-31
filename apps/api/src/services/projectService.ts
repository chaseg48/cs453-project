import { pool } from "../db/pool";
import { Request } from "express-serve-static-core";
import { ParsedQs } from "qs";

export async function getProjects(req: Request) {
    let result = {status: 0, rows: Array(), rowCount: 0};
    let text = '';
    var values;
    var query;
    if (req.session.role == 'user') {
        text = `SELECT *
            FROM projects
            WHERE owner_id = $1 `;
        values = [req.session.userId];
        
    } else if (req.session.role == 'admin') {
        text = `SELECT *
            FROM projects
            ORDER BY id `;
    } else {
        result.status = 500;
        return result;
    }
    
    query = await pool.query(text, values);
    result.status = 200;
    result.rows = query.rows;
    return result;
}

export async function getProject(req: Request) {
    let result = { status: 0, rows: Array()};
    const text = 'SELECT * FROM projects WHERE id = $1';
    let values = [Number(req.params.id)];
    const query = await pool.query(text, values);
    if (query.rows[0]) {
        if (req.session.role == "admin" || query.rows[0].owner_id == req.session.userId) {
            result.status = 200;
            result.rows = query.rows;
        } else {
            result.status = 403;
        }
    } else {
        result.status = 404;
    }
    return result;
}

export async function createProject(req: Request) {
    let result = { status: 0, rows: Array()};
    const text = `INSERT INTO projects (name, description, owner_id)
                  VALUES ($1, $2, $3)
                  RETURNING *`;
    const values = [req.body.name, req.body.description, req.session.userId];
    const query = await pool.query(text, values);
    if (query.rows[0]) {
        result.status = 201;
        result.rows = query.rows;
    }
    else {
        result.status = 400;
    }
    return result;
}

export async function deleteProject(req: Request) {
    let result = { status: 0, rows: Array()};
    let text = 'SELECT * FROM projects WHERE id = $1';
    let values = [Number(req.params.id)];
    const query = await pool.query(text, values);
    if (query.rows[0]) {
        if (req.session.role == "admin" || req.session.userId == query.rows[0].owner_id) {
            let text = 'DELETE FROM projects WHERE id = $1 RETURNING *';
            let values = [req.params.id];
            const query = await pool.query(text, values);
            result.status = 204;
        } else {
            result.status = 403;
        }
    } else {
        result.status = 404;
    }
    return result;
}