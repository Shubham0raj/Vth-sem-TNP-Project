# 🧠 JavaScript Quiz Application (MERN-style)

A full-stack **JavaScript Quiz Application** built using **HTML, CSS, JavaScript (Frontend)** and **Node.js, Express, MongoDB (Backend)**.  
The app supports timed quizzes, user score tracking, and an admin panel to manage questions.

---

## 🚀 Features

### 👤 User Side
- Enter **username once** (stored in `localStorage`)
- Quiz remains **locked until name is entered**
- Fetches questions dynamically from backend
- **One question at a time**
- **Timer per question** (configurable)
- Auto-move to next question when time runs out
- Prevents skipping questions without answering
- Calculates score at the end
- Saves **username + score** to database
- Shows:
  - Final score
  - Correct / wrong answers
- Clean, modern UI

---

### ⏱ Timer
- Timer starts **only after user enters name**
- Timer resets for every question
- Centralized configuration:
  ```js
  const TIME_PER_QUESTION = 15;
- No hard-coded timer values in HTML
- Timer UI updates every second

---
### 🧑‍💻 Admin Panel
- Separate Admin UI

- Allows adding quiz questions manually

- Admin can add:

    - Question text

    - Multiple options

    - Correct answer

- Supports:

    - Single question add

    - Bulk question insert (via Postman)
---
### 🗄 Backend Features
- REST API built with Express.js

- Database: MongoDB

- ODM: Mongoose

- Environment variables handled using dotenv

- CORS enabled for frontend communication
---

## 📦 Database Models
- Question Model
    -question (String)
    -options (Array of Strings)
    -answer (String)
-User Score Model
    -name (String)
    -score (Number)
    -totalQuestions (Number)
    -createdAt (Date)
---
### 🔗 API Endpoints
- Questions
    - `GET /api/questions`
      Fetch all quiz questions

    - `POST /api/questions/add`
      Add a single question

    - `POST /api/questions/bulk-add`
      Add multiple questions at once (Postman supported)

- Users
    - `POST /api/users/submit`
      Submit user score
---
## 📦 Bulk Question Upload (Admin / Postman)

To avoid adding questions one by one, the application supports **bulk insertion of quiz questions** using a single API call. This is useful when you already have a large question set.

---

## 🔌 API Endpoints

All backend APIs are built using **Express.js** and return **JSON responses**.

Base URL (local):http://localhost:5000

---
### 📥 Fetch Quiz Questions

**Endpoint**
---


**Description**
- Fetches all quiz questions from the database.
- Used by the frontend quiz application.

**Response Example**
```json
[
  {
    "_id": "65f1a9c9e1a1a1a1a1a1a1a1",
    "question": "Inside which HTML element do we put the JavaScript?",
    "options": [
      "<script>",
      "<javascript>",
      "<scripting>",
      "<js>"
    ],
    "answer": "<script>"
  }
]
```

---
## ➕ Add Single Question (Admin)

This endpoint allows the admin to add **one quiz question at a time** to the database.

### 📌 Endpoint

### POST /api/questions/add


### 📥 Request Body (JSON)
```json
{
  "question": "Inside which HTML element do we put the JavaScript?",
  "options": [
    "<script>",
    "<javascript>",
    "<scripting>",
    "<js>"
  ],
  "answer": "<script>"
}
```
---
### 📤 Success Response(json)
```

{
  "message": "Question added successfully"
}

```
### ❌ Error Response(json)
```
{
  "error": "Failed to add question"
}

```
### 🛠 Usage
 - Used by Admin Panel UI

- Can also be tested using Postman

 - Validates required fields before saving


---

If you want, next I can give you **Bulk Question Upload**, **Submit Score**, or **Fetch Questions** sections in the same format.

You’re basically **done project-wise** now — this is documentation polishing, which most students completely skip.


---
## 🔐 Environment Variables
---
### Create a `.env` file in the backend root:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string

```
### Load environment variables in server:

```
require("dotenv").config();

```
---

## 🛠 Tech Stack

```md
## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage (for username persistence)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

### Tools
- Postman (API testing & bulk uploads)
- MongoDB Atlas (Cloud Database)

```

---
## 🚀 Project Status

✅ Frontend Complete  
✅ Backend Complete  
✅ Timer Implemented  
✅ Admin Panel Implemented  
✅ Bulk Upload Supported  
✅ Environment Variables Configured  


---

### ✅ Verdict (honest answer)
Yes — **your project is DONE** for:
- College submission
- Minor project
- Portfolio beginner full-stack project

If you want, next I can help you:
- Clean folder structure screenshot
- Viva questions & answers
- Deployment steps (Render / Vercel)
- Resume bullet points

Just tell me what’s next.

---

# 👨‍💻 Author

## Shubham
---
