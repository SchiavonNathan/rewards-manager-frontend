import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useMissions } from "@/hooks/useMissions";
import { useRewards } from "@/hooks/useRewards";
import { useUserFullData } from "@/hooks/useUserFullData";
import { SquareTerminal, Trophy } from "lucide-react"

export default function Home() {

  const { userFullData, error: userFullDataError } = useUserFullData();
  const { missions, error: missionsError } = useMissions();
  const { rewards, error: rewardsError } = useRewards();

  if (missionsError || rewardsError || userFullDataError) {
    return <div>Erro ao carregar dados</div>;
  }

  return (
        <div className="flex flex-col p-6">
          {/* User greeting header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <SquareTerminal className="h-8 w-8 text-blue-500" />
              Bem-vindo, {userFullData?.name}!
            </h1>
            <p className="text-muted-foreground">
              Você está logado como {userFullData?.team?.name}
            </p>
          </div>

          {/* Dashboard cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>Pontos Totais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <p className="text-4xl font-bold">{userFullData?.points} pts</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>Missões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <p className="text-4xl font-bold">
                    {missions.filter(mission => mission.isActive).length} ativas
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-card text-card-foreground">
                <CardHeader className="flex flex-row items-center">
                  <CardTitle>Missões Ativas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {missions.map((mission, id) => (
                    <div key={id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{mission.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {mission.description}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-green-500 mr-2">
                            +{mission.points} pontos
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-card text-card-foreground mb-6">
                <CardHeader className="flex flex-row items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  <CardTitle>Recompensas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rewards.map((reward, id) => (
                    <Card key={id}>
                      <CardContent className="p-3">
                        <h3 className="font-semibold">{reward.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {reward.points_cost} pontos
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
  )
}
