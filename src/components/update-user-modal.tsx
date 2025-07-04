import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Errors } from "@/types/errors.types";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import type { User, UserCreate } from "@/services/userService";

interface Team {
  id: string;
  name: string;
}

interface UpdateUserModalProps {
  teams: Team[];
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function UpdateUserModal({ teams, user, isOpen, onClose, onSuccess }: UpdateUserModalProps) {
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [team, setTeam] = useState(user.team?.id || '');
  const [role, setRole] = useState(user.role);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const { updateUser } = useUpdateUser();

  useEffect(() => {
    setUsername(user.username);
    setName(user.name);
    setEmail(user.email);
    setTeam(user.team?.id || '');
    setRole(user.role);
    setPassword('');
    setErrors({});
  }, [user]);

  const resetForm = () => {
    setUsername(user.username);
    setName(user.name);
    setEmail(user.email);
    setTeam(user.team?.id || '');
    setRole(user.role);
    setPassword('');
    setErrors({});
  };

  const handleUpdateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const newErrors: Errors = {};
    if (!name.trim()) newErrors.name = "O nome completo é obrigatório.";
    if (!email.trim()) {
      newErrors.email = "O email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "O formato do email é inválido.";
    }
    if (!username.trim()) newErrors.username = "O username é obrigatório.";
    if (!team) newErrors.team = "A seleção de uma equipe é obrigatória.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    
    const userPayload: Partial<UserCreate> = { 
      username, 
      name, 
      email, 
      teamId: team, 
      role 
    };

    if (password.trim()) {
      userPayload.password = password;
    }

    try {
      await updateUser(userPayload, user.id);
      console.log("Usuário atualizado com sucesso:", userPayload);
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Falha ao atualizar usuário:", err);
      setErrors({ form: "Ocorreu um erro ao atualizar o usuário. Tente novamente." });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
          if (!open) {
            resetForm();
            setErrors({});
            onClose();
          }
        }}>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleUpdateUser}>
            <DialogHeader>
              <DialogTitle>Editar usuário</DialogTitle>
              <DialogDescription>
                Atualize os dados do usuário {user.name}.
              </DialogDescription>
            </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <div className="col-span-3">
                    <Input id="name" placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                   <div className="col-span-3">
                    <Input id="email" placeholder="email@dominio.com.br" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <div className="col-span-3">
                    <Input id="username" placeholder="nome.sobrenome" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Nova Senha
                  </Label>
                  <div className="col-span-3">
                    <Input id="password" type="password" placeholder="Deixe vazio para manter a atual" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team" className="text-right">
                    Equipe
                  </Label>
                  <div className="col-span-3">
                    <Select value={team} onValueChange={setTeam}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma equipe" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((teamItem) => (
                          <SelectItem key={teamItem.id} value={teamItem.id}>
                            {teamItem.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.team && <p className="text-sm text-red-500 mt-1">{errors.team}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Função
                  </Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione uma função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">Usuário</SelectItem>
                      <SelectItem value="ADM">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            {errors.form && <p className="text-sm text-red-500 text-center mb-2">{errors.form}</p>}
            <DialogFooter>
            <Button type="submit">Atualizar</Button>
            <Button type="button" variant="outline" onClick={() => {
              resetForm();
              setErrors({});
              onClose();
            }}>
              Cancelar
            </Button>
            </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
  );
}