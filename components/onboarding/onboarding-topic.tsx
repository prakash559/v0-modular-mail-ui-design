"use client"

import { useState } from "react"
import { Search, ArrowRight, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const topicCategories: {
  category: string
  topics: string[]
}[] = [
  {
    category: "Technology",
    topics: [
      "Latest developments in artificial intelligence and machine learning",
      "Cybersecurity threats and data protection strategies",
      "Cloud computing trends and enterprise adoption",
      "Emerging programming languages and developer tools",
      "Web3 and decentralized application development",
      "The future of remote work technology",
    ],
  },
  {
    category: "Business",
    topics: [
      "Small business growth strategies and tactics",
      "Marketing automation and digital advertising",
      "Venture capital funding rounds and startup valuations",
      "Leadership and management best practices",
      "E-commerce trends and online retail innovation",
      "Supply chain optimization and logistics",
    ],
  },
  {
    category: "Finance",
    topics: [
      "Stock market analysis and investment strategies",
      "Cryptocurrency market trends and regulation",
      "Personal finance tips and wealth management",
      "Real estate market updates and forecasts",
      "Fintech innovation and digital banking",
      "Economic policy and global market outlook",
    ],
  },
  {
    category: "Health & Wellness",
    topics: [
      "Mental health awareness and workplace wellbeing",
      "Nutrition science and healthy eating habits",
      "Fitness trends and exercise science research",
      "Healthcare technology and digital health platforms",
      "Medical research breakthroughs and clinical trials",
      "Mindfulness and stress management techniques",
    ],
  },
  {
    category: "Science",
    topics: [
      "Space exploration and aerospace engineering advances",
      "Climate change research and sustainability solutions",
      "Biotechnology innovations and gene editing progress",
      "Quantum computing research and applications",
      "Renewable energy technology and green infrastructure",
      "Neuroscience discoveries and brain research",
    ],
  },
  {
    category: "Marketing",
    topics: [
      "Content marketing strategies and storytelling techniques",
      "Social media marketing trends and platform updates",
      "SEO best practices and search algorithm changes",
      "Email marketing optimization and deliverability",
      "Brand building and customer experience design",
      "Influencer marketing and creator economy trends",
    ],
  },
  {
    category: "Education",
    topics: [
      "EdTech innovations and online learning platforms",
      "K-12 curriculum development and teaching methods",
      "Higher education trends and university admissions",
      "Professional development and skill-building programs",
      "Student engagement tools and classroom technology",
      "Education policy changes and funding updates",
    ],
  },
  {
    category: "Lifestyle",
    topics: [
      "Travel destinations and adventure planning guides",
      "Fashion trends and sustainable style choices",
      "Home design and interior decoration ideas",
      "Food culture and restaurant industry trends",
      "Photography techniques and visual storytelling",
      "Parenting tips and family wellness strategies",
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

  const filteredCategories = search.trim()
    ? topicCategories
        .map((cat) => ({
          ...cat,
          topics: cat.topics.filter((t) =>
            t.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((cat) => cat.topics.length > 0)
    : topicCategories

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8">
      {/* Heading */}
      <div className="text-center flex flex-col gap-3">
        <div className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1 self-center">
          <Sparkles className="size-3" />
          Let{"'"}s get started
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
          What topic will your email cover?
        </h1>
        <p className="text-muted-foreground text-balance max-w-lg mx-auto">
          Enter a topic, keyword, or phrase that describes the content you want to curate. You can also browse ideas below.
        </p>
      </div>

      {/* Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={value || search}
          onChange={(e) => {
            const v = e.target.value
            onChange(v)
            setSearch(v)
          }}
          placeholder="e.g. Latest developments in artificial intelligence and machine learning"
          className="pl-11 pr-4 h-12 text-sm rounded-xl border-border shadow-sm"
        />
      </div>

      {/* Continue button */}
      {value.trim().length > 0 && (
        <div className="flex justify-center">
          <Button size="lg" className="gap-2 rounded-xl px-8" onClick={onNext}>
            Continue
            <ArrowRight className="size-4" />
          </Button>
        </div>
      )}

      {/* Topic categories grid */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Topics by Industry
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredCategories.map((cat) => {
            const isExpanded = expandedCategory === cat.category
            const visibleTopics = isExpanded ? cat.topics : cat.topics.slice(0, 3)

            return (
              <div
                key={cat.category}
                className="rounded-xl border border-border bg-card p-4 flex flex-col gap-2.5"
              >
                <h3 className="text-sm font-semibold text-foreground">{cat.category}</h3>
                <ul className="flex flex-col gap-1">
                  {visibleTopics.map((topic) => (
                    <li key={topic}>
                      <button
                        className={`w-full text-left text-[13px] leading-relaxed px-2.5 py-1.5 rounded-lg transition-colors ${
                          value === topic
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                        onClick={() => {
                          onChange(topic)
                          setSearch(topic)
                        }}
                      >
                        {topic}
                      </button>
                    </li>
                  ))}
                </ul>
                {cat.topics.length > 3 && (
                  <button
                    className="text-[11px] font-medium text-primary hover:underline self-start px-2.5"
                    onClick={() =>
                      setExpandedCategory(isExpanded ? null : cat.category)
                    }
                  >
                    {isExpanded ? "Show less" : `More ${cat.category} Topics`}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
