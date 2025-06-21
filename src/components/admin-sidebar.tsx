import * as React from "react"
import { useUserData } from "@/hooks/useUserData"
import {
  LayoutDashboard,
  Users,
  Trophy,
  Settings,
  ShieldAlert,
  Database,
} from "lucide-react"
import { Link } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"

// Items específicos para os menus do admin
const adminNavItems = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Usuários",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Times",
      url: "/admin/teams",
      icon: Trophy,
    },
    {
      title: "Missões",
      url: "/admin/missions",
      icon: Database,
    },
    {
      title: "Configurações",
      url: "/admin/settings",
      icon: Settings,
    },
  ],
};

// Componente para menu principal do admin
function AdminNavMain() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link to="/admin/dashboard">
            <div className="bg-red-600 text-white flex aspect-square size-8 items-center justify-center rounded-lg">
              <ShieldAlert size={18} />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Trade Technology</span>
              <span className="truncate text-xs text-red-600 font-medium">Admin Panel</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {adminNavItems.navMain.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild tooltip={item.title}>
            <Link to={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

// Sidebar específica para administração
export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userData = useUserData();
  
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <AdminNavMain />
      </SidebarHeader>
      <SidebarContent>
        {/* Adicione outros menus específicos para admin, se necessário */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}