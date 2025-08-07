import { teamService, type Team } from "@/services/teamService";
import { useState, useCallback } from "react";

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getTeams = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await teamService.getAll();
      setTeams(data);
    } catch (err) {
      setError('Falha ao buscar os times.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTeamById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await teamService.getById(id);
      return data;
    } catch (err) {
      setError('Falha ao buscar o time.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTeam = useCallback(async (name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await teamService.create({ name });
      await getTeams(); 
    } catch (err) {
      setError('Falha ao criar o time.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [getTeams]);

  const updateTeam = useCallback(async (id: string, teamData: Partial<Team>) => {
    setIsLoading(true);
    setError(null);
    try {
      await teamService.update(id, teamData);
      await getTeams(); 
    } catch (err) {
      setError('Falha ao atualizar o time.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [getTeams]);

  return {
    teams,
    isLoading,
    error,
    getTeams,
    getTeamById,
    createTeam,
    updateTeam
  };
}