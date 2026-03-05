"use client"

import { useState } from "react"
import {
  ArrowRight,
  ChevronLeft,
  Check,
  Eye,
  CheckSquare,
  Square,
} from "lucide-react"
import { Button } from "@/components/ui/button"

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
  const [selectedTemplate, setSelectedTemplate] = useState("")

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-12 flex flex-col gap-6">
        {/* Back + header */}
        <div className="flex flex-col gap-4">
          <button
            className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors self-start"
            onClick={() => onNavigate("emails")}
          >
            <ChevronLeft className="size-4" />
            Back
          </button>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
                Choose a Template
              </h1>
              <p className="text-sm text-muted-foreground text-balance">
                Pick a layout style for your email. You can customize everything in the editor.
              </p>
            </div>
            <Button
              className="gap-1.5 px-6 shrink-0"
              onClick={() => onNavigate("editor")}
              disabled={!selectedTemplate}
            >
              Continue to Editor
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl.id
            return (
              <div
                key={tmpl.id}
                className={`group relative flex flex-col rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary ring-2 ring-primary/20 bg-card shadow-sm"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                }`}
                onClick={() => setSelectedTemplate(isSelected ? "" : tmpl.id)}
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
      </div>
    </div>
  )
}
