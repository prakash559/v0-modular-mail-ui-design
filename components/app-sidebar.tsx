"use client"

import {
  LayoutDashboard,
  Blocks,
  Layout,
  Mail,
  FileStack,
  Building2,
  Settings,
  ChevronDown,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mainNav = [
  { title: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { title: "Modules", icon: Blocks, id: "modules" },
  { title: "Layouts", icon: Layout, id: "layouts" },
  { title: "Emails", icon: Mail, id: "emails" },
  { title: "Templates", icon: FileStack, id: "templates" },
  { title: "Industries", icon: Building2, id: "industries" },
]

const settingsNav = [
  { title: "Settings", icon: Settings, id: "settings" },
]

export function AppSidebar({
  activeSection,
  onNavigate,
}: {
  activeSection: string
  onNavigate: (section: string) => void
}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            M
          </div>
          <span className="text-base font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            ModularMail
          </span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeSection === item.id}
                    onClick={() => onNavigate(item.id)}
                    tooltip={item.title}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsNav.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeSection === item.id}
                    onClick={() => onNavigate(item.id)}
                    tooltip={item.title}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-pointer">
              <Avatar className="size-7">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col text-left text-sm leading-tight">
                <span className="truncate font-medium text-foreground">Jane Doe</span>
                <span className="truncate text-xs text-muted-foreground">jane@example.com</span>
              </div>
              <ChevronDown className="size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
