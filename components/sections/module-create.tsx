"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Search,
  Sparkles,
  Image as ImageIcon,
  ImageOff,
  ListChecks,
  Target,
  Lightbulb,
  KeyRound,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { industries, tones, lengths } from "@/lib/mock-data"

export function ModuleCreate({
  onNavigate,
}: {
  onNavigate: (section: string) => void
}) {
  const [topic, setTopic] = useState("business analytics jobs")
  const [tone, setTone] = useState("Professional")
  const [length, setLength] = useState("Medium")
  const [industry, setIndustry] = useState("SaaS")
  const [imageOption, setImageOption] = useState("original")
  const [bulletSummary, setBulletSummary] = useState(true)
  const [bottomLine, setBottomLine] = useState(true)
  const [whyItMatters, setWhyItMatters] = useState(false)
  const [keyTakeaways, setKeyTakeaways] = useState(true)
  const [viewMode, setViewMode] = useState<"detailed" | "compact">("detailed")
  const [fetched, setFetched] = useState(false)
  const [excludeKeywords, setExcludeKeywords] = useState<string[]>([])
  const [excludeInput, setExcludeInput] = useState("")

  const addExclude = () => {
    if (excludeInput.trim() && !excludeKeywords.includes(excludeInput.trim())) {
      setExcludeKeywords([...excludeKeywords, excludeInput.trim()])
      setExcludeInput("")
    }
  }

  const removeExclude = (keyword: string) => {
    setExcludeKeywords(excludeKeywords.filter((k) => k !== keyword))
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => onNavigate("modules")}
          >
            <ArrowLeft className="size-4" />
            <span className="sr-only">Back to Modules</span>
          </Button>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Create Module
            </h2>
            <p className="text-xs text-muted-foreground">
              Configure your content source and email formatting
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Source Configuration */}
          <div className="flex flex-col gap-5">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Source Configuration</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="topic" className="text-xs">Topic / Search Term</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                    <Input
                      id="topic"
                      placeholder="e.g. business analytics jobs"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="pl-8 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium text-foreground">Filters</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs">Date Range</Label>
                      <Select defaultValue="7d">
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">Last 24 hours</SelectItem>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Exclude Keywords</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add keyword to exclude..."
                        value={excludeInput}
                        onChange={(e) => setExcludeInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addExclude()}
                        className="text-sm"
                      />
                      <Button variant="outline" size="sm" onClick={addExclude}>
                        Add
                      </Button>
                    </div>
                    {excludeKeywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {excludeKeywords.map((kw) => (
                          <Badge
                            key={kw}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeExclude(kw)}
                          >
                            {kw} &times;
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button onClick={() => setFetched(true)} className="mt-1">
                  <Sparkles className="size-3.5 mr-1.5" />
                  Fetch Content
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Email Formatting Options</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Length</Label>
                    <Select value={length} onValueChange={setLength}>
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {lengths.map((l) => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium text-foreground">AI Commentary</p>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ListChecks className="size-3.5 text-muted-foreground" />
                        <Label htmlFor="bullet" className="text-xs font-normal cursor-pointer">3-Bullet Summary</Label>
                      </div>
                      <Switch id="bullet" checked={bulletSummary} onCheckedChange={setBulletSummary} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="size-3.5 text-muted-foreground" />
                        <Label htmlFor="bottom" className="text-xs font-normal cursor-pointer">Bottom Line</Label>
                      </div>
                      <Switch id="bottom" checked={bottomLine} onCheckedChange={setBottomLine} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="size-3.5 text-muted-foreground" />
                        <Label htmlFor="why" className="text-xs font-normal cursor-pointer">Why It Matters</Label>
                      </div>
                      <Switch id="why" checked={whyItMatters} onCheckedChange={setWhyItMatters} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <KeyRound className="size-3.5 text-muted-foreground" />
                        <Label htmlFor="key" className="text-xs font-normal cursor-pointer">Key Takeaways</Label>
                      </div>
                      <Switch id="key" checked={keyTakeaways} onCheckedChange={setKeyTakeaways} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-foreground">Image Options</p>
                  <RadioGroup value={imageOption} onValueChange={setImageOption} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="original" id="img-original" />
                      <Label htmlFor="img-original" className="text-xs font-normal cursor-pointer flex items-center gap-1.5">
                        <ImageIcon className="size-3.5 text-muted-foreground" />
                        Use original image
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="ai" id="img-ai" />
                      <Label htmlFor="img-ai" className="text-xs font-normal cursor-pointer flex items-center gap-1.5">
                        <Sparkles className="size-3.5 text-muted-foreground" />
                        AI-generated image
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="none" id="img-none" />
                      <Label htmlFor="img-none" className="text-xs font-normal cursor-pointer flex items-center gap-1.5">
                        <ImageOff className="size-3.5 text-muted-foreground" />
                        No image
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Module Preview */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Module Preview</p>
              <div className="flex items-center gap-1 rounded-lg bg-muted p-0.5">
                <button
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    viewMode === "detailed"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setViewMode("detailed")}
                >
                  Detailed
                </button>
                <button
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    viewMode === "compact"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setViewMode("compact")}
                >
                  Compact
                </button>
              </div>
            </div>

            <Card className="border-2 border-dashed border-border">
              <CardContent className={`${viewMode === "compact" ? "p-4" : "p-5"} flex flex-col gap-4`}>
                {!fetched ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex size-12 items-center justify-center rounded-full bg-muted mb-3">
                      <Sparkles className="size-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-foreground">No content yet</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Configure your source and click &quot;Fetch Content&quot; to preview
                    </p>
                  </div>
                ) : (
                  <>
                    {imageOption !== "none" && (
                      <div className={`w-full rounded-lg bg-muted ${viewMode === "compact" ? "h-28" : "h-40"} flex items-center justify-center`}>
                        <ImageIcon className="size-8 text-muted-foreground/40" />
                      </div>
                    )}
                    <div>
                      <Badge variant="secondary" className="text-[10px] mb-2">
                        Google News
                      </Badge>
                      <h3 className={`font-semibold text-foreground ${viewMode === "compact" ? "text-sm" : "text-base"}`}>
                        Business Analytics Jobs Market Surges as Data Skills Become Essential
                      </h3>
                      <p className={`text-muted-foreground mt-2 leading-relaxed ${viewMode === "compact" ? "text-xs" : "text-sm"}`}>
                        The demand for business analytics professionals has reached an all-time high,
                        with companies across industries scrambling to fill roles in data science,
                        BI, and analytics engineering. New research shows a 34% YoY increase in job
                        postings mentioning &quot;business analytics&quot; as a core skill.
                      </p>
                    </div>

                    {bulletSummary && (
                      <div className="rounded-lg bg-muted/50 border border-border p-3">
                        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-2">
                          <ListChecks className="size-3.5 text-primary" />
                          Summary
                        </p>
                        <ul className="flex flex-col gap-1 text-xs text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">&bull;</span>
                            Analytics job postings up 34% year-over-year
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">&bull;</span>
                            Top skills: SQL, Python, Tableau, and Power BI
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">&bull;</span>
                            Remote analytics roles now make up 45% of listings
                          </li>
                        </ul>
                      </div>
                    )}

                    {bottomLine && (
                      <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1">
                          <Target className="size-3.5 text-primary" />
                          Bottom Line
                        </p>
                        <p className="text-xs text-muted-foreground">
                          If you&apos;re in analytics, the market is in your favor. Companies are investing
                          heavily and the trend shows no signs of slowing.
                        </p>
                      </div>
                    )}

                    {whyItMatters && (
                      <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1">
                          <Lightbulb className="size-3.5 text-primary" />
                          Why It Matters
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Data-driven decision making is no longer optional. Organizations that
                          invest in analytics talent outperform competitors by 2.5x.
                        </p>
                      </div>
                    )}

                    {keyTakeaways && (
                      <div className="rounded-lg bg-muted/50 border border-border p-3">
                        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-2">
                          <KeyRound className="size-3.5 text-primary" />
                          Key Takeaways
                        </p>
                        <ul className="flex flex-col gap-1 text-xs text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">&bull;</span>
                            Upskill in SQL and Python for the biggest ROI
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">&bull;</span>
                            Remote-first companies offer 15% higher salaries
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {fetched && (
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => onNavigate("modules")}>
                  Save as Draft Module
                </Button>
                <Button className="flex-1" onClick={() => onNavigate("editor")}>
                  Add to Email Editor
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
