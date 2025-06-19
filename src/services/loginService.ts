import api from "@/lib/api";

export interface LoginCredentials {
  email: string;
  password?: string; 
}

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export const loginService =  async (credentials: LoginCredentials): Promise<User> => {  
    try {
        const response =  await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw new Error("Ocorreu um erro ao tentar fazer login.");
    }
};