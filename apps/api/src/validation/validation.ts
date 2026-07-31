import express from "express";

export function checkExist(data: any) {
    return typeof(data) !== 'undefined';
}

export function validateUpdateTask(title: string, desc: string, status: string, project: number) {
    if (!checkExist(title) && !checkExist(desc) && !checkExist(status) && !checkExist(project)) {
        return false;
    }
    else if  ((!checkExist(title) || validateString(title)) && (!checkExist(desc) || validateString(desc)) && ((!checkExist(status) || validateString(status))) && ((!checkExist(project) || validateId(project)))) {
        return true;
    }
    return false;
}

export function validateCreateTask(title: string, desc: string, status: string, project: number) {
    if (validateString(title) && validateString(desc) && validateString(status) && validateId(project)) {
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

export function validateRegistrationCredentials(name: string, email: string, password: string, role: string = "user") {
    if (validateString(name) && validateString(email) && validateString(password) && validateString(role)) {
        return true;
    }
    return false;
}

export function validateLoginCredentials(email: string, password: string, role: string = "user") {
    if (validateString(email) && validateString(password) && validateString(role)) {
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