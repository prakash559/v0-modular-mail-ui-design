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
  BarChart3,
  Shield,
  Briefcase,
  Sparkles,
  Check,
  Eye,
  Target,
  BookOpen,
  List,
  Zap,
  CheckSquare,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  moduleSources,
  moduleCategories,
  moduleLayouts,
  layoutColumnFilters,
  editorialTypes,
  insightTopics,
  businessVerticals,
  type ModuleSourceCategory,
  type ModuleLayout,
  type LayoutColumnFilter,
} from "@/lib/mock-data"

/* ── Icon Maps ── */

const feedIconMap: Record<string, React.ElementType> = {
  globe: Globe, newspaper: Newspaper, "message-circle": MessageCircle,
  play: Play, headphones: Headphones, "file-text": FileText, rss: Rss,
  mail: Mail, terminal: Terminal, rocket: Rocket, clapperboard: Clapperboard,
  image: ImageIcon, linkedin: Globe, twitter: Globe,
}

const editorialIconMap: Record<string, React.ElementType> = {
  "hand-metal": Sparkles, "pen-line": PenLine, lightbulb: Lightbulb,
  "trending-up": TrendingUp, "message-circle": MessageCircle, eye: Eye,
  briefcase: Briefcase, search: Search, target: Target, "arrow-right": ArrowRight,
}

const insightIconMap: Record<string, React.ElementType> = {
  lightbulb: Lightbulb, "book-open": BookOpen, list: List, shield: Shield,
  "trending-up": TrendingUp, zap: Zap, "bar-chart-3": BarChart3, target: Target,
  "message-circle": MessageCircle, "check-square": CheckSquare,
}

/* ── Layout Visual Preview (template-card wireframe style) ── */

function LayoutPreview({ layout }: { layout: ModuleLayout }) {
  const { family, columns, imagePlacement, id } = layout

  // Text layouts
  if (id === "compact-list-view") {
    return (
      <div className="flex flex-col gap-2">
        {[85, 70, 60].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-1.5 rounded-full bg-muted-foreground/10" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    )
  }
  if (id === "numbered-insight") {
    return (
      <div className="flex flex-col gap-2">
        <div className="w-20 h-2 rounded-full bg-muted-foreground/12" />
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-start gap-2">
            <span className="text-[9px] font-bold text-muted-foreground/25 shrink-0">{n}.</span>
            <div className="h-1.5 rounded-full bg-muted-foreground/8 flex-1" />
          </div>
        ))}
      </div>
    )
  }
  if (id === "bullet-insight-block") {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="w-16 h-2 rounded-full bg-muted-foreground/12" />
        {[80, 65, 55, 70].map((w, i) => (
          <div key={i} className="flex items-center gap-1.5 pl-1">
            <div className="size-1 rounded-full bg-muted-foreground/15 shrink-0" />
            <div className="h-1.5 rounded-full bg-muted-foreground/8" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    )
  }
  if (id === "highlight-panel") {
    return (
      <div className="rounded-lg bg-muted-foreground/5 border border-muted-foreground/8 p-3 flex flex-col gap-1.5">
        <div className="w-full h-1.5 rounded-full bg-muted-foreground/10" />
        <div className="w-4/5 h-1.5 rounded-full bg-muted-foreground/10" />
        <div className="w-12 h-2 rounded bg-muted-foreground/10 mt-1" />
      </div>
    )
  }
  if (id === "side-accent-editorial") {
    return (
      <div className="flex gap-2.5">
        <div className="w-0.5 rounded-full bg-primary/30 shrink-0" />
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="w-16 h-2 rounded-full bg-muted-foreground/12" />
          <div className="w-full h-1.5 rounded-full bg-muted-foreground/8" />
          <div className="w-4/5 h-1.5 rounded-full bg-muted-foreground/8" />
          <div className="w-3/5 h-1.5 rounded-full bg-muted-foreground/8" />
        </div>
      </div>
    )
  }
  if (id === "single-column-long") {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="w-full h-8 rounded bg-muted-foreground/8" />
        <div className="w-16 h-2 rounded-full bg-muted-foreground/12" />
        <div className="w-full h-1.5 rounded-full bg-muted-foreground/8" />
        <div className="w-4/5 h-1.5 rounded-full bg-muted-foreground/8" />
        <div className="w-full h-1.5 rounded-full bg-muted-foreground/8" />
        <div className="w-3/5 h-1.5 rounded-full bg-muted-foreground/8" />
      </div>
    )
  }

  // Video card
  if (id === "video-card") {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="w-full h-14 rounded bg-muted-foreground/8 flex items-center justify-center relative">
          <div className="size-6 rounded-full bg-muted-foreground/15 flex items-center justify-center">
            <Play className="size-3 text-muted-foreground/30 ml-0.5" />
          </div>
        </div>
        <div className="w-16 h-2 rounded-full bg-muted-foreground/12" />
        <div className="w-4/5 h-1.5 rounded-full bg-muted-foreground/8" />
      </div>
    )
  }

  // Image overlay
  if (id === "image-overlay-card") {
    return (
      <div className="w-full h-16 rounded bg-muted-foreground/8 flex items-end p-2">
        <div className="flex flex-col gap-1">
          <div className="w-16 h-2 rounded-full bg-card/80" />
          <div className="w-10 h-1 rounded-full bg-card/50" />
        </div>
      </div>
    )
  }

  // Hero + grid
  if (id === "hero-grid-below") {
    return (
      <div className="flex flex-col gap-2">
        <div className="w-full h-8 rounded bg-muted-foreground/8" />
        <div className="flex gap-2">
          {[0, 1].map((i) => (
            <div key={i} className="flex-1 flex flex-col gap-1">
              <div className="h-5 rounded bg-muted-foreground/6" />
              <div className="w-4/5 h-1 rounded-full bg-muted-foreground/8" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Icon + text grid
  if (id === "icon-text-grid") {
    return (
      <div className="flex gap-3 justify-center">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="size-4 rounded bg-muted-foreground/10" />
            <div className="w-8 h-1.5 rounded-full bg-muted-foreground/8" />
            <div className="w-6 h-1 rounded-full bg-muted-foreground/6" />
          </div>
        ))}
      </div>
    )
  }

  // Image + title only
  if (id === "image-title-only") {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="w-full h-12 rounded bg-muted-foreground/8" />
        <div className="w-16 h-2 rounded-full bg-muted-foreground/12" />
      </div>
    )
  }

  // Social card
  if (family === "social") {
    return (
      <div className="flex gap-2.5 overflow-hidden">
        <div className="size-8 rounded-full bg-muted-foreground/10 shrink-0" />
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="w-14 h-1.5 rounded-full bg-muted-foreground/12" />
          <div className="w-full h-1.5 rounded-full bg-muted-foreground/8" />
          <div className="w-4/5 h-1.5 rounded-full bg-muted-foreground/8" />
        </div>
      </div>
    )
  }

  // Data layouts
  if (family === "data") {
    if (columns === 1) {
      return (
        <div className="flex flex-col items-center justify-center gap-1.5 py-1">
          <div className="text-xl font-bold text-muted-foreground/15">87%</div>
          <div className="w-16 h-1.5 rounded-full bg-muted-foreground/8" />
          <div className="w-12 h-1 rounded-full bg-muted-foreground/6" />
        </div>
      )
    }
    if (columns === 3) {
      return (
        <div className="flex items-center justify-center gap-4 py-1">
          {["87%", "2.4x", "$12M"].map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="text-sm font-bold text-muted-foreground/15">{v}</div>
              <div className="w-8 h-1 rounded-full bg-muted-foreground/8" />
            </div>
          ))}
        </div>
      )
    }
    return (
      <div className="flex gap-2">
        {[0, 1].map((i) => (
          <div key={i} className="flex-1 flex flex-col gap-1.5 border border-muted-foreground/8 rounded p-2">
            <div className="w-10 h-1.5 rounded-full bg-muted-foreground/12" />
            <div className="w-full h-1 rounded-full bg-muted-foreground/6" />
            <div className="w-3/4 h-1 rounded-full bg-muted-foreground/6" />
          </div>
        ))}
      </div>
    )
  }

  // Feature layouts
  if (family === "feature") {
    if (columns === 2) {
      return (
        <div className="flex gap-2.5 overflow-hidden">
          <div className="w-2/5 rounded bg-muted-foreground/8 shrink-0 min-h-[50px]" />
          <div className="flex-1 flex flex-col gap-1.5 py-0.5">
            <div className="w-14 h-2 rounded-full bg-muted-foreground/12" />
            <div className="w-full h-1.5 rounded-full bg-muted-foreground/8" />
            <div className="w-4/5 h-1.5 rounded-full bg-muted-foreground/8" />
          </div>
        </div>
      )
    }
    return (
      <div className="flex flex-col gap-1.5 overflow-hidden">
        {imagePlacement !== "None" && (
          <div className="w-full h-10 rounded bg-muted-foreground/8 shrink-0" />
        )}
        <div className="w-16 h-2 rounded-full bg-muted-foreground/12" />
        <div className="w-full h-1.5 rounded-full bg-muted-foreground/8" />
        <div className="w-4/5 h-1.5 rounded-full bg-muted-foreground/8" />
      </div>
    )
  }

  // Compact (default)
  return (
    <div className="flex gap-2 overflow-hidden">
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="flex-1 flex flex-col gap-1.5">
          <div className="flex-1 rounded bg-muted-foreground/8 min-h-[40px]" />
          <div className="w-4/5 h-1.5 rounded-full bg-muted-foreground/8" />
          <div className="w-3/5 h-1.5 rounded-full bg-muted-foreground/8" />
        </div>
      ))}
    </div>
  )
}

/* ── Step Indicator ── */

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
            {i > 0 && <div className={`w-8 h-px ${isDone ? "bg-primary" : "bg-border"}`} />}
            <div className="flex items-center gap-1.5">
              <div
                className={`flex size-6 items-center justify-center rounded-full text-[10px] font-semibold transition-colors ${
                  isDone || isActive
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

/* ── Main Component ── */

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
  const [layoutFilter, setLayoutFilter] = useState<LayoutColumnFilter>("all")
  const [topicValue, setTopicValue] = useState("")

  /* ── Step 1 handlers ── */

  const filteredFeedSources = useMemo(() => {
    let sources = feedCategory === "all" ? moduleSources : moduleSources.filter((s) => s.category === feedCategory)
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

  /* ── Step 2 ── */

  const compatibleLayouts = useMemo(() => {
    let layouts = moduleLayouts.filter((l) => l.compatibleModules.includes(mainTab))
    if (layoutFilter !== "all") {
      layouts = layouts.filter((l) => l.columnFilter === layoutFilter)
    }
    return layouts
  }, [mainTab, layoutFilter])

  const handleSelectLayout = (layoutId: string) => {
    setSelectedLayout(layoutId)
    setStep(3)
  }

  /* ── Step 3 ── */

  const handleFinish = () => {
    onNavigate("editor")
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col gap-0">
        {/* Top bar: back + step indicator */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => {
              if (step === 1) onNavigate("modules")
              else {
                setStep(step - 1)
                if (step === 2) setSelectedLayout(null)
              }
            }}
          >
            <ArrowLeft className="size-3.5" />
            {step === 1 ? "Back to Modules" : "Back"}
          </Button>
          <StepIndicator step={step} totalSteps={3} />
          <div className="w-24" />
        </div>

        {/* ═════════════ STEP 1: Module Type ═════════════ */}
        {step === 1 && (
          <div className="flex flex-col gap-0">
            {/* Hero section with title + tabs */}
            <div className="bg-card px-6 pt-10 pb-8">
              <div className="mx-auto max-w-3xl text-center flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
                    What type of module do you want to create?
                  </h1>
                  <p className="text-muted-foreground text-sm max-w-lg mx-auto text-pretty leading-relaxed">
                    Choose a content source to power your module. Pick from feeds, data insights, or editorial content.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {(["feeds", "insights", "editorial"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setMainTab(tab)
                        setSearchQuery("")
                        setFeedCategory("all")
                      }}
                      className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                        mainTab === tab
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── FEEDS TAB ── */}
            {mainTab === "feeds" && (
              <div className="flex flex-col gap-0">
                {/* Category pills */}
                <div className="px-6 py-4 bg-card">
                  <div className="flex items-center justify-center gap-1.5">
                    {moduleCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setFeedCategory(cat.id)
                          setSearchQuery("")
                        }}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
                          feedCategory === cat.id
                            ? "bg-primary/10 text-primary"
                            : "bg-background text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom: URL field + Generate centered */}
                {feedCategory === "custom" && (
                  <div className="px-6 py-5 bg-card">
                    <div className="mx-auto max-w-lg flex items-center gap-2">
                      <div className="relative flex-1">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter a website URL..."
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
                  </div>
                )}

                {/* Main content: sidebar catalogue + source cards */}
                <div className="flex min-h-[500px]">
                  {/* Left sidebar: business verticals catalogue */}
                  <div className="w-52 shrink-0 p-3">
                    <div className="rounded-lg border border-border overflow-hidden">
                      <div className="flex flex-col">
                        {businessVerticals.map((vert, i) => (
                          <button
                            key={vert.label}
                            className={`flex items-center justify-between px-3.5 py-2.5 text-left hover:bg-accent transition-colors ${
                              i > 0 ? "border-t border-border" : ""
                            }`}
                          >
                            <span className="text-xs text-foreground font-medium">{vert.label}</span>
                            <span className="text-[10px] text-muted-foreground font-medium">{vert.count}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Source cards grid */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    {filteredFeedSources.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
                          <Search className="size-5 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium text-foreground">No sources found</p>
                        <p className="text-xs text-muted-foreground mt-1">Try a different category.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── INSIGHTS TAB ── */}
            {mainTab === "insights" && (
              <div className="px-6 py-8">
                <div className="mx-auto max-w-3xl flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    {insightTopics.map((topic) => {
                      const Icon = insightIconMap[topic.icon] || Globe
                      return (
                        <Card
                          key={topic.id}
                          className="group cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-200"
                          onClick={() => handleSelectInsight(topic.id)}
                        >
                          <CardContent className="p-4 flex items-center gap-4">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <Icon className="size-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                                {topic.label}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                {topic.description}
                              </p>
                            </div>
                            <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── EDITORIAL TAB ── */}
            {mainTab === "editorial" && (
              <div className="px-6 py-8">
                <div className="mx-auto max-w-3xl flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
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
                            <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
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

        {/* ═════════════ STEP 2: Layout Selection ═════════════ */}
        {step === 2 && (
          <div className="flex flex-col gap-0">
            {/* Header section with title + column filter pills */}
            <div className="bg-card px-6 pt-10 pb-8">
              <div className="mx-auto max-w-5xl text-center flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
                    Choose a Module Layout
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-lg mx-auto text-pretty leading-relaxed">
                    Select how your content will be visually presented in the email.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1.5">
                  {layoutColumnFilters.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setLayoutFilter(f.id)}
                      className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
                        layoutFilter === f.id
                          ? "bg-primary/10 text-primary"
                          : "bg-background text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Layout cards grid */}
            <div className="px-6 py-8">
              <div className="mx-auto max-w-5xl">
                {compatibleLayouts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {compatibleLayouts.map((layout) => (
                      <Card
                        key={layout.id}
                        className={`group cursor-pointer transition-all duration-200 ${
                          selectedLayout === layout.id
                            ? "border-primary shadow-md ring-2 ring-primary/20"
                            : "hover:shadow-md hover:border-primary/30"
                        }`}
                        onClick={() => handleSelectLayout(layout.id)}
                      >
                        <CardContent className="p-0 flex flex-col">
                          <div className="p-4 pb-3 h-36 flex flex-col justify-center rounded-t-lg bg-muted/30">
                            <LayoutPreview layout={layout} />
                          </div>
                          <div className="px-4 py-3 border-t border-border">
                            <h3 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors text-center truncate">
                              {layout.name}
                            </h3>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-sm font-medium text-foreground">No layouts match this filter</p>
                    <p className="text-xs text-muted-foreground mt-1">Try selecting a different column filter.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═════════════ STEP 3: Topic ═════════════ */}
        {step === 3 && (
          <div className="px-6 py-8">
            <div className="mx-auto max-w-xl flex flex-col gap-6">
              <div className="text-center flex flex-col gap-1.5">
                <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
                  Customize your module content
                </h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto text-pretty leading-relaxed">
                  Tell us what topic this module should focus on. Our AI will curate and generate content tailored to your audience.
                </p>
              </div>

              <Card>
                <CardContent className="p-6 flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium">Topic or Keyword</Label>
                    <Input
                      placeholder="Enter a Topic, Keyword or Phrase"
                      value={topicValue}
                      onChange={(e) => setTopicValue(e.target.value)}
                      className="h-10"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      This will guide the AI in finding and generating the right content for your module.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">Suggested Topics and Keywords</Label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "AI in Enterprise",
                        "Remote Work",
                        "SaaS Growth",
                        "Climate Tech",
                        "Creator Economy",
                        "Startup Funding",
                        "EdTech",
                        "Healthcare AI",
                        "Productivity Tools",
                        "Market Trends",
                        "Leadership",
                        "Digital Marketing",
                        "Supply Chain",
                        "Cybersecurity",
                        "Mental Health",
                        "Fintech",
                        "Automation",
                        "Brand Strategy",
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

                  <Button
                    onClick={handleFinish}
                    disabled={!topicValue.trim()}
                    className="w-full gap-1.5 font-semibold mt-2"
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
