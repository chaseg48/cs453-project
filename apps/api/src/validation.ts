import express from "express";


function validateTitle(_req) {
    if (typeof(_req.body.title) == "string" && _req.body.title != "") {
        return true;
    }
};

function validateDesc(_req) {
    if (typeof(_req.body.description) == "string" && _req.body.description != "") {
        return true;
    }
};

function validateStatus(_req) {
    if (typeof(_req.body.status) == "string" && _req.body.status != "") {
        return true;
    }
};

export function validatePost(_req, res, next) {
    if (validateTitle(_req) && validateDesc(_req) && validateStatus(_req)) {
        next();
    }
    else {
        res.header(400).json({error: "Invalid request"});
    }
};

export function validatePut(_req, res, next) {
    if (validateTitle(_req) && validateDesc(_req) && validateStatus(_req)) {
        next();
    }
    else {
        res.header(400).json({error: "Invalid request"});
    }
}