"use client"

import { useState } from "react"
import {
  Plus,
  Pencil,
  Trash2,
  MoreHorizontal,
  Search,
  Newspaper,
  MessageCircle,
  Play,
  Globe,
  FileText,
  Rss,
  Target,
  ListChecks,
  Sparkles,
  Mail,
  TrendingUp,
  PenLine,
  BarChart3,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

/* ─── Visual mini-preview of a module ─── */
function ModulePreview({ mod }: { mod: Module }) {
  const layout = [...moduleLayouts, ...editorialTextLayouts].find((l) => l.id === mod.layoutId)
  const cols = layout?.columns ?? 1

  if (mod.moduleType === "editorial") {
    return (
      <div className="h-28 rounded-md bg-muted/40 border border-border p-3 flex flex-col gap-1.5 overflow-hidden">
        <div className="w-16 h-1.5 rounded-full bg-primary/30" />
        <div className="w-full h-1.5 rounded-full bg-border" />
        <div className="w-4/5 h-1.5 rounded-full bg-border" />
        <div className="w-3/5 h-1.5 rounded-full bg-border" />
        {mod.length === "Long" && (
          <>
            <div className="w-full h-1.5 rounded-full bg-border mt-1" />
            <div className="w-4/5 h-1.5 rounded-full bg-border" />
          </>
        )}
      </div>
    )
  }

  if (mod.moduleType === "insights") {
    return (
      <div className="h-28 rounded-md bg-muted/40 border border-border p-3 flex items-center justify-center gap-3 overflow-hidden">
        {Array.from({ length: Math.min(cols, 3) }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="text-lg font-bold text-primary/40">
              {["87%", "2.4x", "$12M"][i]}
            </div>
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>
        ))}
      </div>
    )
  }

  // Feeds
  return (
    <div className="h-28 rounded-md bg-muted/40 border border-border p-2 flex gap-1.5 overflow-hidden">
      {Array.from({ length: Math.min(cols, 3) }).map((_, i) => (
        <div key={i} className="flex-1 flex flex-col gap-1">
          <div className="flex-1 rounded-sm bg-border/60" />
          <div className="w-4/5 h-1 rounded-full bg-border" />
          <div className="w-3/5 h-1 rounded-full bg-border" />
        </div>
      ))}
    </div>
  )
}

/* ─── Module Card ─── */
function ModuleCard({
  mod,
  emailsUsedIn,
  onEdit,
  onDelete,
  onRename,
}: {
  mod: Module
  emailsUsedIn: string[]
  onEdit: () => void
  onDelete: () => void
  onRename: () => void
}) {
  const SourceIcon = sourceIconMap[mod.sourceType] || Globe

  return (
    <Card className="group hover:shadow-md hover:border-primary/20 transition-all">
      <CardContent className="p-0">
        {/* Visual Preview */}
        <div className="p-3 pb-0">
          <ModulePreview mod={mod} />
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col gap-2">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-foreground truncate">
                {mod.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <SourceIcon className="size-3 text-muted-foreground shrink-0" />
                <span className="text-[11px] text-muted-foreground truncate">
                  {mod.source}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  &middot;
                </span>
                <span className="text-[11px] text-muted-foreground capitalize">
                  {mod.moduleType}
                </span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="size-3.5" />
                  <span className="sr-only">Module actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem onClick={onEdit}>
                  <Pencil className="size-3.5 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onRename}>
                  <FileText className="size-3.5 mr-2" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                  <Trash2 className="size-3.5 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Summary */}
          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
            {mod.summary}
          </p>

          {/* Tags & Status */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge
              variant={mod.status === "ready" ? "default" : "secondary"}
              className="text-[9px] px-1.5 py-0"
            >
              {mod.status === "ready" ? "Ready" : "Draft"}
            </Badge>
            {mod.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[9px] px-1.5 py-0">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Used in emails */}
          {emailsUsedIn.length > 0 && (
            <div className="flex items-center gap-1 pt-1 border-t border-border mt-0.5">
              <Mail className="size-3 text-muted-foreground shrink-0" />
              <span className="text-[10px] text-muted-foreground truncate">
                Used in {emailsUsedIn.join(", ")}
              </span>
            </div>
          )}

          {/* AI indicators */}
          <div className="flex items-center gap-2">
            {mod.commentary.bottomLine && (
              <div className="flex items-center gap-0.5 text-[10px] text-primary">
                <Target className="size-2.5" />
                <span>Bottom Line</span>
              </div>
            )}
            {mod.commentary.whyItMatters && (
              <div className="flex items-center gap-0.5 text-[10px] text-primary">
                <ListChecks className="size-2.5" />
                <span>Why It Matters</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* ─── Main Component ─── */

export function ModulesIndex({
  onNavigate,
}: {
  onNavigate: (section: string) => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "feeds" | "insights" | "editorial">("all")

  // Build email usage map
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
            <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
              Modules
            </h2>
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

        {/* Stats bar */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-primary" />
            <span>{mockModules.filter((m) => m.status === "ready").length} ready</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="size-3.5" />
            <span>{mockModules.filter((m) => m.status === "draft").length} drafts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="size-3.5" />
            <span>{new Set(mockEmails.flatMap((e) => e.moduleIds)).size} used in emails</span>
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
                onDelete={() => {}}
                onRename={() => {}}
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
