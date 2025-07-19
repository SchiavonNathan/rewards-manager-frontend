import { useState, useEffect } from "react";
import { rewardService, type Reward } from "@/services/rewardService";

export function useRewards() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setLoading(true);
        const data = await rewardService.getAll();
        setRewards(data);
      } catch (err) {
        console.error("Erro carregando recompensas:", err);
        setError("Falha ao carregar recompensas");
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  return { rewards, loading, error };
}

export function useReward(id: string) {
  const [reward, setReward] = useState<Reward | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReward = async () => {
      try {
        setLoading(true);
        const data = await rewardService.getById(id);
        setReward(data);
      } catch (err) {
        console.error("Erro carregando recompensa:", err);
        setError("Falha ao carregar recompensa");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReward();
    }
  }, [id]);

  return { reward, loading, error };
}