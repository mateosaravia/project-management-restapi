# API Documentation

## Table of Contents

* [Users](#users)
    * [`POST /signup`](#post-signup)
    * [`DELETE /users/:id`](#delete-usersid)
    * [`GET /users/:id`](#get-usersid)
    * [`PATCH /users/:id/password`](#patch-usersidpassword)
    * [`PATCH /users/:id/username`](#patch-usersidusername)
* [Sessions](#sessions)
    * [`POST /login`](#post-login)
    * [`POST /logout`](#post-logout)
* [Profiles](#profiles)
    * [`POST /users/:id/profiles`](#post-usersidprofiles)
    * [`GET /users/:id/profiles`](#get-usersidprofiles)
    * [`PATCH /users/:id/profiles`](#patch-usersidprofiles)
* [Projects](#projects)
    * [`POST /projects`](#post-projects)
    * [`DELETE /projects/:id`](#delete-projectsid)
    * [`GET /projects/:id`](#get-projectsid)
    * [`GET /projects`](#get-projects)
    * [`PUT /projects/:id`](#put-projectsid)
    * [`POST /projects/:id/remove`](#post-projectsidremove)
    * [`POST /projects/:id/leave`](#post-projectsidleave)
* [Invitations](#invitations)
    * [`POST /projects/:id/invitations`](#post-projectsidinvitations)
    * [`POST /projects/invitations/:invitationId/accept`](#post-projectsinvitationsinvitationidaccept)
    * [`POST /projects/invitations/:invitationId/reject`](#post-projectsinvitationsinvitationidreject)
    * [`DELETE /projects/invitations/:invitationId/remove`](#delete-projectsinvitationsinvitationidremove)
    * [`GET /projects/:id/invitations`](#get-projectsidinvitations)
    * [`GET /projects/invitations`](#get-projectsinvitations)
* [Reviews](#reviews)
    * [`POST /projects/:id/reviews`](#post-projectsidreviews)
    * [`PUT /projects/:projectId/reviews/:reviewId`](#put-projectsprojectidreviewsreviewid)
    * [`DELETE /projects/:projectId/reviews/:reviewId`](#delete-projectsprojectidreviewsreviewid)
    * [`GET /projects/:projectId/reviews`](#get-projectsprojectidreviews)

## Users

### `POST /signup`
>
>Create a new user.
>
>#### *Body Parameters*
>
>- `username` (string, required): The username of the user.
>- `email` (string, required): The email address of the user.
>- `password` (string, required): The password of the user.
>- `role` (string, required): The role of the user. It can be `user` or `admin`.
>
>#### *Responses*
>
>- **201 Created**: If the user is created successfully.
>- **400 Bad Request**: If required parameters are missing or invalid.

### `DELETE /users/:id`

>Delete a user.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the user.
>
>#### *Responses*
>
>- **200 Ok**: If the user is deleted successfully.
>- **404 Not Found**: If the user is not found.
>
### `GET /users/:id`

>Get a user.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the user.
>
>#### *Responses*
>
>- **200 Ok**: If the user is found.
>- **404 Not Found**: If the user is not found.

### `PATCH /users/:id/password`

>Change the password of a user.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the user.
>
>#### *Body Parameters*
>- `oldPassword` (string, required): The old password of the user.
>- `newPassword` (string, required): The new password of the user.
>
>#### *Responses*
>
>- **200 Ok**: If the password is changed successfully.
>- **400 Bad Request**: If required parameters are missing or invalid.
>- **404 Not Found**: If the user is not found.

### `PATCH /users/:id/username`

>Change the username of a user.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the user.
>
>#### *Body Parameters*
>
>- `newUsername` (string, required): The new username of the user.
>
>#### *Responses*
>
>- **200 Ok**: If the username is changed successfully.
>- **400 Bad Request**: If required parameters are missing or invalid.
>- **404 Not Found**: If the user is not found.

## Sessions

### `POST /login`

>Authenticate a user.
>
>#### *Body Parameters*
>
>- `email` (string, required): The email address of the user.
>- `password` (string, required): The password of the user.
>
>#### *Responses*
>
>- **200 Ok**: If the user is authenticated successfully.
>- **400 Bad Request**: If required parameters are missing or invalid.
>- **401 Unauthorized**: If the user is not authenticated.

### `POST /logout`

>Logout a user.
>
> #### *Headers*
>
>- `Authorization` (string, required): The token of the user.
>
>#### *Responses*
>
>- **200 Ok**: If the user is logged out successfully.

## Profiles

### `POST /users/:id/profiles`

>Create a new user profile.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the user.
>
>#### *Body Parameters*
>
>- `name` (string, required): The name of the user.
>- `lastname` (string, required): The lastname of the user.
>- `biography` (string, required): The biography of the user.
>- `location` (string, required): The location of the user.
>- `website` (string, required): The website of the user.
>
>#### *Responses*
>
>- **201 Created**: If the profile is created successfully.
>- **400 Bad Request**: If required parameters are missing or invalid.
>- **404 Not Found**: If the user is not found.

### `GET /users/:id/profiles`

>Get the profile of a user.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the user.
>
>#### *Responses*
>
>- **200 Ok**: If the profile is found.
>- **404 Not Found**: If the user is not found.

### `PATCH /users/:id/profiles`

>Update the profile of a user.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the user.
>
>#### *Body Parameters*
>
>- `name` (string, required): The name of the user.
>- `lastname` (string, required): The lastname of the user.
>- `biography` (string, required): The biography of the user.
>- `location` (string, required): The location of the user.
>- `website` (string, required): The website of the user.
>
>#### *Responses*
>
>- **200 Ok**: If the profile is updated successfully.
>- **400 Bad Request**: If required parameters are missing or invalid.
>- **404 Not Found**: If the user is not found.

## Projects

### `POST /projects`

>Create a new project.
>
>#### *Body Parameters*
>
>- `title` (string, required): The title of the project.
>- `description` (string, required): The description of the project.
>- `documentation` (string, required): The documentation of the project.
>- `skills` ([string], required): The skills of the project.
>- `technologies` ([string], required): The technologies of the project.
>- `tags` ([string], required): The tags of the project.
>
>#### *Responses*
>
>- **201 Created**: If the project is created successfully.
>- **400 Bad Request**: If required parameters are missing or invalid.

### `DELETE /projects/:id`

>Delete a project.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the project.
>
>#### *Responses*
>
>- **200 Ok**: If the project is deleted successfully.
>- **404 Not Found**: If the project is not found.

### `GET /projects/:id`

>Get a project.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the project.
>
>#### *Responses*
>
>- **200 Ok**: If the project is found.
>- **404 Not Found**: If the project is not found.

### `GET /projects`

>Get all projects.
>
>#### *Responses*
>
>- **200 Ok**: If the projects are found.

### `PUT /projects/:id`

>Update a project.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the project.
>
>#### *Body Parameters*
>
>- `title` (string, required): The title of the project.
>- `description` (string, required): The description of the project.
>- `documentation` (string, required): The documentation of the project.
>- `skills` ([string], required): The skills of the project.
>- `technologies` ([string], required): The technologies of the project.
>- `tags` ([string], required): The tags of the project.
>
>#### *Responses*
>
>- **200 Ok**: If the project is updated successfully.
>- **400 Bad Request**: If required parameters are missing or invalid.
>- **404 Not Found**: If the project is not found.


### `POST /projects/:id/remove`

>Remove a collaborator from a project.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the project.
>
>#### *Body Parameters*
>
>- `users` ([number], required): The ids of the users to remove.
>
>#### *Responses*
>
>- **200 Ok**: If the collaborator is removed successfully.
>- **400 Bad Request**: If required parameters are missing or invalid.
>- **404 Not Found**: If the project is not found.

### `POST /projects/:id/leave`

>Leave a project.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the project.
>
>#### *Responses*
>
>- **200 Ok**: If the user leaves the project successfully.
>- **404 Not Found**: If the project is not found.

## Invitations

### `POST /projects/:id/invitations`

>Invite a users to a project.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the project.
>
>#### *Body Parameters*
>
>- `users` ([number], required): The ids of the users to invite.
>- `customMessage` (string, required): The custom message of the invitation.
>
>#### *Responses*
>
>- **201 Created**: If the invitation is created successfully.
>- **400 Bad Request**: If required parameters are missing or invalid.
>- **404 Not Found**: If the project is not found.

### `POST /projects/invitations/:invitationId/accept`

>Accept an invitation to a project.
>
>#### *Path Parameters*
>
>- `invitationId` (number, required): The id of the invitation.
>
>#### *Responses*
>
>- **200 Ok**: If the invitation is accepted successfully.
>- **404 Not Found**: If the invitation is not found.

### `POST /projects/invitations/:invitationId/reject`

>Reject an invitation to a project.
>
>#### *Path Parameters*
>
>- `invitationId` (number, required): The id of the invitation.
>
>#### *Responses*
>
>- **200 Ok**: If the invitation is rejected successfully.
>- **404 Not Found**: If the invitation is not found.

### `DELETE /projects/invitations/:invitationId/remove`

>Remove an invitation to a project.
>
>#### *Path Parameters*
>
>- `invitationId` (number, required): The id of the invitation.
>
>#### *Responses*
>
>- **200 Ok**: If the invitation is removed successfully.
>- **404 Not Found**: If the invitation is not found.

### `GET /projects/:id/invitations`

>Get the invitations of a project.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the project.
>
>#### *Responses*
>
>- **200 Ok**: If the invitations are found.
>- **404 Not Found**: If the project is not found.

### `GET /projects/invitations`

>Get all invitations for a user.
>
>#### *Responses*
>
>- **200 Ok**: If the invitations are found.

## Reviews

### `POST /projects/:id/reviews`

>Create a new review for a project.
>
>#### *Path Parameters*
>
>- `id` (number, required): The id of the project.
>
>#### *Body Parameters*
>
>- `rating` (number, required): The rating of the review.
>- `comment` (string, required): The comment of the review.
>
>#### *Responses*
>
>- **201 Created**: If the review is created successfully.
>- **400 Bad Request**: If required parameters are missing or invalid.
>- **404 Not Found**: If the project is not found.

### `PUT /projects/:projectId/reviews/:reviewId`

>Update a review for a project.
>
>#### *Path Parameters*
>
>- `projectId` (number, required): The id of the project.
>- `reviewId` (number, required): The id of the review.
>
>#### *Body Parameters*
>
>- `rating` (number, required): The rating of the review.
>- `comment` (string, required): The comment of the review.
>
>#### *Responses*
>
>- **200 Ok**: If the review is updated successfully.
>- **400 Bad Request**: If required parameters are missing or invalid.
>- **404 Not Found**: If the project or the review is not found.

### `DELETE /projects/:projectId/reviews/:reviewId`

>Delete a review for a project.
>
>#### *Path Parameters*
>
>- `projectId` (number, required): The id of the project.
>- `reviewId` (number, required): The id of the review.
>
>#### *Responses*
>
>- **200 Ok**: If the review is deleted successfully.
>- **404 Not Found**: If the project or the review is not found.

### `GET /projects/:projectId/reviews`

>Get the reviews of a project.
>
>#### *Path Parameters*
>
>- `projectId` (number, required): The id of the project.
>
>#### *Responses*
>
>- **200 Ok**: If the reviews are found.
>- **404 Not Found**: If the project is not found.
