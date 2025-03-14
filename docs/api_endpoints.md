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