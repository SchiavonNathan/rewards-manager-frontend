import { teamService, type Team } from "@/services/teamService";

import { useState, useEffect } from "react";

export function useTeams() {

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
        try {
            const data = await teamService.getAll();
            setTeams(data);
        }
        catch (error) {
        console.error("Erro carregando dados:", error);
        }
    }

    fetchTeams();
  }, []);

  return teams;
}