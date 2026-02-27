"use client"

import { Plus, Pencil, Copy, Trash2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockEmails } from "@/lib/mock-data"

export function EmailsList({
  onNavigate,
}: {
  onNavigate: (section: string) => void
}) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
              Emails
            </h2>
            <p className="text-muted-foreground mt-1">
              Manage your email campaigns and drafts.
            </p>
          </div>
          <Button onClick={() => onNavigate("email-create")}>
            <Plus className="size-4 mr-1.5" />
            Create New Email
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Email Name</TableHead>
                <TableHead className="text-xs">Audience</TableHead>
                <TableHead className="text-xs">Last Edited</TableHead>
                <TableHead className="text-xs">Modules</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEmails.map((email) => (
                <TableRow key={email.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Mail className="size-3.5" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {email.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {email.audience}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {email.lastEdited}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {email.moduleCount}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={email.status === "ready" ? "default" : "secondary"}
                    >
                      {email.status === "ready" ? "Ready" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => onNavigate("editor")}
                      >
                        <Pencil className="size-3.5" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="size-7">
                        <Copy className="size-3.5" />
                        <span className="sr-only">Duplicate</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
