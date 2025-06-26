import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { 
  MoreHorizontal, 
  Search, 
  Edit, 
  Trash2, 
  UserPlus,
  Filter
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAllUsers } from "@/hooks/useAllUsers"
import { useTeams } from "@/hooks/useTeams"
import { useCreateUser } from "@/hooks/useCreateUser"
import type { Errors } from "@/types/errors.types"

export default function AdminUsers() {
  const { allUsers } = useAllUsers();
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [team, setTeam] = useState('')
  const [role, setRole] = useState('USER')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Errors>({});

  const { teams } = useTeams();

  const filteredUsers = allUsers?.filter(user => 
    user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user?.team?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const resetForm = () => {
    setUsername('');
    setName('');
    setEmail('');
    setTeam('');
    setRole('USER');
    setPassword('');
    setErrors({});
  };

  const { createUser } = useCreateUser();

  const handleAddUser = async (event: { preventDefault: () => void }) => {

    event.preventDefault();

    //Valicao dos campos
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

    const user = {
      username,
      name,
      email,
      teamId: team,
      role,
      points: 0,
      password
    };
    try {
      await createUser(user);
      console.log("Usuário adicionado com sucesso:", user);
      setIsAddDialogOpen(false);
      resetForm();
    } catch (err) {
      console.error("Falha ao adicionar usuário:", err);
      setErrors({ form: "Ocorreu um erro ao salvar o usuário. Tente novamente." });
    }
  };

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={(isOpen) => {
          setIsAddDialogOpen(isOpen);
          if (!isOpen) {
            resetForm();
            setErrors({});
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Adicionar Usuário
            </Button>
          </DialogTrigger>
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
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Usuários</CardTitle>
          <CardDescription>
            Gerencie os usuários do sistema. Total: {allUsers?.length} usuários.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center bg-background border rounded-md pr-3 w-full max-w-sm">
              <Input
                placeholder="Buscar usuários..."
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="ml-2 h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Equipe</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Pontos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers?.map((user) => (
                  <TableRow key={user?.id}>
                    <TableCell className="font-medium">{user?.name}</TableCell>
                    <TableCell>{user?.username}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>{user?.team?.name}</TableCell>
                    <TableCell>
                      <Badge variant={user?.role === "ADM" ? "default" : "outline"}>
                        {user?.role === "ADM" ? "Admin" : "Usuário"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user?.points}</TableCell>
                    <TableCell>
                      <Badge variant={user?.isActive ? "default" : "destructive"}>
                        {user?.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}