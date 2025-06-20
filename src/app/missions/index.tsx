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
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useMissions } from "@/hooks/useMissions"

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
  const { missions: apiMissions, loading: apiLoading, error: apiError } = useMissions();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  // Map API missions to the component's expected format
  useEffect(() => {
    if (apiMissions) {
      const mappedMissions = apiMissions.map(apiMission => ({
        id: apiMission.id,
        title: apiMission.name,
        description: apiMission.description,
        difficulty: determineDifficulty(apiMission.points),
        status: apiMission.isActive ? "active" : "completed",
        progress: calculateProgress(apiMission),
        total: 1,
        current: apiMission.isActive ? 0 : 1,
        credits: Math.floor(apiMission.points / 100),
        points: apiMission.points,
        deadline: apiMission.createdAt, // Using createdAt as a placeholder for deadline
        teamMission: !!apiMission.team,
        teamMembers: apiMission.team ? [
          { id: "team-member", name: apiMission.team.name, avatar: "/avatars/user1.jpg" }
        ] : undefined,
      }));

      setMissions(mappedMissions);
      setLoading(false);
    }
  }, [apiMissions]);

  // Helper function to determine difficulty based on points
  const determineDifficulty = (points: number): MissionDifficulty => {
    if (points < 300) return "easy";
    if (points < 800) return "medium";
    if (points < 1500) return "hard";
    return "extreme";
  };

  // Helper function to calculate progress (placeholder)
  const calculateProgress = (apiMission: any): number => {
    return apiMission.isActive ? Math.floor(Math.random() * 80) : 100;
  };

  // Update loading state to consider API loading
  useEffect(() => {
    setLoading(apiLoading);
  }, [apiLoading]);

  // Show error state if API returns an error
  if (apiError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Erro ao carregar missões: {apiError}</p>
      </div>
    );
  }

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
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/home">
                Trade Rewards
              </BreadcrumbLink>
            </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Missões</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      </header>
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
        <TabsContent value="sended" className="space-y-4">
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
      </Tabs>
    </div>
  );
}