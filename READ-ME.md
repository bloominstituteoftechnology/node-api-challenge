# **API User Guide**
|**Table of Contents:**|
|-|
|[User Routes](#Project-Routes)|
|[Company Routes](#Action-Routes)|
###  **Project Creation**:
#### POST */api/projects*
Creates a new project.
Returns an object with project info such as: name, description, and completion status.
Request:
```javascript
{
  "id": , // number provided by database
  "name": "Test Name", // string (required)
  "description": "Test description", // string (required)
  "completed": false // boolean (optional)
}
```
Response:
```javascript
{
  "id": 4,
  "name": "Test Name",
  "description": "Test description",
  "completed": false // boolean of 0
}
```
###  **Action Creation**:
#### POST */api/actions*
Creates a new action assigned to a specific project id.
Returns an object with all the actions information.
Request:
```javascript
{
  "id": , // number provided by database
  "project_id": 1, // number (required)
  "description": "Test description", // string (required)
  "notes": "Test notes", // string (required)
  "completed": false // boolean (optional)
}
```
Response:
```javascript
{
    "id": 1,
    "project_id": 1,
    "description": "Test description",
    "notes": "Test notes",
    "completed": false // boolean of 0
}
```
## **Project Routes**
[back to top](#api-user-guide)
#### GET *api/projects*
Returns an array of projects. Available to all users.
Request:
```javascript
// No input needed
```
Response:
```javascript
[
    {
        "id": 1,
        "name": "Complete Node.js and Express Challenge",
        "description": "Build and Awesome API Using Node.js and Express to Manage Projects and Actions GTD Style!",
        "completed": false
    },
    {
        "id": 2,
        "name": "Nate",
        "description": "Greatest showman",
        "completed": false
    },
    {
        "id": 3,
        "name": "Nope",
        "description": "Greatest snowman",
        "completed": false
    }
]
```
#### GET *api/projects/:id*
Return a project object at the specified id, along with any 'actions' assigned to that project_id.
Request:
```javascript
// No input needed
```
Response:
```javascript
{
    "id": 2,
    "name": "Nate",
    "description": "Greatest showman",
    "completed": false,
    "actions": [
        {
            "id": 4,
            "project_id": 2,
            "description": "super",
            "notes": "freedom",
            "completed": false
        }
    ]
}
```
#### PUT *api/projects/:id*
Updating an project information. You cannot modify id.
Request:
```javascript
{
    "name": "cause Hank Hill said so!"
}
```
Response:
```javascript
{
    "id": 1,
    "name": "cause Hank Hill said so!",
    "description": "Build and Awesome API Using Node.js and Express to Manage Projects and Actions GTD Style!",
    "completed": false,
    "actions": [
        {
            "id": 1,
            "project_id": 1,
            "description": "aww, shush",
            "notes": "blue cheese",
            "completed": false
        },
        {
            "id": 2,
            "project_id": 1,
            "description": "sucks",
            "notes": "blah blah blah",
            "completed": false
        },
        {
            "id": 3,
            "project_id": 1,
            "description": "Design and Build API Endpoints",
            "notes": "This is where the magic happens!",
            "completed": false
        }
    ]
}
```
## **Action Routes**
[back to top](#api-user-guide)
#### GET *api/actions/:id*
Return a action object at the specified id
Request:
```javascript
// No input needed
```
Response:
```javascript
{
    "id": 5,
    "project_id": 2,
    "description": "sugar",
    "notes": "All the notes!",
    "completed": true
}
```
#### PUT *api/actions/:id*
Updating an action. You cannot modify id.
Request:
```javascript
{
    "description": "aww, shush"
}
```
Response:
```javascript
{
    "id": 1,
    "project_id": 1,
    "description": "aww, shush",
    "notes": "blue cheese",
    "completed": false
}
```
