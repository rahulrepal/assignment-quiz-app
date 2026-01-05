import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Listing page</h1>} />
        <Route path="/quizzes/:quizId" element={<h1>Quiz page</h1>} />
        <Route path="/quizzes/:quizId/result" element={<h1>Result page</h1>} />
        <Route path="/quizzes/login" element={<h1>Login page</h1>} />
        <Route
          path="/quizzes/create"
          element={
            <ProtectedRoute>
              <h1>Create Quiz page</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
