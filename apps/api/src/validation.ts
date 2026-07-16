import express from "express";

export function checkExist(data: string) {
    return typeof(data) !== 'undefined';
}

export function validateUpdate(title: string, desc: string, status: string) {
    if (!checkExist(title) && !checkExist(desc) && !checkExist(status)) {
        return false;
    }
    else if  ((!checkExist(title) || validateTitle(title)) && (!checkExist(desc) || validateDesc(desc)) && ((!checkExist(status) || validateDesc(status)))) {
        return true;
    }
    return false;
}

export function validateCreate(title: string, desc: string, status: string) {
    if (validateTitle(title) && validateDesc(desc) && validateDesc(status)) {
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

export function validateTitle(title: string) {
    if (typeof(title) == "string" && title.length > 0) {
        return true;
    }
    return false;
};

export function validateDesc(desc: string) {
    if (typeof(desc) == "string" && desc.length > 0) {
        return true;
    }
    return false;
};

export function validateStatus(status: string) {
    if (typeof(status) == "string" && status.length > 0) {
        return true;
    }
    return false;
};