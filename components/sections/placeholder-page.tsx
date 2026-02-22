"use client"

import { Layout, FileStack, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { layoutTemplates, industries } from "@/lib/mock-data"

const sectionConfig: Record<
  string,
  { title: string; description: string; icon: React.ElementType }
> = {
  layouts: {
    title: "Layouts",
    description: "Choose from pre-built email layout patterns to structure your content.",
    icon: Layout,
  },
  templates: {
    title: "Templates",
    description: "Start with fully designed email templates you can customize.",
    icon: FileStack,
  },
  industries: {
    title: "Industries",
    description: "Explore content modules and templates tailored by industry.",
    icon: Building2,
  },
}

export function PlaceholderPage({
  section,
  onNavigate,
}: {
  section: string
  onNavigate: (section: string) => void
}) {
  const config = sectionConfig[section]
  if (!config) return null

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            {config.title}
          </h2>
          <p className="text-muted-foreground mt-1">{config.description}</p>
        </div>

        {section === "layouts" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {layoutTemplates.map((layout) => (
              <Card key={layout.id} className="group hover:shadow-md hover:border-primary/20 transition-all">
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="h-24 rounded-lg bg-muted border border-border flex items-center justify-center gap-1">
                    {Array.from({ length: layout.columns }).map((_, i) => (
                      <div
                        key={i}
                        className="h-14 rounded-sm bg-background border border-border"
                        style={{ width: `${80 / layout.columns}px` }}
                      />
                    ))}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{layout.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{layout.description}</p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => onNavigate("editor")}>
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {section === "templates" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "SaaS Weekly Digest", desc: "Curated tech and SaaS news roundup" },
              { name: "Education Newsletter", desc: "EdTech updates and insights" },
              { name: "Marketing Pulse", desc: "Marketing trends and strategies" },
              { name: "Startup Briefing", desc: "Funding rounds and startup news" },
              { name: "Health & Wellness", desc: "Healthcare industry updates" },
              { name: "Finance Insider", desc: "Financial market analysis" },
            ].map((tmpl) => (
              <Card key={tmpl.name} className="group hover:shadow-md hover:border-primary/20 transition-all">
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="h-32 rounded-lg bg-muted border border-border flex flex-col items-center justify-center gap-1">
                    <div className="w-16 h-2 rounded-full bg-border" />
                    <div className="w-24 h-2 rounded-full bg-border" />
                    <div className="w-20 h-8 rounded bg-background border border-border mt-1" />
                    <div className="w-20 h-8 rounded bg-background border border-border" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{tmpl.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{tmpl.desc}</p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => onNavigate("editor")}>
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {section === "industries" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind) => (
              <Card key={ind} className="group hover:shadow-md hover:border-primary/20 transition-all cursor-pointer">
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Building2 className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{ind}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Explore modules and templates for {ind.toLowerCase()}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => onNavigate("modules")}>
                    Browse Modules
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
