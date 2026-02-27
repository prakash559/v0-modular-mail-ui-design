"use client"

import { useState } from "react"
import {
  Search,
  ArrowRight,
  ChevronLeft,
  Check,
  Hash,
  Sparkles,
  Play,
  Camera,
  Clapperboard,
  AtSign,
  Briefcase,
  MessageCircle,
  Globe,
  Image,
  PenLine,
  Newspaper,
  TrendingUp,
  Zap,
  FileText,
  BookOpen,
  Music,
  Headphones,
  Rocket,
  Compass,
  Code,
  BarChart3,
  Rss,
  ChevronDown,
  Eye,
  CheckSquare,
  Square,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

/* ─── Topic categories ─── */
const topicCategories = [
  {
    category: "Technology",
    topics: ["AI trends", "Cloud computing", "Cybersecurity updates", "SaaS tools and platforms", "Developer productivity", "No-code movement", "Machine learning applications", "Tech startup funding", "Open source software", "Digital transformation strategies", "DevOps best practices", "Edge computing"],
  },
  {
    category: "Business",
    topics: ["Startup growth", "Remote work culture", "Supply chain trends", "B2B sales strategies", "Small business marketing", "Leadership insights", "Mergers and acquisitions", "Business automation", "Customer retention tactics", "Scaling a SaaS business", "Franchise opportunities", "Corporate innovation"],
  },
  {
    category: "Finance",
    topics: ["Stock market updates", "Crypto regulation", "Personal budgeting", "Real estate investing", "Fintech innovation", "Retirement planning", "Venture capital trends", "Economic forecasts", "Banking disruption", "Wealth management tips", "Tax planning strategies", "ESG investing"],
  },
  {
    category: "Health & Wellness",
    topics: ["Mental health", "Nutrition science", "Fitness and recovery", "Healthcare technology", "Workplace wellbeing", "Sleep optimization", "Preventive medicine", "Mindfulness practices", "Telehealth platforms", "Women's health research", "Gut health and microbiome", "Health policy updates"],
  },
  {
    category: "Marketing",
    topics: ["Content strategy", "SEO updates", "Email marketing tips", "Social media trends", "Brand storytelling", "Influencer marketing", "Paid media optimization", "Marketing analytics", "Growth hacking tactics", "Community building", "Video marketing", "Conversion rate optimization"],
  },
  {
    category: "Education",
    topics: ["EdTech tools", "Online learning trends", "Skill development", "University admissions", "Classroom innovation", "Corporate training", "STEM education", "Lifelong learning", "Student engagement", "Education policy", "Micro-credentials", "Language learning apps"],
  },
  {
    category: "Science",
    topics: ["Space exploration", "Climate research", "Biotech breakthroughs", "Quantum computing", "Renewable energy", "Neuroscience discoveries", "Ocean conservation", "Genetics and CRISPR", "Sustainable materials", "Astronomy and astrophysics"],
  },
  {
    category: "Lifestyle",
    topics: ["Travel guides", "Sustainable fashion", "Interior design", "Food and dining trends", "Photography tips", "Parenting advice", "Personal development", "Minimalist living", "Pet care trends", "Book recommendations"],
  },
]

/* ─── Feed sources ─── */
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

/* ─── Templates ─── */
const templates = [
  {
    id: "scratch",
    name: "Start from Scratch",
    description: "Begin with a blank canvas and build your email module by module.",
    illustration: (
      <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
        <div className="size-8 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
          <span className="text-muted-foreground/40 text-lg font-light">+</span>
        </div>
        <div className="h-1.5 w-12 rounded-full bg-muted-foreground/10" />
      </div>
    ),
  },
  {
    id: "market-pulse",
    name: "Market Pulse",
    description: "A fast, digest-style summary of the most relevant updates and highlights.",
    illustration: (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="h-2 w-3/4 rounded-full bg-primary/30" />
        <div className="h-1.5 w-full rounded-full bg-border" />
        <div className="h-1.5 w-5/6 rounded-full bg-border" />
        <div className="mt-1 grid grid-cols-2 gap-1.5">
          <div className="h-10 rounded bg-muted border border-border" />
          <div className="h-10 rounded bg-muted border border-border" />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-10 rounded bg-muted border border-border" />
          <div className="h-10 rounded bg-muted border border-border" />
        </div>
      </div>
    ),
  },
  {
    id: "deep-dive-brief",
    name: "Deep Dive Brief",
    description: "A focused, in-depth exploration of a key theme with structured analysis.",
    illustration: (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="h-14 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
          <div className="w-8 h-1.5 rounded-full bg-primary/30" />
        </div>
        <div className="h-2 w-2/3 rounded-full bg-primary/30" />
        <div className="h-1.5 w-full rounded-full bg-border" />
        <div className="h-1.5 w-4/5 rounded-full bg-border" />
        <div className="h-1.5 w-full rounded-full bg-border" />
        <div className="h-1.5 w-3/4 rounded-full bg-border" />
      </div>
    ),
  },
  {
    id: "industry-roundup",
    name: "Industry Roundup",
    description: "A curated collection of industry-specific news and developments.",
    illustration: (
      <div className="flex flex-col gap-2 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="size-8 rounded bg-muted border border-border shrink-0" />
            <div className="flex-1 flex flex-col gap-0.5">
              <div className="h-1.5 w-3/4 rounded-full bg-primary/25" />
              <div className="h-1 w-full rounded-full bg-border" />
              <div className="h-1 w-4/5 rounded-full bg-border" />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "social-buzz",
    name: "Social Buzz",
    description: "A reactive edition capturing trending conversations and online signals.",
    illustration: (
      <div className="flex flex-col gap-2 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-1.5">
            <div className="size-4 rounded-full bg-primary/20 shrink-0 mt-0.5" />
            <div className="flex-1 flex flex-col gap-0.5">
              <div className="h-1.5 w-2/3 rounded-full bg-primary/25" />
              <div className="h-1 w-full rounded-full bg-border" />
              <div className="h-1 w-4/5 rounded-full bg-border" />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "trends-forecast",
    name: "Trends & Forecast",
    description: "A forward-looking overview of emerging shifts and what to watch next.",
    illustration: (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="h-2 w-2/3 rounded-full bg-primary/30" />
        <div className="grid grid-cols-3 gap-1.5 mt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 rounded bg-primary/5 border border-primary/15 flex flex-col items-center justify-center gap-0.5">
              <div className="w-5 h-2 rounded-full bg-primary/30" />
              <div className="w-7 h-1 rounded-full bg-border" />
            </div>
          ))}
        </div>
        <div className="h-1.5 w-full rounded-full bg-border mt-1" />
        <div className="h-1.5 w-4/5 rounded-full bg-border" />
      </div>
    ),
  },
  {
    id: "educational-spotlight",
    name: "Educational Spotlight",
    description: "A topic-led edition designed to explain, clarify, and build understanding.",
    illustration: (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="h-2 w-1/2 rounded-full bg-primary/30" />
        <div className="h-1.5 w-full rounded-full bg-border" />
        <div className="h-1.5 w-full rounded-full bg-border" />
        <div className="h-1.5 w-3/4 rounded-full bg-border" />
        <div className="mt-1.5 h-0.5 w-full bg-border" />
        <div className="h-2 w-2/5 rounded-full bg-primary/30 mt-0.5" />
        <div className="h-1.5 w-full rounded-full bg-border" />
        <div className="h-1.5 w-5/6 rounded-full bg-border" />
      </div>
    ),
  },
  {
    id: "resource-library",
    name: "Resource Library",
    description: "A curated compilation of useful tools, articles, and learning materials.",
    illustration: (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="h-2 w-1/2 rounded-full bg-primary/30" />
        <div className="grid grid-cols-2 gap-1.5 mt-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 rounded bg-muted border border-border flex flex-col items-center justify-center gap-1">
              <div className="w-6 h-1.5 rounded-full bg-primary/20" />
              <div className="w-8 h-1 rounded-full bg-border" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "insight-brief",
    name: "Insight Brief",
    description: "A concise, intelligence-led summary translating developments into clear takeaways.",
    illustration: (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="h-2 w-3/5 rounded-full bg-primary/30" />
        <div className="h-1.5 w-full rounded-full bg-border" />
        <div className="h-1.5 w-full rounded-full bg-border" />
        <div className="mt-1 h-0.5 w-full bg-border" />
        <div className="flex gap-1.5 mt-0.5">
          <div className="flex-1 rounded bg-primary/5 border border-primary/15 p-2 flex flex-col gap-0.5">
            <div className="h-1.5 w-3/4 rounded-full bg-primary/25" />
            <div className="h-1 w-full rounded-full bg-border" />
          </div>
          <div className="flex-1 rounded bg-primary/5 border border-primary/15 p-2 flex flex-col gap-0.5">
            <div className="h-1.5 w-3/4 rounded-full bg-primary/25" />
            <div className="h-1 w-full rounded-full bg-border" />
          </div>
        </div>
      </div>
    ),
  },
]

/* ─── Main Wizard ─── */
export function EmailCreateWizard({
  onNavigate,
}: {
  onNavigate: (section: string) => void
}) {
  const [step, setStep] = useState(0)
  const [topic, setTopic] = useState("")
  const [topicSearch, setTopicSearch] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [feedSearch, setFeedSearch] = useState("")
  const [feedCategory, setFeedCategory] = useState("All")
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const filterTerm = topicSearch.trim() && !topicCategories.some(c => c.topics.includes(topicSearch)) ? topicSearch : ""

  const filteredCategories = filterTerm
    ? topicCategories
        .map((cat) => ({
          ...cat,
          topics: cat.topics.filter((t) =>
            t.toLowerCase().includes(filterTerm.toLowerCase())
          ),
        }))
        .filter((cat) => cat.topics.length > 0)
    : topicCategories

  const handleTopicClick = (t: string) => {
    setTopic(t)
    setTopicSearch(t)
  }

  const toggleSource = (id: string) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const handleFinish = () => {
    onNavigate("editor")
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="max-w-4xl mx-auto pt-8">
        {/* ─── Step 1: Topic ─── */}
        {step === 0 && (
          <div className="px-6 pb-12 flex flex-col gap-8">
            <div className="text-center flex flex-col gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
                What Topic Should Your Email Cover?
              </h1>
              <p className="text-muted-foreground text-balance max-w-lg mx-auto">
                Enter a topic, keyword, or phrase that describes the content you want to curate. You can also browse ideas below.
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                value={topic || topicSearch}
                onChange={(e) => {
                  const v = e.target.value
                  setTopic(v)
                  setTopicSearch(v)
                }}
                placeholder="Enter a topic or phrase"
                className="w-full pl-11 pr-32 h-13 text-sm rounded-xl border border-border bg-card shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
              <Button
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 gap-1.5 rounded-lg px-5 h-9 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                onClick={() => setStep(1)}
                disabled={!topic.trim()}
              >
                Continue
                <ArrowRight className="size-3.5" />
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Topics by Industry
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredCategories.map((cat) => {
                  const isExpanded = expandedCategory === cat.category
                  const visibleTopics = isExpanded ? cat.topics : cat.topics.slice(0, 6)
                  return (
                    <div key={cat.category} className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3">
                      <h3 className="text-sm font-semibold text-foreground">{cat.category}</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {visibleTopics.map((t) => (
                          <button
                            key={t}
                            className={`inline-flex items-center gap-1 text-[13px] leading-snug px-2.5 py-1.5 rounded-lg border transition-colors ${
                              topic === t
                                ? "bg-primary/10 text-primary border-primary/30 font-medium"
                                : "bg-white text-foreground border-border hover:bg-muted hover:border-muted-foreground/20"
                            }`}
                            onClick={() => handleTopicClick(t)}
                          >
                            <Hash className="size-3 opacity-40 shrink-0" />
                            {t}
                          </button>
                        ))}
                      </div>
                      {cat.topics.length > 6 && (
                        <button
                          className="text-[11px] font-medium text-primary hover:underline self-start"
                          onClick={() => setExpandedCategory(isExpanded ? null : cat.category)}
                        >
                          {isExpanded ? "Show less" : `+${cat.topics.length - 6} more`}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── Step 2: Data Sauce ─── */}
        {step === 1 && (
          <div className="px-6 pb-12 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <button
                className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors self-start"
                onClick={() => setStep(0)}
              >
                <ChevronLeft className="size-4" />
                Back
              </button>
              <div className="text-center flex flex-col gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
                  Choose Your Data Sauce
                </h1>
                <p className="text-muted-foreground text-balance max-w-lg mx-auto">
                  Select one or more content sources that the AI will pull from to populate your email modules.
                </p>
              </div>
            </div>

            {/* Continue at top + Search + category */}
            <div className="flex items-center justify-between max-w-xl mx-auto w-full">
              <p className="text-xs text-muted-foreground">
                {selectedSources.length === 0
                  ? "Select at least one source to continue"
                  : `${selectedSources.length} source${selectedSources.length === 1 ? "" : "s"} selected`}
              </p>
              <Button
                className="gap-1.5 px-6"
                onClick={() => setStep(2)}
                disabled={selectedSources.length === 0}
              >
                Continue
                <ArrowRight className="size-3.5" />
              </Button>
            </div>

            <div className="flex items-center gap-2 max-w-xl mx-auto w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search sources..."
                  value={feedSearch}
                  onChange={(e) => setFeedSearch(e.target.value)}
                  className="text-sm h-10 pl-10 bg-white"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-10 text-xs gap-1.5 px-3 shrink-0 bg-white">
                    {feedCategory === "All" ? "Categories" : feedCategory}
                    <ChevronDown className="size-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[140px]">
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

            {/* Source grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {feedSources
                .filter((s) => {
                  const matchesSearch = s.label.toLowerCase().includes(feedSearch.toLowerCase())
                  const matchesCat = feedCategory === "All" || s.category === feedCategory
                  return matchesSearch && matchesCat
                })
                .map((source) => {
                  const SourceIcon = source.icon
                  const isSelected = selectedSources.includes(source.id)
                  return (
                    <button
                      key={source.id}
                      className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                          : "border-border bg-white hover:border-primary/30 hover:shadow-sm"
                      }`}
                      onClick={() => toggleSource(source.id)}
                    >
                      <SourceIcon className={`size-4 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium text-foreground truncate flex-1 min-w-0">{source.label}</span>
                      {isSelected && (
                        <div className="size-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                          <Check className="size-2.5" />
                        </div>
                      )}
                    </button>
                  )
                })}
            </div>

          </div>
        )}

        {/* ─── Step 3: Template ─── */}
        {step === 2 && (
          <div className="px-6 pb-12 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <button
                className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors self-start"
                onClick={() => setStep(1)}
              >
                <ChevronLeft className="size-4" />
                Back
              </button>
              <div className="text-center flex flex-col gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
                  Choose a Template
                </h1>
                <p className="text-muted-foreground text-balance max-w-lg mx-auto">
                  Pick a layout style for your email. You can customize everything later in the editor.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((tmpl) => {
                const isSelected = selectedTemplate === tmpl.id
                return (
                  <div
                    key={tmpl.id}
                    className={`group relative flex flex-col rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/20 bg-card shadow-sm"
                        : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                    }`}
                  >
                    <div className="px-5 pt-5 pb-2 flex flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{tmpl.name}</h3>
                        {/* Hover actions: preview + checkbox */}
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <button
                            className="size-7 rounded-md border border-border bg-white flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                            onClick={(e) => { e.stopPropagation() }}
                            title="Preview"
                          >
                            <Eye className="size-3.5" />
                          </button>
                          <button
                            className="size-7 rounded-md border border-border bg-white flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedTemplate(isSelected ? "" : tmpl.id)
                            }}
                            title="Select"
                          >
                            {isSelected ? (
                              <CheckSquare className="size-3.5 text-primary" />
                            ) : (
                              <Square className="size-3.5" />
                            )}
                          </button>
                        </div>
                        {/* Always-visible check when selected */}
                        {isSelected && (
                          <div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 group-hover:hidden">
                            <Check className="size-3" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{tmpl.description}</p>
                    </div>
                    <div className="px-5 pb-5 pt-1">
                      <div className="rounded-lg border border-border bg-background p-3.5 flex items-center justify-center h-[130px]">
                        {tmpl.illustration}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Continue button */}
            <div className="flex justify-center">
              <Button
                className="gap-1.5 px-8"
                onClick={handleFinish}
                disabled={!selectedTemplate}
              >
                Continue to Editor
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
