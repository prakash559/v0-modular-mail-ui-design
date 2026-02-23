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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
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
}

type SidebarStep = "tiles" | "layouts" | "topic"

export function EmailEditor() {
  const [canvasBlocks, setCanvasBlocks] = useState<CanvasBlock[]>([
    {
      id: "block-1",
      moduleId: "mod-1",
      name: "Business Analytics Trends",
      source: "Google News",
      tone: "Professional",
      bottomLine: true,
      whyItMatters: false,
      alignment: "left",
      colorStyle: "primary",
      padding: 16,
      headingText: "Business Analytics Trends",
      bodyText:
        "Top business analytics trends reshaping how companies make data-driven decisions in 2026. AI-powered dashboards and predictive models lead the charge.",
    },
    {
      id: "block-2",
      moduleId: "mod-2",
      name: "EdTech Weekly Roundup",
      source: "Reddit",
      tone: "Conversational",
      bottomLine: false,
      whyItMatters: true,
      alignment: "left",
      colorStyle: "neutral",
      padding: 16,
      headingText: "EdTech Weekly Roundup",
      bodyText:
        "The most discussed EdTech topics this week from r/edtech and r/education, including new classroom tools and curriculum innovations.",
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
  const [activeTab, setActiveTab] = useState<"feeds" | "insights" | "editorial">("feeds")
  const [sidebarStep, setSidebarStep] = useState<SidebarStep>("tiles")
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null)
  const [selectedLayoutId, setSelectedLayoutId] = useState<string | null>(null)
  const [topicKeyword, setTopicKeyword] = useState("")

  const selectedBlock = canvasBlocks.find((b) => b.id === selectedBlockId)
  const showRightPanel = selectedBlockId !== null && selectedComponent !== null

  const activeTiles =
    activeTab === "feeds" ? feedTiles : activeTab === "insights" ? insightTiles : editorialTiles

  /* Compatible layouts for selected module type */
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
    "product-led growth",
    "Web3 adoption",
    "climate tech",
    "future of work",
  ]

  /* ─── Canvas helpers ─── */
  const addModuleToCanvas = useCallback((mod: (typeof mockModules)[0]) => {
    const newBlock: CanvasBlock = {
      id: `block-${Date.now()}`,
      moduleId: mod.id,
      name: mod.name,
      source: mod.source,
      tone: mod.tone,
      bottomLine: mod.commentary.bottomLine,
      whyItMatters: mod.commentary.whyItMatters,
      alignment: "left",
      colorStyle: "neutral",
      padding: 16,
      headingText: mod.name,
      bodyText: mod.summary,
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
        tone: "Professional",
        bottomLine: activeTab !== "editorial",
        whyItMatters: activeTab === "insights",
        alignment: "left",
        colorStyle: "neutral",
        padding: 16,
        headingText: `${tileLabel}: ${topic}`,
        bodyText: `AI-generated ${activeTab} content about "${topic}" using ${layoutName} layout. This content will be populated by ModularMail's AI engine.`,
      }
      setCanvasBlocks((prev) => [...prev, newBlock])
    },
    [activeTab]
  )

  const deleteBlock = useCallback((id: string) => {
    setCanvasBlocks((prev) => prev.filter((b) => b.id !== id))
    setSelectedBlockId((prev) => {
      if (prev === id) {
        setSelectedComponent(null)
        return null
      }
      return prev
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

  const handleComponentClick = (blockId: string, component: EditableComponent) => {
    setSelectedBlockId(blockId)
    setSelectedComponent(component)
  }

  const closeRightPanel = () => {
    setSelectedBlockId(null)
    setSelectedComponent(null)
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
    // Reset
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

  /* ─── Component labels & icons ─── */
  const componentMeta: Record<EditableComponent, { label: string; icon: React.ReactNode }> = {
    heading: { label: "Heading", icon: <Type className="size-3.5" /> },
    body: { label: "Body Text", icon: <AlignLeft className="size-3.5" /> },
    image: { label: "Image", icon: <Image className="size-3.5" /> },
    bottomLine: { label: "Bottom Line", icon: <Target className="size-3.5" /> },
    whyItMatters: { label: "Why It Matters", icon: <ListChecks className="size-3.5" /> },
  }

  /* ─── Module floating toolbar ─── */
  const ModuleToolbar = ({ block, index }: { block: CanvasBlock; index: number }) => (
    <div className="absolute -top-3.5 right-2 flex items-center gap-0.5 bg-card rounded-md border border-border shadow-md px-1 py-0.5 z-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="size-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Save className="size-3" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">Save Block</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="size-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                deleteBlock(block.id)
              }}
            >
              <Trash2 className="size-3" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">Delete</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="size-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                handleComponentClick(block.id, "heading")
              }}
            >
              <Pencil className="size-3" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">Edit</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="size-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={(e) => handleDragStart(e, block.id)}
            >
              <GripVertical className="size-3" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">Move</TooltipContent>
        </Tooltip>
        <div className="flex flex-col -my-0.5">
          <button
            className="size-4 flex items-center justify-center rounded text-muted-foreground hover:text-foreground disabled:opacity-30"
            disabled={index === 0}
            onClick={(e) => {
              e.stopPropagation()
              moveBlockDirection(block.id, "up")
            }}
          >
            <ChevronUp className="size-2.5" />
          </button>
          <button
            className="size-4 flex items-center justify-center rounded text-muted-foreground hover:text-foreground disabled:opacity-30"
            disabled={index === canvasBlocks.length - 1}
            onClick={(e) => {
              e.stopPropagation()
              moveBlockDirection(block.id, "down")
            }}
          >
            <ChevronDown className="size-2.5" />
          </button>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="size-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Code className="size-3" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">HTML</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )

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

  /* ─── Right Panel Content ─── */
  const renderRightPanelContent = () => {
    if (!selectedBlock || !selectedComponent) return null

    switch (selectedComponent) {
      case "heading":
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Heading Text</Label>
              <Input
                value={selectedBlock.headingText}
                onChange={(e) => updateBlock(selectedBlock.id, { headingText: e.target.value })}
                className="text-sm h-8"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Text Alignment</Label>
              <div className="flex items-center gap-1">
                {(["left", "center", "right"] as const).map((align) => {
                  const Icon =
                    align === "left" ? AlignLeft : align === "center" ? AlignCenter : AlignRight
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
              <Label className="text-xs">Override Tone</Label>
              <Select
                value={selectedBlock.tone}
                onValueChange={(v) => updateBlock(selectedBlock.id, { tone: v })}
              >
                <SelectTrigger className="text-sm h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "body":
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Body Text</Label>
              <textarea
                value={selectedBlock.bodyText}
                onChange={(e) => updateBlock(selectedBlock.id, { bodyText: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px] resize-y focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Text Alignment</Label>
              <div className="flex items-center gap-1">
                {(["left", "center", "right"] as const).map((align) => {
                  const Icon =
                    align === "left" ? AlignLeft : align === "center" ? AlignCenter : AlignRight
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
              <Label className="text-xs">Padding ({selectedBlock.padding}px)</Label>
              <Slider
                value={[selectedBlock.padding]}
                onValueChange={([v]) => updateBlock(selectedBlock.id, { padding: v })}
                min={8}
                max={40}
                step={4}
              />
            </div>
          </div>
        )

      case "image":
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Image Source</Label>
              <Select defaultValue="ai">
                <SelectTrigger className="text-sm h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">AI Generated</SelectItem>
                  <SelectItem value="source">From Source</SelectItem>
                  <SelectItem value="upload">Upload</SelectItem>
                  <SelectItem value="url">Image URL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 flex flex-col items-center gap-2">
              <Image className="size-6 text-muted-foreground/50" />
              <p className="text-[11px] text-muted-foreground">Click to upload or drag an image</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Alt Text</Label>
              <Input placeholder="Describe the image..." className="text-sm h-8" />
            </div>
          </div>
        )

      case "bottomLine":
        return (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Show Bottom Line</Label>
              <Switch
                checked={selectedBlock.bottomLine}
                onCheckedChange={(v) => updateBlock(selectedBlock.id, { bottomLine: v })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Bottom Line Style</Label>
              <div className="flex items-center gap-1">
                {(["primary", "secondary", "neutral"] as const).map((style) => (
                  <button
                    key={style}
                    className={`flex-1 h-8 rounded-md border text-[10px] font-medium capitalize transition-colors ${
                      selectedBlock.colorStyle === style
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                    onClick={() => updateBlock(selectedBlock.id, { colorStyle: style })}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">AI Summary Prompt</Label>
              <div className="flex items-center gap-2">
                <Input placeholder="e.g. Summarize in one sentence..." className="text-sm h-8" />
                <Button size="sm" variant="secondary" className="h-8 px-2 shrink-0">
                  <Sparkles className="size-3" />
                </Button>
              </div>
            </div>
          </div>
        )

      case "whyItMatters":
        return (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Show Why It Matters</Label>
              <Switch
                checked={selectedBlock.whyItMatters}
                onCheckedChange={(v) => updateBlock(selectedBlock.id, { whyItMatters: v })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Context Angle</Label>
              <Select defaultValue="relevance">
                <SelectTrigger className="text-sm h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Audience Relevance</SelectItem>
                  <SelectItem value="trend">Industry Trend</SelectItem>
                  <SelectItem value="action">Call to Action</SelectItem>
                  <SelectItem value="custom">Custom Prompt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">AI Context Prompt</Label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="e.g. Explain impact on educators..."
                  className="text-sm h-8"
                />
                <Button size="sm" variant="secondary" className="h-8 px-2 shrink-0">
                  <Sparkles className="size-3" />
                </Button>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* ─── Top Toolbar ─── */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card shrink-0">
        {/* Left: empty spacer */}
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
              <DropdownMenuItem className="border-t border-border mt-1 pt-1">
                Download HTML
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ─── Main Area ─── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ─── Left Sidebar ─── */}
        <div className="w-64 border-r border-border bg-card flex flex-col shrink-0">
          {/* Tab header */}
          <div className="p-2 border-b border-border">
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
              <div className="p-2.5 flex flex-col gap-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-1 mb-1">
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
                        <span className="text-[11px] font-medium text-foreground">
                          {tile.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ── Step: Layouts ── */}
            {sidebarStep === "layouts" && (
              <div className="p-2.5 flex flex-col gap-2">
                <button
                  className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors self-start"
                  onClick={handleSidebarBack}
                >
                  <ChevronLeft className="size-3" />
                  Back
                </button>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-1">
                  Choose a layout
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
                      <div className="w-full h-16 bg-muted/40 flex items-center justify-center p-1">
                        <LayoutWireframe layout={layout} />
                      </div>
                      <div className="p-1.5">
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
              <div className="p-2.5 flex flex-col gap-3">
                <button
                  className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors self-start"
                  onClick={handleSidebarBack}
                >
                  <ChevronLeft className="size-3" />
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
                    {suggestedTopics.slice(0, 8).map((t) => (
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
        </div>

        {/* ─── Center Canvas ─── */}
        <div
          className="flex-1 bg-muted/30 overflow-auto"
          onClick={() => {
            setSelectedBlockId(null)
            setSelectedComponent(null)
          }}
        >
          <div className="flex justify-center py-8 px-4">
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
                <p className="text-xs text-muted-foreground mt-1">
                  Curated content just for you
                </p>
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

                          {/* Module Block */}
                          <div
                            className={`relative rounded-lg transition-all ${
                              draggingBlockId === block.id ? "opacity-40" : ""
                            } ${
                              isModuleSelected
                                ? "ring-2 ring-primary shadow-sm"
                                : isModuleHovered
                                  ? "ring-2 ring-primary/50"
                                  : "ring-1 ring-transparent hover:ring-border"
                            }`}
                            onMouseEnter={() => setHoveredBlockId(block.id)}
                            onMouseLeave={() => setHoveredBlockId(null)}
                            style={{ padding: `${block.padding}px` }}
                          >
                            {/* Floating toolbar on hover */}
                            {(isModuleHovered || isModuleSelected) && (
                              <ModuleToolbar block={block} index={index} />
                            )}

                            {/* Module label */}
                            {(isModuleHovered || isModuleSelected) && (
                              <div className="absolute -top-3.5 left-2 z-10">
                                <Badge
                                  variant="secondary"
                                  className="text-[9px] bg-primary/10 text-primary border-0 font-medium"
                                >
                                  {block.source}
                                </Badge>
                              </div>
                            )}

                            <div className={`text-${block.alignment}`}>
                              <EditableWrapper blockId={block.id} component="heading">
                                <h3 className="text-sm font-semibold text-foreground mb-1 py-1">
                                  {block.headingText}
                                </h3>
                              </EditableWrapper>

                              <EditableWrapper blockId={block.id} component="image">
                                <div className="w-full h-32 rounded-md bg-muted/50 border border-border flex items-center justify-center my-2">
                                  <div className="flex flex-col items-center gap-1 text-muted-foreground/40">
                                    <Image className="size-5" />
                                    <span className="text-[10px]">Featured Image</span>
                                  </div>
                                </div>
                              </EditableWrapper>

                              <EditableWrapper blockId={block.id} component="body">
                                <p className="text-xs text-muted-foreground leading-relaxed py-1">
                                  {block.bodyText}
                                </p>
                              </EditableWrapper>

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
                            </div>
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

        {/* ─── Right Panel - Contextual Editor ─── */}
        {showRightPanel && selectedBlock && selectedComponent && (
          <div className="w-72 border-l border-border bg-card flex flex-col shrink-0 animate-in slide-in-from-right-2 duration-200">
            <div className="p-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                {componentMeta[selectedComponent].icon}
                <p className="text-xs font-semibold text-foreground">
                  {componentMeta[selectedComponent].label}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="size-6" onClick={closeRightPanel}>
                <X className="size-3.5" />
                <span className="sr-only">Close panel</span>
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-3">{renderRightPanelContent()}</div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  )
}
