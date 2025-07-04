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

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  MoreHorizontal, 
  Search, 
  Edit, 
  Trash2, 
  Filter,
  UserPlus
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAllUsers } from "@/hooks/useAllUsers"
import { useTeams } from "@/hooks/useTeamsWithMembers"
import { CreateUserModal } from "@/components/create-user-modal"
import { UpdateUserModal } from "@/components/update-user-modal"
import type { User } from "@/services/userService"
import { useDeleteUser } from "@/hooks/useDeleteUser"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"



export default function AdminUsers() {
  const { allUsers, refetch } = useAllUsers();
  const [searchTerm, setSearchTerm] = useState('')
  const { teams } = useTeams();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { deleteUser } = useDeleteUser();

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleOpenDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete.id);
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
      refetch();
    }
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setEditingUser(null);
  };

  const filteredUsers = allUsers?.filter(user => 
    user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user?.team?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Usuários</h1>
        <Button className="gap-2" onClick={() => setIsCreateModalOpen(true)}>
          <UserPlus className="h-4 w-4" />
          Adicionar Usuário
        </Button>
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
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => user && handleEditUser(user)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer text-red-600"
                            onClick={() => user && handleOpenDeleteDialog(user)}
                          >
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
      
      {editingUser && (
        <UpdateUserModal
          teams={teams || []}
          user={editingUser}
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          onSuccess={refetch}
        />
      )}
      
      <CreateUserModal
        teams={teams || []}
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSuccess={refetch}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o usuário {userToDelete?.name}?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUserToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteUser}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}