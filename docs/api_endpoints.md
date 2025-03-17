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

---

## 2. Comment Endpoints
Handles comments on posts.

### 2.1 Get All Comments
**Endpoint:** `GET /comments`  
**Description:** Retrieves all comments.  
**Authentication Required:** ❌ (Public)

---

### 2.2 Get Comments for a Post
**Endpoint:** `GET /comments/post/:postId`  
**Description:** Retrieves all comments for a specific post.  
**Authentication Required:** ❌ (Public)  

---

### 2.3 Create a Comment
**Endpoint:** `POST /comments/post/:postId`  
**Description:** Creates a comment on a specific post.  
**Authentication Required:** ✅ (User must be logged in)  

---

### 2.4 Delete a Comment
**Endpoint:** `DELETE /comments/:id`  
**Description:** Deletes a comment.  
**Authentication Required:** ✅ (User must be logged in)  

---

### 2.5 Like a Comment
**Endpoint:** `POST /comments/:commentId/like`  
**Description:** Likes a comment.  
**Authentication Required:** ✅ (User must be logged in)  

---

### 2.6 Unlike a Comment
**Endpoint:** `DELETE /comments/:commentId/unlike`  
**Description:** Removes a like from a comment.  
**Authentication Required:** ✅ (User must be logged in)  

---

### 2.7 Get Comment Like Count
**Endpoint:** `GET /comments/:commentId/count`  
**Description:** Retrieves the total number of likes for a comment.  
**Authentication Required:** ❌ (Public) 

---

### 2.8 Get Comment Likers
**Endpoint:** `GET /comments/:commentId/likers` 
**Description:** Retrieves a list of users who liked a comment.  
**Authentication Required:** ❌ (Public)  

---

## 3. Post Endpoints
Handles user posts.

### 3.1 Create a Post
**Endpoint:** `POST /posts`  
**Description:** Creates a new post with optional image uploads.  
**Authentication Required:** ✅ (User must be logged in)  

### 3.2 Get All Posts
**Endpoint:** `GET /posts`  
**Description:** Retrieves all posts.  
**Authentication Required:** ❌ (Public)  

---

### 3.3 Delete a Post
**Endpoint:** `DELETE /posts/:id`  
**Description:** Deletes a post.  
**Authentication Required:** ✅ (User must be logged in)  

---

### 3.4 Like a Post
**Endpoint:** `POST /posts/:postId/like`  
**Description:** Likes a post.  
**Authentication Required:** ✅ (User must be logged in)  

---

### 3.5 Unlike a Post
**Endpoint:** `DELETE /posts/:postId/unlike`  
**Description:** Removes a like from a post.  
**Authentication Required:** ✅ (User must be logged in)  

---

### 3.6 Get Post Like Count
**Endpoint:** `GET /posts/:postId/count`  
**Description:** Retrieves the total number of likes for a post.  
**Authentication Required:** ❌ (Public) 

---

### 3.7 Get Post Likers
**Endpoint:** `GET /posts/:postId/likers`  
**Description:** Retrieves a list of users who liked a post.  
**Authentication Required:** ❌ (Public) 

---

## 4. User Endpoints
Handles user profiles.

### 4.1 Get Current User Profile
**Endpoint:** `GET /users/me`  
**Description:** Retrieves the profile of the logged-in user.  
**Authentication Required:** ✅ (User must be logged in)  

---

### 4.2 Get User By ID
**Endpoint:** `GET /users/:id`  
**Description:** Retrieves the public profile of a specific user.  
**Authentication Required:** ❌ (Public)  

---

### 4.3 Update User Profile
**Endpoint:** `PUT /users/:id`  
**Description:** Updates the profile of the logged-in user.  
**Authentication Required:** ✅ (User must be logged in)

