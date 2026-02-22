"use client"

import { useState, useCallback } from "react"
import {
  Blocks,
  Layout,
  Bookmark,
  Search,
  GripVertical,
  Trash2,
  Copy,
  Pencil,
  Monitor,
  Smartphone,
  RotateCcw,
  FlaskConical,
  Clock,
  Save,
  Eye,
  Download,
  ChevronRight,
  Target,
  ListChecks,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
  Plus,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { mockModules, layoutTemplates, tones } from "@/lib/mock-data"

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
}

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
    },
  ])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>("block-1")
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop")
  const [searchQuery, setSearchQuery] = useState("")
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [draggingBlockId, setDraggingBlockId] = useState<string | null>(null)

  const selectedBlock = canvasBlocks.find((b) => b.id === selectedBlockId)

  const filteredModules = mockModules.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const addModuleToCanvas = useCallback((mod: typeof mockModules[0]) => {
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
    }
    setCanvasBlocks((prev) => [...prev, newBlock])
    setSelectedBlockId(newBlock.id)
  }, [])

  const deleteBlock = useCallback((id: string) => {
    setCanvasBlocks((prev) => prev.filter((b) => b.id !== id))
    setSelectedBlockId((prev) => (prev === id ? null : prev))
  }, [])

  const duplicateBlock = useCallback((id: string) => {
    setCanvasBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id)
      if (idx === -1) return prev
      const dup = { ...prev[idx], id: `block-${Date.now()}` }
      const next = [...prev]
      next.splice(idx + 1, 0, dup)
      return next
    })
  }, [])

  const updateBlock = useCallback((id: string, updates: Partial<CanvasBlock>) => {
    setCanvasBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    )
  }, [])

  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    setCanvasBlocks((prev) => {
      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }, [])

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
      if (mod) {
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
        }
        setCanvasBlocks((prev) => {
          const next = [...prev]
          next.splice(toIndex, 0, newBlock)
          return next
        })
        setSelectedBlockId(newBlock.id)
      }
    } else {
      const fromIndex = canvasBlocks.findIndex((b) => b.id === blockId)
      if (fromIndex !== -1 && fromIndex !== toIndex) {
        moveBlock(fromIndex, toIndex)
      }
    }
    setDragOverIndex(null)
    setDraggingBlockId(null)
  }

  const handleModuleDragStart = (e: React.DragEvent, modId: string) => {
    e.dataTransfer.effectAllowed = "copy"
    e.dataTransfer.setData("text/plain", `module-${modId}`)
  }

  const totalReadTime = canvasBlocks.length * 2

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Panel - Library */}
      <div className="w-72 border-r border-border bg-card flex flex-col shrink-0">
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
        </div>
        <Tabs defaultValue="modules" className="flex-1 flex flex-col">
          <TabsList className="mx-3 mt-2">
            <TabsTrigger value="modules" className="text-xs flex items-center gap-1">
              <Blocks className="size-3" />
              Modules
            </TabsTrigger>
            <TabsTrigger value="layouts" className="text-xs flex items-center gap-1">
              <Layout className="size-3" />
              Layouts
            </TabsTrigger>
            <TabsTrigger value="saved" className="text-xs flex items-center gap-1">
              <Bookmark className="size-3" />
              Saved
            </TabsTrigger>
          </TabsList>
          <TabsContent value="modules" className="flex-1 mt-0">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="p-3 flex flex-col gap-2">
                {filteredModules.map((mod) => (
                  <div
                    key={mod.id}
                    draggable
                    onDragStart={(e) => handleModuleDragStart(e, mod.id)}
                    className="rounded-lg border border-border bg-background p-3 hover:border-primary/30 hover:shadow-sm transition-all cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-foreground truncate">{mod.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{mod.source}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 shrink-0"
                        onClick={() => addModuleToCanvas(mod)}
                      >
                        <Plus className="size-3" />
                        <span className="sr-only">Add module</span>
                      </Button>
                    </div>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {mod.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[9px] px-1.5 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="layouts" className="flex-1 mt-0">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="p-3 flex flex-col gap-2">
                {layoutTemplates.map((layout) => (
                  <div
                    key={layout.id}
                    className="rounded-lg border border-border bg-background p-3 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: layout.columns }).map((_, i) => (
                          <div
                            key={i}
                            className="h-6 rounded-sm bg-muted border border-border"
                            style={{ width: `${48 / layout.columns}px` }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-medium text-foreground">{layout.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{layout.description}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="saved" className="flex-1 mt-0">
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <Bookmark className="size-8 text-muted-foreground/30 mb-2" />
              <p className="text-xs text-muted-foreground">No saved blocks yet</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Save blocks from the canvas to reuse them
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Center Panel - Canvas */}
      <div className="flex-1 flex flex-col bg-muted/30 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg bg-muted p-0.5">
              <button
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md transition-colors ${
                  previewMode === "desktop"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setPreviewMode("desktop")}
              >
                <Monitor className="size-3" />
                Desktop
              </button>
              <button
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md transition-colors ${
                  previewMode === "mobile"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setPreviewMode("mobile")}
              >
                <Smartphone className="size-3" />
                Mobile
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="sm" className="text-xs h-7">
              <RotateCcw className="size-3 mr-1" />
              Reset
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-7">
              <FlaskConical className="size-3 mr-1" />
              Test
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
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
                  <div className={`flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-xl transition-colors ${
                    dragOverIndex === 0 ? "border-primary bg-primary/5" : "border-border"
                  }`}>
                    <Blocks className="size-10 text-muted-foreground/30 mb-3" />
                    <p className="text-sm font-medium text-foreground">Drop modules here</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Drag modules from the left panel to build your email
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {canvasBlocks.map((block, index) => (
                      <div key={block.id}>
                        {/* Drop indicator */}
                        <div
                          className={`h-1 rounded-full mx-2 transition-colors mb-1 ${
                            dragOverIndex === index ? "bg-primary" : "bg-transparent"
                          }`}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDrop={(e) => handleDrop(e, index)}
                        />
                        <div
                          draggable
                          onDragStart={(e) => handleDragStart(e, block.id)}
                          onDragEnd={() => {
                            setDragOverIndex(null)
                            setDraggingBlockId(null)
                          }}
                          className={`group rounded-lg border-2 transition-all cursor-pointer ${
                            selectedBlockId === block.id
                              ? "border-primary shadow-sm"
                              : "border-transparent hover:border-border"
                          } ${draggingBlockId === block.id ? "opacity-50" : ""}`}
                          onClick={() => setSelectedBlockId(block.id)}
                          style={{ padding: `${block.padding}px` }}
                        >
                          <div className={`text-${block.alignment}`}>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary" className="text-[10px]">
                                {block.source}
                              </Badge>
                              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  className="size-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedBlockId(block.id)
                                  }}
                                >
                                  <Pencil className="size-3" />
                                </button>
                                <button
                                  className="size-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    duplicateBlock(block.id)
                                  }}
                                >
                                  <Copy className="size-3" />
                                </button>
                                <button
                                  className="size-6 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteBlock(block.id)
                                  }}
                                >
                                  <Trash2 className="size-3" />
                                </button>
                                <div className="size-6 flex items-center justify-center cursor-grab active:cursor-grabbing text-muted-foreground">
                                  <GripVertical className="size-3" />
                                </div>
                              </div>
                            </div>
                            <h3 className="text-sm font-semibold text-foreground mb-1">
                              {block.name}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Preview content for this module will appear here once connected
                              to a real data source. This shows the email block layout.
                            </p>

                            {block.bottomLine && (
                              <div className="mt-3 rounded-md bg-primary/5 border border-primary/10 p-2.5">
                                <p className="text-[10px] font-semibold text-foreground flex items-center gap-1">
                                  <Target className="size-3 text-primary" />
                                  Bottom Line
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-1">
                                  Key insight summary for this content block.
                                </p>
                              </div>
                            )}

                            {block.whyItMatters && (
                              <div className="mt-2 rounded-md bg-muted/50 border border-border p-2.5">
                                <p className="text-[10px] font-semibold text-foreground flex items-center gap-1">
                                  <ListChecks className="size-3 text-primary" />
                                  Why It Matters
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-1">
                                  Context on why this content is relevant to your audience.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
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
        </ScrollArea>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-card">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="size-3" />
            Est. read time: {totalReadTime} min
            <span className="text-border mx-1">|</span>
            {canvasBlocks.length} block{canvasBlocks.length !== 1 ? "s" : ""}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs h-7">
              <Save className="size-3 mr-1" />
              Save Email
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-7">
              <Eye className="size-3 mr-1" />
              Preview
            </Button>
            <Button size="sm" className="text-xs h-7">
              <Download className="size-3 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Properties */}
      <div className="w-72 border-l border-border bg-card flex flex-col shrink-0">
        <div className="p-3 border-b border-border">
          <p className="text-xs font-semibold text-foreground">Block Settings</p>
        </div>
        <ScrollArea className="flex-1">
          {selectedBlock ? (
            <div className="p-3 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Block Title</Label>
                <Input
                  value={selectedBlock.name}
                  onChange={(e) =>
                    updateBlock(selectedBlock.id, { name: e.target.value })
                  }
                  className="text-sm h-8"
                />
              </div>

              <Separator />

              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium text-foreground">Commentary</p>
                <div className="flex items-center justify-between">
                  <Label htmlFor="bl-toggle" className="text-xs font-normal cursor-pointer">
                    Bottom Line
                  </Label>
                  <Switch
                    id="bl-toggle"
                    checked={selectedBlock.bottomLine}
                    onCheckedChange={(v) =>
                      updateBlock(selectedBlock.id, { bottomLine: v })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="wim-toggle" className="text-xs font-normal cursor-pointer">
                    Why It Matters
                  </Label>
                  <Switch
                    id="wim-toggle"
                    checked={selectedBlock.whyItMatters}
                    onCheckedChange={(v) =>
                      updateBlock(selectedBlock.id, { whyItMatters: v })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Text Alignment</Label>
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
                        onClick={() =>
                          updateBlock(selectedBlock.id, { alignment: align })
                        }
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
                  onValueChange={([v]) =>
                    updateBlock(selectedBlock.id, { padding: v })
                  }
                  min={8}
                  max={40}
                  step={4}
                />
              </div>

              <Separator />

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Brand Color Style</Label>
                <div className="flex items-center gap-1">
                  {(["primary", "secondary", "neutral"] as const).map((style) => (
                    <button
                      key={style}
                      className={`flex-1 h-8 rounded-md border text-[10px] font-medium capitalize transition-colors ${
                        selectedBlock.colorStyle === style
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                      onClick={() =>
                        updateBlock(selectedBlock.id, { colorStyle: style })
                      }
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Override Tone</Label>
                <Select
                  value={selectedBlock.tone}
                  onValueChange={(v) =>
                    updateBlock(selectedBlock.id, { tone: v })
                  }
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

              <Separator />

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => duplicateBlock(selectedBlock.id)}
                >
                  <Copy className="size-3 mr-1" />
                  Duplicate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => deleteBlock(selectedBlock.id)}
                >
                  <Trash2 className="size-3 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <ChevronRight className="size-8 text-muted-foreground/30 mb-2" />
              <p className="text-xs text-muted-foreground">
                Select a block on the canvas to edit its settings
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
