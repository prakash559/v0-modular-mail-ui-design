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

export type ModuleSourceCategory = "all" | "social" | "news" | "media" | "sports" | "custom"

export type ModuleSource = ContentSource & {
  category: ModuleSourceCategory
  popular?: boolean
}

/* ─── Module Layout Types ─── */

export type LayoutFamily = "compact" | "feature" | "social" | "data" | "editorial-text"

export type LayoutColumnFilter = "all" | "1" | "2" | "3" | "video" | "text"

export type ModuleLayout = {
  id: string
  name: string
  family: LayoutFamily
  columns: number
  compatibleModules: ("feeds" | "insights" | "editorial")[]
  imagePlacement: string
  mobileBehavior: "stack" | "collapse"
  description: string
  columnFilter: LayoutColumnFilter
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
}

/* ─── Static Data: All Module Layouts ─── */

export const moduleLayouts: ModuleLayout[] = [
  // From original spreadsheet
  { id: "stacked-cards", name: "Stacked Cards", family: "compact", columns: 1, compatibleModules: ["feeds", "insights"], imagePlacement: "Top thumbnail", mobileBehavior: "stack", description: "Single-column cards stacked vertically with top thumbnail images.", columnFilter: "1" },
  { id: "2-column-grid", name: "2-Column Grid", family: "compact", columns: 2, compatibleModules: ["feeds"], imagePlacement: "Top thumbnail", mobileBehavior: "collapse", description: "Two cards side-by-side that collapse to single column on mobile.", columnFilter: "2" },
  { id: "3-card-grid", name: "3-Card Grid", family: "compact", columns: 3, compatibleModules: ["feeds"], imagePlacement: "Top thumbnail", mobileBehavior: "stack", description: "Three-column card grid ideal for roundups and digest-style modules.", columnFilter: "3" },
  { id: "editorial-block", name: "Editorial Block", family: "feature", columns: 1, compatibleModules: ["editorial", "insights"], imagePlacement: "Optional header image", mobileBehavior: "stack", description: "Full-width editorial format with optional hero image.", columnFilter: "1" },
  { id: "split-feature", name: "Split Feature", family: "feature", columns: 2, compatibleModules: ["insights", "editorial"], imagePlacement: "Left image", mobileBehavior: "stack", description: "Image on the left, text on the right.", columnFilter: "2" },
  { id: "social-card", name: "Social Card", family: "social", columns: 1, compatibleModules: ["feeds"], imagePlacement: "Avatar left", mobileBehavior: "stack", description: "Social-media-style card with avatar and post preview.", columnFilter: "1" },
  { id: "big-stat-block", name: "Big Stat Block", family: "data", columns: 1, compatibleModules: ["insights"], imagePlacement: "None", mobileBehavior: "stack", description: "A single bold statistic with supporting context text.", columnFilter: "1" },
  { id: "3-stat-grid", name: "3-Stat Grid", family: "data", columns: 3, compatibleModules: ["insights"], imagePlacement: "None", mobileBehavior: "stack", description: "Three key statistics in a row with labels and indicators.", columnFilter: "3" },
  { id: "comparison-table", name: "Comparison Table", family: "data", columns: 2, compatibleModules: ["insights"], imagePlacement: "None", mobileBehavior: "stack", description: "Side-by-side comparison of two items or metrics.", columnFilter: "2" },
  // From 1pasted-text
  { id: "single-column-card", name: "Single Column Card", family: "compact", columns: 1, compatibleModules: ["feeds", "insights"], imagePlacement: "Optional 16:9 image", mobileBehavior: "stack", description: "Optional image, title, 2-4 lines text, text CTA.", columnFilter: "1" },
  { id: "single-column-long", name: "Single Column Long Form", family: "feature", columns: 1, compatibleModules: ["editorial"], imagePlacement: "Optional hero image", mobileBehavior: "stack", description: "Hero image, title, subtitle, long-form body, bullet section, CTA.", columnFilter: "text" },
  { id: "image-title-only", name: "Image + Title Only", family: "compact", columns: 1, compatibleModules: ["feeds"], imagePlacement: "Required image", mobileBehavior: "stack", description: "Image and title only, no body text. Visual-heavy.", columnFilter: "1" },
  { id: "video-card", name: "Video Card", family: "feature", columns: 1, compatibleModules: ["feeds"], imagePlacement: "16:9 thumbnail", mobileBehavior: "stack", description: "Video thumbnail with play overlay, title, summary, CTA.", columnFilter: "video" },
  { id: "bullet-insight-block", name: "Bullet Insight Block", family: "data", columns: 1, compatibleModules: ["insights"], imagePlacement: "None", mobileBehavior: "stack", description: "Section title, 3-5 bullet points, optional highlighted line.", columnFilter: "text" },
  // From 2pasted-text
  { id: "split-feature-card", name: "Split Feature Card", family: "feature", columns: 2, compatibleModules: ["feeds", "editorial"], imagePlacement: "Left image", mobileBehavior: "stack", description: "Image on left, title + text on right, CTA below.", columnFilter: "2" },
  { id: "centered-feature", name: "Centered Feature Block", family: "feature", columns: 1, compatibleModules: ["editorial"], imagePlacement: "Optional centered image", mobileBehavior: "stack", description: "Centered image, title, paragraphs, button CTA.", columnFilter: "1" },
  { id: "compact-list-view", name: "Compact List View", family: "compact", columns: 1, compatibleModules: ["feeds", "insights"], imagePlacement: "None", mobileBehavior: "stack", description: "Title + 1-line description per row. Scannable digest.", columnFilter: "text" },
  { id: "numbered-insight", name: "Numbered Insight Block", family: "data", columns: 1, compatibleModules: ["insights"], imagePlacement: "None", mobileBehavior: "stack", description: "Section title, 3-5 numbered points with descriptions.", columnFilter: "text" },
  { id: "highlight-panel", name: "Highlight Panel", family: "feature", columns: 1, compatibleModules: ["insights", "editorial"], imagePlacement: "None", mobileBehavior: "stack", description: "Subtle background block with short statement or CTA.", columnFilter: "text" },
  { id: "hero-grid-below", name: "Hero + Grid Below", family: "feature", columns: 2, compatibleModules: ["feeds"], imagePlacement: "Top hero", mobileBehavior: "stack", description: "Large feature card on top, 2-column grid below.", columnFilter: "2" },
  { id: "icon-text-grid", name: "Icon + Text Grid", family: "compact", columns: 3, compatibleModules: ["feeds", "insights"], imagePlacement: "Icon above", mobileBehavior: "stack", description: "Small icon above title, 1-line description below.", columnFilter: "3" },
  { id: "image-overlay-card", name: "Image Overlay Card", family: "feature", columns: 1, compatibleModules: ["feeds"], imagePlacement: "Full-width overlay", mobileBehavior: "stack", description: "Full-width image with title overlay text.", columnFilter: "1" },
  { id: "side-accent-editorial", name: "Side Accent Editorial", family: "feature", columns: 1, compatibleModules: ["editorial"], imagePlacement: "None", mobileBehavior: "stack", description: "Title, body text, thin vertical accent line beside content.", columnFilter: "text" },
]

export const layoutColumnFilters: { id: LayoutColumnFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "1", label: "1 Column" },
  { id: "2", label: "2 Column" },
  { id: "3", label: "3 Column" },
  { id: "video", label: "Video" },
  { id: "text", label: "Text" },
]

/* ─── Editorial Module Types ─── */

export const editorialTypes: EditorialType[] = [
  { id: "welcome-note", name: "Welcome Note", description: "A short opening message that frames the edition and sets the tone.", icon: "hand-metal" },
  { id: "editorial-view", name: "Editorial View", description: "A concise opinion or perspective on a current theme or development.", icon: "pen-line" },
  { id: "what-were-noticing", name: "What We're Noticing", description: "A brief reflection on patterns or shifts emerging in the space.", icon: "eye" },
  { id: "emerging-topic", name: "Emerging Topic", description: "A commentary block highlighting a new idea gaining traction.", icon: "trending-up" },
  { id: "from-the-desk", name: "From the Desk", description: "A more personal leadership-style message grounded in experience.", icon: "briefcase" },
  { id: "office-conversation", name: "Office Conversation", description: "A light, human summary of a recent discussion or debate.", icon: "message-circle" },
  { id: "in-perspective", name: "In Perspective", description: "A short contextual piece explaining why something matters right now.", icon: "lightbulb" },
  { id: "behind-the-scenes", name: "Behind the Scenes", description: "A glimpse into internal thinking, process, or observations.", icon: "search" },
  { id: "this-week-in-focus", name: "This Week in Focus", description: "A framing statement explaining the theme of the edition.", icon: "target" },
  { id: "looking-ahead", name: "Looking Ahead", description: "A forward-facing note outlining what to watch in the coming weeks.", icon: "arrow-right" },
]

/* ─── Insight Topics ─── */

export const insightTopics: InsightTopic[] = [
  { id: "tip-of-week", label: "Tip of the Week", description: "A short, actionable recommendation your audience can apply immediately.", icon: "lightbulb" },
  { id: "word-of-week", label: "Word of the Week", description: "A relevant term explained in simple, practical language.", icon: "book-open" },
  { id: "key-takeaways", label: "Key Takeaways", description: "A concise summary of the most important lessons from this week's content.", icon: "list" },
  { id: "myth-vs-reality", label: "Myth vs Reality", description: "A common misconception clarified with a grounded, factual perspective.", icon: "shield" },
  { id: "trend-breakdown", label: "Trend Breakdown", description: "A simplified explanation of an emerging shift and why it matters.", icon: "trending-up" },
  { id: "quick-explainer", label: "Quick Explainer", description: "A short, structured breakdown of a concept your audience should understand.", icon: "zap" },
  { id: "data-insight", label: "Data Insight", description: "A single statistic highlighted with context and interpretation.", icon: "bar-chart-3" },
  { id: "strategy-snapshot", label: "Strategy Snapshot", description: "A practical framework or approach distilled into 2-4 clear points.", icon: "target" },
  { id: "what-this-means", label: "What This Means", description: "A brief interpretation translating broader developments into audience impact.", icon: "message-circle" },
  { id: "checklist", label: "Checklist", description: "A short, scannable list to guide action or evaluation.", icon: "check-square" },
]

/* ─── Module Categories for Creation Tabs ─── */

export const moduleCategories: { id: ModuleSourceCategory; label: string }[] = [
  { id: "all", label: "All Sources" },
  { id: "social", label: "Social" },
  { id: "news", label: "News" },
  { id: "media", label: "Media" },
  { id: "sports", label: "Sports" },
  { id: "custom", label: "Custom" },
]

/* ─── Business verticals for sidebar catalogue ─── */

export const businessVerticals: { label: string; count: number }[] = [
  { label: "Technology", count: 161 },
  { label: "Business", count: 52 },
  { label: "Marketing", count: 38 },
  { label: "Finance", count: 52 },
  { label: "Healthcare", count: 37 },
  { label: "Education", count: 45 },
  { label: "Real Estate", count: 22 },
  { label: "E-Commerce", count: 30 },
  { label: "SaaS", count: 89 },
  { label: "Entertainment", count: 24 },
  { label: "Sports", count: 15 },
  { label: "Science", count: 73 },
  { label: "Design", count: 22 },
  { label: "Lifestyle", count: 78 },
  { label: "Gaming", count: 32 },
  { label: "AI", count: 89 },
  { label: "Crypto", count: 18 },
  { label: "Travel", count: 21 },
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
  { id: "espn", name: "ESPN", icon: "newspaper", description: "Sports news, scores, and analysis from ESPN.", color: "bg-destructive/10 text-destructive", category: "sports" },
  { id: "bleacher-report", name: "Bleacher Report", icon: "newspaper", description: "Sports highlights, commentary, and trending stories.", color: "bg-chart-4/10 text-chart-4", category: "sports" },
  { id: "the-athletic", name: "The Athletic", icon: "newspaper", description: "In-depth sports journalism and analysis.", color: "bg-chart-2/10 text-chart-2", category: "sports" },
]

export const contentSources: ContentSource[] = moduleSources.slice(0, 6).map(({ category, popular, ...rest }) => rest)

/* ─── Mock Modules ─── */

export const mockModules: Module[] = [
  {
    id: "mod-1", name: "Business Analytics Trends", source: "Google News", sourceType: "google-news", moduleType: "feeds", layoutId: "stacked-cards", industry: "SaaS", tone: "Professional", length: "Medium",
    summary: "Top business analytics trends reshaping how companies make data-driven decisions in 2026.", tags: ["analytics", "business", "data"], createdAt: "2026-02-18", updatedAt: "2026-02-20", status: "ready", topic: "Business Analytics",
    commentary: { bulletSummary: true, bottomLine: true, whyItMatters: false, keyTakeaways: true },
  },
  {
    id: "mod-2", name: "EdTech Weekly Roundup", source: "Reddit", sourceType: "reddit", moduleType: "feeds", layoutId: "2-column-grid", industry: "Education", tone: "Conversational", length: "Long",
    summary: "Weekly roundup of the most discussed EdTech topics from r/edtech and r/education.", tags: ["edtech", "education", "weekly"], createdAt: "2026-02-15", updatedAt: "2026-02-21", status: "ready", topic: "Education Technology",
    commentary: { bulletSummary: true, bottomLine: false, whyItMatters: true, keyTakeaways: true },
  },
  {
    id: "mod-3", name: "AI in Healthcare", source: "Google News", sourceType: "google-news", moduleType: "insights", layoutId: "big-stat-block", industry: "Healthcare", tone: "Academic", length: "Long",
    summary: "Breakthroughs in AI-powered diagnostics and patient care improvements across leading hospitals.", tags: ["AI", "healthcare", "research"], createdAt: "2026-02-10", updatedAt: "2026-02-19", status: "draft", topic: "Healthcare AI",
    commentary: { bulletSummary: true, bottomLine: true, whyItMatters: true, keyTakeaways: false },
  },
  {
    id: "mod-4", name: "Startup Funding Highlights", source: "Custom URL", sourceType: "custom-url", moduleType: "feeds", layoutId: "3-card-grid", industry: "SaaS", tone: "Punchy", length: "Short",
    summary: "This week's biggest funding rounds and what they mean for the startup ecosystem.", tags: ["startups", "funding", "VC"], createdAt: "2026-02-12", updatedAt: "2026-02-22", status: "ready", topic: "Startup Ecosystem",
    commentary: { bulletSummary: false, bottomLine: true, whyItMatters: false, keyTakeaways: true },
  },
  {
    id: "mod-5", name: "Marketing Video Digest", source: "YouTube", sourceType: "youtube", moduleType: "feeds", layoutId: "social-card", industry: "Marketing", tone: "Conversational", length: "Medium",
    summary: "Top marketing strategy videos from industry leaders, summarized for quick consumption.", tags: ["marketing", "video", "strategy"], createdAt: "2026-02-08", updatedAt: "2026-02-17", status: "draft", topic: "Marketing Strategy",
    commentary: { bulletSummary: true, bottomLine: false, whyItMatters: true, keyTakeaways: false },
  },
  {
    id: "mod-6", name: "Weekly Welcome Note", source: "Editorial", sourceType: "welcome-note", moduleType: "editorial", layoutId: "side-accent-editorial", industry: "Education", tone: "Conversational", length: "Short",
    summary: "A warm personal greeting to kick off each weekly newsletter edition.", tags: ["welcome", "editorial", "intro"], createdAt: "2026-02-05", updatedAt: "2026-02-16", status: "ready", topic: "Newsletter Intro",
    commentary: { bulletSummary: false, bottomLine: false, whyItMatters: false, keyTakeaways: false },
  },
  {
    id: "mod-7", name: "The AI Regulation Debate", source: "Editorial", sourceType: "editorial-view", moduleType: "editorial", layoutId: "editorial-block", industry: "SaaS", tone: "Professional", length: "Long",
    summary: "Our editorial take on the growing push for AI regulation and what it means for SaaS companies.", tags: ["AI", "regulation", "opinion"], createdAt: "2026-02-14", updatedAt: "2026-02-20", status: "ready", topic: "AI Policy",
    commentary: { bulletSummary: false, bottomLine: true, whyItMatters: true, keyTakeaways: false },
  },
  {
    id: "mod-8", name: "Q1 SaaS Benchmark Data", source: "Insights", sourceType: "market-data", moduleType: "insights", layoutId: "3-stat-grid", industry: "SaaS", tone: "Professional", length: "Medium",
    summary: "Key SaaS metrics for Q1 2026 including ARR growth, churn rates, and NRR benchmarks.", tags: ["SaaS", "benchmarks", "data"], createdAt: "2026-02-19", updatedAt: "2026-02-23", status: "ready", topic: "SaaS Metrics",
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

export const industries = ["Education", "SaaS", "Healthcare", "Marketing", "Finance", "E-Commerce", "Real Estate"]

export const tones = ["Professional", "Conversational", "Academic", "Punchy", "Casual", "Authoritative"]

export const suggestedModules = [
  { id: "sug-1", name: "K-12 EdTech Trends", source: "Google News" },
  { id: "sug-2", name: "Online Learning Platforms", source: "Reddit" },
  { id: "sug-3", name: "Higher Ed Innovation", source: "Custom URL" },
  { id: "sug-4", name: "Student Engagement Tools", source: "YouTube" },
  { id: "sug-5", name: "Education Policy Updates", source: "Google News" },
  { id: "sug-6", name: "Campus Tech Roundup", source: "TechCrunch" },
]
