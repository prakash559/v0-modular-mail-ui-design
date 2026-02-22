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

export const contentSources: ContentSource[] = [
  {
    id: "google-news",
    name: "Google News",
    icon: "newspaper",
    description: "Pull trending articles and headlines from Google News based on your keywords.",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: "message-circle",
    description: "Curate top posts and discussions from any subreddit or topic.",
    color: "bg-chart-2/10 text-chart-2",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "play",
    description: "Embed and summarize top YouTube videos relevant to your audience.",
    color: "bg-destructive/10 text-destructive",
  },
  {
    id: "podcasts",
    name: "Podcasts",
    icon: "headphones",
    description: "Feature episodes and show notes from popular podcast feeds.",
    color: "bg-chart-4/10 text-chart-4",
  },
  {
    id: "custom-url",
    name: "Custom URL",
    icon: "link",
    description: "Import content from any RSS feed or web page you specify.",
    color: "bg-chart-5/10 text-chart-5",
  },
  {
    id: "internal-blog",
    name: "Internal Blog",
    icon: "file-text",
    description: "Pull from your own blog or CMS to repurpose content for email.",
    color: "bg-chart-3/10 text-chart-3",
  },
]

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

export const industries = ["Education", "SaaS", "Healthcare", "Marketing", "Finance", "E-Commerce", "Real Estate"]
export const tones = ["Professional", "Conversational", "Academic", "Punchy"]
export const lengths = ["Short", "Medium", "Long"]
