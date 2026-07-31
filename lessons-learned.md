# Audience: Undergraduate computer science students who are about to build their first authenticated API.

Up until this point in your education, you may have taken a few programming classes that required a project
with some sort of user interface. During the development of those projects, you likely only considered that the
developer and the professor would be the end users, and did not consider the implications of a much wider user base
using the system. In reality, many systems are used by a wide user base that may be spread out all over the world. Even
further, not all of the users should be expected to be benevolent. If your system includes a database, bad actors may
attempt to gain access to information about your company or other users. With this in mind, the need for authentication
and authorization becomes clear. User and proprietary data must be protected.
    
Over the course of my semester project, I learned about concepts such as password hashing and tokens. These concepts
are critical in ensuring the security of a system that many users are simulataneously interfacing with. Raw passwords
should never be stored in a database in case it becomes compromised. Storing the password hash instead of the password
protects user's information. Depending on the hashing algorithm, it can be extremely computationally expensive to gain
the corresponding password. Tokens are also important since they can be used to authenticate a user for a certain
amount of time, preventing the need to log in for every request.
    
When introducing authentication and authorization into a system, such as our task/project management system, having
a clear outline of the authorization rules is important in the system design as a whole. Before beginning to build
the system or write code, it's important to know what actions and resources the user should be allowed to use, and to
design the system with that in mind. Concepts such as user roles can be used to determine what level of privilege a
user has, which in turn affects how they are allowed to interact with the system. If I were to begin the project again,
I would more clearly define these authorization rules going into the project. It is more difficult to refactor
authentication into the system after it has been built.

Having authentication and authorization as a part of the system inherently complicates the logic. For example,
determining who is allowed to modify resources such as projects and tasks. I decided that general users are only
allowed to modify the resources that they own, and that admins may modify any resources. This means that cooperative
projects where users can be members of multiple projects, or where tasks can be assigned to more than one user, aren't
very suited for my system as it is currently designed.

A difficulty that arises as a result of more complicated logic is testing. There are many different possible
outcomes of a single user action. For instance, the request could be malformed (in more ways than one), the user could
provide incorrect login credentials or an invalid token, the user could be unauthorized for the resource they
are trying to access, etc. Having a suite of automated tests increases the confidence that the server is behaving
as it is designed to.