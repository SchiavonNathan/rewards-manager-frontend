import { useMissions } from "@/hooks/useMissions";
import { useEffect, useState } from "react";
import { type Mission as ApiMission } from "@/services/missionService";
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
import { 
  Target, 
  CheckCircle2, 
  Clock, 
  Rocket, 
  Medal,
  Gift,
  Users,
  Flame,
} from "lucide-react"


type MissionDifficulty = "easy" | "medium" | "hard" | "extreme";
type MissionStatus = "active" | "completed" | "upcoming";

interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: MissionDifficulty;
  status: MissionStatus;
  points: number;
  deadline?: string;
  team?: {name: string; id: string };
}

export default function Missions() {
  const { missions: apiMissions, loading: apiLoading, error: apiError } = useMissions();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (apiMissions && apiMissions.length > 0) {
      const transformedMissions: Mission[] = apiMissions.map((apiMission: ApiMission) => {
        const difficulty = getDifficultyFromPoints(apiMission.points);
        
        const status: MissionStatus = apiMission.isActive ? "active" : "completed";
        
        return {
          id: apiMission.id,
          title: apiMission.name,
          description: apiMission.description,
          difficulty,
          status,
          total: 1,
          points: apiMission.points,
          deadline: apiMission.createdAt,
          team: apiMission.team ? {
            name: apiMission.team.name,
            id: apiMission.team.id
          } : undefined,
        };
      });

      setMissions(transformedMissions);
      setLoading(false);
    }
  }, [apiMissions]);

  const getDifficultyFromPoints = (points: number): MissionDifficulty => {
    if (points <= 10) return "easy";
    if (points <= 15) return "medium"; 
    if (points <= 25) return "hard";
    return "extreme";
  };

  useEffect(() => {
    setLoading(apiLoading);
  }, [apiLoading]);

  if (apiError) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h2 className="text-xl font-bold">Erro ao carregar missões</h2>
        <p className="text-muted-foreground">Tente novamente mais tarde</p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: MissionDifficulty) => {
    switch(difficulty) {
      case "easy": return "bg-green-500 text-white";
      case "medium": return "bg-blue-500 text-white";
      case "hard": return "bg-red-500 text-white";
      case "extreme": return "bg-red-800 text-white";
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
            Resumo de Progresso
          </CardTitle>
          <CardDescription>
            Seu progresso em todas as missões ativas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Missões Ativas</span>
              <span className="text-2xl font-bold">{activeMissions.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Missões Concluídas</span>
              <span className="text-2xl font-bold">{completedMissions.length}</span>
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
          <TabsTrigger value="sended" className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            Enviadas ({completedMissions.length})
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
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-blue-300" />
                          <span className="text-sm text-muted-foreground">Time {mission.team?.name}</span>
                        </div>
                        {mission.deadline && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-blue-300" />
                            <span className="text-sm text-muted-foreground">
                              Prazo: {formatDate(mission.deadline)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-3">
                        <Badge variant="secondary" className="flex items-center gap-1 text-green-500">
                          <span>+{mission.points} pontos</span>
                        </Badge>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full cursor-pointer"
                    >
                      Enviar Missão
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
                        <Badge variant="secondary" className="flex items-center gap-1 text-green-500">
                          <Gift className="h-4 w-4" />
                          <span>+{mission.points} pontos</span>
                        </Badge>
                      </div>
                    </div>
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