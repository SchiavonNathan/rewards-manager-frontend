import api from "@/lib/api";

export interface User {
  name: string;
  email: string;
  id: string;
  points: number;
  role: string;
  username: string;
  team?: {
    id: string;
    name: string;
  };
}

export const userService =  async (id: string): Promise<User> => {  
    try {
        const response =  await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Ocorreu ao consultar dados do usuario.");
    }
};