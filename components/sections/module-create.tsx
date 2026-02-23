"use client"

import { useState, useMemo } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Globe,
  Newspaper,
  MessageCircle,
  Play,
  Headphones,
  FileText,
  Rss,
  Mail,
  Terminal,
  Rocket,
  Clapperboard,
  Image as ImageIcon,
  PenLine,
  Lightbulb,
  TrendingUp,
  HandMetal,
  BarChart3,
  Shield,
  Leaf,
  Briefcase,
  Sparkles,
  Cpu,
  Users,
  Check,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  moduleSources,
  moduleCategories,
  topicTags,
  moduleLayouts,
  editorialTextLayouts,
  editorialTypes,
  insightTopics,
  type ModuleSourceCategory,
  type ModuleLayout,
} from "@/lib/mock-data"

/* ─── Icon Maps ─── */

const feedIconMap: Record<string, React.ElementType> = {
  globe: Globe,
  newspaper: Newspaper,
  "message-circle": MessageCircle,
  play: Play,
  headphones: Headphones,
  "file-text": FileText,
  rss: Rss,
  mail: Mail,
  terminal: Terminal,
  rocket: Rocket,
  clapperboard: Clapperboard,
  image: ImageIcon,
  linkedin: Globe,
  twitter: Globe,
}

const editorialIconMap: Record<string, React.ElementType> = {
  "hand-metal": HandMetal,
  "pen-line": PenLine,
  lightbulb: Lightbulb,
  "trending-up": TrendingUp,
  "message-circle": MessageCircle,
}

const insightIconMap: Record<string, React.ElementType> = {
  "trending-up": TrendingUp,
  "bar-chart-3": BarChart3,
  search: Search,
  users: Users,
  cpu: Cpu,
  shield: Shield,
  leaf: Leaf,
  briefcase: Briefcase,
  sparkles: Sparkles,
  globe: Globe,
}

/* ─── Layout Family Labels ─── */

const familyLabels: Record<string, string> = {
  compact: "Compact",
  feature: "Feature",
  social: "Social",
  data: "Data",
  "editorial-text": "Text",
}

/* ─── Layout Visual Preview Component ─── */

function LayoutPreview({ layout }: { layout: ModuleLayout }) {
  const { family, columns, imagePlacement } = layout

  // Editorial / text layouts
  if (family === "editorial-text") {
    const lineCount = layout.id === "short-form" ? 3 : layout.id === "long-form" ? 8 : 5
    return (
      <div className="h-28 rounded-lg bg-muted/40 border border-border p-3 flex flex-col gap-1.5 overflow-hidden">
        {imagePlacement !== "None" && (
          <div className="w-full h-6 rounded-sm bg-border/60 mb-1 shrink-0" />
        )}
        <div className="w-20 h-2 rounded-full bg-primary/25" />
        {Array.from({ length: lineCount }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full bg-border"
            style={{ width: `${60 + Math.random() * 40}%` }}
          />
        ))}
        {layout.id === "mid-form-bullets" && (
          <div className="flex flex-col gap-1 mt-0.5 pl-2">
            {[85, 70, 60].map((w, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="size-1 rounded-full bg-primary/30 shrink-0" />
                <div className="h-1.5 rounded-full bg-border" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Social card
  if (family === "social") {
    return (
      <div className="h-28 rounded-lg bg-muted/40 border border-border p-3 flex gap-2.5 overflow-hidden">
        <div className="size-8 rounded-full bg-border/60 shrink-0" />
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="w-16 h-1.5 rounded-full bg-primary/25" />
          <div className="w-full h-1.5 rounded-full bg-border" />
          <div className="w-4/5 h-1.5 rounded-full bg-border" />
          <div className="w-3/5 h-1.5 rounded-full bg-border" />
        </div>
      </div>
    )
  }

  // Data layouts
  if (family === "data") {
    if (columns === 1) {
      // Big stat block
      return (
        <div className="h-28 rounded-lg bg-muted/40 border border-border p-3 flex flex-col items-center justify-center gap-1.5">
          <div className="text-xl font-bold text-primary/30">87%</div>
          <div className="w-20 h-1.5 rounded-full bg-border" />
          <div className="w-16 h-1 rounded-full bg-border" />
        </div>
      )
    }
    if (columns === 3) {
      // 3-stat grid
      return (
        <div className="h-28 rounded-lg bg-muted/40 border border-border p-3 flex items-center justify-center gap-4">
          {["87%", "2.4x", "$12M"].map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="text-sm font-bold text-primary/30">{v}</div>
              <div className="w-8 h-1 rounded-full bg-border" />
            </div>
          ))}
        </div>
      )
    }
    // Comparison table (2 cols)
    return (
      <div className="h-28 rounded-lg bg-muted/40 border border-border p-3 flex gap-2">
        {[0, 1].map((i) => (
          <div key={i} className="flex-1 flex flex-col gap-1.5 border border-border rounded-sm p-1.5">
            <div className="w-10 h-1.5 rounded-full bg-primary/25" />
            <div className="w-full h-1 rounded-full bg-border" />
            <div className="w-3/4 h-1 rounded-full bg-border" />
            <div className="w-full h-1 rounded-full bg-border" />
          </div>
        ))}
      </div>
    )
  }

  // Feature layouts
  if (family === "feature") {
    if (columns === 2) {
      // Split feature
      return (
        <div className="h-28 rounded-lg bg-muted/40 border border-border p-2 flex gap-2 overflow-hidden">
          <div className="w-2/5 rounded-sm bg-border/60 shrink-0" />
          <div className="flex-1 flex flex-col gap-1.5 py-1">
            <div className="w-16 h-2 rounded-full bg-primary/25" />
            <div className="w-full h-1.5 rounded-full bg-border" />
            <div className="w-4/5 h-1.5 rounded-full bg-border" />
            <div className="w-3/5 h-1.5 rounded-full bg-border" />
          </div>
        </div>
      )
    }
    // Editorial block
    return (
      <div className="h-28 rounded-lg bg-muted/40 border border-border p-2 flex flex-col gap-1.5 overflow-hidden">
        <div className="w-full h-10 rounded-sm bg-border/60 shrink-0" />
        <div className="w-20 h-2 rounded-full bg-primary/25" />
        <div className="w-full h-1.5 rounded-full bg-border" />
        <div className="w-4/5 h-1.5 rounded-full bg-border" />
      </div>
    )
  }

  // Compact layouts (default)
  return (
    <div className="h-28 rounded-lg bg-muted/40 border border-border p-2 flex gap-1.5 overflow-hidden">
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="flex-1 flex flex-col gap-1">
          <div className="flex-1 rounded-sm bg-border/60" />
          <div className="w-4/5 h-1 rounded-full bg-border" />
          <div className="w-3/5 h-1 rounded-full bg-border" />
        </div>
      ))}
    </div>
  )
}

/* ─── Step Progress Indicator ─── */

function StepIndicator({ step, totalSteps }: { step: number; totalSteps: number }) {
  const labels = ["Module Type", "Layout Style", "Topic"]
  return (
    <div className="flex items-center gap-2">
      {labels.slice(0, totalSteps).map((label, i) => {
        const stepNum = i + 1
        const isActive = stepNum === step
        const isDone = stepNum < step
        return (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && (
              <div className={`w-8 h-px ${isDone ? "bg-primary" : "bg-border"}`} />
            )}
            <div className="flex items-center gap-1.5">
              <div
                className={`flex size-6 items-center justify-center rounded-full text-[10px] font-semibold transition-colors ${
                  isDone
                    ? "bg-primary text-primary-foreground"
                    : isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {isDone ? <Check className="size-3" /> : stepNum}
              </div>
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-foreground" : isDone ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Main Component ─── */

export function ModuleCreate({
  onNavigate,
}: {
  onNavigate: (section: string) => void
}) {
  const [step, setStep] = useState(1)
  const [mainTab, setMainTab] = useState<"feeds" | "insights" | "editorial">("feeds")
  const [searchQuery, setSearchQuery] = useState("")
  const [feedCategory, setFeedCategory] = useState<ModuleSourceCategory>("all")
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null)
  const [topicValue, setTopicValue] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("")

  /* ─── Step 1: Module Type Selection ─── */

  const filteredFeedSources = useMemo(() => {
    let sources = moduleSources
    if (feedCategory !== "all") {
      sources = sources.filter((s) => s.category === feedCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      sources = sources.filter(
        (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      )
    }
    return sources
  }, [feedCategory, searchQuery])

  const handleSelectSource = (sourceId: string) => {
    setSelectedSource(sourceId)
    setStep(2)
  }

  const handleSelectEditorial = (editorialId: string) => {
    setSelectedSource(editorialId)
    setMainTab("editorial")
    setStep(2)
  }

  const handleSelectInsight = (insightId: string) => {
    setSelectedSource(insightId)
    setMainTab("insights")
    setStep(2)
  }

  /* ─── Step 2: Layout ─── */

  const compatibleLayouts = useMemo(() => {
    const allLayouts = [...moduleLayouts, ...editorialTextLayouts]
    return allLayouts.filter((l) => l.compatibleModules.includes(mainTab))
  }, [mainTab])

  const handleSelectLayout = (layoutId: string) => {
    setSelectedLayout(layoutId)
    setStep(3)
  }

  /* ─── Step 3: Topic ─── */

  const handleFinish = () => {
    // Navigate to editor with the configuration
    onNavigate("editor")
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col gap-0">
        {/* Top bar with back, step indicator, and skip */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => {
              if (step === 1) onNavigate("modules")
              else setStep(step - 1)
            }}
          >
            <ArrowLeft className="size-3.5" />
            {step === 1 ? "Back to Modules" : "Back"}
          </Button>
          <StepIndicator step={step} totalSteps={3} />
          <div className="w-24" />
        </div>

        {/* Step 1: Module Type */}
        {step === 1 && (
          <div className="flex flex-col gap-0">
            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-b from-secondary/80 to-background px-6 pb-8 pt-10">
              <div className="mx-auto max-w-3xl text-center flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
                    What type of module do you want to create?
                  </h1>
                  <p className="text-muted-foreground text-sm max-w-lg mx-auto text-pretty">
                    Choose a content source to power your module. Pick from feeds, data insights, or editorial content.
                  </p>
                </div>

                {/* Main Tabs: Feeds / Insights / Editorial */}
                <div className="flex items-center justify-center gap-1">
                  {(["feeds", "insights", "editorial"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setMainTab(tab)
                        setSearchQuery("")
                      }}
                      className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors ${
                        mainTab === tab
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-card text-muted-foreground hover:text-foreground hover:bg-accent border border-border"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            {mainTab === "feeds" && (
              <>
                {/* Search & Category Filters */}
                <div className="px-6 py-4 border-b border-border">
                  <div className="mx-auto max-w-5xl flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter a website URL or search for a source..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 h-10 text-sm"
                        />
                      </div>
                      <Button size="default" className="h-10 px-5 font-semibold gap-1.5">
                        Generate
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {moduleCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setFeedCategory(cat.id)}
                          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                            feedCategory === cat.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:text-foreground hover:bg-accent"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Topic Tags */}
                <div className="px-6 py-3 border-b border-border">
                  <div className="mx-auto max-w-5xl">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {topicTags.map((tag) => (
                        <Badge
                          key={tag.label}
                          variant="outline"
                          className="cursor-pointer text-[11px] font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {tag.label}
                          <span className="ml-1 opacity-50">{tag.count}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Source Grid */}
                <div className="px-6 py-6">
                  <div className="mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {filteredFeedSources.map((source) => {
                        const Icon = feedIconMap[source.icon] || Globe
                        return (
                          <Card
                            key={source.id}
                            className="group cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-200"
                            onClick={() => handleSelectSource(source.id)}
                          >
                            <CardContent className="p-4 flex items-center gap-3">
                              <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${source.color}`}>
                                <Icon className="size-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                  {source.name}
                                </h3>
                                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                                  {source.description}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>

                    {filteredFeedSources.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
                          <Search className="size-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium text-foreground">No sources found</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Try a different search or category.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {mainTab === "insights" && (
              <div className="px-6 py-6">
                <div className="mx-auto max-w-4xl flex flex-col gap-5">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                      Choose an insight topic
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Data-driven modules that surface statistics, trends, and analysis for your audience.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {insightTopics.map((topic) => {
                      const Icon = insightIconMap[topic.icon] || Globe
                      return (
                        <Card
                          key={topic.id}
                          className="group cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-200"
                          onClick={() => handleSelectInsight(topic.id)}
                        >
                          <CardContent className="p-4 flex items-center gap-3.5">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <Icon className="size-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                                  {topic.label}
                                </h3>
                                <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                                  {topic.count}
                                </Badge>
                              </div>
                              <p className="text-[11px] text-muted-foreground mt-0.5">
                                {topic.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {mainTab === "editorial" && (
              <div className="px-6 py-6">
                <div className="mx-auto max-w-2xl flex flex-col gap-5">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                      Choose an editorial module type
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Voice-driven modules written from your perspective. These add personality and opinion to your emails.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {editorialTypes.map((ed) => {
                      const Icon = editorialIconMap[ed.icon] || PenLine
                      return (
                        <Card
                          key={ed.id}
                          className="group cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-200"
                          onClick={() => handleSelectEditorial(ed.id)}
                        >
                          <CardContent className="p-4 flex items-center gap-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <Icon className="size-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                                {ed.name}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                {ed.description}
                              </p>
                            </div>
                            <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Layout Selection */}
        {step === 2 && (
          <div className="px-6 py-8">
            <div className="mx-auto max-w-5xl flex flex-col gap-6">
              <div className="text-center flex flex-col gap-1.5">
                <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
                  Choose a Module Layout
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto text-pretty">
                  Select how your content will be visually presented in the email. Each layout is optimized for different content types.
                </p>
              </div>

              {/* Group by family */}
              {(() => {
                const families = [...new Set(compatibleLayouts.map((l) => l.family))]
                return families.map((fam) => {
                  const layouts = compatibleLayouts.filter((l) => l.family === fam)
                  return (
                    <div key={fam} className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-semibold">
                          {familyLabels[fam] || fam}
                        </Badge>
                        <Separator className="flex-1" />
                      </div>
                      <div className={`grid gap-3 ${
                        layouts.length === 1 ? "grid-cols-1 max-w-sm" : layouts.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      }`}>
                        {layouts.map((layout) => (
                          <Card
                            key={layout.id}
                            className={`group cursor-pointer transition-all duration-200 ${
                              selectedLayout === layout.id
                                ? "border-primary shadow-md ring-2 ring-primary/20"
                                : "hover:shadow-md hover:border-primary/30"
                            }`}
                            onClick={() => handleSelectLayout(layout.id)}
                          >
                            <CardContent className="p-4 flex flex-col gap-3">
                              <LayoutPreview layout={layout} />
                              <div>
                                <div className="flex items-center justify-between">
                                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {layout.name}
                                  </h3>
                                  <span className="text-[10px] text-muted-foreground">
                                    {layout.columns} col{layout.columns > 1 ? "s" : ""}
                                  </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                                  {layout.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                                  {layout.mobileBehavior}
                                </Badge>
                                {layout.imagePlacement !== "None" && (
                                  <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                                    {layout.imagePlacement}
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                })
              })()}
            </div>
          </div>
        )}

        {/* Step 3: Topic Configuration */}
        {step === 3 && (
          <div className="px-6 py-8">
            <div className="mx-auto max-w-xl flex flex-col gap-6">
              <div className="text-center flex flex-col gap-1.5">
                <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
                  Customize your module content
                </h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto text-pretty">
                  Tell us what topic this module should focus on. Our AI will curate and generate content tailored to your audience.
                </p>
              </div>

              <Card>
                <CardContent className="p-6 flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium">Topic or Keyword</Label>
                    <Input
                      placeholder="e.g. AI in healthcare, SaaS growth strategies, remote work trends..."
                      value={topicValue}
                      onChange={(e) => setTopicValue(e.target.value)}
                      className="h-10"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      This will guide the AI in finding and generating the right content for your module.
                    </p>
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium">Industry (optional)</Label>
                    <div className="flex flex-wrap gap-1.5">
                      {["Education", "SaaS", "Healthcare", "Marketing", "Finance", "E-Commerce", "Real Estate"].map(
                        (ind) => (
                          <button
                            key={ind}
                            onClick={() => setSelectedIndustry(selectedIndustry === ind ? "" : ind)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${
                              selectedIndustry === ind
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                            }`}
                          >
                            {ind}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">Suggested topics</Label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "AI in Enterprise",
                        "Remote Work Trends",
                        "Climate Tech",
                        "Creator Economy",
                        "Web3 & Crypto",
                        "Mental Health at Work",
                        "Startup Funding",
                        "EdTech Innovation",
                      ].map((sug) => (
                        <Badge
                          key={sug}
                          variant="outline"
                          className="cursor-pointer text-[11px] hover:bg-accent hover:text-accent-foreground transition-colors"
                          onClick={() => setTopicValue(sug)}
                        >
                          {sug}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <Button
                    onClick={handleFinish}
                    disabled={!topicValue.trim()}
                    className="w-full gap-1.5 font-semibold"
                    size="lg"
                  >
                    <Sparkles className="size-4" />
                    Generate Module
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
