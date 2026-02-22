"use client"

import {
  Newspaper,
  MessageCircle,
  Play,
  Headphones,
  Link,
  FileText,
  Plus,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { contentSources } from "@/lib/mock-data"

const iconMap: Record<string, React.ElementType> = {
  newspaper: Newspaper,
  "message-circle": MessageCircle,
  play: Play,
  headphones: Headphones,
  link: Link,
  "file-text": FileText,
}

export function ModulesIndex({
  onNavigate,
}: {
  onNavigate: (section: string) => void
}) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            Modules
          </h2>
          <p className="text-muted-foreground mt-1">
            Modules are the building blocks of your email content. Choose a source to create a new module.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contentSources.map((source) => {
            const Icon = iconMap[source.icon] || FileText
            return (
              <Card
                key={source.id}
                className="group hover:shadow-md hover:border-primary/20 transition-all"
              >
                <CardContent className="p-5 flex flex-col gap-4">
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl ${source.color}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-foreground">{source.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {source.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => onNavigate("module-create")}
                  >
                    <Plus className="size-3.5 mr-1.5" />
                    Create Module
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
