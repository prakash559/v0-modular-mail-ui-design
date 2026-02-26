"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopBar } from "@/components/top-bar"
import { Dashboard } from "@/components/sections/dashboard"
import { ModulesIndex } from "@/components/sections/modules-index"
import { ModuleCreate } from "@/components/sections/module-create"
import { EmailEditor } from "@/components/sections/email-editor"
import { EmailsList } from "@/components/sections/emails-list"
import { EmailCreateWizard } from "@/components/sections/email-create-wizard"
import { SettingsPage } from "@/components/sections/settings-page"
import { PlaceholderPage } from "@/components/sections/placeholder-page"

export default function Page() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveSection} />
      case "modules":
        return <ModulesIndex onNavigate={setActiveSection} />
      case "module-create":
        return <ModuleCreate onNavigate={setActiveSection} />
      case "editor":
        return <EmailEditor />
      case "email-create":
        return <EmailCreateWizard onNavigate={setActiveSection} />
      case "emails":
        return <EmailsList onNavigate={setActiveSection} />
      case "settings":
        return <SettingsPage />
      case "layouts":
      case "templates":
      case "brand":
      case "industries":
        return (
          <PlaceholderPage
            section={activeSection}
            onNavigate={setActiveSection}
          />
        )
      default:
        return <Dashboard onNavigate={setActiveSection} />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />
      <SidebarInset>
        <TopBar activeSection={activeSection} />
        <div className="flex flex-1 overflow-hidden">
          {renderSection()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
