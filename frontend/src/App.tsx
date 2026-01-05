import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import {
  QuizCreatorPage,
  QuizDetailsPage,
  QuizListingPage,
  QuizResultPage,
} from "@/features/quiz/pages";
import { LoginPage } from "@/features/auth/pages";
import { PageNotFound } from "./components/shared";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizListingPage />} />
        <Route path="/quizzes/:quizId" element={<QuizDetailsPage />} />
        <Route path="/quizzes/:quizId/result" element={<QuizResultPage />} />
        <Route path="/quizzes/login" element={<LoginPage />} />
        <Route
          path="/quizzes/create"
          element={
            <ProtectedRoute>
              <QuizCreatorPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
