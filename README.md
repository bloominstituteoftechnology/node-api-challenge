# Sprint Challenge: Express and Node.js - Home Chores

## Description

In this challenge, create a web API to manage the following resources: `People` and `Chores`.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This is an individual assessment, please work on it alone. It is an opportunity to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

If the instructions are not clear, please seek support from your TL and Instructor on Slack.

The Minimum Viable Product must be completed in three hours.

Follow these steps to set up and work on your project:

- [ ] Create a forked copy of this project.
- [ ] Add your _Team Lead_ as collaborator on Github.
- [ ] Clone your forked version of the Repository.
- [ ] Create a new Branch on the clone: git checkout -b `firstName-lastName`.
- [ ] Implement the project on this Branch, committing changes regularly.
- [ ] Push commits: git push origin `firstName-lastName`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge `firstName-lastName` Branch into master on **your fork, don't make Pull Requests against Lambda's repository**.
- [ ] Please don't merge your own pull request.
- [ ] Add your _Team Lead_ as a Reviewer on the Pull-request
- [ ] Your _Team Lead_ will count the challenge as done by merging the branch into _master_.

## Commits

Commit your code regularly and use descriptive messages. This helps both you (in case you ever need to return to old code for any number of reasons and your Team Lead).

## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your Team Lead.

- [ ] Mention two parts of Express that you learned about this week.

- [ ] What is Express Middleware?

- [ ] How can a client send data to an API?

- [ ] What can the API return to help clients know if a request was successful?

- [ ] What Express feature can we use to partition an application into sub-applications?

## Minimum Viable Product

- [ ] Configure an _npm script_ named _"server"_ that will execute your code using _nodemon_. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production.
- [ ] Configure an _npm script_ named _"start"_ that will execute your code using _node_.
- [ ] Write endpoints to manage (CRUD) **chores**.
- [ ] Hard code an array with a few **people**. No need to write endpoints to manage them.
- [ ] Write an endpoint that accepts a person's `id` and returns the list of **chores** for the person. if a person with that `id` does not exist in the **people** array, the endpoint should return a `404` status code and a message. If the person exists, but has no **chores** assigned, return an empty array.
- [ ] Add support for a `query string parameter` called _completed_ to the endpoint that returns the list of chores. When the client sends this query string parameter, and the value is `true`, the endpoint should return the list of completed chores. If the value of the query string parameter is `false`, the endpoint should return chores where completed is `false`. If the query string parameter is not sent, the endpoint should return all chores.
- [ ] Deploy the API to _heroku_ and send the URL to your TL.

### Resources (People and Chores)

Store the data about **people** and **chores** in memory using arrays.

For **people** store the following information:

| Field | Data Type | Notes                                                                                 |
| ----- | --------- | ------------------------------------------------------------------------------------- |
| id    | number    | write code to increment the `id` every time a person is added to the **people** array |
| name  | string    | when saving a person, validate that the client sends a name.                          |

For **chores** store the following information:

| Field       | Data Type | Notes                                                                                                       |
| ----------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| id          | number    | write code to increment the `id` every time a chore is added to the **chores** array                        |
| description | string    | when saving a chore, validate that the client sends a description                                           |
| notes       | string    | this field is optional, it is ok if the client does not provide a value for it                              |
| assignedTo  | number    | required, stores the `id` of a person from the **people** array.                                            |
| completed   | boolean   | used to indicate if the chore has been completed, if not provided by the client, make it `false` by default |

When saving a chore, check that there is a person with an `id` that matches the number provided in this field. Example: if trying to save a chore and `assignedTo` has the value: 3, check that the **people** array has an object with an `id` that has the value: 3. If there is no person with that `id`, do NOT save the chore to the array and return a 400 status code with a message.

## Stretch Goal

- [ ] Write endpoints to manage **people**.
- [ ] Write an endpoint to find a person by id that returns an object with all the chores assigned to that person. Example:

```js
{
  id: 1,
  name: 'Frodo Baggins',
  chores: [
    {
      id: 1,
      description: 'take the ring to Mordor',
      notes: 'make your way to Mount Doom',
      assignedTo: 1, // the id of Frodo,
      completed: true
    },
    {
      id: 2,
      description: 'destroy the ring',
      notes: 'cast the ring into the fire inside Mount Doom',
      assignedTo: 1,
      completed: false
    },
  ]
}
```

- [ ] Use `create-react-app` to create an application in a separate folder (outside the API project folder). Name it anything you want.
- [ ] From the React application show a list of **people** using the API you built.
- [ ] Add functionality to show the details of a person, including its chores, when clicking a person name in the list. Use React Router to navigate to a separate route to show the person details.
- [ ] Add styling! Perhaps with [`styled-components`](https://www.styled-components.com/) or [emotion](https://emotion.sh/docs/introduction)
