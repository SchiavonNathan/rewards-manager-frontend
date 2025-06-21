import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { 
  MoreHorizontal, 
  Search, 
  Edit, 
  Trash2, 
  UsersIcon,
  Filter,
  Users,
  UserPlus
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function AdminTeams() {
  const [teams] = useState([
    { 
      id: "1", 
      name: "NOC", 
      membersCount: 8,
      totalPoints: 12450, 
      isActive: true,
      members: [
        { id: "1", name: "Nathan Lopes", points: 1950 },
        { id: "6", name: "Ana Carolina", points: 1850 },
        { id: "7", name: "Pedro Santos", points: 1750 }
      ]
    },
    { 
      id: "2", 
      name: "DevOps", 
      membersCount: 6,
      totalPoints: 14200, 
      isActive: true,
      members: [
        { id: "2", name: "Marina Silva", points: 2450 },
        { id: "8", name: "Felipe Martins", points: 2100 }
      ]
    },
    { 
      id: "3", 
      name: "Security", 
      membersCount: 5,
      totalPoints: 9800, 
      isActive: true,
      members: [
        { id: "3", name: "Carlos Menezes", points: 1750 },
        { id: "9", name: "Juliana Costa", points: 1600 }
      ]
    },
    { 
      id: "4", 
      name: "Support", 
      membersCount: 10,
      totalPoints: 15600, 
      isActive: false,
      members: [
        { id: "4", name: "Sandra Pereira", points: 1580 },
        { id: "10", name: "Roberto Alves", points: 1520 }
      ]
    },
    { 
      id: "5", 
      name: "Development", 
      membersCount: 12,
      totalPoints: 18900, 
      isActive: true,
      members: [
        { id: "5", name: "João Almeida", points: 1650 },
        { id: "11", name: "Marcela Lima", points: 1800 }
      ]
    },
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>({})

  const toggleTeamExpansion = (teamId: string) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }))
  }

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Equipes</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UsersIcon className="h-4 w-4" />
              Nova Equipe
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Criar nova equipe</DialogTitle>
              <DialogDescription>
                Adicione uma nova equipe ao sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input id="name" placeholder="Nome da equipe" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
              <Button>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Equipes</CardTitle>
          <CardDescription>
            Gerencie as equipes do sistema. Total: {teams.length} equipes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center bg-background border rounded-md pr-3 w-full max-w-sm">
              <Input
                placeholder="Buscar equipes..."
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredTeams.map((team) => (
              <Card key={team.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className="h-8 w-8 rounded-full flex items-center justify-center bg-primary">
                        {team.name.substring(0, 1)}
                      </Badge>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {team.name}
                          <Badge variant={team.isActive ? "default" : "destructive"} className="ml-2">
                            {team.isActive ? "Ativo" : "Inativo"}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {team.membersCount} membros • {team.totalPoints.toLocaleString()} pontos
                        </CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => toggleTeamExpansion(team.id)}>
                        {expandedTeams[team.id] ? "Ocultar Membros" : "Ver Membros"}
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Adicionar Membro
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                
                {expandedTeams[team.id] && (
                  <CardContent className="pt-4">
                    <h4 className="text-sm font-semibold mb-2">Membros da Equipe</h4>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead className="text-right">Pontos</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {team.members.map(member => (
                            <TableRow key={member.id}>
                              <TableCell className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {member.name.substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{member.name}</span>
                              </TableCell>
                              <TableCell className="text-right">{member.points.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-2 text-right">
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Ver todos os membros
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
            
            {filteredTeams.length === 0 && (
              <Card className="py-8">
                <CardContent className="flex flex-col items-center justify-center">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Nenhuma equipe encontrada</p>
                  <p className="text-muted-foreground text-sm">Tente ajustar sua busca ou crie uma nova equipe.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}