import { useState } from "react";
import { 
  Card, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Star,
  ArrowRight,
  Coffee,
  Trophy,
  Palmtree,
  Gamepad2,
  Gift as GiftIcon,
  Award,
  ShoppingBag,
  DollarSign,
  Gift,
  Loader2
} from "lucide-react";

// Import the hook and service
import { useRewards } from "@/hooks/useRewards";
import type { Reward as ApiReward } from "@/services/rewardService";

// Create a type that extends the API reward type with UI-specific fields
type UIReward = {
  id: string;
  title: string;
  description: string;
  points: number;
  category: string;
  image: string;
  popular: boolean;
  available: boolean;
};

export default function Rewards() {
  const [userPoints, setUserPoints] = useState(2450);
  
  // State for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Fetch rewards from the API
  const { rewards: apiRewards, loading, error } = useRewards();
  
  const [selectedReward, setSelectedReward] = useState<UIReward | null>(null);
  
  // Map API rewards to the UI format we need
  const rewards: UIReward[] = apiRewards.map((reward: ApiReward) => ({
    id: reward.id,
    title: reward.name,
    description: reward.description,
    points: reward.points_cost,
    category: determineCategoryFromName(reward.name), // We'll implement this function
    image: getRewardImageUrl(reward.name), // We'll implement this function
    popular: Math.random() > 0.7, // Random for now, could be based on actual usage data
    available: reward.isActive
  }));
  
  // Helper function to determine category based on reward name
  function determineCategoryFromName(name: string): string {
    name = name.toLowerCase();
    if (name.includes("folga") || name.includes("home office") || name.includes("férias") || name.includes("experiência"))
      return "experiences";
    if (name.includes("café") || name.includes("almoço") || name.includes("jantar") || name.includes("food"))
      return "food";
    if (name.includes("curso") || name.includes("livro") || name.includes("treinamento") || name.includes("workshop"))
      return "learning";
    if (name.includes("cinema") || name.includes("show") || name.includes("streaming") || name.includes("ingresso"))
      return "entertainment";
    if (name.includes("massagem") || name.includes("spa") || name.includes("saúde") || name.includes("academia"))
      return "wellness";
    
    // Default category if no match
    return "experiences";
  }
  
  // Helper function to get an image URL based on reward name
  function getRewardImageUrl(name: string): string {
    name = name.toLowerCase();
    
    // Return appropriate images based on keywords
    if (name.includes("folga") || name.includes("férias"))
      return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
    if (name.includes("café") || name.includes("coffee"))
      return "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085";
    if (name.includes("curso") || name.includes("livro"))
      return "https://images.unsplash.com/photo-1501504905252-473c47e087f8";
    if (name.includes("home office"))
      return "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd";
    if (name.includes("almoço") || name.includes("jantar") || name.includes("restaurante"))
      return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4";
    if (name.includes("cinema") || name.includes("ingresso"))
      return "https://images.unsplash.com/photo-1536440136628-849c177e76a1";
    if (name.includes("massagem") || name.includes("spa"))
      return "https://images.unsplash.com/photo-1544161515-4ab6ce6db874";
    if (name.includes("streaming"))
      return "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37";
      
    // Default image
    return "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634";
  }
  
  const categoryIcons = {
    experiences: <Palmtree className="h-4 w-4" />,
    food: <Coffee className="h-4 w-4" />,
    learning: <Award className="h-4 w-4" />,
    entertainment: <Gamepad2 className="h-4 w-4" />,
    wellness: <Star className="h-4 w-4" />,
    all: <GiftIcon className="h-4 w-4" />
  };

  const filteredRewards = rewards
    .filter(reward => reward.available) // Only show available rewards
    .filter(reward => 
      reward.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      reward.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(reward => selectedCategory === "all" || reward.category === selectedCategory);
  
  const openRedeemDialog = (reward: UIReward | null) => {
    setSelectedReward(reward);
  };
  
  // Redeem action
  const redeemReward = () => {
    // Here you would add code to call your API and redeem the reward
    if (selectedReward && userPoints >= selectedReward.points) {
      setUserPoints(prevPoints => prevPoints - selectedReward.points);
      setSelectedReward(null);
      // Show success notification or redirect
    }
  };

  return (
    <div className="flex-1 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Gift className="h-8 w-8 text-blue-500" />
            Recompensas
          </h1>
          <p className="text-muted-foreground">Resgate recompensas com seus pontos acumulados</p>
        </div>
        <div className="bg-card border rounded-lg p-2 flex items-center gap-3">
          <div className="w-15 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Seus pontos</p>
            <p className="text-xl font-bold">{userPoints.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 mt-4">
        <Tabs 
          defaultValue="all" 
          className="w-full sm:w-auto" 
          onValueChange={(value) => setSelectedCategory(value)}
        >
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-1">
              {categoryIcons.all} Todas
            </TabsTrigger>
            <TabsTrigger value="experiences" className="flex items-center gap-1">
              {categoryIcons.experiences} Experiências
            </TabsTrigger>
            <TabsTrigger value="food" className="flex items-center gap-1">
              {categoryIcons.food} Alimentação
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-1">
              {categoryIcons.learning} Aprendizado
            </TabsTrigger>
            <TabsTrigger value="entertainment" className="flex items-center gap-1">
              {categoryIcons.entertainment} Entretenimento
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar recompensas..."
              className="w-full pl-8 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-lg font-medium">Carregando recompensas...</p>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-lg font-medium text-red-800 mb-2">Erro ao carregar recompensas</p>
          <p className="text-red-600">Por favor, tente novamente mais tarde</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </Button>
        </div>
      )}
      
      {/* Rewards Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map(reward => (
            <Card key={reward.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={reward.image} 
                  alt={reward.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105" 
                />
              </div>
              
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{reward.title}</CardTitle>
                  <Badge variant="outline" className="bg-muted/50">
                    {reward.category === "experiences" && "Experiências"}
                    {reward.category === "food" && "Alimentação"}
                    {reward.category === "learning" && "Aprendizado"}
                    {reward.category === "entertainment" && "Entretenimento"}
                    {reward.category === "wellness" && "Bem-estar"}
                  </Badge>
                </div>
                <CardDescription className="pt-2">{reward.description}</CardDescription>
              </CardHeader>
              
              <CardFooter className="flex items-center justify-between p-4 pt-0">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="font-bold">{reward.points.toLocaleString()} pontos</span>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => openRedeemDialog(reward)}
                      variant={userPoints >= reward.points ? "default" : "outline"}
                      disabled={userPoints < reward.points}
                    >
                      {userPoints >= reward.points ? "Resgatar" : "Pontos insuficientes"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmar resgate</DialogTitle>
                      <DialogDescription>
                        Você está prestes a resgatar esta recompensa usando seus pontos.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex items-center gap-4 py-4">
                      <div className="h-16 w-16 rounded-lg overflow-hidden">
                        <img 
                          src={selectedReward?.image} 
                          alt={selectedReward?.title} 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{selectedReward?.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {selectedReward?.description}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          <span className="font-bold text-sm">
                            {selectedReward?.points.toLocaleString()} pontos
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Seu saldo atual</p>
                        <p className="font-semibold">{userPoints.toLocaleString()} pontos</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Saldo após resgate</p>
                        <p className="font-semibold">
                          {selectedReward ? (userPoints - selectedReward.points).toLocaleString() : 0} pontos
                        </p>
                      </div>
                    </div>
                    
                    <DialogFooter className="pt-4">
                      <Button variant="outline" onClick={() => setSelectedReward(null)}>
                        Cancelar
                      </Button>
                      <Button onClick={redeemReward}>
                        Confirmar resgate
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
          
          {!loading && filteredRewards.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-xl font-medium">Nenhuma recompensa encontrada</h3>
              <p className="text-muted-foreground">
                Tente ajustar seus filtros ou buscar por outros termos
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}