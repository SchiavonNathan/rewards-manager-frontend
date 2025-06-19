import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Ranking() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        
      </SidebarInset>
    </SidebarProvider>
  )
}