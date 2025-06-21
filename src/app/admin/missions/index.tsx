import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MoreHorizontal, 
  Search, 
  Edit, 
  Trash2, 
  Rocket,
  Plus,
  CheckCircle2,
  Clock
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

type Team = {
  id: string
  name: string
} | null

type Mission = {
  id: string
  name: string
  description: string
  points: number
  isActive: boolean
  createdAt: string
  team: Team
}

export default function AdminMissions() {
  const [missions] = useState<Mission[]>([
    {
      id: "1",
      name: "Documentação API",
      description: "Criar documentação completa para todas as APIs do sistema",
      points: 500,
      isActive: true,
      createdAt: "2025-06-01T10:30:00Z",
      team: { id: "1", name: "NOC" }
    },
    {
      id: "2",
      name: "Badge IBM",
      description: "Conquistar certificação IBM Cloud Architect",
      points: 1000,
      isActive: true,
      createdAt: "2025-05-15T14:45:00Z",
      team: { id: "2", name: "DevOps" }
    },
    {
      id: "3",
      name: "Migração de Servidores",
      description: "Completar migração dos servidores para nova infraestrutura",
      points: 1500,
      isActive: false,
      createdAt: "2025-05-20T09:15:00Z",
      team: { id: "3", name: "Security" }
    },
    {
      id: "4",
      name: "Deploy em Produção",
      description: "Realizar deploy em produção sem incidentes",
      points: 800,
      isActive: true,
      createdAt: "2025-06-10T16:20:00Z",
      team: { id: "5", name: "Development" }
    },
    {
      id: "5",
      name: "Certificação AWS",
      description: "Obter certificação AWS Solutions Architect",
      points: 1200,
      isActive: true,
      createdAt: "2025-05-25T11:00:00Z",
      team: null
    }
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [filter, setFilter] = useState('all')

  const filteredMissions = missions.filter(mission => {
    const matchesSearch = mission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (mission.team && mission.team.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    if (filter === 'all') return matchesSearch
    if (filter === 'active') return matchesSearch && mission.isActive
    if (filter === 'inactive') return matchesSearch && !mission.isActive
    if (filter === 'team') return matchesSearch && mission.team
    if (filter === 'individual') return matchesSearch && !mission.team
    
    return matchesSearch
  })

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Missões</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Missão
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar nova missão</DialogTitle>
              <DialogDescription>
                Adicione uma nova missão ao sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input id="name" placeholder="Nome da missão" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descrição
                </Label>
                <Textarea id="description" placeholder="Descrição detalhada da missão" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="points" className="text-right">
                  Pontos
                </Label>
                <Input id="points" type="number" placeholder="500" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="team" className="text-right">
                  Equipe
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione uma equipe ou deixe em branco para todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as equipes</SelectItem>
                    <SelectItem value="1">NOC</SelectItem>
                    <SelectItem value="2">DevOps</SelectItem>
                    <SelectItem value="3">Security</SelectItem>
                    <SelectItem value="4">Support</SelectItem>
                    <SelectItem value="5">Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch id="status" defaultChecked />
                  <Label htmlFor="status">Ativa</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
              <Button>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" onValueChange={setFilter}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="active">Ativas</TabsTrigger>
            <TabsTrigger value="inactive">Inativas</TabsTrigger>
            <TabsTrigger value="team">Em Equipe</TabsTrigger>
            <TabsTrigger value="individual">Individuais</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center bg-background border rounded-md pr-3 w-60">
            <Input
              placeholder="Buscar missões..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <TabsContent value="all" className="mt-6 space-y-4">
          {filteredMissions.map((mission) => (
            <Card key={mission.id}>
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{mission.name}</CardTitle>
                        <Badge variant={mission.isActive ? "default" : "destructive"} className="ml-2">
                          {mission.isActive ? "Ativa" : "Inativa"}
                        </Badge>
                        {mission.team && (
                          <Badge variant="outline">{mission.team.name}</Badge>
                        )}
                      </div>
                      <CardDescription className="mt-1">
                        {mission.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Pontos</div>
                      <div className="font-bold">{mission.points}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Criada em</div>
                      <div>{formatDate(mission.createdAt)}</div>
                    </div>
                    
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
                          {mission.isActive ? (
                            <>
                              <Clock className="mr-2 h-4 w-4" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Ativar
                            </>
                          )}
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
            </Card>
          ))}
          
          {filteredMissions.length === 0 && (
            <Card className="py-8">
              <CardContent className="flex flex-col items-center justify-center">
                <Rocket className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Nenhuma missão encontrada</p>
                <p className="text-muted-foreground text-sm">Tente ajustar sua busca ou crie uma nova missão.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="active" className="mt-6 space-y-4">
          {filteredMissions.filter(mission => mission.isActive).map((mission) => (
            <Card key={mission.id}>
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{mission.name}</CardTitle>
                        <Badge variant={mission.isActive ? "default" : "destructive"} className="ml-2">
                          {mission.isActive ? "Ativa" : "Inativa"}
                        </Badge>
                        {mission.team && (
                          <Badge variant="outline">{mission.team.name}</Badge>
                        )}
                      </div>
                      <CardDescription className="mt-1">
                        {mission.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Pontos</div>
                      <div className="font-bold">{mission.points}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Criada em</div>
                      <div>{formatDate(mission.createdAt)}</div>
                    </div>
                    
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
                          {mission.isActive ? (
                            <>
                              <Clock className="mr-2 h-4 w-4" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Ativar
                            </>
                          )}
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
            </Card>
          ))}
          
          {filteredMissions.filter(mission => mission.isActive).length === 0 && (
            <Card className="py-8">
              <CardContent className="flex flex-col items-center justify-center">
                <Rocket className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Nenhuma missão ativa encontrada</p>
                <p className="text-muted-foreground text-sm">Tente ajustar sua busca ou crie uma nova missão.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-6 space-y-4">
          {filteredMissions.filter(mission => !mission.isActive).map((mission) => (
            <Card key={mission.id}>
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{mission.name}</CardTitle>
                        <Badge variant={mission.isActive ? "default" : "destructive"} className="ml-2">
                          {mission.isActive ? "Ativa" : "Inativa"}
                        </Badge>
                        {mission.team && (
                          <Badge variant="outline">{mission.team.name}</Badge>
                        )}
                      </div>
                      <CardDescription className="mt-1">
                        {mission.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Pontos</div>
                      <div className="font-bold">{mission.points}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Criada em</div>
                      <div>{formatDate(mission.createdAt)}</div>
                    </div>
                    
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
                          {mission.isActive ? (
                            <>
                              <Clock className="mr-2 h-4 w-4" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Ativar
                            </>
                          )}
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
            </Card>
          ))}
          
          {filteredMissions.filter(mission => !mission.isActive).length === 0 && (
            <Card className="py-8">
              <CardContent className="flex flex-col items-center justify-center">
                <Rocket className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Nenhuma missão inativa encontrada</p>
                <p className="text-muted-foreground text-sm">Tente ajustar sua busca ou crie uma nova missão.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="team" className="mt-6 space-y-4">
          {filteredMissions.filter(mission => mission.team).map((mission) => (
            <Card key={mission.id}>
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{mission.name}</CardTitle>
                        <Badge variant={mission.isActive ? "default" : "destructive"} className="ml-2">
                          {mission.isActive ? "Ativa" : "Inativa"}
                        </Badge>
                        {mission.team && (
                          <Badge variant="outline">{mission.team.name}</Badge>
                        )}
                      </div>
                      <CardDescription className="mt-1">
                        {mission.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Pontos</div>
                      <div className="font-bold">{mission.points}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Criada em</div>
                      <div>{formatDate(mission.createdAt)}</div>
                    </div>
                    
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
                          {mission.isActive ? (
                            <>
                              <Clock className="mr-2 h-4 w-4" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Ativar
                            </>
                          )}
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
            </Card>
          ))}
          
          {filteredMissions.filter(mission => mission.team).length === 0 && (
            <Card className="py-8">
              <CardContent className="flex flex-col items-center justify-center">
                <Rocket className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Nenhuma missão em equipe encontrada</p>
                <p className="text-muted-foreground text-sm">Tente ajustar sua busca ou crie uma nova missão.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="individual" className="mt-6 space-y-4">
          {filteredMissions.filter(mission => !mission.team).map((mission) => (
            <Card key={mission.id}>
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{mission.name}</CardTitle>
                        <Badge variant={mission.isActive ? "default" : "destructive"} className="ml-2">
                          {mission.isActive ? "Ativa" : "Inativa"}
                        </Badge>
                        {mission.team && (
                          <Badge variant="outline">{mission.team.name}</Badge>
                        )}
                      </div>
                      <CardDescription className="mt-1">
                        {mission.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Pontos</div>
                      <div className="font-bold">{mission.points}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Criada em</div>
                      <div>{formatDate(mission.createdAt)}</div>
                    </div>
                    
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
                          {mission.isActive ? (
                            <>
                              <Clock className="mr-2 h-4 w-4" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Ativar
                            </>
                          )}
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
            </Card>
          ))}
          
          {filteredMissions.filter(mission => !mission.team).length === 0 && (
            <Card className="py-8">
              <CardContent className="flex flex-col items-center justify-center">
                <Rocket className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Nenhuma missão individual encontrada</p>
                <p className="text-muted-foreground text-sm">Tente ajustar sua busca ou crie uma nova missão.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}