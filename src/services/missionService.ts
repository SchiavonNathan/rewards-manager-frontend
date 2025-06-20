import api from "@/lib/api";

export interface Mission {
  id: string;
  name: string;
  description: string;
  points: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  team?: {
    id: string;
    name: string;
  };
}

export const missionService = {
  async getAll(): Promise<Mission[]> {
    try {
      const response = await api.get("/missions");
      return response.data;
    } catch (error) {
      throw new Error("Ocorreu um erro ao consultar missões.");
    }
  },
  
  async getById(id: string): Promise<Mission> {
    try {
      const response = await api.get(`/missions/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Ocorreu um erro ao consultar missão.");
    }
  }
};