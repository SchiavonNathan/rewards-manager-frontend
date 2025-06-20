import { userService, type User } from "@/services/userService";
import { useState, useEffect } from "react";

export function useUserFullData() {
  const [userFullData, setUserFullData] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userLocalStorage = localStorage.getItem("user");

        if (userLocalStorage) {
          const userId = JSON.parse(userLocalStorage).id;
          const userData = await userService(userId);

          setUserFullData(userData);
        }
      } catch (err) {
        console.error("Erro carregando dados:", err);
        setError("Falha ao carregar dados do usuário");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userFullData, loading, error };
}