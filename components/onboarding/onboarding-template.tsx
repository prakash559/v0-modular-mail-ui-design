"use client"

import { ChevronLeft, Check } from "lucide-react"

const templates = [
  {
    id: "market-pulse",
    name: "Market Pulse",
    description: "A fast, digest-style summary of the most relevant updates and highlights around a topic.",
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
    description: "A focused, in-depth exploration of a key theme with structured analysis and insight.",
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
          <div className="h-12 rounded bg-primary/5 border border-primary/15 flex flex-col items-center justify-center gap-0.5">
            <div className="w-5 h-2 rounded-full bg-primary/30" />
            <div className="w-7 h-1 rounded-full bg-border" />
          </div>
          <div className="h-12 rounded bg-primary/5 border border-primary/15 flex flex-col items-center justify-center gap-0.5">
            <div className="w-5 h-2 rounded-full bg-primary/30" />
            <div className="w-7 h-1 rounded-full bg-border" />
          </div>
          <div className="h-12 rounded bg-primary/5 border border-primary/15 flex flex-col items-center justify-center gap-0.5">
            <div className="w-5 h-2 rounded-full bg-primary/30" />
            <div className="w-7 h-1 rounded-full bg-border" />
          </div>
        </div>
        <div className="h-1.5 w-full rounded-full bg-border mt-1" />
        <div className="h-1.5 w-4/5 rounded-full bg-border" />
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
          <div className="h-14 rounded bg-muted border border-border flex flex-col items-center justify-center gap-1">
            <div className="w-6 h-1.5 rounded-full bg-primary/20" />
            <div className="w-8 h-1 rounded-full bg-border" />
          </div>
          <div className="h-14 rounded bg-muted border border-border flex flex-col items-center justify-center gap-1">
            <div className="w-6 h-1.5 rounded-full bg-primary/20" />
            <div className="w-8 h-1 rounded-full bg-border" />
          </div>
          <div className="h-14 rounded bg-muted border border-border flex flex-col items-center justify-center gap-1">
            <div className="w-6 h-1.5 rounded-full bg-primary/20" />
            <div className="w-8 h-1 rounded-full bg-border" />
          </div>
          <div className="h-14 rounded bg-muted border border-border flex flex-col items-center justify-center gap-1">
            <div className="w-6 h-1.5 rounded-full bg-primary/20" />
            <div className="w-8 h-1 rounded-full bg-border" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "culture-community",
    name: "Culture & Community",
    description: "A more human, editorial-style edition blending insights with personality.",
    illustration: (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="h-16 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
          <div className="size-6 rounded-full bg-primary/20" />
        </div>
        <div className="h-2 w-2/3 rounded-full bg-primary/30" />
        <div className="h-1.5 w-full rounded-full bg-border" />
        <div className="h-1.5 w-4/5 rounded-full bg-border" />
        <div className="mt-0.5 flex gap-2">
          <div className="size-4 rounded-full bg-muted border border-border" />
          <div className="size-4 rounded-full bg-muted border border-border" />
          <div className="size-4 rounded-full bg-muted border border-border" />
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

export function OnboardingTemplate({
  selected,
  onSelect,
  onNext,
  onBack,
}: {
  selected: string
  onSelect: (id: string) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8">
          {/* Back + Heading */}
          <div className="flex flex-col gap-4">
            <button
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors self-start"
              onClick={onBack}
            >
              <ChevronLeft className="size-4" />
              Back
            </button>
            <div className="text-center flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
                Choose a template theme
              </h1>
              <p className="text-muted-foreground text-balance max-w-lg mx-auto">
                Pick a layout style for your email. You can customize everything later in the editor.
              </p>
            </div>
          </div>

          {/* Templates grid -- 3 cols, uniform cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((tmpl) => {
              const isSelected = selected === tmpl.id
              return (
                <button
                  key={tmpl.id}
                  className={`group relative flex flex-col rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-primary ring-2 ring-primary/20 bg-card shadow-sm"
                      : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                  }`}
                  onClick={() => {
                    onSelect(tmpl.id)
                    onNext()
                  }}
                >
                  {/* Hover Select label or selected check */}
                  {isSelected ? (
                    <div className="absolute top-3 right-3 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10">
                      <Check className="size-3" />
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <span className="inline-flex items-center text-[11px] font-semibold text-primary-foreground bg-primary rounded-md px-2.5 py-1 shadow-sm">
                        Select
                      </span>
                    </div>
                  )}

                  {/* Illustration */}
                  <div className="px-5 pt-5 pb-3">
                    <div className="rounded-lg border border-border bg-background p-3.5 flex items-center justify-center h-[130px]">
                      {tmpl.illustration}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="px-5 pb-5 flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-foreground">{tmpl.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{tmpl.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
