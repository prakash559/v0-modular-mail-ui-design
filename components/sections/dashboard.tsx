"use client"

import { Blocks, Layout, Mail, ArrowRight, Clock, Sparkles, Eye, Settings2, Hash } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { mockModules, mockEmails } from "@/lib/mock-data"

/* ─── Trending module data ─── */
const trendingModules = [
  {
    id: "trend-1",
    title: "AI-Powered Student Assessment",
    source: "Google News",
    sourceIcon: "newspaper",
    keyword: "AI in Education",
    excerpt: "Universities are rolling out AI-driven assessment tools that adapt to individual student progress, reducing grading time by 40% while improving feedback quality.",
    category: "Technology",
  },
  {
    id: "trend-2",
    title: "Remote Work Productivity Report",
    source: "LinkedIn",
    sourceIcon: "briefcase",
    keyword: "Remote Work",
    excerpt: "New data shows distributed teams outperform in-office counterparts on key metrics. The shift to async-first communication is reshaping management practices.",
    category: "Business",
  },
  {
    id: "trend-3",
    title: "Fintech Disruption in SMB Lending",
    source: "TechCrunch",
    sourceIcon: "rocket",
    keyword: "Fintech Innovation",
    excerpt: "Alternative lenders are leveraging real-time cash flow data to underwrite small businesses in minutes, bypassing traditional credit scoring models entirely.",
    category: "Finance",
  },
  {
    id: "trend-4",
    title: "Creator Economy Growth Surge",
    source: "YouTube",
    sourceIcon: "play",
    keyword: "Creator Economy",
    excerpt: "Full-time content creators increased 35% year-over-year. Platform monetization tools and brand partnerships are maturing rapidly across social channels.",
    category: "Marketing",
  },
  {
    id: "trend-5",
    title: "Telehealth Adoption Plateaus",
    source: "BBC News",
    sourceIcon: "globe",
    keyword: "Healthcare Tech",
    excerpt: "After pandemic-era spikes, telehealth usage has stabilized. Providers are now focusing on hybrid care models that blend virtual and in-person visits.",
    category: "Health",
  },
  {
    id: "trend-6",
    title: "Climate Tech Funding Rebounds",
    source: "Reuters",
    sourceIcon: "trending-up",
    keyword: "Clean Energy",
    excerpt: "Venture investment in climate tech startups rose 28% in Q4, driven by battery storage innovation and grid modernization projects across the US and EU.",
    category: "Science",
  },
]

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

        {/* Trending Modules For You */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h3 className="text-base font-semibold text-foreground">Trending Modules For You</h3>
            </div>
            <p className="text-xs text-muted-foreground">Curated from your topics and sources</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingModules.map((mod) => (
              <div
                key={mod.id}
                className="group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-md hover:border-primary/20"
              >
                {/* Card content */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="secondary" className="text-[10px] font-medium shrink-0">
                      {mod.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{mod.source}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 text-balance">{mod.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{mod.excerpt}</p>
                  </div>
                  <div className="mt-auto pt-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/5 border border-primary/10 rounded-full px-2 py-0.5">
                      <Hash className="size-2.5" />
                      {mod.keyword}
                    </span>
                  </div>
                </div>

                {/* Hover overlay with actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-card/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs gap-1.5 bg-card shadow-sm"
                    onClick={() => {}}
                  >
                    <Eye className="size-3" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 text-xs gap-1.5 shadow-sm"
                    onClick={() => onNavigate("module-create")}
                  >
                    <Settings2 className="size-3" />
                    Customize
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
