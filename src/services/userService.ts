import api from "@/lib/api";
import type { Team } from "./teamService";



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

export interface UserCreate {
  username: string;
  name: string;
  email: string;
  role: string;
  teamId?: string;
  password: string;
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
  },

  async create(user: UserCreate): Promise<User> {
    try {
      const response = await api.post("/users", user);
      return response.data;
    } catch {
      throw new Error("Ocorreu um erro ao criar o usuário.");
    }
  },

  async update(id: string, user: Partial<UserCreate>): Promise<User> {
    try {
      const response = await api.patch(`/users/${id}`, user);
      return response.data;
    } catch {
      throw new Error("Ocorreu um erro ao atualizar o usuário.");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/users/${id}`);
    } catch {
      throw new Error("Ocorreu um erro ao excluir o usuário.");
    }
  }
};