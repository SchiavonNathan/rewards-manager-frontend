import { userService, type UserCreate } from "@/services/userService";
import { useState } from "react";

export function useCreateUser() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const createUser = async (user: UserCreate) => {
        setLoading(true);
        setError(null);
        try {
            const response = await userService.create(user);
            return response;
        } catch (err) {
            if (err && typeof err === "object" && "message" in err) {
                setError((err as { message: string }).message || "Ocorreu um erro ao criar o usuário.");
            } else {
                setError("Ocorreu um erro ao criar o usuário.");
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    return { createUser, error, loading };
    }