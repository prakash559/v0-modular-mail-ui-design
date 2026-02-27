"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { tones } from "@/lib/mock-data"
import { User, Settings, Mail, Plug } from "lucide-react"

const espIntegrations = [
  {
    id: "klaviyo",
    name: "Klaviyo",
    description: "E-commerce email marketing & SMS automation",
    connected: false,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "All-in-one CRM with marketing automation",
    connected: false,
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Classic email marketing platform",
    connected: true,
  },
]

const refreshDayOptions = ["1", "2", "3", "5", "7", "14", "30"]

export function SettingsPage() {
  /* Account */
  const [brandName, setBrandName] = useState("ModularMail")
  const [accountEmail, setAccountEmail] = useState("team@modularmail.com")
  const [primaryColor, setPrimaryColor] = useState("#3b82f6")
  const [secondaryColor, setSecondaryColor] = useState("#64748b")

  /* Module Settings */
  const [defaultTone, setDefaultTone] = useState("Professional")
  const [moduleRefreshDays, setModuleRefreshDays] = useState("7")
  const [autoSummarize, setAutoSummarize] = useState(true)
  const [maxArticles, setMaxArticles] = useState("5")
  const [deduplicateContent, setDeduplicateContent] = useState(true)

  /* Email Settings */
  const [emailWidth, setEmailWidth] = useState("650")
  const [emailRefreshDays, setEmailRefreshDays] = useState("7")
  const [defaultFromName, setDefaultFromName] = useState("ModularMail")
  const [defaultSubjectPrefix, setDefaultSubjectPrefix] = useState("")
  const [previewTextEnabled, setPreviewTextEnabled] = useState(true)
  const [trackOpens, setTrackOpens] = useState(true)
  const [trackClicks, setTrackClicks] = useState(true)

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-3xl mx-auto flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            Settings
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your account, module defaults, email configuration, and integrations.
          </p>
        </div>

        <Tabs defaultValue="account" className="flex flex-col gap-4">
          <TabsList className="w-full">
            <TabsTrigger value="account" className="gap-1.5 flex-1">
              <User className="size-3.5" />
              Account
            </TabsTrigger>
            <TabsTrigger value="modules" className="gap-1.5 flex-1">
              <Settings className="size-3.5" />
              Module Settings
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-1.5 flex-1">
              <Mail className="size-3.5" />
              Email Settings
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-1.5 flex-1">
              <Plug className="size-3.5" />
              Integrations
            </TabsTrigger>
          </TabsList>

          {/* ── Account Settings ── */}
          <TabsContent value="account" className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Button>Save Account Settings</Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profile</CardTitle>
                <CardDescription>Your account and brand identity</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs">Brand Name</Label>
                  <Input
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs">Email Address</Label>
                  <Input
                    value={accountEmail}
                    onChange={(e) => setAccountEmail(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Brand Colors</CardTitle>
                <CardDescription>Used across your email modules and templates</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="size-8 shrink-0 rounded-md border border-border cursor-pointer"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="text-sm font-mono min-w-0"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="size-8 shrink-0 rounded-md border border-border cursor-pointer"
                      />
                      <Input
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="text-sm font-mono min-w-0"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Security</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between max-w-sm">
                  <div>
                    <p className="text-sm font-medium text-foreground">Password</p>
                    <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Change
                  </Button>
                </div>
                <div className="flex items-center justify-between max-w-sm">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          {/* ── Module Settings ── */}
          <TabsContent value="modules" className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Button>Save Module Settings</Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Module Defaults</CardTitle>
                <CardDescription>Default settings applied when creating new modules</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 max-w-sm">
                  <Label className="text-xs">Default Tone</Label>
                  <Select value={defaultTone} onValueChange={setDefaultTone}>
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
                <div className="flex flex-col gap-1.5 max-w-sm">
                  <Label className="text-xs">Max Articles per Module</Label>
                  <Select value={maxArticles} onValueChange={setMaxArticles}>
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["3", "5", "8", "10", "15", "20"].map((n) => (
                        <SelectItem key={n} value={n}>{n} articles</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between max-w-sm">
                  <div>
                    <p className="text-sm font-medium text-foreground">AI Auto-Summarize</p>
                    <p className="text-xs text-muted-foreground">Automatically generate summaries for feed content</p>
                  </div>
                  <Switch checked={autoSummarize} onCheckedChange={setAutoSummarize} />
                </div>
                <div className="flex items-center justify-between max-w-sm">
                  <div>
                    <p className="text-sm font-medium text-foreground">Deduplicate Content</p>
                    <p className="text-xs text-muted-foreground">Remove duplicate articles across modules</p>
                  </div>
                  <Switch checked={deduplicateContent} onCheckedChange={setDeduplicateContent} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Data Refresh</CardTitle>
                <CardDescription>How often module content is refreshed from sources</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 max-w-sm">
                  <Label className="text-xs">Refresh Interval</Label>
                  <Select value={moduleRefreshDays} onValueChange={setModuleRefreshDays}>
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {refreshDayOptions.map((d) => (
                        <SelectItem key={d} value={d}>
                          Every {d} {d === "1" ? "day" : "days"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Modules will automatically pull new content from their sources at this interval.
                  </p>
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          {/* ── Email Settings ── */}
          <TabsContent value="email" className="flex flex-col gap-4">
            <div className="flex justify-end">
              <Button>Save Email Settings</Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Email Defaults</CardTitle>
                <CardDescription>Default configuration for new emails</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Email Width (px)</Label>
                    <Input
                      value={emailWidth}
                      onChange={(e) => setEmailWidth(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Default From Name</Label>
                    <Input
                      value={defaultFromName}
                      onChange={(e) => setDefaultFromName(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 max-w-sm">
                  <Label className="text-xs">Subject Line Prefix</Label>
                  <Input
                    value={defaultSubjectPrefix}
                    onChange={(e) => setDefaultSubjectPrefix(e.target.value)}
                    placeholder="e.g. [Weekly Digest]"
                    className="text-sm"
                  />
                </div>
                <div className="flex items-center justify-between max-w-sm">
                  <div>
                    <p className="text-sm font-medium text-foreground">Preview Text</p>
                    <p className="text-xs text-muted-foreground">Show preview text in email clients</p>
                  </div>
                  <Switch checked={previewTextEnabled} onCheckedChange={setPreviewTextEnabled} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Data Refresh</CardTitle>
                <CardDescription>How often email content is refreshed before sending</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 max-w-sm">
                  <Label className="text-xs">Refresh Interval</Label>
                  <Select value={emailRefreshDays} onValueChange={setEmailRefreshDays}>
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {refreshDayOptions.map((d) => (
                        <SelectItem key={d} value={d}>
                          Every {d} {d === "1" ? "day" : "days"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Email content will be re-pulled from modules at this interval to stay current before scheduled sends.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tracking</CardTitle>
                <CardDescription>Configure email analytics and tracking</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between max-w-sm">
                  <div>
                    <p className="text-sm font-medium text-foreground">Track Opens</p>
                    <p className="text-xs text-muted-foreground">Monitor when recipients open your emails</p>
                  </div>
                  <Switch checked={trackOpens} onCheckedChange={setTrackOpens} />
                </div>
                <div className="flex items-center justify-between max-w-sm">
                  <div>
                    <p className="text-sm font-medium text-foreground">Track Clicks</p>
                    <p className="text-xs text-muted-foreground">Monitor link clicks within your emails</p>
                  </div>
                  <Switch checked={trackClicks} onCheckedChange={setTrackClicks} />
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          {/* ── Integrations ── */}
          <TabsContent value="integrations" className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">ESP Integrations</CardTitle>
                <CardDescription>Connect your email service provider to export and send campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {espIntegrations.map((esp) => (
                    <div
                      key={esp.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{esp.name}</p>
                          {esp.connected && (
                            <Badge variant="default" className="text-[10px]">Connected</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{esp.description}</p>
                      </div>
                      <Button
                        variant={esp.connected ? "outline" : "default"}
                        size="sm"
                        className="text-xs"
                      >
                        {esp.connected ? "Manage" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">API Access</CardTitle>
                <CardDescription>Manage API keys for programmatic access</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <p className="text-sm font-medium text-foreground">API Key</p>
                    <p className="text-xs text-muted-foreground font-mono">mm_live_****************************3kf9</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-xs">Copy</Button>
                    <Button variant="outline" size="sm" className="text-xs text-destructive hover:text-destructive">Regenerate</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Webhooks</CardTitle>
                <CardDescription>Receive real-time notifications when events occur</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5 max-w-md">
                  <Label className="text-xs">Webhook URL</Label>
                  <Input placeholder="https://your-app.com/webhook" className="text-sm" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {["Module Updated", "Email Sent", "Module Error"].map((event) => (
                    <label key={event} className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                      <input type="checkbox" className="rounded border-border" />
                      {event}
                    </label>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="text-xs self-start">Save Webhook</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
