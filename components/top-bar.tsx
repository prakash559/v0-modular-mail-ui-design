"use client"

import { Search, HelpCircle, Bell } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export function TopBar({ activeSection }: { activeSection: string }) {
  const sectionLabels: Record<string, string> = {
    dashboard: "Dashboard",
    modules: "Modules",
    layouts: "Layouts",
    emails: "Emails",
    templates: "Templates",
    industries: "Industries",
    settings: "Settings",
    "module-create": "Create Module",
    editor: "Email Editor",
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-5" />
      <div className="flex flex-1 items-center gap-3">
        <h1 className="text-sm font-semibold text-foreground">
          {sectionLabels[activeSection] || "ModularMail"}
        </h1>
        <span className="text-muted-foreground text-xs hidden sm:inline">
          My Project
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="h-8 w-48 pl-8 text-xs bg-background"
          />
        </div>
        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground">
          <Bell className="size-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground">
          <HelpCircle className="size-4" />
          <span className="sr-only">Help</span>
        </Button>
      </div>
    </header>
  )
}
