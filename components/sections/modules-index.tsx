"use client"

import { useState } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  Copy,
  Eye,
  Search,
  Newspaper,
  MessageCircle,
  Play,
  Globe,
  FileText,
  Rss,
  Mail,
  PenLine,
  BarChart3,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockModules, mockEmails, moduleLayouts, editorialTextLayouts, type Module } from "@/lib/mock-data"

const sourceIconMap: Record<string, React.ElementType> = {
  "google-news": Newspaper,
  reddit: MessageCircle,
  youtube: Play,
  "custom-url": Globe,
  podcasts: Globe,
  "welcome-note": Mail,
  "editorial-view": PenLine,
  "market-data": BarChart3,
}

/* ── Visual mini-preview of a module ── */
function ModulePreview({ mod }: { mod: Module }) {
  const layout = [...moduleLayouts, ...editorialTextLayouts].find((l) => l.id === mod.layoutId)
  const cols = layout?.columns ?? 1

  if (mod.moduleType === "editorial") {
    return (
      <div className="h-32 rounded-lg bg-muted/50 p-4 flex flex-col gap-1.5 overflow-hidden">
        <div className="w-16 h-2 rounded-full bg-muted-foreground/15" />
        <div className="w-full h-1.5 rounded-full bg-muted-foreground/10 mt-1" />
        <div className="w-4/5 h-1.5 rounded-full bg-muted-foreground/10" />
        <div className="w-3/5 h-1.5 rounded-full bg-muted-foreground/10" />
        {mod.length === "Long" && (
          <>
            <div className="w-full h-1.5 rounded-full bg-muted-foreground/10 mt-1" />
            <div className="w-4/5 h-1.5 rounded-full bg-muted-foreground/10" />
          </>
        )}
      </div>
    )
  }

  if (mod.moduleType === "insights") {
    return (
      <div className="h-32 rounded-lg bg-muted/50 p-4 flex items-center justify-center gap-4 overflow-hidden">
        {Array.from({ length: Math.min(cols, 3) }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="text-lg font-bold text-muted-foreground/20">
              {["87%", "2.4x", "$12M"][i]}
            </div>
            <div className="w-10 h-1 rounded-full bg-muted-foreground/10" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="h-32 rounded-lg bg-muted/50 p-3 flex gap-2 overflow-hidden">
      {Array.from({ length: Math.min(cols, 3) }).map((_, i) => (
        <div key={i} className="flex-1 flex flex-col gap-1.5">
          <div className="flex-1 rounded bg-muted-foreground/8" />
          <div className="w-4/5 h-1.5 rounded-full bg-muted-foreground/10" />
          <div className="w-3/5 h-1.5 rounded-full bg-muted-foreground/10" />
        </div>
      ))}
    </div>
  )
}

/* ── Module Card ── */
function ModuleCard({
  mod,
  emailsUsedIn,
  onEdit,
}: {
  mod: Module
  emailsUsedIn: string[]
  onEdit: () => void
}) {
  const typeLabel =
    mod.moduleType === "feeds" ? "Feed" : mod.moduleType === "insights" ? "Insight" : "Editorial"

  return (
    <Card className="group relative hover:shadow-lg hover:border-primary/25 transition-all duration-200 overflow-hidden">
      <CardContent className="p-0">
        {/* Visual Preview */}
        <div className="p-3 pb-0">
          <ModulePreview mod={mod} />
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col gap-2">
          <h3 className="text-sm font-bold text-foreground truncate">{mod.name}</h3>
          <Badge
            variant="secondary"
            className="w-fit text-[10px] px-2 py-0 bg-primary/6 text-muted-foreground border-0"
          >
            {typeLabel}
          </Badge>

          {/* Used in emails */}
          {emailsUsedIn.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1.5 border-t border-border mt-0.5">
              <Mail className="size-3 text-muted-foreground shrink-0" />
              <span className="text-[11px] text-muted-foreground truncate">
                Used in {emailsUsedIn.join(", ")}
              </span>
            </div>
          )}
        </div>

        {/* Hover action bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border px-3 py-2 flex items-center justify-center gap-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <button
            onClick={onEdit}
            className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/8 transition-colors"
            title="Edit"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/8 transition-colors"
            title="Preview"
          >
            <Eye className="size-3.5" />
          </button>
          <button
            className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/8 transition-colors"
            title="Duplicate"
          >
            <Copy className="size-3.5" />
          </button>
          <button
            className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-colors"
            title="Delete"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

/* ── Main Component ── */
export function ModulesIndex({
  onNavigate,
}: {
  onNavigate: (section: string) => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "feeds" | "insights" | "editorial">("all")

  const emailUsageMap = new Map<string, string[]>()
  mockEmails.forEach((email) => {
    email.moduleIds.forEach((modId) => {
      const existing = emailUsageMap.get(modId) || []
      existing.push(email.name)
      emailUsageMap.set(modId, existing)
    })
  })

  const filteredModules = mockModules.filter((mod) => {
    const matchesSearch =
      !searchQuery.trim() ||
      mod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = filterType === "all" || mod.moduleType === filterType
    return matchesSearch && matchesType
  })

  const typeFilters: { id: "all" | "feeds" | "insights" | "editorial"; label: string; count: number }[] = [
    { id: "all", label: "All", count: mockModules.length },
    { id: "feeds", label: "Feeds", count: mockModules.filter((m) => m.moduleType === "feeds").length },
    { id: "insights", label: "Insights", count: mockModules.filter((m) => m.moduleType === "insights").length },
    { id: "editorial", label: "Editorial", count: mockModules.filter((m) => m.moduleType === "editorial").length },
  ]

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">Modules</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Your saved content modules. Each module is a reusable building block for your emails.
            </p>
          </div>
          <Button onClick={() => onNavigate("module-create")} className="gap-1.5 shrink-0">
            <Plus className="size-4" />
            Create Module
          </Button>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
          <div className="flex items-center gap-1">
            {typeFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  filterType === f.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {f.label}
                <span className="ml-1 opacity-70">{f.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Module Grid */}
        {filteredModules.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredModules.map((mod) => (
              <ModuleCard
                key={mod.id}
                mod={mod}
                emailsUsedIn={emailUsageMap.get(mod.id) || []}
                onEdit={() => onNavigate("editor")}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
              <Search className="size-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">No modules found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try a different search or filter, or create a new module.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
