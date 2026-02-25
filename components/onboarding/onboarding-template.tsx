"use client"

import { ArrowRight, ChevronLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const templates = [
  {
    id: "weekly-digest",
    name: "Weekly Digest",
    description: "A curated roundup of the top stories from the week.",
    illustration: (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="h-2 w-3/4 rounded-full bg-primary/30" />
        <div className="h-1.5 w-full rounded-full bg-border" />
        <div className="h-1.5 w-5/6 rounded-full bg-border" />
        <div className="mt-1 grid grid-cols-2 gap-1.5">
          <div className="h-12 rounded bg-muted border border-border" />
          <div className="h-12 rounded bg-muted border border-border" />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-12 rounded bg-muted border border-border" />
          <div className="h-12 rounded bg-muted border border-border" />
        </div>
      </div>
    ),
  },
  {
    id: "featured-story",
    name: "Featured Story",
    description: "Lead with a hero article followed by supporting content.",
    illustration: (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="h-16 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
          <div className="w-8 h-1.5 rounded-full bg-primary/30" />
        </div>
        <div className="h-2 w-2/3 rounded-full bg-primary/30" />
        <div className="h-1.5 w-full rounded-full bg-border" />
        <div className="h-1.5 w-4/5 rounded-full bg-border" />
        <div className="mt-1 flex gap-1.5">
          <div className="flex-1 h-8 rounded bg-muted border border-border" />
          <div className="flex-1 h-8 rounded bg-muted border border-border" />
          <div className="flex-1 h-8 rounded bg-muted border border-border" />
        </div>
      </div>
    ),
  },
  {
    id: "editorial-brief",
    name: "Editorial Brief",
    description: "A text-first layout for thought leadership and opinion.",
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
    id: "data-insights",
    name: "Data Insights",
    description: "Stat-driven layout with key metrics and analysis.",
    illustration: (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="h-2 w-2/3 rounded-full bg-primary/30" />
        <div className="grid grid-cols-3 gap-1.5 mt-1">
          <div className="h-14 rounded bg-primary/5 border border-primary/15 flex flex-col items-center justify-center gap-0.5">
            <div className="w-5 h-2 rounded-full bg-primary/30" />
            <div className="w-7 h-1 rounded-full bg-border" />
          </div>
          <div className="h-14 rounded bg-primary/5 border border-primary/15 flex flex-col items-center justify-center gap-0.5">
            <div className="w-5 h-2 rounded-full bg-primary/30" />
            <div className="w-7 h-1 rounded-full bg-border" />
          </div>
          <div className="h-14 rounded bg-primary/5 border border-primary/15 flex flex-col items-center justify-center gap-0.5">
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
    id: "visual-showcase",
    name: "Visual Showcase",
    description: "Image-heavy design for visually-driven content.",
    illustration: (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="h-2 w-1/2 rounded-full bg-primary/30" />
        <div className="h-20 rounded bg-muted border border-border flex items-center justify-center">
          <div className="size-6 rounded bg-border" />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-10 rounded bg-muted border border-border" />
          <div className="h-10 rounded bg-muted border border-border" />
        </div>
      </div>
    ),
  },
  {
    id: "community-pulse",
    name: "Community Pulse",
    description: "Social-style cards with author avatars and engagement.",
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
        <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-8">
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

          {/* Templates grid */}
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
                  onClick={() => onSelect(tmpl.id)}
                >
                  {/* Selected check */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Check className="size-3" />
                    </div>
                  )}

                  {/* Illustration */}
                  <div className="px-5 pt-5 pb-3">
                    <div className="rounded-lg border border-border bg-background p-3.5 flex items-center justify-center min-h-[120px]">
                      {tmpl.illustration}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="px-5 pb-5 flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-foreground">{tmpl.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tmpl.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Sticky CTA always visible at bottom -- same position as topic step */}
      <div className="border-t border-border bg-background px-6 py-4 flex justify-center shrink-0">
        <Button
          size="lg"
          className="gap-2 rounded-xl px-10 min-w-[200px]"
          onClick={onNext}
          disabled={!selected}
        >
          Continue
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
