import { useAppSelector } from "@/store";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const token = useAppSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/quizzes/login" replace />;
}
