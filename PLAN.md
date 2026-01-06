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

## Future Scope

The current implementation intentionally focuses on core functionality and correctness.  
The following items outline potential future enhancements, grouped by product capabilities and technical improvements.

---

### Product & Feature Enhancements

1. **Quiz Discovery & Scale**
   - Introduce pagination and search to efficiently handle a growing number of quizzes.

2. **Text-Based Questions**
   - Finalize requirements and evaluation strategy for text-based questions  
     (e.g. exact match vs partial match, normalization, scoring rules) before implementation.

3. **Admin Capabilities**
   - Add admin self-registration with appropriate validation and access controls.

4. **SEO Improvements**
   - Improve metadata, structured content, and crawlability to increase discoverability.

5. **Extended Answer Types**
   - Support additional answer formats such as image-based answers or rich content, keeping extensibility in mind.

---

### Longer-Term / Exploratory Ideas

These features are intentionally deferred as they introduce additional complexity and are not required for the current scope.

1. **Quiz Categorization**
   - Add categories or tags to group quizzes and improve discovery.

2. **User Accounts & Leaderboards**
   - Introduce user authentication, score tracking, and leaderboards to enable competition.

3. **Competitions**
   - Support time-bound or event-based quizzes where users can compete in real time or asynchronously.

4. **Communication & Engagement**
   - Add newsletters or notifications to keep users engaged with new quizzes and events.

---

## Code & Infrastructure Improvements

1. **Service Layer Abstraction**
   - Introduce a base service layer for database operations to avoid tight coupling between business logic and the data store, making the system easier to extend or migrate.

2. **Testing**
   - Add unit and integration tests to improve confidence, prevent regressions, and enable safer refactoring.

3. **API Versioning**
   - Introduce API versioning to support backward compatibility as the system evolves.

4. **CI / Automation**
   - Add GitHub Actions to automate type checks, run tests, and validate builds on every pull request.

5. **Refactoring & Maintainability**
   - Centralize error handling in both frontend and backend for consistency.
   - Break down large frontend components into smaller, reusable units.
   - Refactor quiz evaluation into a dedicated class to encapsulate logic for multiple question types  
     (currently implemented as a simple function to keep the initial scope small).

6. **Observability & Monitoring**
   - Integrate error monitoring (e.g. Sentry) to track runtime issues and improve reliability in production.

