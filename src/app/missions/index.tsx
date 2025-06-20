import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Target, 
  Trophy, 
  CheckCircle2, 
  Clock, 
  Rocket, 
  Calendar,
  Medal,
  Gift,
  Users,
  Flame
} from "lucide-react"

// Mission types
type MissionDifficulty = "easy" | "medium" | "hard" | "extreme";
type MissionStatus = "active" | "completed" | "upcoming";

interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: MissionDifficulty;
  status: MissionStatus;
  progress: number;
  total: number;
  current: number;
  credits: number;
  points: number;
  deadline?: string; // ISO date string
  teamMission?: boolean;
  teamMembers?: { id: string; name: string; avatar: string }[];
}

export default function Missions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMissions([
        {
          id: "1",
          title: "Chamados Resolvidos",
          description: "Resolver chamados dentro dos critérios",
          difficulty: "medium",
          status: "active",
          progress: 75,
          total: 20,
          current: 15,
          credits: 5,
          points: 500,
          deadline: "2025-07-01T00:00:00Z",
        },
        {
          id: "2",
          title: "Badge IBM",
          description: "Conquistar certificação IBM",
          difficulty: "hard",
          status: "active",
          progress: 40,
          total: 5,
          current: 2,
          credits: 10,
          points: 1000,
          deadline: "2025-07-15T00:00:00Z",
        },
        {
          id: "3",
          title: "Curso de 20h ou Badge Parceiro",
          description: "Completar curso ou conquistar badge de parceiro",
          difficulty: "medium",
          status: "active",
          progress: 60,
          total: 20,
          current: 12,
          credits: 10,
          points: 800,
        },
        {
          id: "4",
          title: "Documentação de Processos",
          description: "Criar ou atualizar documentação de processos",
          difficulty: "easy",
          status: "completed",
          progress: 100,
          total: 10,
          current: 10,
          credits: 3,
          points: 300,
        },
        {
          id: "5",
          title: "Automação de Tarefas",
          description: "Criar automação para tarefas repetitivas",
          difficulty: "hard",
          status: "completed",
          progress: 100,
          total: 1,
          current: 1,
          credits: 15,
          points: 1200,
        },
        {
          id: "6",
          title: "Implantação em Produção",
          description: "Participar de implantação em produção sem incidentes",
          difficulty: "extreme",
          status: "upcoming",
          progress: 0,
          total: 1,
          current: 0,
          credits: 20,
          points: 2000,
          deadline: "2025-08-10T00:00:00Z",
        },
        {
          id: "7",
          title: "Projeto de Migração",
          description: "Migração completa de sistemas legados",
          difficulty: "extreme",
          status: "upcoming",
          progress: 0,
          total: 1,
          current: 0,
          credits: 25,
          points: 2500,
          deadline: "2025-09-15T00:00:00Z",
          teamMission: true,
          teamMembers: [
            { id: "101", name: "João Silva", avatar: "/avatars/user1.jpg" },
            { id: "102", name: "Maria Santos", avatar: "/avatars/user2.jpg" },
            { id: "103", name: "Pedro Costa", avatar: "/avatars/user3.jpg" },
          ]
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getDifficultyColor = (difficulty: MissionDifficulty) => {
    switch(difficulty) {
      case "easy": return "bg-green-500 text-white";
      case "medium": return "bg-blue-500 text-white";
      case "hard": return "bg-amber-500 text-white";
      case "extreme": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getDifficultyLabel = (difficulty: MissionDifficulty) => {
    switch(difficulty) {
      case "easy": return "Fácil";
      case "medium": return "Médio";
      case "hard": return "Difícil";
      case "extreme": return "Extremo";
      default: return "Desconhecido";
    }
  };

  const getProgressColor = (status: MissionStatus, progress: number) => {
    if (status === "completed") return "bg-green-500";
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-amber-500";
    return "bg-green-500";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const activeMissions = missions.filter(mission => mission.status === "active");
  const completedMissions = missions.filter(mission => mission.status === "completed");
  const upcomingMissions = missions.filter(mission => mission.status === "upcoming");

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-700">Carregando missões...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Rocket className="h-8 w-8 text-blue-500" />
          Missões
        </h1>
        <p className="text-muted-foreground">
          Complete missões para ganhar pontos e recompensas
        </p>
      </div>

      {/* Mission progress summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Resumo de Progresso
          </CardTitle>
          <CardDescription>
            Seu progresso em todas as missões ativas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Missões Ativas</span>
              <span className="text-2xl font-bold">{activeMissions.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Missões Concluídas</span>
              <span className="text-2xl font-bold">{completedMissions.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Pontos Potenciais</span>
              <span className="text-2xl font-bold">
                {activeMissions.reduce((sum, mission) => sum + mission.points, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Missions tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active" className="flex items-center gap-1">
            <Flame className="h-4 w-4" />
            Ativas ({activeMissions.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            Concluídas ({completedMissions.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Próximas ({upcomingMissions.length})
          </TabsTrigger>
        </TabsList>

        {/* Active missions */}
        <TabsContent value="active" className="space-y-4">
          {activeMissions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Target className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-lg font-medium">Nenhuma missão ativa</p>
                <p className="text-sm text-muted-foreground">
                  Volte mais tarde para novas missões
                </p>
              </CardContent>
            </Card>
          ) : (
            activeMissions.map(mission => (
              <Card key={mission.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{mission.title}</CardTitle>
                      <CardDescription>{mission.description}</CardDescription>
                    </div>
                    <Badge className={`${getDifficultyColor(mission.difficulty)}`}>
                      {getDifficultyLabel(mission.difficulty)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Progresso: {mission.current}/{mission.total}</span>
                        <span>{mission.progress}%</span>
                      </div>
                      <Progress value={mission.progress} className="h-2">
                        <div 
                          className={`h-full rounded-full ${getProgressColor(mission.status, mission.progress)}`}
                          style={{ width: `${mission.progress}%` }}
                        />
                      </Progress>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {mission.teamMission && (
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-muted-foreground">Missão em equipe</span>
                          </div>
                        )}
                        {mission.deadline && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-amber-500" />
                            <span className="text-sm text-muted-foreground">
                              Prazo: {formatDate(mission.deadline)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-3">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          <span>{mission.points} pts</span>
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1 text-amber-500">
                          <Gift className="h-4 w-4" />
                          <span>+{mission.credits} créditos</span>
                        </Badge>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={mission.progress < 100}
                    >
                      {mission.progress < 100 
                        ? "Continuar Missão" 
                        : "Reivindicar Recompensa"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Completed missions */}
        <TabsContent value="completed" className="space-y-4">
          {completedMissions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Medal className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-lg font-medium">Sem missões concluídas</p>
                <p className="text-sm text-muted-foreground">Complete missões para ver seu histórico aqui</p>
              </CardContent>
            </Card>
          ) : (
            completedMissions.map(mission => (
              <Card key={mission.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <div>
                        <CardTitle className="text-lg">{mission.title}</CardTitle>
                        <CardDescription>{mission.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={`${getDifficultyColor(mission.difficulty)}`}>
                      {getDifficultyLabel(mission.difficulty)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    <Progress value={100} className="h-2 bg-green-100">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }} />
                    </Progress>
                    
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="bg-green-50">
                        Concluído
                      </Badge>
                      
                      <div className="flex gap-3">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-green-500" />
                          <span>{mission.points} pts</span>
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1 text-green-500">
                          <Gift className="h-4 w-4" />
                          <span>+{mission.credits} créditos</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Upcoming missions */}
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingMissions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-lg font-medium">Sem missões futuras</p>
                <p className="text-sm text-muted-foreground">Volte em breve para conferir as novas missões</p>
              </CardContent>
            </Card>
          ) : (
            upcomingMissions.map(mission => (
              <Card key={mission.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{mission.title}</CardTitle>
                      <CardDescription>{mission.description}</CardDescription>
                    </div>
                    <Badge className={`${getDifficultyColor(mission.difficulty)}`}>
                      {getDifficultyLabel(mission.difficulty)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    {mission.teamMission && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">Membros da Equipe</span>
                        </div>
                        <div className="flex gap-2">
                          {mission.teamMembers?.map(member => (
                            <Avatar key={member.id} className="h-8 w-8">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      {mission.deadline && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">
                            Disponível em: {formatDate(mission.deadline)}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex gap-3">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-blue-500" />
                          <span>{mission.points} pts</span>
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1 text-blue-500">
                          <Gift className="h-4 w-4" />
                          <span>+{mission.credits} créditos</span>
                        </Badge>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={true}
                    >
                      Ainda não disponível
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}