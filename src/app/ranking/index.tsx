import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Medal, AlertCircle } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useTeams } from "@/hooks/useTeams"

export default function Ranking() {
  const { teams, loading, error } = useTeams();

  const getMedalColor = (position: number) => {
    switch (position) {
      case 1: return "text-yellow-500";
      case 2: return "text-gray-400";
      case 3: return "text-amber-700";
      default: return "text-gray-500";
    }
  };

  const getTeamBadgeColor = (position: number) => {
    switch (position) {
      case 1: return "bg-yellow-500 hover:bg-yellow-600";
      case 2: return "bg-gray-400 hover:bg-gray-500";
      case 3: return "bg-amber-700 hover:bg-amber-800";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="text-red-500 mb-4">
          <AlertCircle size={64} />
        </div>
        <h2 className="text-xl font-bold">Erro ao carregar ranking</h2>
        <p className="text-muted-foreground">Tente novamente mais tarde</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-700">Carregando ranking...</p>
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
          <BreadcrumbPage>Ranking</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      </header>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Trophy className="h-8 w-8 text-amber-500" />
          Ranking de Equipes
        </h1>
        <p className="text-muted-foreground">
          Confira o desempenho dos times e seus membros
        </p>
      </div>

      {/* Teams listing */}
      <div className="space-y-8">
        {teams.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Users className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-lg font-medium">Nenhum time encontrado</p>
              <p className="text-sm text-muted-foreground">
                Não existem times cadastrados no momento
              </p>
            </CardContent>
          </Card>
        ) : (
          teams.map((team, index) => (
            <Card key={team.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={`${getTeamBadgeColor(index + 1)} text-white text-lg p-2 h-8 w-8 flex items-center justify-center`}>
                    {index + 1}
                  </Badge>
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      {team.name}
                    </CardTitle>
                    <CardDescription>
                      {team.members.length} membros
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="text-lg font-bold px-3 py-1 border-2">
                  {team.totalPoints.toLocaleString()} pts
                </Badge>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="divide-y">
                  {team.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className={`flex items-center justify-center h-8 w-8 ${getMedalColor(member.position || 0)}`}>
                          {member.position === 1 ? (
                            <Trophy className="h-5 w-5" />
                          ) : member.position === 2 || member.position === 3 ? (
                            <Medal className="h-5 w-5" />
                          ) : (
                            <span className="font-medium">{member.position}</span>
                          )}
                        </span>
                        
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <p className="font-medium">{member.name}</p>
                        </div>
                      </div>
                      
                      <Badge variant="secondary" className="font-medium">
                        {member.points.toLocaleString()} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}