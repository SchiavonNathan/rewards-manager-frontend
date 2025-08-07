import api from "@/lib/api";

export interface Team {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamCreate {
  name: string;
}

export const teamService = {
    async getAll(): Promise<Team[]> {
        try {
            const response = await api.get("/teams");
            return response.data;
        } catch {
            throw new Error("Ocorreu um erro ao consultar dados do Time.");
        }
    },

    async getById(id: string): Promise<Team> {
        try {
            const response = await api.get(`/teams/${id}`);
            return response.data;
        } catch {
            throw new Error("Ocorreu um erro ao consultar dados do Time.");
        }
    },

    async create(team: TeamCreate): Promise<Team> {
        try {
            const response = await api.post("/teams", team);
            return response.data;
        } catch {
            throw new Error("Ocorreu um erro ao criar o Time.");
        }
    },

    async update(id: string, team: Partial<Team>): Promise<Team> {
        try {
            const response = await api.patch(`/teams/${id}`, team);
            return response.data;
        } catch {
            throw new Error("Ocorreu um erro ao atualizar o Time.");
        }
    }
}