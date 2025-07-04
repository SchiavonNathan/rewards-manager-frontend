import { useState } from "react";
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
import { useCreateUser } from "@/hooks/useCreateUser";
import type { Errors } from "@/types/errors.types";
import { useAllUsers } from "@/hooks/useAllUsers";

interface Team {
  id: string;
  name: string;
}

interface CreateUserModalProps {
  teams: Team[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess?: () => void;
}

export function CreateUserModal({ teams, isOpen, onOpenChange, onSuccess }: CreateUserModalProps) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');
  const [role, setRole] = useState('USER');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const { refetch } = useAllUsers();

  const { createUser } = useCreateUser();

  const resetForm = () => {
    setUsername('');
    setName('');
    setEmail('');
    setTeam('');
    setRole('USER');
    setPassword('');
    setErrors({});
  };

  const handleAddUser = async (event: React.FormEvent) => {
    event.preventDefault();
    
    //Validacao campos
    const newErrors: Errors = {};
    if (!name.trim()) newErrors.name = "O nome completo é obrigatório.";
    if (!email.trim()) {
      newErrors.email = "O email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "O formato do email é inválido.";
    }
    if (!username.trim()) newErrors.username = "O username é obrigatório.";
    if (!password) newErrors.password = "A senha é obrigatória.";
    if (!team) newErrors.team = "A seleção de uma equipe é obrigatória.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    
    const userPayload = { username, name, email, teamId: team, role, points: 0, password };

    try {
      await createUser(userPayload);
      console.log("Usuário adicionado com sucesso:", userPayload);
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      } else {
        refetch();
      }
    } catch (err) {
      console.error("Falha ao adicionar usuário:", err);
      setErrors({ form: "Ocorreu um erro ao salvar o usuário. Tente novamente." });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
          onOpenChange(open);
          if (!open) {
            resetForm();
            setErrors({});
          }
        }}>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleAddUser}>
            <DialogHeader>
              <DialogTitle>Adicionar novo usuário</DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo para criar um novo usuário.
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
                    Senha
                  </Label>
                  <div className="col-span-3">
                    <Input id="password" type="password" placeholder="Digite a senha" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name}
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
            <Button type="submit">Salvar</Button>
            </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
  );
}