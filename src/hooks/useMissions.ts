import { useState, useEffect } from "react";
import { missionService, type Mission } from "@/services/missionService";

export function useMissions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setLoading(true);
        const data = await missionService.getAll();
        setMissions(data);
      } catch (err) {
        console.error("Erro carregando missões:", err);
        setError("Falha ao carregar missões");
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  return { missions, loading, error };
}

export function useMission(id: string) {
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMission = async () => {
      try {
        setLoading(true);
        const data = await missionService.getById(id);
        setMission(data);
      } catch (err) {
        console.error("Erro carregando missão:", err);
        setError("Falha ao carregar missão");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMission();
    }
  }, [id]);

  return { mission, loading, error };
}