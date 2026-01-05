## Assignment Quiz Application

## 1. Problem Statement

### Build a Quiz Management System with:
Admin Panel
- Ability to create a quiz with:
- Quiz title
- A few questions of various types (MCQ, True/False, text, etc.)

Public Page
- A page where a quiz can be taken by anyone
- Display results after completion (e.g., score or correct answers)


---

## 2. Tech Stack

### Frontend
- React (vite)
- TypeScript
- React Router DOM
- RTK + RTK Query
- Shadcn/ui
- React-toastify

### Backend
- Python
- Flask
- Flask Restful
- Flask jwt
- Pydantic
- MongoDB (Atlas)


## 3. Core Functionalities

### 3.1 Public user flow
- View list of quizzes
- Open quiz
- Answer question
- Submit quiz
- View quiz result

### 3.2 Admin Flow
- Admin login username/password
- JWT-based authentication
- Create a quiz
  - Quiz Title
  - Multiple question
  - Type will be mcq and boolean
  - Validation on both frontend and backend

## 4. API Design (High Level)

### Auth
- `POST /api/auth/login` - Admin login

### Quiz APIs
- `GET /api/quizzes` - Public quiz list
- `GET /api/quizzes/:quizId` - Get quiz details
- `POST /api/quizzes` - Create quiz (admin only)
- `POST /api/quizzes/:quizId/submit` - Submit quiz

## 5. Out of Scope

### Quiz features
- Text answer - uncertain about evaluation. (should it be manual or exact match or fuzzy match) - should be able to accomodate later once requirements are clear
- User registration