import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, DownloadIcon, UsersIcon, TrophyIcon, RocketIcon, GiftIcon } from "lucide-react"

export default function AdminDashboard() {

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>Últimos 30 dias</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <DownloadIcon className="h-4 w-4" />
            <span>Download</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análise</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Missões Completadas</CardTitle>
                <RocketIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recompensas Resgatadas</CardTitle>
                <GiftIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Média de Pontos</CardTitle>
                <TrophyIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,324</div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Chart */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Atividade no Sistema</CardTitle>
                <CardDescription>
                  Missões completadas e recompensas resgatadas nos últimos 6 meses
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Teams Distribution */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Distribuição de Pontos por Time</CardTitle>
                <CardDescription>
                  Total de pontos acumulados por cada equipe
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
                <CardDescription>
                  Últimos eventos registrados no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Nathan Lopes", action: "completou a missão", target: "Documentação API", time: "2 horas atrás", team: "NOC" },
                    { user: "Marina Silva", action: "resgatou a recompensa", target: "Dia de Folga", time: "5 horas atrás", team: "DevOps" },
                    { user: "Carlos Menezes", action: "criou uma nova missão", target: "Migração de Servidores", time: "ontem", team: "Security" },
                    { user: "Sandra Pereira", action: "adicionou usuário ao time", target: "Lucas Fernandes", time: "ontem", team: "Support" },
                    { user: "João Almeida", action: "completou a missão", target: "Deploy em Produção", time: "2 dias atrás", team: "Development" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="rounded-full h-8 w-8 bg-slate-100 flex items-center justify-center">
                        {activity.user.charAt(0)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                          <span className="font-semibold">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                      <Badge variant="outline">{activity.team}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Usuários com maior pontuação este mês
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Marina Silva", points: 2450, team: "DevOps" },
                    { user: "Lucas Fernandes", points: 2120, team: "Development" },
                    { user: "Nathan Lopes", points: 1950, team: "NOC" },
                    { user: "Julia Alves", points: 1840, team: "Security" },
                    { user: "Rafael Santos", points: 1720, team: "Development" },
                  ].map((performer, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="rounded-full h-8 w-8 bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {performer.user}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {performer.team}
                        </p>
                      </div>
                      <div className="text-sm font-bold">{performer.points} pts</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}