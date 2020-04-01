# Tardygram (Instagram clone)

Let's create an Instagram clone.

## Models

### User

Users can post new posts and leave comments. They have:

* A String `username`
* A String `passwordHash`
* A String `profilePhotoUrl`

### Post

Posts are photos with some text caption. They should have:

* A reference to user `user`
* A String `photoUrl`
* A String `caption`
* An array of String `tags`

### Comment

Comments have:

* A reference to a user `commentBy`
* A reference to a post `post`
* A string `comment`

## Routes

### Auth

Create authentication routes

* `POST /auth/signup`
  * creates a new user
  * responds with the created user
* `POST /auth/signin`
  * responds with a user
* `GET /auth/verify`
  * uses the `ensureAuth` middleware
  * responds with a user

### Posts

Create RESTful post routes

* `POST /posts`
  * requires authentication
  * creates a new post
  * responds with the new post
  * HINT: get the user who created the post from `req.user`.
* `GET /grams`
  * responds with a list of grams
* `GET /grams/:id`
  * responds with a gram by id
  * should include the populated user
  * should include all comments associated with the gram (populated with commenter)
    * HINT: You'll need to make two separate queries and a `Promise.all`
* `PATCH /grams/:id`
  * requires authentication
  * only can update the gram caption
  * respond with the updated gram
  * NOTE: make sure the user attempting to update the gram owns it
* `DELETE /grams/:id`
  * requires authentication
  * deletes a gram
  * responds with the deleted gram
  * NOTE: make sure the user attempting to delete the gram owns it
* `GET /grams/popular`
  * respond with a list of the 10 grams with the most comments

### Comments

Create RESTful comments routes

* `POST /comments`
  * requires authentication
  * create a new comment
  * respond with the comment
  * HINT: get the user who created the comment from `req.user`.
* `DELETE /comments/:id`
  * requires authentication
  * delete a comment by id
  * respond with the deleted comment
  * NOTE: make sure the user attempting to delete the comment owns it

### Users

* BONUS:
  * `GET /users/popular`
    * respond with the 10 users with the most total comments on their posts
  * `GET /users/prolific`
    * respond with the 10 users with the most posts
  * `GET /users/leader`
    * respond with the 10 users with the most comments
  * `GET /users/impact`
    * respond with the 10 users with the highest `$avg` comments per post
