# API Endpoints Documentation


## 1. Authentication Endpoints
Handles user authentication with Google OAuth.

### 1.1 Google OAuth Login
**Endpoint:** `GET /auth/google`  
**Description:** Redirects the user to Google's OAuth login page for authentication.  
**Authentication Required:** ❌ (Public)  

#### Request Example
```http
GET /auth/google
```

#### Response
- **302 Found** → Redirects the user to the Google OAuth page.

#### Sample Response

HTTP/1.1 302 Found

Location: https://accounts.google.com/o/oauth2/auth?client_id=your-client-id&redirect_uri=your-redirect-uri

#### Payload Example
```
{
  "client_id": "your_google_client_id",
  "redirect_uri": "your_redirect_uri"
}
```

---

### 1.2 Google OAuth Callback
**Endpoint:** `GET /auth/google/callback`  
**Description:** Handles OAuth authentication response from Google and logs in the user.  
**Authentication Required:** ❌ (Public)  

#### Request Example
```http
GET /auth/google/callback
```

#### Response
- **302 Found** → Redirects the user to the homepage or dashboard on success.
- **302 Found** → Redirects to `/` on failure.

#### Sample Response

HTTP/1.1 302 Found

Location: /dashboard

#### Payload Example
```
{
  "code": "authorization_code_from_google"
}
```

---

### 1.3 Logout
**Endpoint:** `GET /auth/logout`  
**Description:** Logs out the current user and clears the session.  
**Authentication Required:** ✅ (Logged-in users only)  

#### Request Example
```http
GET /auth/logout
```

#### Response
- **302 Found** → Redirects to `/` after logging out.

#### Sample Response

HTTP/1.1 302 Found

Location: /

#### Payload Example
```
{
  "message": "Logged out successfully"
}
```

---

## 2. Comment Endpoints
Handles comments on posts.

### 2.1 Get All Comments
**Endpoint:** `GET /comments`  
**Description:** Retrieves all comments.  
**Authentication Required:** ❌ (Public)

#### Request Example
```http
GET /comments
```

#### Response
200 OK → List of all comments.

#### Sample Response

```
{
  "comments": [
    {
      "id": "1",
      "content": "This is a comment.",
      "user_id": "123",
      "post_id": "456"
    }
    {
      "id": "2",
      "content": "This is another comment.",
      "user_id": "423",
      "post_id": "434"
    }
  ]
}
```

#### Payload Example
```
{
  "message": "All comments"
}
```

---

### 2.2 Get Comments for a Post
**Endpoint:** `GET /comments/post/:postId`  
**Description:** Retrieves all comments for a specific post.  
**Authentication Required:** ❌ (Public)  

#### Request Example
```http
GET /comments/post/456
```

#### Response
200 OK → List of comments for the post.

#### Sample Response

```
{
  "comments": [
    {
      "id": "1",
      "content": "This is a comment.",
      "user_id": "123",
      "post_id": "456"
    }
  ]
}
```

#### Payload Example
```
{
  "message": "All comments for the ID post 456"
}
```

---

### 2.3 Create a Comment
**Endpoint:** `POST /comments/post/:postId`  
**Description:** Creates a comment on a specific post.  
**Authentication Required:** ✅ (User must be logged in)  

#### Request Example
```http
POST /comments/post/456
```

#### Response
200 OK → List of comments for the post.

#### Sample Response

```
{
  "message": "Comment created successfully",
  "comment": {
    "id": "2",
    "content": "This is a new comment.",
    "user_id": "123",
    "post_id": "456"
  }
}
```

#### Payload Example
```
{
  "content": "This is a new comment."
}
```

---

### 2.4 Delete a Comment
**Endpoint:** `DELETE /comments/:id`  
**Description:** Deletes a comment.  
**Authentication Required:** ✅ (User must be logged in)  

#### Request Example
```http
GET /comments/post/456
```

#### Response
200 OK → Deletes a comment.

#### Payload Example
```
{
  "message": "Comment deleted successfully"
}
```

---

### 2.5 Like a Comment
**Endpoint:** `POST /comments/:commentId/like`  
**Description:** Likes a comment.  
**Authentication Required:** ✅ (User must be logged in)  

#### Request Example
```http
POST /comments/1/like
```

#### Response
200 OK → Likes a comment.

#### Payload Example
```
{
  "message": "Comment liked successfully"
}
```

---

### 2.6 Unlike a Comment
**Endpoint:** `DELETE /comments/:commentId/unlike`  
**Description:** Removes a like from a comment.  
**Authentication Required:** ✅ (User must be logged in)  

#### Request Example
```http
DELETE /comments/1/unlike
```

#### Response
200 OK → Remove like from a comment.

#### Sample Response

```
{
  "like_count": 9
}
```

#### Payload Example
```
{
  "message": "Like removed successfully"
}
```

---

### 2.7 Get Comment Like Count
**Endpoint:** `GET /comments/:commentId/count`  
**Description:** Retrieves the total number of likes for a comment.  
**Authentication Required:** ❌ (Public) 

#### Request Example
```http
GET /comments/1/count
```

#### Response
200 OK → Gives the number of likes of a comment.

#### Sample Response

```
{
  "like_count": 10
}
```

#### Payload Example
```
{
  "message": "Number of likes retrieved successfully"
}
```

---

### 2.8 Get Comment Likers
**Endpoint:** `GET /comments/:commentId/likers` 
**Description:** Retrieves a list of users who liked a comment.  
**Authentication Required:** ❌ (Public)  

#### Request Example
```http
GET /comments/1/likers
```

#### Response
200 OK → List of users who liked a comment.

#### Sample Response

```
{
  "likers": [
    {
      "id": "123",
      "username": "user1"
    },
    {
      "id": "124",
      "username": "user2"
    }
  ]
}
```

#### Payload Example
```
{
  "message": "Users retrieved successfully"
}
```

---

## 3. Post Endpoints
Handles user posts.

### 3.1 Create a Post
**Endpoint:** `POST /posts`  
**Description:** Creates a new post with optional image uploads.  
**Authentication Required:** ✅ (User must be logged in)  

#### Request Example
```http
POST /posts
```

#### Response
200 OK → Creates a new post.

#### Sample Response

```
{
  "message": "Post created successfully",
  "post": {
    "id": "789",
    "title": "My New Post",
    "content": "This is the content of the post.",
    "image_url": "http://example.com/image.jpg",
    "user_id": "123"
  }
}
```

#### Payload Example
```
{
  "title": "My New Post",
  "content": "This is the content of the post.",
  "image_url": "http://example.com/image.jpg"
}
```

---

### 3.2 Get All Posts
**Endpoint:** `GET /posts`  
**Description:** Retrieves all posts.  
**Authentication Required:** ❌ (Public)  

#### Request Example
```http
GET /posts
```

#### Response
200 OK → Gives all posts.

#### Sample Response

```
{
  "posts": [
    {
      "id": "789",
      "title": "My New Post",
      "content": "This is the content of the post.",
      "image_url": "http://example.com/image.jpg",
      "user_id": "123"
    }
  ]
}
```

#### Payload Example
```
{
  "message": "All posts retrieved successfully"
}
```

---

### 3.3 Delete a Post
**Endpoint:** `DELETE /posts/:id`  
**Description:** Deletes a post.  
**Authentication Required:** ✅ (User must be logged in)  

#### Request Example
```http
DELETE /posts/789
```

#### Response
200 OK → Deletes the post with ID 789.

#### Payload Example
```
{
  "message": "Post deleted successfully"
}
```

---

### 3.4 Like a Post
**Endpoint:** `POST /posts/:postId/like`  
**Description:** Likes a post.  
**Authentication Required:** ✅ (User must be logged in)  

#### Request Example
```http
POST /posts/789/like
```

#### Response
200 OK → Like a post.

#### Payload Example
```
{
  "message": "Post liked successfully"
}
```

---

### 3.5 Unlike a Post
**Endpoint:** `DELETE /posts/:postId/unlike`  
**Description:** Removes a like from a post.  
**Authentication Required:** ✅ (User must be logged in)  

#### Request Example
```http
DELETE /posts/789/unlike
```

#### Response
200 OK → Removes a like.

#### Payload Example
```
{
  "message": "Like removed successfully"
}
```

---

### 3.6 Get Post Like Count
**Endpoint:** `GET /posts/:postId/count`  
**Description:** Retrieves the total number of likes for a post.  
**Authentication Required:** ❌ (Public) 

#### Request Example
```http
GET /posts/789/count
```

#### Response
200 OK → Gives numbers of.

#### Sample Response

```
{
  "like_count": 15
}
```

#### Payload Example
```
{
  "message": "Number of likes retrieved successfully"
}
```

---

### 3.7 Get Post Likers
**Endpoint:** `GET /posts/:postId/likers`  
**Description:** Retrieves a list of users who liked a post.  
**Authentication Required:** ❌ (Public) 

#### Request Example
```http
GET /posts/789/likers
```

#### Response
200 OK → Gives all users who liked.

#### Sample Response

```
{
  "likers": [
    {
      "id": "123",
      "username": "user1"
    },
    {
      "id": "124",
      "username": "user2"
    }
  ]
}
```

#### Payload Example
```
{
  "message": "All users retrieved successfully"
}
```

---

## 4. User Endpoints  
Handles user profiles.  

### 4.1 Get Current User Profile  
**Endpoint:** `GET /users/me`  
**Description:** Retrieves the profile of the logged-in user.  
**Authentication Required:** ✅ (User must be logged in)  

#### Request Example
```http
GET /users/me
```

#### Response
200 OK → Retrieves the logged-in profile.

#### Sample Response

```
{
  "id": "123",
  "username": "user1",
  "email": "user1@example.com"
}
```

#### Payload Example
```
{
  "message": "Profile retrieved successfully"
}
```

---

### 4.2 Get User By ID  
**Endpoint:** `GET /users/:id`  
**Description:** Retrieves the public profile of a specific user.  
**Authentication Required:** ❌ (Public)  

#### Request Example
```http
GET /users/123
```

#### Response
200 OK → Retrieves a specific profile.

#### Sample Response

```
{
  "id": "123",
  "username": "user1",
  "email": "user1@example.com"
}
```

#### Payload Example
```
{
  "message": "Profile retrieved successfully"
}
```

---

### 4.3 Update User Profile  
**Endpoint:** `PUT /users/:id`  
**Description:** Updates the profile of the logged-in user.  
**Authentication Required:** ✅ (User must be logged in)

#### Request Example
```http
PUT /users/123
```

#### Response
200 OK → Updates the logged-in profile.

#### Sample Response

```
{
  "message": "Profile updated successfully",
  "user": {
    "id": "123",
    "username": "new_username",
    "email": "new_email@example.com"
  }
}
```

#### Payload Example
```
{
  "message": "Profile updated successfully"
}
```