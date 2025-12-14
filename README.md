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

##📦 Database Models
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

### 🔗 API Endpoint

```http
POST /api/questions/bulk-add
