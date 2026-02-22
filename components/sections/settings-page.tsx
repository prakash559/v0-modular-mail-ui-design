"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { tones } from "@/lib/mock-data"

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
    connected: false,
  },
]

export function SettingsPage() {
  const [brandName, setBrandName] = useState("ModularMail")
  const [primaryColor, setPrimaryColor] = useState("#3b82f6")
  const [secondaryColor, setSecondaryColor] = useState("#64748b")
  const [defaultTone, setDefaultTone] = useState("Professional")
  const [emailWidth, setEmailWidth] = useState("650")

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-3xl mx-auto flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            Settings
          </h2>
          <p className="text-muted-foreground mt-1">
            Configure your brand, defaults, and integrations.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Brand</CardTitle>
            <CardDescription>
              Your brand identity used across emails
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="brand-name" className="text-xs">
                Brand Name
              </Label>
              <Input
                id="brand-name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="primary-color" className="text-xs">
                  Primary Color
                </Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="primary-color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="size-8 rounded-md border border-border cursor-pointer"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="text-sm font-mono"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="secondary-color" className="text-xs">
                  Secondary Color
                </Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="secondary-color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="size-8 rounded-md border border-border cursor-pointer"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Defaults</CardTitle>
            <CardDescription>
              Default settings applied to new modules and emails
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">Default Tone</Label>
                <Select
                  value={defaultTone}
                  onValueChange={setDefaultTone}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email-width" className="text-xs">
                  Email Width (px)
                </Label>
                <Input
                  id="email-width"
                  value={emailWidth}
                  onChange={(e) => setEmailWidth(e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">ESP Integrations</CardTitle>
            <CardDescription>
              Connect your email service provider to export campaigns
            </CardDescription>
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
                      <p className="text-sm font-medium text-foreground">
                        {esp.name}
                      </p>
                      {esp.connected && (
                        <Badge variant="default" className="text-[10px]">
                          Connected
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {esp.description}
                    </p>
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

        <div className="flex justify-end">
          <Button>Save Settings</Button>
        </div>
      </div>
    </div>
  )
}
