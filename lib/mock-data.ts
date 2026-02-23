/* ─── Core Types ─── */

export type Module = {
  id: string
  name: string
  source: string
  sourceType: string
  moduleType: "feeds" | "insights" | "editorial"
  layoutId: string
  industry: string
  tone: string
  length: string
  summary: string
  imageUrl?: string
  tags: string[]
  createdAt: string
  updatedAt: string
  status: "draft" | "ready"
  topic: string
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
  moduleIds: string[]
}

export type ContentSource = {
  id: string
  name: string
  icon: string
  description: string
  color: string
}

/* ─── Module Source Types ─── */

export type ModuleSourceCategory = "all" | "social" | "news" | "media" | "custom"

export type ModuleSource = ContentSource & {
  category: ModuleSourceCategory
  popular?: boolean
}

/* ─── Module Layout Types ─── */

export type LayoutFamily = "compact" | "feature" | "social" | "data" | "editorial-text"

export type ModuleLayout = {
  id: string
  name: string
  family: LayoutFamily
  columns: number
  compatibleModules: ("feeds" | "insights" | "editorial")[]
  imagePlacement: string
  mobileBehavior: "stack" | "collapse"
  description: string
}

/* ─── Editorial Module Types ─── */

export type EditorialType = {
  id: string
  name: string
  description: string
  icon: string
}

/* ─── Insight Topic Types ─── */

export type InsightTopic = {
  id: string
  label: string
  description: string
  icon: string
  count: number
}

/* ─── Static Data: Module Layouts (from spreadsheet) ─── */

export const moduleLayouts: ModuleLayout[] = [
  {
    id: "stacked-cards",
    name: "Stacked Cards",
    family: "compact",
    columns: 1,
    compatibleModules: ["feeds", "insights"],
    imagePlacement: "Top thumbnail",
    mobileBehavior: "stack",
    description: "Single-column cards stacked vertically with top thumbnail images. Clean and scannable.",
  },
  {
    id: "2-column-grid",
    name: "2-Column Grid",
    family: "compact",
    columns: 2,
    compatibleModules: ["feeds"],
    imagePlacement: "Top thumbnail",
    mobileBehavior: "collapse",
    description: "Two cards side-by-side that collapse to a single column on mobile.",
  },
  {
    id: "3-card-grid",
    name: "3-Card Grid",
    family: "compact",
    columns: 3,
    compatibleModules: ["feeds"],
    imagePlacement: "Top thumbnail",
    mobileBehavior: "stack",
    description: "Three-column card grid ideal for roundups and digest-style modules.",
  },
  {
    id: "editorial-block",
    name: "Editorial Block",
    family: "feature",
    columns: 1,
    compatibleModules: ["editorial", "insights"],
    imagePlacement: "Optional header image",
    mobileBehavior: "stack",
    description: "Full-width editorial format with optional hero image. Great for opinion pieces.",
  },
  {
    id: "split-feature",
    name: "Split Feature",
    family: "feature",
    columns: 2,
    compatibleModules: ["insights", "editorial"],
    imagePlacement: "Left image",
    mobileBehavior: "stack",
    description: "Image on the left, text on the right. Perfect for featured stories.",
  },
  {
    id: "social-card",
    name: "Social Card",
    family: "social",
    columns: 1,
    compatibleModules: ["feeds"],
    imagePlacement: "Avatar left",
    mobileBehavior: "stack",
    description: "Social-media-style card with avatar, author name, and post preview.",
  },
  {
    id: "big-stat-block",
    name: "Big Stat Block",
    family: "data",
    columns: 1,
    compatibleModules: ["insights"],
    imagePlacement: "None",
    mobileBehavior: "stack",
    description: "A single bold statistic with supporting context text. High visual impact.",
  },
  {
    id: "3-stat-grid",
    name: "3-Stat Grid",
    family: "data",
    columns: 3,
    compatibleModules: ["insights"],
    imagePlacement: "None",
    mobileBehavior: "stack",
    description: "Three key statistics in a row with labels and trend indicators.",
  },
  {
    id: "comparison-table",
    name: "Comparison Table",
    family: "data",
    columns: 2,
    compatibleModules: ["insights"],
    imagePlacement: "None",
    mobileBehavior: "stack",
    description: "Side-by-side comparison of two items, metrics, or options.",
  },
]

/* ─── Editorial text-based layout options ─── */

export const editorialTextLayouts: ModuleLayout[] = [
  {
    id: "short-form",
    name: "Short Form",
    family: "editorial-text",
    columns: 1,
    compatibleModules: ["editorial", "insights"],
    imagePlacement: "None",
    mobileBehavior: "stack",
    description: "2-3 concise sentences. Quick reads and brief commentary.",
  },
  {
    id: "mid-form-bullets",
    name: "Mid-Form with Bullets",
    family: "editorial-text",
    columns: 1,
    compatibleModules: ["editorial", "insights"],
    imagePlacement: "None",
    mobileBehavior: "stack",
    description: "Opening paragraph followed by bullet points. Structured and scannable.",
  },
  {
    id: "long-form",
    name: "Long Form",
    family: "editorial-text",
    columns: 1,
    compatibleModules: ["editorial", "insights"],
    imagePlacement: "Optional header image",
    mobileBehavior: "stack",
    description: "Full article-length content with paragraphs. Deep dives and thought leadership.",
  },
]

/* ─── Editorial Module Types ─── */

export const editorialTypes: EditorialType[] = [
  {
    id: "welcome-note",
    name: "Welcome Note",
    description: "A personal greeting from the sender. Sets the tone for the entire email.",
    icon: "hand-metal",
  },
  {
    id: "editorial-view",
    name: "Editorial View",
    description: "Your unique perspective or opinion on a trending topic in your industry.",
    icon: "pen-line",
  },
  {
    id: "what-this-means",
    name: "What This Means",
    description: "Contextual analysis explaining the significance of a news item or trend.",
    icon: "lightbulb",
  },
  {
    id: "emerging-topic",
    name: "Emerging Topic",
    description: "Early signal on a topic just starting to gain traction in your space.",
    icon: "trending-up",
  },
  {
    id: "office-conversations",
    name: "Office Conversations",
    description: "Casual, relatable insights styled like watercooler chat. Humanizes your brand.",
    icon: "message-circle",
  },
]

/* ─── Insight Topics ─── */

export const insightTopics: InsightTopic[] = [
  { id: "industry-trends", label: "Industry Trends", description: "Key movements shaping your industry", icon: "trending-up", count: 89 },
  { id: "market-data", label: "Market Data", description: "Statistics, benchmarks, and financial figures", icon: "bar-chart-3", count: 52 },
  { id: "competitor-analysis", label: "Competitor Analysis", description: "What competitors are doing and how they compare", icon: "search", count: 38 },
  { id: "customer-insights", label: "Customer Insights", description: "Behavioral data and audience sentiment", icon: "users", count: 45 },
  { id: "technology-shifts", label: "Technology Shifts", description: "New tools, platforms, and tech disruptions", icon: "cpu", count: 73 },
  { id: "regulatory-changes", label: "Regulatory Changes", description: "Policy and regulation updates impacting business", icon: "shield", count: 22 },
  { id: "sustainability", label: "Sustainability", description: "ESG, green initiatives, and climate impact", icon: "leaf", count: 18 },
  { id: "workforce-talent", label: "Workforce & Talent", description: "Hiring trends, skills gaps, and workplace shifts", icon: "briefcase", count: 32 },
  { id: "innovation", label: "Innovation", description: "Breakthrough ideas, patents, and R&D highlights", icon: "sparkles", count: 67 },
  { id: "global-economy", label: "Global Economy", description: "Macro-economic indicators and trade developments", icon: "globe", count: 41 },
]

/* ─── Module Categories for Creation Tabs ─── */

export const moduleCategories: { id: ModuleSourceCategory; label: string }[] = [
  { id: "all", label: "All Sources" },
  { id: "social", label: "Social" },
  { id: "news", label: "News" },
  { id: "media", label: "Media" },
  { id: "custom", label: "Custom" },
]

/* ─── Feed Sources (websites for Feeds tab) ─── */

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

/* ─── Mock Modules ─── */

export const mockModules: Module[] = [
  {
    id: "mod-1",
    name: "Business Analytics Trends",
    source: "Google News",
    sourceType: "google-news",
    moduleType: "feeds",
    layoutId: "stacked-cards",
    industry: "SaaS",
    tone: "Professional",
    length: "Medium",
    summary: "Top business analytics trends reshaping how companies make data-driven decisions in 2026.",
    tags: ["analytics", "business", "data"],
    createdAt: "2026-02-18",
    updatedAt: "2026-02-20",
    status: "ready",
    topic: "Business Analytics",
    commentary: { bulletSummary: true, bottomLine: true, whyItMatters: false, keyTakeaways: true },
  },
  {
    id: "mod-2",
    name: "EdTech Weekly Roundup",
    source: "Reddit",
    sourceType: "reddit",
    moduleType: "feeds",
    layoutId: "2-column-grid",
    industry: "Education",
    tone: "Conversational",
    length: "Long",
    summary: "Weekly roundup of the most discussed EdTech topics from r/edtech and r/education.",
    tags: ["edtech", "education", "weekly"],
    createdAt: "2026-02-15",
    updatedAt: "2026-02-21",
    status: "ready",
    topic: "Education Technology",
    commentary: { bulletSummary: true, bottomLine: false, whyItMatters: true, keyTakeaways: true },
  },
  {
    id: "mod-3",
    name: "AI in Healthcare",
    source: "Google News",
    sourceType: "google-news",
    moduleType: "insights",
    layoutId: "big-stat-block",
    industry: "Healthcare",
    tone: "Academic",
    length: "Long",
    summary: "Breakthroughs in AI-powered diagnostics and patient care improvements across leading hospitals.",
    tags: ["AI", "healthcare", "research"],
    createdAt: "2026-02-10",
    updatedAt: "2026-02-19",
    status: "draft",
    topic: "Healthcare AI",
    commentary: { bulletSummary: true, bottomLine: true, whyItMatters: true, keyTakeaways: false },
  },
  {
    id: "mod-4",
    name: "Startup Funding Highlights",
    source: "Custom URL",
    sourceType: "custom-url",
    moduleType: "feeds",
    layoutId: "3-card-grid",
    industry: "SaaS",
    tone: "Punchy",
    length: "Short",
    summary: "This week's biggest funding rounds and what they mean for the startup ecosystem.",
    tags: ["startups", "funding", "VC"],
    createdAt: "2026-02-12",
    updatedAt: "2026-02-22",
    status: "ready",
    topic: "Startup Ecosystem",
    commentary: { bulletSummary: false, bottomLine: true, whyItMatters: false, keyTakeaways: true },
  },
  {
    id: "mod-5",
    name: "Marketing Video Digest",
    source: "YouTube",
    sourceType: "youtube",
    moduleType: "feeds",
    layoutId: "social-card",
    industry: "Marketing",
    tone: "Conversational",
    length: "Medium",
    summary: "Top marketing strategy videos from industry leaders, summarized for quick consumption.",
    tags: ["marketing", "video", "strategy"],
    createdAt: "2026-02-08",
    updatedAt: "2026-02-17",
    status: "draft",
    topic: "Marketing Strategy",
    commentary: { bulletSummary: true, bottomLine: false, whyItMatters: true, keyTakeaways: false },
  },
  {
    id: "mod-6",
    name: "Weekly Welcome Note",
    source: "Editorial",
    sourceType: "welcome-note",
    moduleType: "editorial",
    layoutId: "short-form",
    industry: "Education",
    tone: "Conversational",
    length: "Short",
    summary: "A warm personal greeting to kick off each weekly newsletter edition.",
    tags: ["welcome", "editorial", "intro"],
    createdAt: "2026-02-05",
    updatedAt: "2026-02-16",
    status: "ready",
    topic: "Newsletter Intro",
    commentary: { bulletSummary: false, bottomLine: false, whyItMatters: false, keyTakeaways: false },
  },
  {
    id: "mod-7",
    name: "The AI Regulation Debate",
    source: "Editorial",
    sourceType: "editorial-view",
    moduleType: "editorial",
    layoutId: "editorial-block",
    industry: "SaaS",
    tone: "Professional",
    length: "Long",
    summary: "Our editorial take on the growing push for AI regulation and what it means for SaaS companies.",
    tags: ["AI", "regulation", "opinion"],
    createdAt: "2026-02-14",
    updatedAt: "2026-02-20",
    status: "ready",
    topic: "AI Policy",
    commentary: { bulletSummary: false, bottomLine: true, whyItMatters: true, keyTakeaways: false },
  },
  {
    id: "mod-8",
    name: "Q1 SaaS Benchmark Data",
    source: "Insights",
    sourceType: "market-data",
    moduleType: "insights",
    layoutId: "3-stat-grid",
    industry: "SaaS",
    tone: "Professional",
    length: "Medium",
    summary: "Key SaaS metrics for Q1 2026 including ARR growth, churn rates, and NRR benchmarks.",
    tags: ["SaaS", "benchmarks", "data"],
    createdAt: "2026-02-19",
    updatedAt: "2026-02-23",
    status: "ready",
    topic: "SaaS Metrics",
    commentary: { bulletSummary: true, bottomLine: true, whyItMatters: false, keyTakeaways: true },
  },
]

/* ─── Mock Emails ─── */

export const mockEmails: Email[] = [
  { id: "email-1", name: "SaaS Weekly Digest", audience: "SaaS", lastEdited: "2026-02-22", status: "ready", moduleCount: 4, moduleIds: ["mod-1", "mod-4", "mod-7", "mod-8"] },
  { id: "email-2", name: "EdTech Monthly Roundup", audience: "Education", lastEdited: "2026-02-21", status: "draft", moduleCount: 3, moduleIds: ["mod-2", "mod-6", "mod-3"] },
  { id: "email-3", name: "Healthcare Innovation Brief", audience: "Healthcare", lastEdited: "2026-02-19", status: "draft", moduleCount: 2, moduleIds: ["mod-3", "mod-5"] },
  { id: "email-4", name: "Marketing Tips Newsletter", audience: "Marketing", lastEdited: "2026-02-18", status: "ready", moduleCount: 5, moduleIds: ["mod-5", "mod-1", "mod-2", "mod-4", "mod-8"] },
  { id: "email-5", name: "Startup Ecosystem Update", audience: "SaaS", lastEdited: "2026-02-15", status: "draft", moduleCount: 3, moduleIds: ["mod-4", "mod-7", "mod-1"] },
]

/* ─── Legacy layout templates (for email editor sidebar) ─── */

export const layoutTemplates = moduleLayouts.map((l) => ({
  id: l.id,
  name: l.name,
  description: l.description,
  columns: l.columns,
  preview: l.family,
}))

/* ─── Other Static Data ─── */

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
