import express from "express";

export function checkExist(data: string) {
    return typeof(data) !== 'undefined';
}

export function validateUpdateTask(title: string, desc: string, status: string) {
    if (!checkExist(title) && !checkExist(desc) && !checkExist(status)) {
        return false;
    }
    else if  ((!checkExist(title) || validateString(title)) && (!checkExist(desc) || validateString(desc)) && ((!checkExist(status) || validateString(status)))) {
        return true;
    }
    return false;
}

export function validateCreateTask(title: string, desc: string, status: string) {
    if (validateString(title) && validateString(desc) && validateString(status)) {
        return true;
    }
    return false;
}

export function validateId(id: any) {
    if (Number.isInteger(Number(id))) {
        return true;
    }
    return false;
}

export function validateString(data: any) {
    if (typeof(data) == "string" && data.length > 0) {
        return true;
    }
    return false;
}

export function validateCredentials(name: string, email: string, password: string) {
    if (validateString(name) && validateString(email) && validateString(password)) {
        return true;
    }
    return false;
}

export function validateCreateProject(name: string, description: string) {
    if (validateString(name) && validateString(description)) {
        return true;
    }
    return false;
}