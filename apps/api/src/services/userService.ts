import { Request } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { pool } from "../db/pool";

export async function getUsers(req: Request) {
    let result = {status: 0, rows: Array()};
    if (req.session.role == "admin") {
        let text = `SELECT id, name, email, role, created_at from users
                    ORDER BY id`;
        let query = await pool.query(text);
        result.status = 200;
        result.rows = query.rows;
    } else {
        result.status = 403;
    }
    return result;
}

export async function getUser(req: Request) {
    let result = {status: 0, rows: Array()};
    if (req.session.role == "admin") {
        let text = `SELECT id, name, email, role, created_at from users
                    WHERE id = $1`;
        let values = [Number(req.params.id)];
        let query = await pool.query(text, values);
        result.status = 200;
        result.rows = query.rows;
    } else {
        result.status = 500;
    }
    return result;
}