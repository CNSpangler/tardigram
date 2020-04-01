* `GET /posts/:id`
  * responds with a post by id
  * should include the populated user
  * should include all comments associated with the post (populated with commenter)
    * HINT: You'll need to make two separate queries and a `Promise.all`

* `GET /posts/popular`
  * respond with a list of the 10 posts with the most comments

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
