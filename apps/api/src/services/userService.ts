import { Request } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { pool } from "../db/pool";

export async function getUsers() {
    let result = {status: 0, rows: Array()};
    let text = `SELECT * from users
                ORDER BY id`;
    let query = await pool.query(text);
    result.status = 200;
    result.rows = query.rows;
    return result;
}