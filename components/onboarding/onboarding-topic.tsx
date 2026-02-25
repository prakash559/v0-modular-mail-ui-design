"use client"

import { useState } from "react"
import { Search, ArrowRight, Sparkles, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"

const topicCategories: {
  category: string
  topics: string[]
}[] = [
  {
    category: "Technology",
    topics: [
      "AI trends",
      "Cloud computing",
      "Cybersecurity updates",
      "SaaS tools and platforms",
      "Developer productivity",
      "No-code movement",
      "Machine learning applications",
      "Tech startup funding",
      "Open source software",
      "Digital transformation strategies",
      "DevOps best practices",
      "Edge computing",
    ],
  },
  {
    category: "Business",
    topics: [
      "Startup growth",
      "Remote work culture",
      "Supply chain trends",
      "B2B sales strategies",
      "Small business marketing",
      "Leadership insights",
      "Mergers and acquisitions",
      "Business automation",
      "Customer retention tactics",
      "Scaling a SaaS business",
      "Franchise opportunities",
      "Corporate innovation",
    ],
  },
  {
    category: "Finance",
    topics: [
      "Stock market updates",
      "Crypto regulation",
      "Personal budgeting",
      "Real estate investing",
      "Fintech innovation",
      "Retirement planning",
      "Venture capital trends",
      "Economic forecasts",
      "Banking disruption",
      "Wealth management tips",
      "Tax planning strategies",
      "ESG investing",
    ],
  },
  {
    category: "Health & Wellness",
    topics: [
      "Mental health",
      "Nutrition science",
      "Fitness and recovery",
      "Healthcare technology",
      "Workplace wellbeing",
      "Sleep optimization",
      "Preventive medicine",
      "Mindfulness practices",
      "Telehealth platforms",
      "Women's health research",
      "Gut health and microbiome",
      "Health policy updates",
    ],
  },
  {
    category: "Science",
    topics: [
      "Space exploration",
      "Climate research",
      "Biotech breakthroughs",
      "Quantum computing",
      "Renewable energy",
      "Neuroscience discoveries",
      "Ocean conservation",
      "Genetics and CRISPR",
      "Sustainable materials",
      "Astronomy and astrophysics",
      "Lab-grown food",
      "Environmental policy",
    ],
  },
  {
    category: "Marketing",
    topics: [
      "Content strategy",
      "SEO updates",
      "Email marketing tips",
      "Social media trends",
      "Brand storytelling",
      "Influencer marketing",
      "Paid media optimization",
      "Marketing analytics",
      "Growth hacking tactics",
      "Community building",
      "Video marketing",
      "Conversion rate optimization",
    ],
  },
  {
    category: "Education",
    topics: [
      "EdTech tools",
      "Online learning trends",
      "Skill development",
      "University admissions",
      "Classroom innovation",
      "Corporate training",
      "STEM education",
      "Lifelong learning",
      "Student engagement",
      "Education policy",
      "Micro-credentials",
      "Language learning apps",
    ],
  },
  {
    category: "Lifestyle",
    topics: [
      "Travel guides",
      "Sustainable fashion",
      "Interior design",
      "Food and dining trends",
      "Photography tips",
      "Parenting advice",
      "Personal development",
      "Minimalist living",
      "Pet care trends",
      "Outdoor adventures",
      "DIY and crafting",
      "Book recommendations",
    ],
  },
]

export function OnboardingTopic({
  value,
  onChange,
  onNext,
}: {
  value: string
  onChange: (v: string) => void
  onNext: () => void
}) {
  const [search, setSearch] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const filterTerm = search.trim() && !topicCategories.some(c => c.topics.includes(search)) ? search : ""

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

  const handleTopicClick = (topic: string) => {
    onChange(topic)
    setSearch(topic)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8">
          {/* Heading */}
          <div className="text-center flex flex-col gap-3">
            <div className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1 self-center">
              <Sparkles className="size-3" />
              {"Let's get started"}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
              What Topic Should Your Email Cover?
            </h1>
            <p className="text-muted-foreground text-balance max-w-lg mx-auto">
              Enter a topic, keyword, or phrase that describes the content you want to curate. You can also browse ideas below.
            </p>
          </div>

          {/* Input with inline CTA */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={value || search}
              onChange={(e) => {
                const v = e.target.value
                onChange(v)
                setSearch(v)
              }}
              placeholder="Enter a topic or phrase"
              className="w-full pl-11 pr-32 h-13 text-sm rounded-xl border border-border bg-card shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 gap-1.5 rounded-lg px-5 h-9"
              onClick={onNext}
              disabled={!value.trim()}
            >
              Continue
              <ArrowRight className="size-3.5" />
            </Button>
          </div>

          {/* Topic categories grid */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Topics by Industry
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredCategories.map((cat) => {
                const isExpanded = expandedCategory === cat.category
                const visibleTopics = isExpanded ? cat.topics : cat.topics.slice(0, 6)

                return (
                  <div
                    key={cat.category}
                    className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
                  >
                    <h3 className="text-sm font-semibold text-foreground">{cat.category}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {visibleTopics.map((topic) => (
                        <button
                          key={topic}
                          className={`inline-flex items-center gap-1 text-[13px] leading-snug px-2.5 py-1.5 rounded-lg border transition-colors ${
                            value === topic
                              ? "bg-primary/10 text-primary border-primary/30 font-medium"
                              : "bg-background text-foreground border-border hover:bg-muted hover:border-muted-foreground/20"
                          }`}
                          onClick={() => handleTopicClick(topic)}
                        >
                          <Hash className="size-3 opacity-40 shrink-0" />
                          {topic}
                        </button>
                      ))}
                    </div>
                    {cat.topics.length > 6 && (
                      <button
                        className="text-[11px] font-medium text-primary hover:underline self-start"
                        onClick={() =>
                          setExpandedCategory(isExpanded ? null : cat.category)
                        }
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
      </div>


    </div>
  )
}
