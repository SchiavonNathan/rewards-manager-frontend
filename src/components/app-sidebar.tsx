import * as React from "react"
import { useUserData } from "@/hooks/useUserData"
import {
  Command,
  Frame,
  LifeBuoy,
  Rocket,
  Settings2,
  SquareTerminal,
  Trophy,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import logo from "@/assets/logoTrade.svg";


const staticData = {
  navMain: [
    {
      title: "Inicio",
      url: "/home",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Ranking",
      url: "/ranking",
      icon: Trophy,
    },
    {
      title: "Missões",
      url: "/missions",
      icon: Rocket,
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Geral",
          url: "#",
        },
        {
          title: "Time",
          url: "#",
        }
      ],
    },
  ],
  navSecondary: [
    {
      title: "Suporte",
      url: "#",
      icon: LifeBuoy,
    },
  ],
  projects: [
    {
      name: "Documentação",
      url: "#",
      icon: Frame,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userData = useUserData();
  
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/home">
                <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src={logo} alt="Trade Logo" className="h-10 w-10" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Trade Technology</span>
                  <span className="truncate text-xs">Rewards</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={staticData.navMain} />
        <NavProjects projects={staticData.projects} />
        <NavSecondary items={staticData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
