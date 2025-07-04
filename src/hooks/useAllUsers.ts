import { userService, type User } from "@/services/userService";
import { useState, useEffect } from "react";

export function useAllUsers() {
  const [allUsers, setAllUsers ] = useState<User[] | undefined[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();

      if (response) {
        setAllUsers(response);
      }
    } catch (err) {
      console.error("Erro carregando dados:", err);
      setError("Falha ao carregar dados do usuário");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const refetch = () => {
    fetchUserData();
  };

  return { allUsers, loading, error, refetch };
}