import express from "express";

var accessToken: string;
var adminToken: string;
var data;
var project_id: Number;

interface LoginResponse {
    accessToken: string,
    tokenType: string,
    expiresIn: string,
    user: { name: string, role: string }
}

interface projectType {
        id: number,
        name: string,
        description: string,
        owner_id: number,
        created_at: string,
        updated_at: string
}

interface ProjectsResponse {
    projects: Array<projectType>
}

interface ProjectResponse {
    project: projectType
}

async function main() {
    console.log("----------------------------Registering new user----------------------")
    let response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: "Chase Garner", email: "garnerchase@uah.edu", password: "mysecurepassword"}),
    });

    console.log("\n----------------------------Logging In----------------------\n")
    response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: "Chase Garner", email: "garnerchase@uah.edu", password: "mysecurepassword"}),
    });
    if (response.status == 200) {
        data = await response.json() as LoginResponse;
        accessToken = data.accessToken;
    } else {
        console.log("Error: Could not log in");
        return;
    }

    response = await fetch('http://localhost:3000/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken)
        },
    });
    
    data = await response.json() as ProjectsResponse;

    if (!data.projects[0]) {
        response = await fetch('http://localhost:3000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': String('Bearer ' + accessToken)
            },
            body: JSON.stringify({ name: "NewProject", description: "NewProject" }),
        });
        if (response.status != 201) {
            console.log("Error: Could not create project");
            return;
        }
        data = await response.json() as ProjectResponse;
        project_id = Number(data.project.id);
    } else {
        project_id = Number(data.projects[0].id);
    }

    response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken)
        },
        body: JSON.stringify({ title: "NewTask", description: "NewTask", status: "todo",  project: project_id}),
    });
    if (response.status != 201) {
        console.log("Error: Could not create task");
        return;
    }

    console.log("\n----------------------------Getting projects----------------------\n")
    response = await fetch('http://localhost:3000/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken)
        },
    });
    
    data = await response.json() as ProjectsResponse;
    console.log(data);

    console.log("\n----------------------------Getting tasks----------------------\n")
    response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken)
        },
    });
    
    data = await response.json();
    console.log(data);

    // console.log("\n\n----------------------------Deleting project----------------------\n")
    // response = await fetch('http://localhost:3000/projects/' + String(project_id), {
    //     method: 'DELETE',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'authorization': String('Bearer ' + accessToken)
    //     },
    // });

    // data = await response.json();
    // console.log(data.message);

    // console.log("\n\n----------------------------Check for projects----------------------\n")
    // response = await fetch('http://localhost:3000/projects', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'authorization': String('Bearer ' + accessToken)
    //     },
    // });
    
    // data = await response.json() as ProjectsResponse;
    // console.log(data);

    // console.log("\n\n----------------------------Check for tasks----------------------\n")
    // response = await fetch('http://localhost:3000/tasks', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'authorization': String('Bearer ' + accessToken)
    //     },
    // });
    
    // data = await response.json();
    // console.log(data);

    console.log("\n\n----------------------------Register admin account----------------------\n")
    response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: "Admin", email: "admin@uah.edu", password: "myadminpassword", role: "admin"}),
    });

    console.log("\n----------------------------Logging In As Admin----------------------\n")
    response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: "Admin", email: "admin@uah.edu", password: "myadminpassword"}),
    });
    if (response.status == 200) {
        data = await response.json() as LoginResponse;
        adminToken = data.accessToken;
    } else {
        console.log("Error: Could not log in");
        return;
    }

    console.log("\n\n----------------------------Deleting Another User's Project As Admin----------------------\n")
    response = await fetch('http://localhost:3000/projects/' + String(project_id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + adminToken)
        },
    });

    data = await response.json();
    console.log(data.message);

    console.log("\n\n----------------------------User1: Get all users----------------------\n")
    response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken)
        },
    });

    data = await response.json();
    console.log(data.message);

    console.log("\n\n----------------------------Admin: Get all users----------------------\n")
    response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + adminToken)
        },
    });

    data = await response.json();
    console.log(data);

    return;
}   

main();