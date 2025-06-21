import api from "@/lib/api";

export interface Team {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  points: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  team?: Team;
}

export const userService = {
  async getById(id: string): Promise<User> {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch {
      throw new Error("Ocorreu um erro ao consultar dados do usuário.");
    }
  },
  
  async getAll(): Promise<User[]> {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch {
      throw new Error("Ocorreu um erro ao consultar usuários.");
    }
  }
};