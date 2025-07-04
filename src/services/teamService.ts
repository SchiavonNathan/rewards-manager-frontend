import api from "@/lib/api";

export interface Team {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const teamService = {
    async getAll(): Promise<Team[]> {
        try {
            const response = await api.get("/teams");
            return response.data;
        } catch {
            throw new Error("Ocorreu um erro ao consultar dados do usuário.");
        }
    },
}