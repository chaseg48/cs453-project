var accessToken1: string;
var accessToken2: string;
var adminToken: string;
var data;
var user_1_project_id: Number;
var user_2_project_id: Number;
var user_1_task_id: Number;
var user_2_task_id: Number;

interface LoginResponse {
    message: string,
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

/*---------------------------------------------User 1 Operations--------------------------------------------------*/
async function main() {
    console.log("\n----------------------------Registering User 1----------------------\n")
    let response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: "Client 1", email: "client1@uah.edu", password: "password"}),
    });

    data = await response.json();
    console.log(data.message);

    console.log("\n----------------------------User 1 Login/Save Token----------------------\n")
    response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: "User 1", email: "client1@uah.edu", password: "password"}),
    });
    if (response.status == 200) {
        data = await response.json() as LoginResponse;
        accessToken1 = data.accessToken;
        console.log(data.message);
    } else {
        console.log("Error: Could not log in");
        return;
    }

    console.log("\n----------------------------Create or Fetch User 1 Project----------------------\n")
    response = await fetch('http://localhost:3000/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken1)
        },
    });
    
    data = await response.json() as ProjectsResponse;

    if (!data.projects[0]) {
        response = await fetch('http://localhost:3000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': String('Bearer ' + accessToken1)
            },
            body: JSON.stringify({ name: "User 1's Project", description: "User 1 owned project" }),
        });
        if (response.status != 201) {
            console.log("Error: Could not create project");
            return;
        }
        data = await response.json() as ProjectResponse;
        user_1_project_id = Number(data.project.id);
    } else {
        user_1_project_id = Number(data.projects[0].id);
    }
    
    console.log(data);

    console.log("\n----------------------------User 1 Create Task Assigned To User 1----------------------\n")
    response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken1)
        },
        body: JSON.stringify({ title: "User 1 Task", description: "User 1 owned task", status: "todo",  project: user_1_project_id}),
    });
    if (response.status != 201) {
        console.log("Error: Could not create task");
        return;
    }

    data = await response.json();
    console.log(data);

    console.log("\n\n----------------------------User 1 Get Tasks----------------------\n")
    response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken1)
        },
    });

    data = await response.json();
    console.log(data);
    user_1_task_id = data.tasks[0].id;

    console.log("\n----------------------------User 1 Get Task With Id----------------------\n")
    response = await fetch(String('http://localhost:3000/tasks/' + user_1_task_id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken1)
        },
    });

    data = await response.json();
    console.log(data);

    console.log("\n----------------------------User 1 Update Task----------------------\n")
    response = await fetch(String('http://localhost:3000/tasks/' + user_1_task_id), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken1)
        },
        body: JSON.stringify({ title: "User 1's Task Updated", description: "User 1 task updated description" }),
    });
    
    data = await response.json();
    console.log(data);

    console.log("\n\n----------------------------User 1 Get All Users----------------------\n")
    response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken1)
        },
    });

    data = await response.json();
    console.log(data);

/*---------------------------------------------User 2 Operations--------------------------------------------------*/
    console.log("\n----------------------------Registering User 2----------------------\n")
    response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: "Client 2", email: "client2@uah.edu", password: "password"}),
    });

    data = await response.json();
    console.log(data.message);

    console.log("\n----------------------------User 2 Login/Save Token----------------------\n")
    response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: "User 2", email: "client2@uah.edu", password: "password"}),
    });
    if (response.status == 200) {
        data = await response.json() as LoginResponse;
        accessToken2 = data.accessToken;
        console.log(data.message);
    } else {
        console.log("Error: Could not log in");
        return;
    }

    console.log("\n----------------------------User 2 Attempt To Fetch User 1's Project----------------------\n")
    response = await fetch(String('http://localhost:3000/projects/' + user_1_project_id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken2)
        },
    });

    data = await response.json() as ProjectsResponse;
    console.log(data);

    console.log("\n----------------------------User 2 Attempt To Create Task In User 1's Project----------------------\n")
    response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken2)
        },
        body: JSON.stringify({ title: "NewTask", description: "NewTask", status: "todo",  project: user_1_project_id}),
    });

    data = await response.json() as ProjectsResponse;
    console.log(data);

    console.log("\n----------------------------Create or Fetch User 2 Project----------------------\n")
    response = await fetch('http://localhost:3000/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken2)
        },
    });
    
    data = await response.json() as ProjectsResponse;

    if (!data.projects[0]) {
        response = await fetch('http://localhost:3000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': String('Bearer ' + accessToken2)
            },
            body: JSON.stringify({ name: "User 2's Project", description: "User 2 owned project" }),
        });
        if (response.status != 201) {
            console.log("Error: Could not create project");
            return;
        }
        data = await response.json() as ProjectResponse;
        user_2_project_id = Number(data.project.id);
    } else {
        user_2_project_id = Number(data.projects[0].id);
    }
    
    console.log(data);

    console.log("\n----------------------------User 2 Create Task Assigned To User 2----------------------\n")
    response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken2)
        },
        body: JSON.stringify({ title: "User 2 Task", description: "User 2 owned task", status: "todo",  project: user_2_project_id}),
    });
    if (response.status != 201) {
        console.log("Error: Could not create task");
        return;
    }

    data = await response.json();
    console.log(data);

    console.log("\n\n----------------------------User 2 Get Tasks----------------------\n")
    response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken2)
        },
    });

    data = await response.json();
    console.log(data);
    user_2_task_id = data.tasks[0].id;

    console.log("\n----------------------------User 2 Get Task With Id----------------------\n")
    response = await fetch(String('http://localhost:3000/tasks/' + user_2_task_id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken2)
        },
    });
    
    data = await response.json();
    console.log(data);

    console.log("\n----------------------------User 2 Update Task----------------------\n")
    response = await fetch(String('http://localhost:3000/tasks/' + user_2_task_id), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + accessToken2)
        },
        body: JSON.stringify({ title: "User 2's Task Updated", description: "User 2 task updated description" }),
    });
    
    data = await response.json();
    console.log(data);

    /*---------------------------------------------Admin Operations--------------------------------------------------*/
    console.log("\n\n----------------------------Register admin account----------------------\n")
    response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: "Admin", email: "admin@uah.edu", password: "myadminpassword", role: "admin" }),
    });

    data = await response.json();
    console.log(data.message);

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
        console.log(data.message);
    } else {
        console.log("Error: Could not log in");
        return;
    }

    console.log("\n\n----------------------------Admin Get All Users----------------------\n")
    response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + adminToken)
        },
    });

    data = await response.json();
    console.log(data);

    console.log("\n\n----------------------------Admin Get All Projects----------------------\n")
    response = await fetch('http://localhost:3000/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + adminToken)
        },
    });

    data = await response.json();
    console.log(data);

    console.log("\n\n----------------------------Admin Get All Tasks----------------------\n")
    response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + adminToken)
        },
    });

    data = await response.json();
    console.log(data);

    console.log("\n\n----------------------------Deleting User 1's Project As Admin----------------------\n")
    response = await fetch('http://localhost:3000/projects/' + String(user_1_project_id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + adminToken)
        },
    });

    console.log("\n\n----------------------------Admin Get All Projects----------------------\n")
    response = await fetch('http://localhost:3000/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': String('Bearer ' + adminToken)
        },
    });

    data = await response.json();
    console.log(data);

    console.log("\n\n----------------------------Admin Get All Tasks----------------------\n")
    response = await fetch('http://localhost:3000/tasks', {
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