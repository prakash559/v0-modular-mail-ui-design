"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Globe,
  Newspaper,
  MessageCircle,
  Play,
  Headphones,
  Link,
  FileText,
  Rss,
  Mail,
  Terminal,
  Rocket,
  Clapperboard,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  moduleSources,
  moduleCategories,
  topicTags,
  type ModuleSourceCategory,
} from "@/lib/mock-data"

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  newspaper: Newspaper,
  "message-circle": MessageCircle,
  play: Play,
  headphones: Headphones,
  link: Link,
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

export function ModuleCreate({
  onNavigate,
}: {
  onNavigate: (section: string) => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<ModuleSourceCategory>("all")
  const [activeTopic, setActiveTopic] = useState<string | null>(null)

  const filteredSources = useMemo(() => {
    let sources = moduleSources
    if (activeCategory !== "all") {
      sources = sources.filter((s) => s.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      sources = sources.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      )
    }
    return sources
  }, [activeCategory, searchQuery])

  const handleSourceClick = (sourceId: string) => {
    // Navigate to editor with the selected source
    onNavigate("editor")
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col gap-0">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-secondary/80 to-background px-6 pb-10 pt-14">
          <div className="mx-auto max-w-3xl text-center flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Create Modules
                <br />
                <span className="text-primary">from</span> almost any source
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto text-pretty">
                Modules are the building blocks of your email content. Enter a URL or search for a source below.
              </p>
            </div>

            {/* Search / URL Input */}
            <div className="flex items-center gap-2 mx-auto w-full max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Enter a website URL or search for a source..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-sm bg-card border-border shadow-sm rounded-xl"
                />
              </div>
              <Button size="lg" className="h-12 px-6 rounded-xl font-semibold shadow-sm">
                Generate
                <ArrowRight className="ml-1.5 size-4" />
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center justify-center gap-1.5">
              {moduleCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card text-muted-foreground hover:text-foreground hover:bg-accent border border-border"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Topic Tags */}
        <div className="px-6 py-5 border-b border-border">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center gap-2">
              {topicTags.map((tag) => (
                <Badge
                  key={tag.label}
                  variant={activeTopic === tag.label ? "default" : "outline"}
                  className={`cursor-pointer text-xs font-medium transition-colors ${
                    activeTopic === tag.label
                      ? ""
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() =>
                    setActiveTopic(activeTopic === tag.label ? null : tag.label)
                  }
                >
                  {tag.label}
                  <span className="ml-1 opacity-60">{tag.count}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Source Grid */}
        <div className="px-6 py-8">
          <div className="mx-auto max-w-5xl flex flex-col gap-5">
            <p className="text-sm font-medium text-muted-foreground">
              Select which module source you would like to create
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredSources.map((source) => {
                const Icon = iconMap[source.icon] || FileText
                return (
                  <Card
                    key={source.id}
                    className="group cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-200"
                    onClick={() => handleSourceClick(source.id)}
                  >
                    <CardContent className="p-4 flex items-center gap-3.5">
                      <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${source.color}`}
                      >
                        <Icon className="size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                          {source.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {source.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredSources.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
                  <Search className="size-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">No sources found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try a different search or category filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
