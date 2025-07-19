import { userService } from "@/services/userService";
import { useState } from "react";

export function useDeleteUser() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const deleteUser = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await userService.delete(id);
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
    
    return { deleteUser, error, loading };
    }