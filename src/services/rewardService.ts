import api from "@/lib/api";

export interface Reward {
  id: string;
  name: string;
  description: string;
  points_cost: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  team?: {
    id: string;
    name: string;
  };
}

export const rewardService = {
  async getAll(): Promise<Reward[]> {
    try {
      const response = await api.get("/rewards");
      return response.data;
    } catch {
      throw new Error("Ocorreu um erro ao consultar recompensas.");
    }
  },
  
  async getById(id: string): Promise<Reward> {
    try {
      const response = await api.get(`/rewards/${id}`);
      return response.data;
    } catch {
      throw new Error("Ocorreu um erro ao consultar recompensa.");
    }
  }
};