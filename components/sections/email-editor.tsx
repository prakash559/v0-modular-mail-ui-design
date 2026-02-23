"use client"

import { useState, useCallback } from "react"
import {
  Blocks,
  GripVertical,
  Trash2,
  Pencil,
  Monitor,
  Smartphone,
  Save,
  Eye,
  Code,
  Target,
  ListChecks,
  Plus,
  Sparkles,
  Image,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ArrowRight,
  Undo2,
  Redo2,
  ChevronDown as ChevronDownIcon,
  Send,
  Newspaper,
  Headphones,
  Play,
  MessageCircle,
  TrendingUp,
  Star,
  Hash,
  Zap,
  Globe,
  Lightbulb,
  BookOpen,
  List,
  Shield,
  BarChart3,
  CheckSquare,
  PenLine,
  Briefcase,
  Search,
  Eye as EyeIcon,
  Rocket,
  FileText,
  Compass,
  Megaphone,
  Copy,
  Palette,
  SlidersHorizontal,
  Filter,
  ToggleLeft,
  Ban,
  Clock,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockModules, moduleLayouts, tones } from "@/lib/mock-data"

/* ─── Tile definitions ─── */
const feedTiles = [
  { id: "articles", label: "Articles", icon: Newspaper },
  { id: "podcasts", label: "Podcasts", icon: Headphones },
  { id: "videos", label: "Videos", icon: Play },
  { id: "news", label: "News", icon: Globe },
  { id: "social", label: "Social", icon: MessageCircle },
  { id: "highlights", label: "Highlights", icon: Star },
  { id: "roundup", label: "Roundup", icon: Blocks },
  { id: "headlines", label: "Headlines", icon: FileText },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "spotlight", label: "Spotlight", icon: Search },
  { id: "data-feed", label: "Data Feed", icon: BarChart3 },
]

const insightTiles = [
  { id: "tip", label: "Tip", icon: Lightbulb },
  { id: "insight", label: "Insight", icon: Sparkles },
  { id: "breakdown", label: "Breakdown", icon: TrendingUp },
  { id: "explainer", label: "Explainer", icon: Zap },
  { id: "takeaways", label: "Takeaways", icon: List },
  { id: "strategy", label: "Strategy", icon: Target },
  { id: "trend", label: "Trend", icon: Rocket },
  { id: "analysis", label: "Analysis", icon: BarChart3 },
  { id: "checklist", label: "Checklist", icon: CheckSquare },
  { id: "myth", label: "Myth", icon: Shield },
  { id: "data", label: "Data", icon: Hash },
  { id: "framework", label: "Framework", icon: Blocks },
]

const editorialTiles = [
  { id: "welcome", label: "Welcome", icon: PenLine },
  { id: "editorial", label: "Editorial", icon: FileText },
  { id: "perspective", label: "Perspective", icon: Compass },
  { id: "commentary", label: "Commentary", icon: Megaphone },
  { id: "focus", label: "Focus", icon: Target },
  { id: "viewpoint", label: "Viewpoint", icon: EyeIcon },
  { id: "context", label: "Context", icon: Globe },
  { id: "opinion", label: "Opinion", icon: MessageCircle },
  { id: "outlook", label: "Outlook", icon: TrendingUp },
  { id: "reflection", label: "Reflection", icon: BookOpen },
  { id: "from-us", label: "From Us", icon: Briefcase },
  { id: "note", label: "Note", icon: PenLine },
]

/* ─── Layout wireframe renderer ─── */
function LayoutWireframe({ layout }: { layout: (typeof moduleLayouts)[0] }) {
  const f = layout.family
  const c = layout.columns
  if (f === "data" && c === 3)
    return (
      <div className="flex gap-1.5 w-full">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 p-1.5 rounded bg-background/80">
            <div className="h-3.5 w-8 rounded-sm bg-muted-foreground/15" />
            <div className="h-1.5 w-6 rounded-full bg-muted-foreground/10" />
          </div>
        ))}
      </div>
    )
  if (f === "data" && c === 1)
    return (
      <div className="flex flex-col items-center gap-1.5 w-full p-2">
        <div className="h-5 w-14 rounded-sm bg-muted-foreground/15" />
        <div className="h-1.5 w-20 rounded-full bg-muted-foreground/10" />
        <div className="h-1.5 w-16 rounded-full bg-muted-foreground/10" />
      </div>
    )
  if (f === "social")
    return (
      <div className="flex items-start gap-2 w-full p-2">
        <div className="size-5 rounded-full bg-muted-foreground/15 shrink-0" />
        <div className="flex-1 flex flex-col gap-1">
          <div className="h-1.5 w-14 rounded-full bg-muted-foreground/15" />
          <div className="h-1.5 w-full rounded-full bg-muted-foreground/10" />
          <div className="h-1.5 w-3/4 rounded-full bg-muted-foreground/10" />
        </div>
      </div>
    )
  if (layout.columnFilter === "video")
    return (
      <div className="flex flex-col gap-1.5 w-full p-1.5">
        <div className="w-full h-10 rounded bg-muted-foreground/10 flex items-center justify-center">
          <Play className="size-4 text-muted-foreground/30" />
        </div>
        <div className="h-1.5 w-3/4 rounded-full bg-muted-foreground/15" />
        <div className="h-1.5 w-1/2 rounded-full bg-muted-foreground/10" />
      </div>
    )
  if (layout.columnFilter === "text" || f === "editorial-text")
    return (
      <div className="flex flex-col gap-1 w-full p-2">
        <div className="h-2 w-16 rounded-full bg-muted-foreground/15" />
        <div className="h-1.5 w-full rounded-full bg-muted-foreground/10" />
        <div className="h-1.5 w-full rounded-full bg-muted-foreground/10" />
        <div className="h-1.5 w-3/4 rounded-full bg-muted-foreground/10" />
      </div>
    )
  if (c === 3)
    return (
      <div className="flex gap-1 w-full p-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 flex flex-col gap-1">
            <div className="w-full h-6 rounded-sm bg-muted-foreground/10" />
            <div className="h-1.5 w-full rounded-full bg-muted-foreground/15" />
            <div className="h-1.5 w-3/4 rounded-full bg-muted-foreground/10" />
          </div>
        ))}
      </div>
    )
  if (c === 2)
    return (
      <div className="flex gap-1.5 w-full p-1.5">
        <div className="flex-1 h-12 rounded bg-muted-foreground/10" />
        <div className="flex-1 flex flex-col gap-1 justify-center">
          <div className="h-2 w-full rounded-full bg-muted-foreground/15" />
          <div className="h-1.5 w-full rounded-full bg-muted-foreground/10" />
          <div className="h-1.5 w-3/4 rounded-full bg-muted-foreground/10" />
        </div>
      </div>
    )
  return (
    <div className="flex flex-col gap-1 w-full p-1.5">
      <div className="w-full h-8 rounded bg-muted-foreground/10" />
      <div className="h-2 w-3/4 rounded-full bg-muted-foreground/15" />
      <div className="h-1.5 w-full rounded-full bg-muted-foreground/10" />
      <div className="h-1.5 w-2/3 rounded-full bg-muted-foreground/10" />
    </div>
  )
}

/* ─── Types ─── */
type EditableComponent = "heading" | "body" | "image" | "bottomLine" | "whyItMatters"
type EditingTab = "data" | "style" | "filters"

type CanvasBlock = {
  id: string
  moduleId: string
  name: string
  source: string
  tone: string
  bottomLine: boolean
  whyItMatters: boolean
  alignment: "left" | "center" | "right"
  colorStyle: "primary" | "secondary" | "neutral"
  padding: number
  headingText: string
  bodyText: string
  topicPhrase: string
  tileLabel: string
  bgColor: string
  titleColor: string
  textColor: string
  fontFamily: string
  showImage: boolean
  showTitle: boolean
  showText: boolean
  showCta: boolean
  ctaCopy: string
  /* Filters */
  globalFilter: boolean
  filterNoImages: boolean
  filterNoDescription: boolean
  filterNoDates: boolean
  filterNoSecureLinks: boolean
  filterDuplicateDesc: boolean
  filterDuplicateTitles: boolean
  cleanTitleEnabled: boolean
  whitelistKeywords: string
  whitelistApplyTitle: boolean
  whitelistApplyDesc: boolean
  whitelistApplyLink: boolean
  whitelistApplyImage: boolean
  blacklistKeywords: string
  blacklistApplyTitle: boolean
  blacklistApplyDesc: boolean
  blacklistApplyLink: boolean
  blacklistApplyImage: boolean
  autoHideOlderPosts: boolean
  autoHidePeriod: string
  autoHideOlderThan: string
}

type SidebarMode = "add-module" | "edit-module"
type SidebarStep = "tiles" | "layouts" | "topic"

const defaultBlockFields = {
  tone: "Professional",
  bottomLine: true,
  whyItMatters: false,
  alignment: "left" as const,
  colorStyle: "neutral" as const,
  padding: 16,
  bgColor: "#ffffff",
  titleColor: "#111111",
  textColor: "#666666",
  fontFamily: "sans-serif",
  showImage: true,
  showTitle: true,
  showText: true,
  showCta: true,
  ctaCopy: "Read More",
  globalFilter: true,
  filterNoImages: true,
  filterNoDescription: false,
  filterNoDates: false,
  filterNoSecureLinks: false,
  filterDuplicateDesc: false,
  filterDuplicateTitles: false,
  cleanTitleEnabled: true,
  whitelistKeywords: "",
  whitelistApplyTitle: true,
  whitelistApplyDesc: true,
  whitelistApplyLink: false,
  whitelistApplyImage: false,
  blacklistKeywords: "",
  blacklistApplyTitle: true,
  blacklistApplyDesc: true,
  blacklistApplyLink: false,
  blacklistApplyImage: false,
  autoHideOlderPosts: false,
  autoHidePeriod: "days",
  autoHideOlderThan: "7",
}

export function EmailEditor() {
  const [canvasBlocks, setCanvasBlocks] = useState<CanvasBlock[]>([
    {
      id: "block-1",
      moduleId: "mod-1",
      name: "Business Analytics Trends",
      source: "Google News",
      topicPhrase: "AI in business analytics",
      tileLabel: "Articles",
      headingText: "Business Analytics Trends",
      bodyText:
        "Top business analytics trends reshaping how companies make data-driven decisions in 2026. AI-powered dashboards and predictive models lead the charge.",
      ...defaultBlockFields,
    },
    {
      id: "block-2",
      moduleId: "mod-2",
      name: "EdTech Weekly Roundup",
      source: "Reddit",
      topicPhrase: "edtech innovation",
      tileLabel: "Roundup",
      headingText: "EdTech Weekly Roundup",
      bodyText:
        "The most discussed EdTech topics this week from r/edtech and r/education, including new classroom tools and curriculum innovations.",
      ...defaultBlockFields,
      bottomLine: false,
      whyItMatters: true,
    },
  ])

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<EditableComponent | null>(null)
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null)
  const [hoveredComponent, setHoveredComponent] = useState<{
    blockId: string
    component: EditableComponent
  } | null>(null)
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop")
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [draggingBlockId, setDraggingBlockId] = useState<string | null>(null)

  /* Left sidebar state */
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("add-module")
  const [activeTab, setActiveTab] = useState<"feeds" | "insights" | "editorial">("feeds")
  const [sidebarStep, setSidebarStep] = useState<SidebarStep>("tiles")
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null)
  const [selectedLayoutId, setSelectedLayoutId] = useState<string | null>(null)
  const [topicKeyword, setTopicKeyword] = useState("")
  const [editingTab, setEditingTab] = useState<EditingTab>("data")

  const selectedBlock = canvasBlocks.find((b) => b.id === selectedBlockId)

  const activeTiles =
    activeTab === "feeds" ? feedTiles : activeTab === "insights" ? insightTiles : editorialTiles

  const compatibleLayouts = moduleLayouts.filter((l) =>
    l.compatibleModules.includes(activeTab === "feeds" ? "feeds" : activeTab === "insights" ? "insights" : "editorial")
  )

  const suggestedTopics = [
    "AI in business",
    "remote work trends",
    "SaaS pricing",
    "customer retention",
    "startup growth",
    "marketing automation",
    "data privacy",
    "tech layoffs",
  ]

  /* ─── Canvas helpers ─── */
  const addModuleToCanvas = useCallback((mod: (typeof mockModules)[0]) => {
    const newBlock: CanvasBlock = {
      id: `block-${Date.now()}`,
      moduleId: mod.id,
      name: mod.name,
      source: mod.source,
      topicPhrase: "",
      tileLabel: "Feed",
      headingText: mod.name,
      bodyText: mod.summary,
      ...defaultBlockFields,
      tone: mod.tone,
      bottomLine: mod.commentary.bottomLine,
      whyItMatters: mod.commentary.whyItMatters,
    }
    setCanvasBlocks((prev) => [...prev, newBlock])
  }, [])

  const addNewModuleToCanvas = useCallback(
    (tileLabel: string, layoutName: string, topic: string) => {
      const newBlock: CanvasBlock = {
        id: `block-${Date.now()}`,
        moduleId: `new-${Date.now()}`,
        name: `${tileLabel}: ${topic}`,
        source: activeTab === "feeds" ? "Feed" : activeTab === "insights" ? "Insight" : "Editorial",
        topicPhrase: topic,
        tileLabel,
        headingText: `${tileLabel}: ${topic}`,
        bodyText: `AI-generated ${activeTab} content about "${topic}" using ${layoutName} layout. This content will be populated by ModularMail's AI engine.`,
        ...defaultBlockFields,
        bottomLine: activeTab !== "editorial",
        whyItMatters: activeTab === "insights",
      }
      setCanvasBlocks((prev) => [...prev, newBlock])
    },
    [activeTab]
  )

  const deleteBlock = useCallback((id: string) => {
    setCanvasBlocks((prev) => prev.filter((b) => b.id !== id))
    setSelectedBlockId((prev) => {
      if (prev === id) {
        setSidebarMode("add-module")
        setSelectedComponent(null)
        return null
      }
      return prev
    })
  }, [])

  const duplicateBlock = useCallback((id: string) => {
    setCanvasBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id)
      if (idx === -1) return prev
      const original = prev[idx]
      const copy: CanvasBlock = { ...original, id: `block-${Date.now()}`, name: `${original.name} (copy)`, headingText: `${original.headingText} (copy)` }
      const next = [...prev]
      next.splice(idx + 1, 0, copy)
      return next
    })
  }, [])

  const updateBlock = useCallback((id: string, updates: Partial<CanvasBlock>) => {
    setCanvasBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)))
  }, [])

  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    setCanvasBlocks((prev) => {
      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }, [])

  const moveBlockDirection = useCallback(
    (id: string, direction: "up" | "down") => {
      const idx = canvasBlocks.findIndex((b) => b.id === id)
      if (idx === -1) return
      const target = direction === "up" ? idx - 1 : idx + 1
      if (target < 0 || target >= canvasBlocks.length) return
      moveBlock(idx, target)
    },
    [canvasBlocks, moveBlock]
  )

  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    setDraggingBlockId(blockId)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", blockId)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverIndex(index)
  }

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault()
    const blockId = e.dataTransfer.getData("text/plain")
    if (blockId.startsWith("module-")) {
      const modId = blockId.replace("module-", "")
      const mod = mockModules.find((m) => m.id === modId)
      if (mod) addModuleToCanvas(mod)
    } else {
      const fromIndex = canvasBlocks.findIndex((b) => b.id === blockId)
      if (fromIndex !== -1 && fromIndex !== toIndex) moveBlock(fromIndex, toIndex)
    }
    setDragOverIndex(null)
    setDraggingBlockId(null)
  }

  /* Click a module block to edit it */
  const handleBlockClick = (blockId: string) => {
    setSelectedBlockId(blockId)
    setSelectedComponent(null)
    setSidebarMode("edit-module")
    setEditingTab("data")
  }

  const handleComponentClick = (blockId: string, component: EditableComponent) => {
    setSelectedBlockId(blockId)
    setSelectedComponent(component)
    setSidebarMode("edit-module")
    setEditingTab("data")
  }

  const exitEditMode = () => {
    setSelectedBlockId(null)
    setSelectedComponent(null)
    setSidebarMode("add-module")
  }

  /* ─── Sidebar flow actions ─── */
  const handleTileSelect = (tileId: string) => {
    setSelectedTileId(tileId)
    setSidebarStep("layouts")
  }

  const handleLayoutSelect = (layoutId: string) => {
    setSelectedLayoutId(layoutId)
    setSidebarStep("topic")
  }

  const handleAddModule = () => {
    const tile = activeTiles.find((t) => t.id === selectedTileId)
    const layout = moduleLayouts.find((l) => l.id === selectedLayoutId)
    if (tile && layout && topicKeyword.trim()) {
      addNewModuleToCanvas(tile.label, layout.name, topicKeyword.trim())
    }
    setSidebarStep("tiles")
    setSelectedTileId(null)
    setSelectedLayoutId(null)
    setTopicKeyword("")
  }

  const handleSidebarBack = () => {
    if (sidebarStep === "topic") {
      setSidebarStep("layouts")
      setSelectedLayoutId(null)
      setTopicKeyword("")
    } else if (sidebarStep === "layouts") {
      setSidebarStep("tiles")
      setSelectedTileId(null)
    }
  }

  /* ─── Editable component wrapper ─── */
  const EditableWrapper = ({
    blockId,
    component,
    children,
  }: {
    blockId: string
    component: EditableComponent
    children: React.ReactNode
  }) => {
    const isHovered =
      hoveredComponent?.blockId === blockId && hoveredComponent?.component === component
    const isSelected = selectedBlockId === blockId && selectedComponent === component
    return (
      <div
        className={`relative rounded transition-all cursor-pointer ${
          isSelected
            ? "outline-2 outline-dashed outline-primary outline-offset-2 bg-primary/[0.02]"
            : isHovered
              ? "outline-1 outline-dashed outline-muted-foreground/40 outline-offset-2"
              : ""
        }`}
        onMouseEnter={() => setHoveredComponent({ blockId, component })}
        onMouseLeave={() => setHoveredComponent(null)}
        onClick={(e) => {
          e.stopPropagation()
          handleComponentClick(blockId, component)
        }}
      >
        {children}
      </div>
    )
  }

  /* ─── Track editorial length choices ─── */
  const [bottomLineLength, setBottomLineLength] = useState<"short" | "medium" | "long">("short")
  const [whyItMattersLength, setWhyItMattersLength] = useState<"short" | "medium" | "long">("short")
  const [topicEditOpen, setTopicEditOpen] = useState(false)

  /* ─── Render Data editing tab ─── */
  const renderDataTab = () => {
    if (!selectedBlock) return null
    return (
      <div className="flex flex-col gap-4 pb-14">
        <p className="text-[10px] font-semibold text-foreground uppercase tracking-wider">Module Data Settings</p>

        {/* Topic / Keyword */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium">Topic / Keyword</Label>
          {!topicEditOpen ? (
            <div className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm">
              <span className="text-foreground truncate">{selectedBlock.topicPhrase || "No topic set"}</span>
              <button
                className="text-[10px] font-medium text-primary hover:underline shrink-0 ml-2"
                onClick={() => setTopicEditOpen(true)}
              >
                Change
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Input
                value={selectedBlock.topicPhrase}
                onChange={(e) => updateBlock(selectedBlock.id, { topicPhrase: e.target.value })}
                placeholder="Enter a Topic, Keyword or Phrase"
                className="text-sm h-8"
                autoFocus
              />
              <div className="flex flex-wrap gap-1">
                {suggestedTopics.slice(0, 5).map((t) => (
                  <button
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-background hover:bg-primary/5 hover:border-primary/30 transition-colors text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      updateBlock(selectedBlock.id, { topicPhrase: t })
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="text-xs h-7 self-end"
                onClick={() => setTopicEditOpen(false)}
              >
                Done
              </Button>
            </div>
          )}
        </div>

        {/* Tone */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium">Tone</Label>
          <Select
            value={selectedBlock.tone}
            onValueChange={(v) => updateBlock(selectedBlock.id, { tone: v })}
          >
            <SelectTrigger className="text-sm h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tones.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Alignment */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium">Alignment</Label>
          <div className="flex items-center gap-1">
            {(["left", "center", "right"] as const).map((align) => {
              const Icon = align === "left" ? AlignLeft : align === "center" ? AlignCenter : AlignRight
              return (
                <button
                  key={align}
                  className={`flex-1 flex items-center justify-center h-8 rounded-md border text-xs transition-colors ${
                    selectedBlock.alignment === align
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                  onClick={() => updateBlock(selectedBlock.id, { alignment: align })}
                >
                  <Icon className="size-3.5" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Extra Editorial */}
        <div className="border-t border-border pt-3 flex flex-col gap-3">
          <p className="text-[10px] font-semibold text-foreground uppercase tracking-wider">Extra Editorial</p>

          {/* Bottom Line */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Bottom Line</Label>
              <Switch
                checked={selectedBlock.bottomLine}
                onCheckedChange={(v) => updateBlock(selectedBlock.id, { bottomLine: v })}
              />
            </div>
            {selectedBlock.bottomLine && (
              <div className="flex items-center gap-1">
                {(["short", "medium", "long"] as const).map((len) => (
                  <button
                    key={len}
                    className={`px-2.5 py-1 text-[10px] font-medium rounded-full transition-colors capitalize ${
                      bottomLineLength === len
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    onClick={() => setBottomLineLength(len)}
                  >
                    {len}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Why It Matters */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Why It Matters</Label>
              <Switch
                checked={selectedBlock.whyItMatters}
                onCheckedChange={(v) => updateBlock(selectedBlock.id, { whyItMatters: v })}
              />
            </div>
            {selectedBlock.whyItMatters && (
              <div className="flex items-center gap-1">
                {(["short", "medium", "long"] as const).map((len) => (
                  <button
                    key={len}
                    className={`px-2.5 py-1 text-[10px] font-medium rounded-full transition-colors capitalize ${
                      whyItMattersLength === len
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    onClick={() => setWhyItMattersLength(len)}
                  >
                    {len}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Summary Prompt */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium">AI Summary Prompt</Label>
          <div className="flex items-center gap-2">
            <Input placeholder="e.g. Summarize in one sentence..." className="text-sm h-8" />
            <Button size="sm" variant="secondary" className="h-8 px-2 shrink-0">
              <Sparkles className="size-3" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  /* ─── Render Style editing tab ─── */
  const renderStyleTab = () => {
    if (!selectedBlock) return null
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium">Background Color</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={selectedBlock.bgColor}
              onChange={(e) => updateBlock(selectedBlock.id, { bgColor: e.target.value })}
              className="size-8 rounded border border-border cursor-pointer"
            />
            <Input
              value={selectedBlock.bgColor}
              onChange={(e) => updateBlock(selectedBlock.id, { bgColor: e.target.value })}
              className="text-sm h-8 font-mono"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium">Title Color</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={selectedBlock.titleColor}
              onChange={(e) => updateBlock(selectedBlock.id, { titleColor: e.target.value })}
              className="size-8 rounded border border-border cursor-pointer"
            />
            <Input
              value={selectedBlock.titleColor}
              onChange={(e) => updateBlock(selectedBlock.id, { titleColor: e.target.value })}
              className="text-sm h-8 font-mono"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium">Text Color</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={selectedBlock.textColor}
              onChange={(e) => updateBlock(selectedBlock.id, { textColor: e.target.value })}
              className="size-8 rounded border border-border cursor-pointer"
            />
            <Input
              value={selectedBlock.textColor}
              onChange={(e) => updateBlock(selectedBlock.id, { textColor: e.target.value })}
              className="text-sm h-8 font-mono"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium">Font Family</Label>
          <Select
            value={selectedBlock.fontFamily}
            onValueChange={(v) => updateBlock(selectedBlock.id, { fontFamily: v })}
          >
            <SelectTrigger className="text-sm h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sans-serif">Sans Serif</SelectItem>
              <SelectItem value="serif">Serif</SelectItem>
              <SelectItem value="monospace">Monospace</SelectItem>
              <SelectItem value="georgia">Georgia</SelectItem>
              <SelectItem value="arial">Arial</SelectItem>
              <SelectItem value="helvetica">Helvetica</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium">Justification</Label>
          <div className="flex items-center gap-1">
            {(["left", "center", "right"] as const).map((align) => {
              const Icon = align === "left" ? AlignLeft : align === "center" ? AlignCenter : AlignRight
              return (
                <button
                  key={align}
                  className={`flex-1 flex items-center justify-center h-8 rounded-md border text-xs transition-colors ${
                    selectedBlock.alignment === align
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                  onClick={() => updateBlock(selectedBlock.id, { alignment: align })}
                >
                  <Icon className="size-3.5" />
                </button>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-medium">Padding ({selectedBlock.padding}px)</Label>
          <Slider
            value={[selectedBlock.padding]}
            onValueChange={([v]) => updateBlock(selectedBlock.id, { padding: v })}
            min={8}
            max={40}
            step={4}
          />
        </div>
        <div className="border-t border-border pt-3 flex flex-col gap-3">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Include / Exclude</p>
          <div className="flex items-center justify-between">
            <Label className="text-xs">Image</Label>
            <Switch checked={selectedBlock.showImage} onCheckedChange={(v) => updateBlock(selectedBlock.id, { showImage: v })} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs">Title</Label>
            <Switch checked={selectedBlock.showTitle} onCheckedChange={(v) => updateBlock(selectedBlock.id, { showTitle: v })} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs">Text</Label>
            <Switch checked={selectedBlock.showText} onCheckedChange={(v) => updateBlock(selectedBlock.id, { showText: v })} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs">CTA Button</Label>
            <Switch checked={selectedBlock.showCta} onCheckedChange={(v) => updateBlock(selectedBlock.id, { showCta: v })} />
          </div>
          {selectedBlock.showCta && (
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">CTA Copy</Label>
              <Input
                value={selectedBlock.ctaCopy}
                onChange={(e) => updateBlock(selectedBlock.id, { ctaCopy: e.target.value })}
                className="text-sm h-8"
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  /* ─── Render Filters tab ─── */
  const renderFiltersTab = () => {
    if (!selectedBlock) return null
    return (
      <div className="flex flex-col gap-4">
        {/* Global Filter */}
        <div className="rounded-lg border border-border p-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Filter className="size-3.5 text-primary" />
              <Label className="text-xs font-semibold">Global Filter</Label>
            </div>
            <Switch checked={selectedBlock.globalFilter} onCheckedChange={(v) => updateBlock(selectedBlock.id, { globalFilter: v })} />
          </div>
        </div>

        {/* Auto-hide posts with */}
        <div className="rounded-lg border border-border p-3 flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <Ban className="size-3.5 text-muted-foreground" />
            <p className="text-xs font-semibold text-foreground">Auto hide posts with:</p>
          </div>
          <p className="text-[10px] text-muted-foreground">Select conditions under which posts will be hidden</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "filterNoImages", label: "No images" },
              { key: "filterNoSecureLinks", label: "No secure links" },
              { key: "filterNoDescription", label: "No description" },
              { key: "filterDuplicateDesc", label: "Duplicate description" },
              { key: "filterNoDates", label: "No dates" },
              { key: "filterDuplicateTitles", label: "Duplicate titles" },
            ].map((item) => (
              <div key={item.key} className="flex items-center gap-1.5">
                <Checkbox
                  id={item.key}
                  checked={selectedBlock[item.key as keyof CanvasBlock] as boolean}
                  onCheckedChange={(v) => updateBlock(selectedBlock.id, { [item.key]: v })}
                />
                <label htmlFor={item.key} className="text-[10px] text-foreground cursor-pointer">{item.label}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Clean title */}
        <div className="rounded-lg border border-border p-3 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Type className="size-3.5 text-muted-foreground" />
            <p className="text-xs font-semibold text-foreground">Clean title</p>
          </div>
          <p className="text-[10px] text-muted-foreground">Remove terms or website name from the post title</p>
          <div className="flex items-center justify-between">
            <Label className="text-[10px]">Enable auto-cleaner</Label>
            <Switch checked={selectedBlock.cleanTitleEnabled} onCheckedChange={(v) => updateBlock(selectedBlock.id, { cleanTitleEnabled: v })} />
          </div>
        </div>

        {/* Whitelist */}
        <div className="rounded-lg border border-border p-3 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <CheckSquare className="size-3.5 text-muted-foreground" />
            <p className="text-xs font-semibold text-foreground">Whitelist</p>
          </div>
          <p className="text-[10px] text-muted-foreground">Show only posts that contain your selected keywords</p>
          <Input
            placeholder="Add whitelist keyword"
            value={selectedBlock.whitelistKeywords}
            onChange={(e) => updateBlock(selectedBlock.id, { whitelistKeywords: e.target.value })}
            className="text-xs h-7"
          />
          <div className="flex flex-col gap-1">
            <p className="text-[10px] text-muted-foreground font-medium">Apply To</p>
            <div className="flex items-center gap-3">
              {[
                { key: "whitelistApplyTitle", label: "Title" },
                { key: "whitelistApplyDesc", label: "Description" },
                { key: "whitelistApplyLink", label: "Link" },
                { key: "whitelistApplyImage", label: "Image URL" },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-1">
                  <Checkbox
                    id={`wl-${item.key}`}
                    checked={selectedBlock[item.key as keyof CanvasBlock] as boolean}
                    onCheckedChange={(v) => updateBlock(selectedBlock.id, { [item.key]: v })}
                  />
                  <label htmlFor={`wl-${item.key}`} className="text-[10px] text-foreground cursor-pointer">{item.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blacklist */}
        <div className="rounded-lg border border-border p-3 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Shield className="size-3.5 text-muted-foreground" />
            <p className="text-xs font-semibold text-foreground">Blacklist</p>
          </div>
          <p className="text-[10px] text-muted-foreground">Hide posts that contain your selected keywords</p>
          <Input
            placeholder="Add blacklist keyword"
            value={selectedBlock.blacklistKeywords}
            onChange={(e) => updateBlock(selectedBlock.id, { blacklistKeywords: e.target.value })}
            className="text-xs h-7"
          />
          <div className="flex flex-col gap-1">
            <p className="text-[10px] text-muted-foreground font-medium">Apply To</p>
            <div className="flex items-center gap-3">
              {[
                { key: "blacklistApplyTitle", label: "Title" },
                { key: "blacklistApplyDesc", label: "Description" },
                { key: "blacklistApplyLink", label: "Link" },
                { key: "blacklistApplyImage", label: "Image URL" },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-1">
                  <Checkbox
                    id={`bl-${item.key}`}
                    checked={selectedBlock[item.key as keyof CanvasBlock] as boolean}
                    onCheckedChange={(v) => updateBlock(selectedBlock.id, { [item.key]: v })}
                  />
                  <label htmlFor={`bl-${item.key}`} className="text-[10px] text-foreground cursor-pointer">{item.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Auto-hide older posts */}
        <div className="rounded-lg border border-border p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-muted-foreground" />
              <p className="text-xs font-semibold text-foreground">Auto-hide older posts</p>
            </div>
            <Switch checked={selectedBlock.autoHideOlderPosts} onCheckedChange={(v) => updateBlock(selectedBlock.id, { autoHideOlderPosts: v })} />
          </div>
          {selectedBlock.autoHideOlderPosts && (
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <Label className="text-[10px] text-muted-foreground">Period</Label>
                <Select value={selectedBlock.autoHidePeriod} onValueChange={(v) => updateBlock(selectedBlock.id, { autoHidePeriod: v })}>
                  <SelectTrigger className="text-xs h-7 w-20"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-0.5">
                <Label className="text-[10px] text-muted-foreground">Older than</Label>
                <Input
                  type="number"
                  value={selectedBlock.autoHideOlderThan}
                  onChange={(e) => updateBlock(selectedBlock.id, { autoHideOlderThan: e.target.value })}
                  className="text-xs h-7 w-16"
                />
              </div>
            </div>
          )}
        </div>

        {/* Advanced rules */}
        <div className="rounded-lg border border-border p-3 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <Wrench className="size-3.5 text-muted-foreground" />
            <p className="text-xs font-semibold text-foreground">Advanced rules to modify posts</p>
          </div>
          <p className="text-[10px] text-muted-foreground">Apply rules to modify titles, descriptions, links, or hide posts</p>
          <Button variant="outline" size="sm" className="text-xs h-7 w-fit gap-1 text-primary border-primary/30 hover:bg-primary/5">
            <Plus className="size-3" />
            Add Rule
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* ─── Top Toolbar ─── */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card shrink-0">
        <div className="w-36" />

        {/* Center: Device toggle (icon-only) */}
        <div className="flex items-center rounded-lg bg-muted p-0.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`flex items-center justify-center size-8 rounded-md transition-colors ${
                    previewMode === "desktop"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setPreviewMode("desktop")}
                >
                  <Monitor className="size-4" />
                  <span className="sr-only">Desktop</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Desktop</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`flex items-center justify-center size-8 rounded-md transition-colors ${
                    previewMode === "mobile"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setPreviewMode("mobile")}
                >
                  <Smartphone className="size-4" />
                  <span className="sr-only">Mobile</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Mobile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <Undo2 className="size-4" />
                  <span className="sr-only">Undo</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Undo</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <Redo2 className="size-4" />
                  <span className="sr-only">Redo</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Redo</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="w-px h-5 bg-border mx-1" />
          <Button variant="ghost" size="sm" className="text-xs h-8 gap-1.5">
            <Save className="size-3.5" />
            Save
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs h-8 gap-1">
                <Eye className="size-3.5" />
                Preview
                <ChevronDownIcon className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Preview in Browser</DropdownMenuItem>
              <DropdownMenuItem>Send Test Email</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="text-xs h-8 gap-1.5">
                <Send className="size-3.5" />
                Send
                <ChevronDownIcon className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Send via Mailchimp</DropdownMenuItem>
              <DropdownMenuItem>Send via HubSpot</DropdownMenuItem>
              <DropdownMenuItem>Send via Klaviyo</DropdownMenuItem>
              <DropdownMenuItem className="border-t border-border mt-1 pt-1">Download HTML</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ─── Main Area ─── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ─── Left Sidebar ─── */}
        <div className="w-72 border-r border-border bg-card flex flex-col shrink-0">
          {sidebarMode === "add-module" ? (
            <>
              {/* Tab header */}
              <div className="p-2.5 border-b border-border">
                <div className="flex items-center rounded-lg bg-muted p-0.5">
                  {(["feeds", "insights", "editorial"] as const).map((tab) => (
                    <button
                      key={tab}
                      className={`flex-1 px-2 py-1.5 text-[11px] font-medium rounded-md transition-colors capitalize ${
                        activeTab === tab
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => {
                        setActiveTab(tab)
                        setSidebarStep("tiles")
                        setSelectedTileId(null)
                        setSelectedLayoutId(null)
                        setTopicKeyword("")
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <ScrollArea className="flex-1">
                {/* ── Step: Tiles ── */}
                {sidebarStep === "tiles" && (
                  <div className="p-3 flex flex-col gap-1.5">
                    <p className="text-[10px] font-semibold text-foreground uppercase tracking-wider px-1 mb-1">
                      Select a module type
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {activeTiles.map((tile) => {
                        const TileIcon = tile.icon
                        return (
                          <button
                            key={tile.id}
                            className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-background p-3 hover:border-primary/40 hover:bg-primary/[0.03] hover:shadow-sm transition-all"
                            onClick={() => handleTileSelect(tile.id)}
                          >
                            <TileIcon className="size-4 text-muted-foreground" />
                            <span className="text-[11px] font-medium text-foreground">{tile.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* ── Step: Layouts ── */}
                {sidebarStep === "layouts" && (
                  <div className="p-3 flex flex-col gap-2">
                    <button
                      className="flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary transition-colors self-start"
                      onClick={handleSidebarBack}
                    >
                      <ChevronLeft className="size-3.5" />
                      Back
                    </button>
                    <p className="text-xs font-semibold text-foreground px-1">
                      Choose a Layout
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {compatibleLayouts.map((layout) => (
                        <button
                          key={layout.id}
                          className={`flex flex-col rounded-lg border bg-background overflow-hidden hover:border-primary/40 hover:shadow-sm transition-all ${
                            selectedLayoutId === layout.id
                              ? "border-primary ring-1 ring-primary/30"
                              : "border-border"
                          }`}
                          onClick={() => handleLayoutSelect(layout.id)}
                        >
                          <div className="w-full aspect-[4/3] border-b border-border bg-muted/30 flex items-center justify-center p-2">
                            <LayoutWireframe layout={layout} />
                          </div>
                          <div className="px-2 py-1.5">
                            <span className="text-[10px] font-medium text-foreground leading-tight line-clamp-1">
                              {layout.name}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step: Topic ── */}
                {sidebarStep === "topic" && (
                  <div className="p-3 flex flex-col gap-3">
                    <button
                      className="flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary transition-colors self-start"
                      onClick={handleSidebarBack}
                    >
                      <ChevronLeft className="size-3.5" />
                      Back
                    </button>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">
                        What topic or keyword?
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        Give the AI context so it can generate relevant content for this module.
                      </p>
                    </div>
                    <Input
                      placeholder="Enter a Topic, Keyword or Phrase"
                      value={topicKeyword}
                      onChange={(e) => setTopicKeyword(e.target.value)}
                      className="text-xs h-8"
                    />
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-1.5">Suggested</p>
                      <div className="flex flex-wrap gap-1">
                        {suggestedTopics.map((t) => (
                          <button
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-background hover:bg-primary/5 hover:border-primary/30 transition-colors text-muted-foreground hover:text-foreground"
                            onClick={() => setTopicKeyword(t)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full text-xs h-8 gap-1.5 mt-1"
                      disabled={!topicKeyword.trim()}
                      onClick={handleAddModule}
                    >
                      <Plus className="size-3.5" />
                      Add Module to Email
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </>
          ) : (
            /* ─── Edit Module Mode ─── */
            <>
              <div className="p-2.5 border-b border-border flex flex-col gap-2">
                <button
                  className="flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary transition-colors self-start"
                  onClick={exitEditMode}
                >
                  <ChevronLeft className="size-3.5" />
                  Modules
                </button>
                <div className="flex items-center rounded-lg bg-muted p-0.5">
                  {(["data", "style", "filters"] as const).map((tab) => {
                    const TabIcon = tab === "data" ? SlidersHorizontal : tab === "style" ? Palette : Filter
                    return (
                      <button
                        key={tab}
                        className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-[11px] font-medium rounded-md transition-colors capitalize ${
                          editingTab === tab
                            ? "bg-card text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() => setEditingTab(tab)}
                      >
                        <TabIcon className="size-3" />
                        {tab}
                      </button>
                    )
                  })}
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-3">
                  {editingTab === "data" && renderDataTab()}
                  {editingTab === "style" && renderStyleTab()}
                  {editingTab === "filters" && renderFiltersTab()}
                </div>
              </ScrollArea>
              {editingTab === "data" && (
                <div className="p-2.5 border-t border-border bg-card shrink-0">
                  <Button size="sm" className="w-full text-xs h-8 gap-1.5">
                    <Sparkles className="size-3.5" />
                    Update Module
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* ─── Center Canvas ─── */}
        <div
          className="flex-1 bg-muted/30 overflow-auto"
          onClick={() => {
            exitEditMode()
          }}
        >
          <div className="flex justify-center py-8 px-16">
            <div className="relative">
              {/* The email template */}
              <div
                className={`bg-card rounded-xl shadow-lg border border-border transition-all ${
                  previewMode === "desktop" ? "w-[650px]" : "w-[375px]"
                }`}
              >
                {/* Email Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                      M
                    </div>
                    <span className="text-sm font-semibold text-foreground">ModularMail</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground">Your Weekly Digest</h2>
                  <p className="text-xs text-muted-foreground mt-1">Curated content just for you</p>
                </div>

                {/* Canvas Blocks */}
                <div
                  className="p-4 min-h-[300px]"
                  onDragOver={(e) => {
                    e.preventDefault()
                    if (canvasBlocks.length === 0) setDragOverIndex(0)
                  }}
                  onDrop={(e) => {
                    if (canvasBlocks.length === 0) handleDrop(e, 0)
                  }}
                >
                  {canvasBlocks.length === 0 ? (
                    <div
                      className={`flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl transition-colors ${
                        dragOverIndex === 0 ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <Blocks className="size-10 text-muted-foreground/30 mb-3" />
                      <p className="text-sm font-medium text-foreground">Drop modules here</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Select a module type from the left panel to build your email
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      {canvasBlocks.map((block, index) => {
                        const isModuleHovered = hoveredBlockId === block.id
                        const isModuleSelected = selectedBlockId === block.id

                        return (
                          <div key={block.id} onClick={(e) => e.stopPropagation()}>
                            {/* Drop indicator */}
                            <div
                              className={`h-1 rounded-full mx-2 transition-colors mb-1 ${
                                dragOverIndex === index ? "bg-primary" : "bg-transparent"
                              }`}
                              onDragOver={(e) => handleDragOver(e, index)}
                              onDrop={(e) => handleDrop(e, index)}
                            />

                            {/* Module Block with icon strip positioned absolutely outside */}
                            <div className="relative">
                              {/* Module content area */}
                              <div
                                className={`flex-1 relative rounded-lg transition-all cursor-pointer ${
                                  draggingBlockId === block.id ? "opacity-40" : ""
                                } ${
                                  isModuleSelected
                                    ? "ring-[2.5px] ring-primary shadow-sm"
                                    : isModuleHovered
                                      ? "ring-[2.5px] ring-primary/50"
                                      : "ring-1 ring-transparent hover:ring-border"
                                }`}
                                onMouseEnter={() => setHoveredBlockId(block.id)}
                                onMouseLeave={() => setHoveredBlockId(null)}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleBlockClick(block.id)
                                }}
                                style={{ padding: `${block.padding}px` }}
                              >
                                {/* Module label: tile name + topic phrase as blue tag cloud (top right, above blue line) */}
                                {(isModuleHovered || isModuleSelected) && (
                                  <div className="absolute -top-7 right-0 flex items-center gap-1 z-10">
                                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary-foreground bg-primary rounded-full px-2.5 py-0.5 shadow-sm">
                                      {block.tileLabel}
                                      {block.topicPhrase && (
                                        <span className="text-primary-foreground/80 font-normal">&middot; {block.topicPhrase}</span>
                                      )}
                                    </span>
                                  </div>
                                )}

                                <div className={`text-${block.alignment}`}>
                                  {block.showTitle && (
                                    <EditableWrapper blockId={block.id} component="heading">
                                      <h3 className="text-sm font-semibold text-foreground mb-1 py-1">
                                        {block.headingText}
                                      </h3>
                                    </EditableWrapper>
                                  )}

                                  {block.showImage && (
                                    <EditableWrapper blockId={block.id} component="image">
                                      <div className="w-full h-32 rounded-md bg-muted/50 border border-border flex items-center justify-center my-2">
                                        <div className="flex flex-col items-center gap-1 text-muted-foreground/40">
                                          <Image className="size-5" />
                                          <span className="text-[10px]">Featured Image</span>
                                        </div>
                                      </div>
                                    </EditableWrapper>
                                  )}

                                  {block.showText && (
                                    <EditableWrapper blockId={block.id} component="body">
                                      <p className="text-xs text-muted-foreground leading-relaxed py-1">
                                        {block.bodyText}
                                      </p>
                                    </EditableWrapper>
                                  )}

                                  {block.bottomLine && (
                                    <EditableWrapper blockId={block.id} component="bottomLine">
                                      <div className="mt-3 rounded-md bg-primary/5 border border-primary/10 p-2.5">
                                        <p className="text-[10px] font-semibold text-foreground flex items-center gap-1">
                                          <Target className="size-3 text-primary" />
                                          Bottom Line
                                        </p>
                                        <p className="text-[10px] text-muted-foreground mt-1">
                                          Key insight summary generated by AI for this content block.
                                        </p>
                                      </div>
                                    </EditableWrapper>
                                  )}

                                  {block.whyItMatters && (
                                    <EditableWrapper blockId={block.id} component="whyItMatters">
                                      <div className="mt-2 rounded-md bg-muted/50 border border-border p-2.5">
                                        <p className="text-[10px] font-semibold text-foreground flex items-center gap-1">
                                          <ListChecks className="size-3 text-primary" />
                                          Why It Matters
                                        </p>
                                        <p className="text-[10px] text-muted-foreground mt-1">
                                          Context on why this content is relevant to your audience.
                                        </p>
                                      </div>
                                    </EditableWrapper>
                                  )}

                                  {block.showCta && (
                                    <div className="mt-3">
                                      <span className="inline-block text-[10px] font-semibold text-primary border border-primary/20 rounded px-3 py-1.5 bg-primary/5">
                                        {block.ctaCopy}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Stacked action icons (outside template, in the grey zone) */}
                              {(isModuleHovered || isModuleSelected) && (
                                <div
                                  className="absolute -right-11 top-0 flex flex-col items-center gap-0.5"
                                  onMouseEnter={() => setHoveredBlockId(block.id)}
                                  onMouseLeave={() => setHoveredBlockId(null)}
                                >
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          className="size-7 flex items-center justify-center rounded-md bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm"
                                          onClick={(e) => { e.stopPropagation() }}
                                        >
                                          <Save className="size-3.5" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="right">Save</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          className="size-7 flex items-center justify-center rounded-md bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            duplicateBlock(block.id)
                                          }}
                                        >
                                          <Copy className="size-3.5" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="right">Duplicate</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          className="size-7 flex items-center justify-center rounded-md bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            deleteBlock(block.id)
                                          }}
                                        >
                                          <Trash2 className="size-3.5" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="right">Delete</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          className="size-7 flex items-center justify-center rounded-md bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleBlockClick(block.id)
                                          }}
                                        >
                                          <Pencil className="size-3.5" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="right">Edit</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          className="size-7 flex items-center justify-center rounded-md bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm"
                                          onClick={(e) => { e.stopPropagation() }}
                                        >
                                          <Code className="size-3.5" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="right">HTML</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          className="size-7 flex items-center justify-center rounded-md bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm cursor-grab active:cursor-grabbing"
                                          draggable
                                          onDragStart={(e) => handleDragStart(e, block.id)}
                                        >
                                          <GripVertical className="size-3.5" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="right">Move</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          className="size-7 flex items-center justify-center rounded-md bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm disabled:opacity-30"
                                          disabled={index === 0}
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            moveBlockDirection(block.id, "up")
                                          }}
                                        >
                                          <ChevronUp className="size-3.5" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="right">Move Up</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          className="size-7 flex items-center justify-center rounded-md bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm disabled:opacity-30"
                                          disabled={index === canvasBlocks.length - 1}
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            moveBlockDirection(block.id, "down")
                                          }}
                                        >
                                          <ChevronDown className="size-3.5" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="right">Move Down</TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                      {/* Final drop zone */}
                      <div
                        className={`h-1 rounded-full mx-2 transition-colors ${
                          dragOverIndex === canvasBlocks.length ? "bg-primary" : "bg-transparent"
                        }`}
                        onDragOver={(e) => handleDragOver(e, canvasBlocks.length)}
                        onDrop={(e) => handleDrop(e, canvasBlocks.length)}
                      />
                    </div>
                  )}
                </div>

                {/* Email Footer */}
                <div className="p-6 border-t border-border text-center">
                  <p className="text-[10px] text-muted-foreground">
                    Sent via ModularMail &middot; Unsubscribe &middot; Manage Preferences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
