# 1. What is the difference between authentication and authorization?

Authentication confirms that the user is who they claim to be and involves checking a password/token to confirm
the user's identity. Authorization takes place after authentication and involves confirming that the authenticated
user is authorized to perform the action or access the resource that they are attempting.

# 2. Why should passwords be hashed instead of stored directly?

Passwords are hashed so that if the database was compromised the raw passwords would not be exposed. Having the password
hash does not guaruntee that the original password can be found. In such an event, hashes can be changed on the server side.

# 3. What information did you include in your JWT, and why?

I included user id and role in the token. User is is used to compare against stored ownership/assignment information
to see if the user is authorized to modify resources. The role is used to check if the user is admin, in which case
the privilege is elevated.

# 4. What is the difference between a 401 response and a 403 response?

A 401 response means that the user is not authenticated, and their identity is essentially unknown. A 403 error
means that the user is known and they are not authorized to perform the action that they are attempting.

# 5. Where does your application perform role or ownership checks?

Most of the services implemented in my project check the user id and role information in the decoded JWT to see if 
the user has the correct privileges to perform the action that they are attempting. If the user id matches the 
resource that the user is modifying or accessing, the action is permitted. The role is used to see if the user is
an admin, in which case all acctions are permitted.

# 6. How are users, projects, and tasks related in your database?

Users contain an id which is used to set the `owner_id` and `assigned_to` fields of projects and tasks, respectively.
Projects contain an id which is used to set the `project_id` field of tasks. Deleting a project deletes all tasks
that fall under that project.

# 7. What was the hardest part of adding authentication or authorization?

The hardest part was deciding how to define the authorization rules that defined what resources users are allowed
to modify or access, as well as ensuring that the server adhered to all of the rules exactly as they were defined.