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
  Minus,
  Bold,
  Italic,
  Underline,
  Rss,
  Music,
  Clapperboard,
  Camera,
  AtSign,
  type LucideIcon,
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

/* ─── Feed Data Source definitions (company-level) ─── */
type FeedSource = { id: string; label: string; icon: LucideIcon; category: string }

const feedSources: FeedSource[] = [
  { id: "youtube", label: "YouTube", icon: Play, category: "Social" },
  { id: "instagram", label: "Instagram", icon: Camera, category: "Social" },
  { id: "tiktok", label: "TikTok", icon: Clapperboard, category: "Social" },
  { id: "twitter", label: "X / Twitter", icon: AtSign, category: "Social" },
  { id: "linkedin", label: "LinkedIn", icon: Briefcase, category: "Social" },
  { id: "threads", label: "Threads", icon: Hash, category: "Social" },
  { id: "reddit", label: "Reddit", icon: MessageCircle, category: "Social" },
  { id: "facebook", label: "Facebook", icon: Globe, category: "Social" },
  { id: "bluesky", label: "Bluesky", icon: Globe, category: "Social" },
  { id: "pinterest", label: "Pinterest", icon: Image, category: "Social" },
  { id: "tumblr", label: "Tumblr", icon: PenLine, category: "Social" },
  { id: "google-news", label: "Google News", icon: Newspaper, category: "News" },
  { id: "bbc", label: "BBC News", icon: Newspaper, category: "News" },
  { id: "cnn", label: "CNN", icon: Newspaper, category: "News" },
  { id: "reuters", label: "Reuters", icon: Newspaper, category: "News" },
  { id: "nytimes", label: "NYTimes", icon: Newspaper, category: "News" },
  { id: "guardian", label: "The Guardian", icon: Newspaper, category: "News" },
  { id: "forbes", label: "Forbes", icon: TrendingUp, category: "News" },
  { id: "ap-news", label: "AP News", icon: Newspaper, category: "News" },
  { id: "yahoo-news", label: "Yahoo News", icon: Globe, category: "News" },
  { id: "axios", label: "Axios", icon: Zap, category: "News" },
  { id: "huffpost", label: "HuffPost", icon: Newspaper, category: "News" },
  { id: "medium", label: "Medium", icon: FileText, category: "Publishing" },
  { id: "substack", label: "Substack", icon: BookOpen, category: "Publishing" },
  { id: "wordpress", label: "WordPress", icon: Globe, category: "Publishing" },
  { id: "vimeo", label: "Vimeo", icon: Play, category: "Video" },
  { id: "dailymotion", label: "Dailymotion", icon: Play, category: "Video" },
  { id: "rumble", label: "Rumble", icon: Play, category: "Video" },
  { id: "spotify", label: "Spotify", icon: Music, category: "Podcast" },
  { id: "apple-podcasts", label: "Apple Podcasts", icon: Headphones, category: "Podcast" },
  { id: "techcrunch", label: "TechCrunch", icon: Rocket, category: "Technology" },
  { id: "the-verge", label: "The Verge", icon: Compass, category: "Technology" },
  { id: "wired", label: "Wired", icon: Zap, category: "Technology" },
  { id: "ars-technica", label: "Ars Technica", icon: Code, category: "Technology" },
  { id: "fast-company", label: "Fast Company", icon: TrendingUp, category: "Business" },
  { id: "economist", label: "The Economist", icon: BarChart3, category: "Business" },
  { id: "bloomberg", label: "Bloomberg", icon: BarChart3, category: "Business" },
  { id: "webpage", label: "Any Webpage", icon: Globe, category: "Other" },
  { id: "rss", label: "RSS Feed", icon: Rss, category: "Other" },
]

const feedCategories = ["All", ...Array.from(new Set(feedSources.map((s) => s.category)))]

/* ─── Tile definitions (editorial + saved) ─── */
const feedTiles = feedSources.map((s) => ({ id: s.id, label: s.label, icon: s.icon }))

const editorialTiles = [
  { id: "intro-tips", label: "Intro Tips", icon: Lightbulb },
  { id: "insight", label: "Insight", icon: Sparkles },
  { id: "breakdown", label: "Breakdown", icon: TrendingUp },
  { id: "perspectives", label: "Perspectives", icon: Compass },
  { id: "explainer", label: "Explainer", icon: Zap },
  { id: "takeaways", label: "Takeaways", icon: List },
  { id: "trends", label: "Trends", icon: Rocket },
  { id: "checklist", label: "Checklist", icon: CheckSquare },
  { id: "outro", label: "Outro", icon: PenLine },
]

const savedTiles: typeof feedTiles = []

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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [insertAtIndex, setInsertAtIndex] = useState<number | null>(null)
  const [hoveredGapIndex, setHoveredGapIndex] = useState<number | null>(null)
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("add-module")
  const [activeTab, setActiveTab] = useState<"feeds" | "editorial" | "saved">("feeds")
  const [sidebarStep, setSidebarStep] = useState<SidebarStep>("tiles")
  const [selectedTileId, setSelectedTileId] = useState<string | null>(null)
  const [selectedLayoutId, setSelectedLayoutId] = useState<string | null>(null)
  const [topicKeyword, setTopicKeyword] = useState("")
  const [editingTab, setEditingTab] = useState<EditingTab>("data")
  const [feedSearch, setFeedSearch] = useState("")
  const [feedCategory, setFeedCategory] = useState("All")

  const selectedBlock = canvasBlocks.find((b) => b.id === selectedBlockId)

  const activeTiles =
    activeTab === "feeds" ? feedTiles : activeTab === "editorial" ? editorialTiles : savedTiles

  const isEditorialTab = activeTab === "editorial"

  const compatibleLayouts = isEditorialTab
    ? [] // editorial uses short/medium/long copy, not standard layouts
    : moduleLayouts.filter((l) =>
        l.compatibleModules.includes("feeds")
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
        source: activeTab === "feeds" ? "Feed" : activeTab === "editorial" ? "Editorial" : "Saved",
        topicPhrase: topic,
        tileLabel,
        headingText: `${tileLabel}: ${topic}`,
        bodyText: `AI-generated ${activeTab} content about "${topic}" using ${layoutName} layout. This content will be populated by ModularMail's AI engine.`,
        ...defaultBlockFields,
        bottomLine: activeTab !== "editorial",
        whyItMatters: activeTab === "editorial",
      }
      setCanvasBlocks((prev) => {
        if (insertAtIndex !== null && insertAtIndex >= 0 && insertAtIndex <= prev.length) {
          const next = [...prev]
          next.splice(insertAtIndex, 0, newBlock)
          return next
        }
        return [...prev, newBlock]
      })
      setSidebarOpen(false)
      setInsertAtIndex(null)
    },
    [activeTab, insertAtIndex]
  )

  const deleteBlock = useCallback((id: string) => {
    setCanvasBlocks((prev) => prev.filter((b) => b.id !== id))
    setSelectedBlockId((prev) => {
      if (prev === id) {
        setSidebarMode("add-module")
        setSidebarOpen(false)
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
    setSidebarOpen(true)
    setInsertAtIndex(null)
    setEditingTab("data")
  }

  const handleComponentClick = (blockId: string, component: EditableComponent) => {
    setSelectedBlockId(blockId)
    setSelectedComponent(component)
    setSidebarMode("edit-module")
    setSidebarOpen(true)
    setInsertAtIndex(null)
    setEditingTab("data")
  }

  const exitEditMode = () => {
    setSelectedBlockId(null)
    setSelectedComponent(null)
    setSidebarMode("add-module")
    setSidebarOpen(false)
    setInsertAtIndex(null)
  }

  /* ─── Sidebar flow actions ─── */
  const handleTileSelect = (tileId: string) => {
    setSelectedTileId(tileId)
    setSidebarStep("topic")
  }

  const handleTopicContinue = () => {
    if (!topicKeyword.trim()) return
    if (isEditorialTab) {
      // Editorial skips standard layouts -- go to editorial copy length
      setSidebarStep("layouts")
    } else {
      setSidebarStep("layouts")
    }
  }

  const handleLayoutSelect = (layoutId: string) => {
    setSelectedLayoutId(layoutId)
    const tile = activeTiles.find((t) => t.id === selectedTileId)
    const layout = moduleLayouts.find((l) => l.id === layoutId)
    if (tile && layout && topicKeyword.trim()) {
      addNewModuleToCanvas(tile.label, layout.name, topicKeyword.trim())
    }
    setSidebarStep("tiles")
    setSelectedTileId(null)
    setSelectedLayoutId(null)
    setTopicKeyword("")
  }

  const handleEditorialLayoutSelect = (copyLength: "short" | "medium" | "long") => {
    const tile = activeTiles.find((t) => t.id === selectedTileId)
    if (tile && topicKeyword.trim()) {
      const layoutName = `${copyLength.charAt(0).toUpperCase() + copyLength.slice(1)} Copy`
      addNewModuleToCanvas(tile.label, layoutName, topicKeyword.trim())
    }
    setSidebarStep("tiles")
    setSelectedTileId(null)
    setSelectedLayoutId(null)
    setTopicKeyword("")
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

  /* Open the add-module sidebar at a specific insertion index */
  const openAddModuleAt = (index: number) => {
    setInsertAtIndex(index)
    setSelectedBlockId(null)
    setSelectedComponent(null)
    setSidebarMode("add-module")
    setSidebarStep("tiles")
    setActiveTab("feeds")
    setSelectedTileId(null)
    setSelectedLayoutId(null)
    setTopicKeyword("")
    setFeedSearch("")
    setFeedCategory("All")
    setSidebarOpen(true)
  }

  const handleSidebarBack = () => {
    if (sidebarStep === "layouts") {
      setSidebarStep("topic")
      setSelectedLayoutId(null)
    } else if (sidebarStep === "topic") {
      setSidebarStep("tiles")
      setSelectedTileId(null)
      setTopicKeyword("")
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
              ? "outline-1 outline-dotted outline-primary/40 outline-offset-1"
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
      <div className="flex flex-col gap-4 pb-2">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Module Data Settings</p>

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

        {/* Extra Editorial */}
        <div className="border-t border-border pt-3 flex flex-col gap-3">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Extra Editorial</p>

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
                    className={`px-2.5 py-1 text-[10px] font-medium rounded-full border transition-colors capitalize ${
                      bottomLineLength === len
                        ? "bg-primary/10 text-primary border-primary/30"
                        : "bg-card text-muted-foreground border-border hover:bg-muted/50"
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
                    className={`px-2.5 py-1 text-[10px] font-medium rounded-full border transition-colors capitalize ${
                      whyItMattersLength === len
                        ? "bg-primary/10 text-primary border-primary/30"
                        : "bg-card text-muted-foreground border-border hover:bg-muted/50"
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

  /* ─── Additional style state ─── */
  const [titleFontSize, setTitleFontSize] = useState(20)
  const [titleFontHeight, setTitleFontHeight] = useState(26)
  const [titleBold, setTitleBold] = useState(true)
  const [titleItalic, setTitleItalic] = useState(false)
  const [titleAlign, setTitleAlign] = useState<"left" | "center" | "right">("left")
  const [titleClipLines, setTitleClipLines] = useState(1)

  const [descFontSize, setDescFontSize] = useState(15)
  const [descFontHeight, setDescFontHeight] = useState(26)
  const [descAlign, setDescAlign] = useState<"left" | "center" | "right">("left")
  const [descClipLines, setDescClipLines] = useState(5)

  const [ctaLabel, setCtaLabel] = useState("Read more")
  const [ctaFontSize, setCtaFontSize] = useState(15)
  const [ctaColor, setCtaColor] = useState("#197DF9")
  const [ctaBold, setCtaBold] = useState(false)
  const [ctaUnderline, setCtaUnderline] = useState(false)
  const [ctaAlign, setCtaAlign] = useState<"left" | "center" | "right">("left")

  const [imageSize, setImageSize] = useState([100])

  /* Collapsible section state */
  const [openStyleSections, setOpenStyleSections] = useState<Record<string, boolean>>({
    title: true,
    description: true,
    cta: true,
    image: true,
    general: true,
  })

  const toggleStyleSection = (key: string) => {
    setOpenStyleSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  /* ─── Reusable style controls ─── */
  const NumberStepper = ({ label, value, onChange, min = 1, max = 100 }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number }) => (
    <div className="flex items-center justify-between py-1.5">
      <Label className="text-xs text-foreground">{label}</Label>
      <div className="flex items-center border border-border rounded-md overflow-hidden">
        <button
          className="size-7 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <Minus className="size-3" />
        </button>
        <span className="w-9 text-center text-xs font-medium text-foreground tabular-nums">{value}</span>
        <button
          className="size-7 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          <Plus className="size-3" />
        </button>
      </div>
    </div>
  )

  const ColorRow = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
    <div className="flex items-center justify-between py-1.5">
      <Label className="text-xs text-foreground">{label}</Label>
      <div className="flex items-center gap-1.5">
        <div className="flex items-center border border-border rounded-md overflow-hidden h-7">
          <span className="text-[10px] text-muted-foreground pl-2 pr-0.5">#</span>
          <input
            value={value.replace("#", "").toUpperCase()}
            onChange={(e) => onChange(`#${e.target.value}`)}
            className="w-[72px] text-xs h-7 bg-transparent outline-none pr-1 font-mono"
          />
        </div>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="size-7 shrink-0 rounded border border-border cursor-pointer"
        />
      </div>
    </div>
  )

  const AlignRow = ({ label, value, onChange }: { label: string; value: "left" | "center" | "right"; onChange: (v: "left" | "center" | "right") => void }) => (
    <div className="flex items-center justify-between py-1.5">
      <Label className="text-xs text-foreground">{label}</Label>
      <div className="flex items-center rounded-md overflow-hidden border border-border">
        {(["left", "center", "right"] as const).map((align) => {
          const Icon = align === "left" ? AlignLeft : align === "center" ? AlignCenter : AlignRight
          return (
            <button
              key={align}
              className={`size-7 flex items-center justify-center transition-colors ${
                value === align
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => onChange(align)}
            >
              <Icon className="size-3" />
            </button>
          )
        })}
      </div>
    </div>
  )

  const ToggleRow = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex items-center justify-between py-1.5">
      <Label className="text-xs text-foreground">{label}</Label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )

  const SectionHeader = ({ label, sectionKey, enableSwitch, enabled, onToggle }: { label: string; sectionKey: string; enableSwitch?: boolean; enabled?: boolean; onToggle?: (v: boolean) => void }) => (
    <button
      className="flex items-center justify-between w-full py-2 group"
      onClick={() => toggleStyleSection(sectionKey)}
    >
      <div className="flex items-center gap-2">
        <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${openStyleSections[sectionKey] ? "" : "-rotate-90"}`} />
        <span className="text-xs font-semibold text-foreground uppercase tracking-wider">{label}</span>
      </div>
      {enableSwitch && (
        <div onClick={(e) => e.stopPropagation()}>
          <Switch checked={enabled} onCheckedChange={onToggle} />
        </div>
      )}
    </button>
  )

  /* ─── Render Style editing tab ─── */
  const renderStyleTab = () => {
    if (!selectedBlock) return null
    return (
      <div className="flex flex-col divide-y divide-border">
        {/* ── Title ── */}
        <div className="flex flex-col">
          <SectionHeader label="Title" sectionKey="title" enableSwitch enabled={selectedBlock.showTitle} onToggle={(v) => updateBlock(selectedBlock.id, { showTitle: v })} />
          {openStyleSections.title && selectedBlock.showTitle && (
            <div className="flex flex-col pb-3">
              <NumberStepper label="Font size" value={titleFontSize} onChange={setTitleFontSize} min={8} max={72} />
              <NumberStepper label="Font height" value={titleFontHeight} onChange={setTitleFontHeight} min={8} max={80} />
              <ToggleRow label="Bold font" checked={titleBold} onChange={setTitleBold} />
              <ToggleRow label="Italic font" checked={titleItalic} onChange={setTitleItalic} />
              <ColorRow label="Color" value={selectedBlock.titleColor} onChange={(v) => updateBlock(selectedBlock.id, { titleColor: v })} />
              <AlignRow label="Align" value={titleAlign} onChange={setTitleAlign} />
              <NumberStepper label="Clip after X lines" value={titleClipLines} onChange={setTitleClipLines} min={1} max={10} />
            </div>
          )}
        </div>

        {/* ── Description ── */}
        <div className="flex flex-col">
          <SectionHeader label="Description" sectionKey="description" enableSwitch enabled={selectedBlock.showText} onToggle={(v) => updateBlock(selectedBlock.id, { showText: v })} />
          {openStyleSections.description && selectedBlock.showText && (
            <div className="flex flex-col pb-3">
              <NumberStepper label="Font size" value={descFontSize} onChange={setDescFontSize} min={8} max={72} />
              <NumberStepper label="Font height" value={descFontHeight} onChange={setDescFontHeight} min={8} max={80} />
              <ColorRow label="Color" value={selectedBlock.textColor} onChange={(v) => updateBlock(selectedBlock.id, { textColor: v })} />
              <AlignRow label="Align" value={descAlign} onChange={setDescAlign} />
              <NumberStepper label="Clip after X lines" value={descClipLines} onChange={setDescClipLines} min={1} max={20} />
            </div>
          )}
        </div>

        {/* ── Call To Action ── */}
        <div className="flex flex-col">
          <SectionHeader label="Call To Action" sectionKey="cta" enableSwitch enabled={selectedBlock.showCta} onToggle={(v) => updateBlock(selectedBlock.id, { showCta: v })} />
          {openStyleSections.cta && selectedBlock.showCta && (
            <div className="flex flex-col pb-3">
              <div className="flex items-center justify-between py-1.5">
                <Label className="text-xs text-foreground">Read More Label</Label>
                <Input
                  value={ctaLabel}
                  onChange={(e) => {
                    setCtaLabel(e.target.value)
                    updateBlock(selectedBlock.id, { ctaCopy: e.target.value })
                  }}
                  className="text-xs h-7 w-[120px] text-right"
                />
              </div>
              <NumberStepper label="Font size" value={ctaFontSize} onChange={setCtaFontSize} min={8} max={72} />
              <ColorRow label="Read More Color" value={ctaColor} onChange={setCtaColor} />
              <ToggleRow label="Bold font" checked={ctaBold} onChange={setCtaBold} />
              <ToggleRow label="Underline" checked={ctaUnderline} onChange={setCtaUnderline} />
              <AlignRow label="Align" value={ctaAlign} onChange={setCtaAlign} />
            </div>
          )}
        </div>

        {/* ── Image ── */}
        <div className="flex flex-col">
          <SectionHeader label="Image" sectionKey="image" enableSwitch enabled={selectedBlock.showImage} onToggle={(v) => updateBlock(selectedBlock.id, { showImage: v })} />
          {openStyleSections.image && selectedBlock.showImage && (
            <div className="flex flex-col pb-3">
              <div className="flex items-center justify-between py-1.5">
                <Label className="text-xs text-foreground">Size ({imageSize[0]}%)</Label>
                <div className="w-[140px]">
                  <Slider
                    value={imageSize}
                    onValueChange={setImageSize}
                    min={25}
                    max={100}
                    step={5}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── General ── */}
        <div className="flex flex-col">
          <SectionHeader label="General" sectionKey="general" />
          {openStyleSections.general && (
            <div className="flex flex-col pb-3">
              <ColorRow label="Background Color" value={selectedBlock.bgColor} onChange={(v) => updateBlock(selectedBlock.id, { bgColor: v })} />
              <div className="flex items-center justify-between py-1.5">
                <Label className="text-xs text-foreground">Padding ({selectedBlock.padding}px)</Label>
                <div className="w-[140px]">
                  <Slider
                    value={[selectedBlock.padding]}
                    onValueChange={([v]) => updateBlock(selectedBlock.id, { padding: v })}
                    min={8}
                    max={40}
                    step={4}
                  />
                </div>
              </div>
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
    <div className="flex flex-col flex-1 h-full overflow-hidden">
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
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* ─── Left Sidebar ─── */}
        {sidebarOpen && (
        <div className="w-80 border-r border-border bg-card flex flex-col shrink-0 h-full overflow-hidden">
          {sidebarMode === "add-module" ? (
            <>
              {/* Tab header */}
              <div className="p-2.5 border-b border-border flex flex-col gap-1.5">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-foreground">Content Types:</p>
                  <button
                    className="size-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    onClick={() => { setSidebarOpen(false); setInsertAtIndex(null) }}
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
                <div className="flex items-center rounded-lg bg-muted p-0.5">
                  {(["feeds", "editorial", "saved"] as const).map((tab) => (
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
                        setFeedSearch("")
                        setFeedCategory("All")
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
                  <div className="p-2.5 flex flex-col gap-2">
                    {activeTab === "feeds" ? (
                      <>
                        {/* Search + Category filter on one line */}
                        <div className="flex items-center gap-1.5">
                          <div className="relative flex-1">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground pointer-events-none" />
                            <Input
                              placeholder="Search feeds..."
                              value={feedSearch}
                              onChange={(e) => setFeedSearch(e.target.value)}
                              className="text-[11px] h-7 pl-7 pr-2"
                            />
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2 shrink-0">
                                <Filter className="size-3" />
                                {feedCategory === "All" ? "Category" : feedCategory}
                                <ChevronDownIcon className="size-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="min-w-[120px]">
                              {feedCategories.map((cat) => (
                                <DropdownMenuItem
                                  key={cat}
                                  className={`text-xs ${feedCategory === cat ? "font-semibold text-primary" : ""}`}
                                  onClick={() => setFeedCategory(cat)}
                                >
                                  {cat}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Feed source grid -- compact rows */}
                        <div className="grid grid-cols-3 gap-1">
                          {feedSources
                            .filter((s) => {
                              const matchesSearch = s.label.toLowerCase().includes(feedSearch.toLowerCase())
                              const matchesCat = feedCategory === "All" || s.category === feedCategory
                              return matchesSearch && matchesCat
                            })
                            .map((source) => {
                              const SourceIcon = source.icon
                              return (
                                <button
                                  key={source.id}
                                  className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1.5 hover:border-primary/40 hover:bg-primary/[0.03] hover:shadow-sm transition-all text-left"
                                  onClick={() => handleTileSelect(source.id)}
                                >
                                  <SourceIcon className="size-3.5 shrink-0 text-muted-foreground" />
                                  <span className="text-[10px] font-medium text-foreground truncate">{source.label}</span>
                                </button>
                              )
                            })}
                        </div>
                      </>
                    ) : activeTiles.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <Blocks className="size-8 text-muted-foreground/30 mb-2" />
                        <p className="text-xs font-medium text-muted-foreground">No saved modules yet</p>
                        <p className="text-[10px] text-muted-foreground/70 mt-0.5">Saved modules will appear here</p>
                      </div>
                    ) : (
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
                    )}
                  </div>
                )}

                {/* ── Step: Topic (now comes before layouts) ── */}
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
                            className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-background hover:bg-primary/5 hover:border-primary/30 transition-colors text-foreground"
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
                      onClick={handleTopicContinue}
                    >
                      <ArrowRight className="size-3.5" />
                      Continue
                    </Button>
                  </div>
                )}

                {/* ── Step: Layouts (after topic) ── */}
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

                    {isEditorialTab ? (
                      /* Editorial: Short / Medium / Long copy options */
                      <div className="flex flex-col gap-1.5">
                        {([
                          { id: "short", label: "Short Copy", desc: "A concise 2-3 sentence block. Quick and scannable.", lines: 2 },
                          { id: "medium", label: "Medium Copy", desc: "A short paragraph with room for context. 4-6 sentences.", lines: 4 },
                          { id: "long", label: "Long Copy", desc: "A full editorial section with depth and narrative. 8+ sentences.", lines: 7 },
                        ] as const).map((opt) => (
                          <button
                            key={opt.id}
                            className="flex flex-col rounded-lg border border-border bg-background overflow-hidden hover:border-primary/40 hover:shadow-sm transition-all text-left"
                            onClick={() => handleEditorialLayoutSelect(opt.id)}
                          >
                            {/* Text wireframe */}
                            <div className="w-full border-b border-border bg-muted/30 flex flex-col gap-1 p-3">
                              <div className="h-2 w-16 rounded-full bg-muted-foreground/15" />
                              {Array.from({ length: opt.lines }).map((_, i) => (
                                <div
                                  key={i}
                                  className="h-1.5 rounded-full bg-muted-foreground/10"
                                  style={{ width: i === opt.lines - 1 ? "60%" : "100%" }}
                                />
                              ))}
                            </div>
                            <div className="px-3 py-2">
                              <span className="text-[11px] font-medium text-foreground">{opt.label}</span>
                              <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">{opt.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      /* Feeds: Standard layout grid */
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
                    )}
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
                <div className="p-2.5 border-t border-border bg-card shrink-0 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
                  <Button size="sm" className="w-full text-xs h-9 gap-1.5 font-semibold">
                    <Sparkles className="size-3.5" />
                    Update Module
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        )}

        {/* ─── Center Canvas ─── */}
        <div
          className="flex-1 bg-muted/30 overflow-y-auto overflow-x-hidden h-full"
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
                      className={`flex flex-col items-center justify-center py-14 text-center border-2 border-dashed rounded-xl transition-colors ${
                        dragOverIndex === 0 ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <Blocks className="size-10 text-muted-foreground/30 mb-3" />
                      <p className="text-sm font-medium text-foreground">Your email is empty</p>
                      <p className="text-xs text-muted-foreground mt-1 mb-4">
                        Click the button below to add your first content module
                      </p>
                      <button
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg px-4 py-2 transition-colors shadow-sm"
                        onClick={(e) => { e.stopPropagation(); openAddModuleAt(0) }}
                      >
                        <Plus className="size-3.5" />
                        Add Module
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {canvasBlocks.map((block, index) => {
                        const isModuleHovered = hoveredBlockId === block.id
                        const isModuleSelected = selectedBlockId === block.id

                        return (
                          <div key={block.id} onClick={(e) => e.stopPropagation()}>
                            {/* Green "+" insert zone between modules */}
                            <div
                              className="relative flex items-center justify-center py-1"
                              onMouseEnter={() => setHoveredGapIndex(index)}
                              onMouseLeave={() => setHoveredGapIndex(null)}
                              onDragOver={(e) => handleDragOver(e, index)}
                              onDrop={(e) => handleDrop(e, index)}
                            >
                              {dragOverIndex === index ? (
                                <div className="h-0.5 w-full rounded-full bg-primary" />
                              ) : (
                                <div className={`flex items-center justify-center w-full transition-all duration-150 ${hoveredGapIndex === index ? "opacity-100" : "opacity-0"}`}>
                                  <div className="flex-1 h-px bg-emerald-500/50" />
                                  <button
                                    className="size-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-sm transition-transform hover:scale-110 shrink-0 mx-1"
                                    onClick={(e) => { e.stopPropagation(); openAddModuleAt(index) }}
                                  >
                                    <Plus className="size-3" />
                                  </button>
                                  <div className="flex-1 h-px bg-emerald-500/50" />
                                </div>
                              )}
                            </div>

                            {/* Module Block with icon strip positioned absolutely outside */}
                            <div className="relative">
                              {/* Module content area */}
                              <div
                                className={`flex-1 relative rounded-lg transition-all cursor-pointer ${
                                  draggingBlockId === block.id ? "opacity-40" : ""
                                } ${
                                  isModuleSelected && !selectedComponent
                                    ? "ring-[2.5px] ring-primary shadow-sm"
                                    : isModuleSelected && selectedComponent
                                      ? "ring-1 ring-border"
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
                                  className="absolute -right-14 top-0 flex flex-col items-center gap-0.5"
                                  onMouseEnter={() => setHoveredBlockId(block.id)}
                                  onMouseLeave={() => setHoveredBlockId(null)}
                                >
                                  <TooltipProvider>
                                    {/* Edit */}
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          className="size-7 flex items-center justify-center rounded-md bg-card border border-border text-primary hover:text-primary hover:bg-primary/5 transition-colors shadow-sm"
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

                                    {/* Move (drag + up/down) */}
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          className="size-7 flex items-center justify-center rounded-md bg-card border border-border text-primary hover:text-primary hover:bg-primary/5 transition-colors shadow-sm cursor-grab active:cursor-grabbing"
                                          draggable
                                          onDragStart={(e) => handleDragStart(e, block.id)}
                                        >
                                          <GripVertical className="size-3.5" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="right">Move</TooltipContent>
                                    </Tooltip>
                                    {/* Delete -- red */}
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          className="size-7 flex items-center justify-center rounded-md bg-card border border-border text-destructive hover:text-destructive hover:bg-destructive/5 transition-colors shadow-sm"
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
                                  </TooltipProvider>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                      {/* Final green "+" insert zone after last module */}
                      <div
                        className="relative flex items-center justify-center py-1"
                        onMouseEnter={() => setHoveredGapIndex(canvasBlocks.length)}
                        onMouseLeave={() => setHoveredGapIndex(null)}
                        onDragOver={(e) => handleDragOver(e, canvasBlocks.length)}
                        onDrop={(e) => handleDrop(e, canvasBlocks.length)}
                      >
                        {dragOverIndex === canvasBlocks.length ? (
                          <div className="h-0.5 w-full rounded-full bg-primary" />
                        ) : (
                          <div className={`flex items-center justify-center w-full transition-all duration-150 ${hoveredGapIndex === canvasBlocks.length ? "opacity-100" : "opacity-0"}`}>
                            <div className="flex-1 h-px bg-emerald-500/50" />
                            <button
                              className="size-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-sm transition-transform hover:scale-110 shrink-0 mx-1"
                              onClick={(e) => { e.stopPropagation(); openAddModuleAt(canvasBlocks.length) }}
                            >
                              <Plus className="size-3" />
                            </button>
                            <div className="flex-1 h-px bg-emerald-500/50" />
                          </div>
                        )}
                      </div>
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
