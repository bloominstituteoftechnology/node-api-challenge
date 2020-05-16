## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your Team Lead.

- [ ] Mention two parts of Express that you learned about this week.

* Express is light-weight. This means the framework isn't bloated in terms of file size and doesn't contain excess stuff that can slow down your app. Express is also unopinionated. This means that there's a lot of freedom on how to use express for your application (no one way to do things) thus making express very flexible in usage.

- [ ] Describe Middleware?

* Middleware is a function that can intercept requests and responses before it gets to the router. It has the possiblity to make changes to the request, and is useful for authenticating and doing any necessary modificiations before the server gets the request.

- [ ] Describe a Resource?

* Resources is data in the backend that can be managed by the front-end's intereactions with the end-points of a back-end API.

- [ ] What can the API return to help clients know if a request was successful?

* Statuses. Different statuses means different things. 200 generally means it's good, 404 means it's not found, 500 means internal error etc. 200 would be the answer to let the user know the request was successful (201 as well if there were changes to DBS)

- [ ] How can we partition our application into sub-applications?

* We can modularize our application into it's own folder based on the what category the data is. For example, we would make seperate routers for comments and for users as they can be their own objects in the database. We can then pass the routers in as if they were middleware in the server file.

## Minimum Viable Product

- [ ] Configure an _npm script_ named _"server"_ that will execute your code using _nodemon_. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production.
- [ ] Configure an _npm script_ named _"start"_ that will execute your code using _node_.

Design and build the necessary endpoints to:

- [ ] Perform CRUD operations on _projects_ and _actions_. When adding an action, make sure the `project_id` provided belongs to an existing `project`. If you try to add an action with an `id` of 3 and there is no project with that `id` the database will return an error.
- [ ] Retrieve the list of actions for a project.

Please read the following sections before implementing the Minimum Viable Product, they describe how the database is structured and the files and methods available for interacting with the data.

### Database Schemas

The description of the structure and extra information about each _resource_ stored in the included database (`./data/lambda.db3`) is listed below.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | no need to provide it when creating projects, the database will generate it |
| name        | string    | required.                                                                   |
| description | string    | required.                                                                   |
| completed   | boolean   | used to indicate if the project has been completed, not required            |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | no need to provide it when creating posts, the database will automatically generate it.          |
| project_id  | number    | required, must be the id of an existing project.                                                 |
| description | string    | up to 128 characters long, required.                                                             |
| notes       | string    | no size limit, required. Used to record additional notes or requirements to complete the action. |
| completed   | boolean   | used to indicate if the action has been completed, not required                                  |

### Database Persistence Helpers

The `/data/helpers` folder includes files you can use to manage the persistence of _project_ and _action_ data. These files are `projectModel.js` and `actionModel.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Remember to use .then().catch() or async/await.**

- `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.

We have provided test data for all the resources.

## Stretch Goal

- Use `create-react-app` to create an application in a separate folder (outside the API project folder). Name it anything you want.
- From the React application show a list of all _projects_ using the API you built.
- Add functionality to show the details of a project, including its actions, when clicking a project name in the list. Use React Router to navigate to a separate route to show the project details.
- Add styling!
