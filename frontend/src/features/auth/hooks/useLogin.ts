import { useCallback, useState } from "react";
import { useLoginMutation } from "../store/auth.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isValid = useCallback(() => {
    return username.trim().length > 0 && password.trim().length > 0;
  }, [username, password]);

  const login = useCallback(async () => {
    if (!isValid()) {
      toast.error("Username and password are required.");
      return;
    }

    try {
      await loginMutation({ username, password }).unwrap();
      toast.success("Login successful!");
      navigate("/quizzes/create");
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
    }
  }, [username, password, isValid, loginMutation]);

  return {
    username,
    setUsername,
    password,
    setPassword,
    isValid,
    login,
    isLoading,
  };
}
