import { Request } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { pool } from "../db/pool";
import { Result } from "pg";
import { env } from "../config/env";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const jwtExpiresIn = "1h"

export async function registerUser(name: string, email: string, password: string, role: string = "user") {
    let result = {status: 0, rows: Array()};
    
    let text = `SELECT * FROM "users" WHERE email = $1`;
    let value = [email];
    let query = await pool.query(text, value);

    if (query.rows[0]) {
        result.status = 400;
        return result;
    }
    
    var values;
    const hash = await bcrypt.hash(password, 10);
    if (role == "user") {
        text = `INSERT INTO users (name, email, password_hash)
                    VALUES ($1, $2, $3)
                    RETURNING email`;
        values = [name, email, hash];
    } else if (role == "admin") {
        text = `INSERT INTO users (name, email, password_hash, role)
                    VALUES ($1, $2, $3, $4)
                    RETURNING email`;
        values = [name, email, hash, role];
    }
    query = await pool.query(text, values);
    
    if (query.rows[0]) {
        result.status = 201;
        result.rows = query.rows;
    }
    else {
        result.status = 400;
    }
    return result;
}

export async function login(name: string, email: string, password: string) {
    let result = {status: 0, rows: Array(), token: String()};
    
    let text = `SELECT * FROM "users" WHERE email = $1`;
    let value = [email];
    let query = await pool.query(text, value);

    if (!query.rows[0]) {
        result.status = 404;
        return result;
    }

    if (await bcrypt.compare(password, query.rows[0].password_hash)) {
        const token = jwt.sign(
                    { id: String(query.rows[0].id), email: String(query.rows[0].email), role: String(query.rows[0].role) },
                    env.jwtSecret,
                    { expiresIn: jwtExpiresIn }
                    );
        result.status = 200;
        result.rows = query.rows;
        result.token = token;
        return result;
    } else {
        result.status = 401;
        return result;
    }
}