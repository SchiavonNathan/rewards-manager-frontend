import { userService, type UserCreate } from "@/services/userService";
import { useState } from "react";

export function useUpdateUser() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const updateUser = async (user: Partial<UserCreate>, id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await userService.update(id, user);
            return response;
        } catch (err) {
            if (err && typeof err === "object" && "message" in err) {
                setError((err as { message: string }).message || "Ocorreu um erro ao atualizar o usuário.");
            } else {
                setError("Ocorreu um erro ao atualizar o usuário.");
            }
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    return { updateUser, error, loading };
    }