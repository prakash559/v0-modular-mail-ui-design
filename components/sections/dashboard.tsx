"use client"

import { Blocks, Layout, Mail, ArrowRight, Clock, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { mockModules, mockEmails, suggestedModules } from "@/lib/mock-data"

export function Dashboard({
  onNavigate,
}: {
  onNavigate: (section: string) => void
}) {
  const quickStart = [
    {
      title: "Create a Module",
      description: "Build a content module from any web source",
      icon: Blocks,
      action: () => onNavigate("modules"),
    },
    {
      title: "Open Email Editor",
      description: "Drag and drop modules into an email canvas",
      icon: Mail,
      action: () => onNavigate("editor"),
    },
    {
      title: "Browse Templates",
      description: "Start with a pre-built layout template",
      icon: Layout,
      action: () => onNavigate("layouts"),
    },
  ]

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-6xl mx-auto flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            Welcome back, Jane
          </h2>
          <p className="text-muted-foreground mt-1">
            Pick up where you left off or start something new.
          </p>
        </div>

        {/* Quick Start */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickStart.map((item) => (
            <Card
              key={item.title}
              className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/20"
              onClick={item.action}
            >
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                </div>
                <div className="flex items-center text-xs text-primary font-medium mt-auto">
                  Get started
                  <ArrowRight className="size-3 ml-1 transition-transform group-hover:translate-x-0.5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Items */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription>Your latest modules and emails</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="modules">
              <TabsList>
                <TabsTrigger value="modules">Recent Modules</TabsTrigger>
                <TabsTrigger value="emails">Recent Emails</TabsTrigger>
              </TabsList>
              <TabsContent value="modules" className="mt-4">
                <div className="flex flex-col gap-2">
                  {mockModules.slice(0, 4).map((mod) => (
                    <div
                      key={mod.id}
                      className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Blocks className="size-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{mod.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="size-3" />
                            {mod.source} &middot; {mod.updatedAt}
                          </p>
                        </div>
                      </div>
                      <Badge variant={mod.status === "ready" ? "default" : "secondary"}>
                        {mod.status === "ready" ? "Ready" : "Draft"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="emails" className="mt-4">
                <div className="flex flex-col gap-2">
                  {mockEmails.slice(0, 4).map((email) => (
                    <div
                      key={email.id}
                      className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Mail className="size-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{email.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="size-3" />
                            {email.audience} &middot; {email.lastEdited}
                          </p>
                        </div>
                      </div>
                      <Badge variant={email.status === "ready" ? "default" : "secondary"}>
                        {email.status === "ready" ? "Ready" : "Draft"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Suggested Modules */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <CardTitle className="text-base">Suggested Modules for Education</CardTitle>
            </div>
            <CardDescription>AI-recommended content sources based on trending topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {suggestedModules.map((sug) => (
                <div
                  key={sug.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => onNavigate("module-create")}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{sug.name}</p>
                    <p className="text-xs text-muted-foreground">{sug.source}</p>
                  </div>
                  <ArrowRight className="size-3.5 text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
