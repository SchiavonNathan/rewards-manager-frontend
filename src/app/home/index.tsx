import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Trophy } from "lucide-react"

interface Mission {
  title: string;
  description: string;
  credits: number;
}

const missions: Mission[] = [
  {
    title: "Chamados Resolvidos",
    description: "Resolver chamados dentro dos critérios",
    credits: 5,
  },
  {
    title: "Badge IBM",
    description: "Conquistar certificação IBM",
    credits: 10,
  },
  {
    title: "Curso de 20h ou Badge Parceiro",
    description: "Completar curso ou conquistar badge de parceiro",
    credits: 10,
  },
];

interface Reward {
  title: string;
  points: number;
  buttonColor: string;
}

const rewards: Reward[] = [
  {
    title: "Vale Almoço",
    points: 500,
    buttonColor: "bg-amber-500 hover:bg-amber-600",
  },
  {
    title: "Dia de Folga",
    points: 2000,
    buttonColor: "bg-green-600 hover:bg-green-700",
  },
  {
    title: "Curso Online",
    points: 1500,
    buttonColor: "bg-red-600 hover:bg-red-700",
  },
];

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col p-6">
          {/* User greeting header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Bem-vindo, João Silva!</h1>
            <p className="text-muted-foreground">
              Você está logado como NOC - K-2SO Protocol
            </p>
          </div>

          {/* Dashboard cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>Pontos Totais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <p className="text-4xl font-bold">1.250</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>Ranking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <p className="text-4xl font-bold">#0</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>Missões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <p className="text-4xl font-bold">0/0</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content split into two sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Missões Ativas section - takes 2/3 of width on large screens */}
            <div className="lg:col-span-2">
              <Card className="bg-card text-card-foreground">
                <CardHeader className="flex flex-row items-center">
                  <CardTitle>Missões Ativas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Map through missions array */}
                  {missions.map((mission, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{mission.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {mission.description}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-amber-500 mr-2">
                            +{mission.credits} créditos
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recompensas section - takes 1/3 of width on large screens */}
            <div className="lg:col-span-1">
              <Card className="bg-card text-card-foreground mb-6">
                <CardHeader className="flex flex-row items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  <CardTitle>Recompensas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Map through rewards array */}
                  {rewards.map((reward, index) => (
                    <Card key={index}>
                      <CardContent className="p-3">
                        <h3 className="font-semibold">{reward.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {reward.points} pontos
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
