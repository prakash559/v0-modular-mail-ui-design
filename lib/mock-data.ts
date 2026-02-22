export type Module = {
  id: string
  name: string
  source: string
  sourceType: string
  industry: string
  tone: string
  length: string
  summary: string
  imageUrl?: string
  tags: string[]
  createdAt: string
  updatedAt: string
  status: "draft" | "ready"
  commentary: {
    bulletSummary: boolean
    bottomLine: boolean
    whyItMatters: boolean
    keyTakeaways: boolean
  }
}

export type Email = {
  id: string
  name: string
  audience: string
  lastEdited: string
  status: "draft" | "ready"
  moduleCount: number
}

export type LayoutTemplate = {
  id: string
  name: string
  description: string
  columns: number
  preview: string
}

export type ContentSource = {
  id: string
  name: string
  icon: string
  description: string
  color: string
}

export type ModuleSourceCategory = "all" | "social" | "news" | "media" | "custom"

export type ModuleSource = ContentSource & {
  category: ModuleSourceCategory
  popular?: boolean
}

export const moduleCategories: { id: ModuleSourceCategory; label: string }[] = [
  { id: "all", label: "All Sources" },
  { id: "social", label: "Social" },
  { id: "news", label: "News" },
  { id: "media", label: "Media" },
  { id: "custom", label: "Custom" },
]

export const moduleSources: ModuleSource[] = [
  { id: "webpage", name: "Webpage to Module", icon: "globe", description: "Turn any webpage into a curated email module.", color: "bg-primary/10 text-primary", category: "custom", popular: true },
  { id: "google-news", name: "Google News", icon: "newspaper", description: "Pull trending articles from Google News by keyword.", color: "bg-primary/10 text-primary", category: "news", popular: true },
  { id: "reddit", name: "Reddit", icon: "message-circle", description: "Curate top posts from any subreddit or topic.", color: "bg-chart-2/10 text-chart-2", category: "social", popular: true },
  { id: "youtube", name: "YouTube", icon: "play", description: "Summarize and feature top YouTube videos.", color: "bg-destructive/10 text-destructive", category: "media", popular: true },
  { id: "linkedin", name: "LinkedIn", icon: "linkedin", description: "Surface trending professional content and posts.", color: "bg-chart-1/10 text-chart-1", category: "social", popular: true },
  { id: "twitter", name: "X / Twitter", icon: "twitter", description: "Curate tweets and threads by keyword or account.", color: "bg-foreground/10 text-foreground", category: "social", popular: true },
  { id: "podcasts", name: "Podcasts", icon: "headphones", description: "Feature episodes and show notes from podcast feeds.", color: "bg-chart-4/10 text-chart-4", category: "media" },
  { id: "tiktok", name: "TikTok", icon: "clapperboard", description: "Surface trending TikTok content by topic.", color: "bg-foreground/10 text-foreground", category: "social" },
  { id: "rss-feed", name: "RSS Feed", icon: "rss", description: "Import content from any standard RSS or Atom feed.", color: "bg-chart-5/10 text-chart-5", category: "custom" },
  { id: "internal-blog", name: "Internal Blog", icon: "file-text", description: "Pull from your own blog or CMS for email.", color: "bg-chart-3/10 text-chart-3", category: "custom" },
  { id: "nytimes", name: "NYTimes", icon: "newspaper", description: "Curate top stories from The New York Times.", color: "bg-foreground/10 text-foreground", category: "news" },
  { id: "bbc", name: "BBC News", icon: "newspaper", description: "Surface global news coverage from BBC.", color: "bg-destructive/10 text-destructive", category: "news" },
  { id: "techcrunch", name: "TechCrunch", icon: "newspaper", description: "Latest startup and tech news from TechCrunch.", color: "bg-chart-2/10 text-chart-2", category: "news" },
  { id: "medium", name: "Medium", icon: "file-text", description: "Curate articles from Medium publications and tags.", color: "bg-foreground/10 text-foreground", category: "custom" },
  { id: "substack", name: "Substack", icon: "mail", description: "Import content from Substack newsletters.", color: "bg-chart-5/10 text-chart-5", category: "custom" },
  { id: "vimeo", name: "Vimeo", icon: "play", description: "Feature professional video content from Vimeo.", color: "bg-chart-1/10 text-chart-1", category: "media" },
  { id: "pinterest", name: "Pinterest", icon: "image", description: "Surface visual inspiration boards and pins.", color: "bg-destructive/10 text-destructive", category: "social" },
  { id: "bing-news", name: "Bing News", icon: "newspaper", description: "Aggregate news stories from Bing News index.", color: "bg-chart-2/10 text-chart-2", category: "news" },
  { id: "reuters", name: "Reuters", icon: "newspaper", description: "Professional wire service coverage from Reuters.", color: "bg-chart-5/10 text-chart-5", category: "news" },
  { id: "hackernews", name: "Hacker News", icon: "terminal", description: "Top stories from the Y Combinator community.", color: "bg-chart-4/10 text-chart-4", category: "social" },
  { id: "producthunt", name: "Product Hunt", icon: "rocket", description: "Daily top product launches and upvotes.", color: "bg-chart-4/10 text-chart-4", category: "social" },
  { id: "guardian", name: "The Guardian", icon: "newspaper", description: "World news and opinion from The Guardian.", color: "bg-chart-1/10 text-chart-1", category: "news" },
  { id: "cnn", name: "CNN", icon: "newspaper", description: "Breaking news and in-depth coverage from CNN.", color: "bg-destructive/10 text-destructive", category: "news" },
  { id: "forbes", name: "Forbes", icon: "newspaper", description: "Business, investing, and technology from Forbes.", color: "bg-foreground/10 text-foreground", category: "news" },
]

export const contentSources: ContentSource[] = moduleSources.slice(0, 6).map(({ category, popular, ...rest }) => rest)

export const mockModules: Module[] = [
  {
    id: "mod-1",
    name: "Business Analytics Trends",
    source: "Google News",
    sourceType: "google-news",
    industry: "SaaS",
    tone: "Professional",
    length: "Medium",
    summary: "Top business analytics trends reshaping how companies make data-driven decisions in 2026.",
    tags: ["analytics", "business", "data"],
    createdAt: "2026-02-18",
    updatedAt: "2026-02-20",
    status: "ready",
    commentary: { bulletSummary: true, bottomLine: true, whyItMatters: false, keyTakeaways: true },
  },
  {
    id: "mod-2",
    name: "EdTech Weekly Roundup",
    source: "Reddit",
    sourceType: "reddit",
    industry: "Education",
    tone: "Conversational",
    length: "Long",
    summary: "Weekly roundup of the most discussed EdTech topics from r/edtech and r/education.",
    tags: ["edtech", "education", "weekly"],
    createdAt: "2026-02-15",
    updatedAt: "2026-02-21",
    status: "ready",
    commentary: { bulletSummary: true, bottomLine: false, whyItMatters: true, keyTakeaways: true },
  },
  {
    id: "mod-3",
    name: "AI in Healthcare",
    source: "Google News",
    sourceType: "google-news",
    industry: "Healthcare",
    tone: "Academic",
    length: "Long",
    summary: "Breakthroughs in AI-powered diagnostics and patient care improvements across leading hospitals.",
    tags: ["AI", "healthcare", "research"],
    createdAt: "2026-02-10",
    updatedAt: "2026-02-19",
    status: "draft",
    commentary: { bulletSummary: true, bottomLine: true, whyItMatters: true, keyTakeaways: false },
  },
  {
    id: "mod-4",
    name: "Startup Funding Highlights",
    source: "Custom URL",
    sourceType: "custom-url",
    industry: "SaaS",
    tone: "Punchy",
    length: "Short",
    summary: "This week's biggest funding rounds and what they mean for the startup ecosystem.",
    tags: ["startups", "funding", "VC"],
    createdAt: "2026-02-12",
    updatedAt: "2026-02-22",
    status: "ready",
    commentary: { bulletSummary: false, bottomLine: true, whyItMatters: false, keyTakeaways: true },
  },
  {
    id: "mod-5",
    name: "Marketing Video Digest",
    source: "YouTube",
    sourceType: "youtube",
    industry: "Marketing",
    tone: "Conversational",
    length: "Medium",
    summary: "Top marketing strategy videos from industry leaders, summarized for quick consumption.",
    tags: ["marketing", "video", "strategy"],
    createdAt: "2026-02-08",
    updatedAt: "2026-02-17",
    status: "draft",
    commentary: { bulletSummary: true, bottomLine: false, whyItMatters: true, keyTakeaways: false },
  },
  {
    id: "mod-6",
    name: "Podcast Picks: Leadership",
    source: "Podcasts",
    sourceType: "podcasts",
    industry: "Education",
    tone: "Professional",
    length: "Short",
    summary: "Curated leadership podcast episodes with key insights for aspiring managers.",
    tags: ["leadership", "podcasts", "management"],
    createdAt: "2026-02-05",
    updatedAt: "2026-02-16",
    status: "ready",
    commentary: { bulletSummary: true, bottomLine: true, whyItMatters: false, keyTakeaways: true },
  },
]

export const mockEmails: Email[] = [
  { id: "email-1", name: "SaaS Weekly Digest", audience: "SaaS", lastEdited: "2026-02-22", status: "ready", moduleCount: 4 },
  { id: "email-2", name: "EdTech Monthly Roundup", audience: "Education", lastEdited: "2026-02-21", status: "draft", moduleCount: 3 },
  { id: "email-3", name: "Healthcare Innovation Brief", audience: "Healthcare", lastEdited: "2026-02-19", status: "draft", moduleCount: 2 },
  { id: "email-4", name: "Marketing Tips Newsletter", audience: "Marketing", lastEdited: "2026-02-18", status: "ready", moduleCount: 5 },
  { id: "email-5", name: "Startup Ecosystem Update", audience: "SaaS", lastEdited: "2026-02-15", status: "draft", moduleCount: 3 },
]

export const layoutTemplates: LayoutTemplate[] = [
  { id: "layout-1", name: "Single Column Article", description: "Clean, focused single-column layout perfect for long-form content.", columns: 1, preview: "single" },
  { id: "layout-2", name: "Two Column Split", description: "Side-by-side columns for comparing or pairing content modules.", columns: 2, preview: "split" },
  { id: "layout-3", name: "Three Column Roundup", description: "Grid-style layout ideal for news roundups and digest emails.", columns: 3, preview: "grid" },
  { id: "layout-4", name: "Feature + Sidebar", description: "Hero feature module with a supporting sidebar for secondary content.", columns: 2, preview: "feature" },
  { id: "layout-5", name: "Newsletter Classic", description: "Traditional newsletter format with header, body sections, and footer.", columns: 1, preview: "newsletter" },
]

export const suggestedModules = [
  { id: "sug-1", name: "K-12 Digital Learning Trends", industry: "Education", source: "Google News" },
  { id: "sug-2", name: "Higher Ed Policy Updates", industry: "Education", source: "Custom URL" },
  { id: "sug-3", name: "EdTech Tool Reviews", industry: "Education", source: "YouTube" },
  { id: "sug-4", name: "Teacher Community Picks", industry: "Education", source: "Reddit" },
  { id: "sug-5", name: "Education Podcast Spotlight", industry: "Education", source: "Podcasts" },
]

export const topicTags = [
  { label: "Technology", count: 161 },
  { label: "Business", count: 52 },
  { label: "Marketing", count: 38 },
  { label: "News", count: 37 },
  { label: "Science", count: 73 },
  { label: "Health", count: 37 },
  { label: "Finance", count: 52 },
  { label: "Design", count: 22 },
  { label: "Education", count: 45 },
  { label: "Gaming", count: 32 },
  { label: "Entertainment", count: 24 },
  { label: "Sports", count: 15 },
  { label: "AI", count: 89 },
  { label: "Crypto", count: 18 },
  { label: "Real Estate", count: 22 },
  { label: "Travel", count: 21 },
  { label: "Lifestyle", count: 78 },
  { label: "E-Commerce", count: 30 },
]

export const industries = ["Education", "SaaS", "Healthcare", "Marketing", "Finance", "E-Commerce", "Real Estate"]
export const tones = ["Professional", "Conversational", "Academic", "Punchy"]
export const lengths = ["Short", "Medium", "Long"]
