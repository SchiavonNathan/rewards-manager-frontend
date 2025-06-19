// src/hooks/useAuth.ts
import { useState } from "react";
import { loginService, type LoginCredentials, type User } from "@/services/loginService";
import { useNavigate } from "react-router-dom";


export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();


  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await loginService(credentials);
      setUser(userData);
      localStorage.setItem('authToken', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return {
    user,
    isLoading,
    error,
    handleLogin,
    handleLogout,
  };
}