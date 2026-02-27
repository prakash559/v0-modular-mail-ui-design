"use client"

import { useState } from "react"
import { ChevronLeft, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function OnboardingAccount({
  onBack,
}: {
  onBack: () => void
}) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const isValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    email.includes("@")

  const handleSubmit = () => {
    if (!isValid) return
    setSubmitting(true)
    // Simulate submit
    setTimeout(() => {
      setSubmitting(false)
      window.location.href = "/"
    }, 1500)
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12 flex flex-col gap-8">
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
            Create your account
          </h1>
          <p className="text-muted-foreground text-balance">
            Just a few details and we{"'"}ll build your first email template.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="firstName" className="text-xs font-medium">
              First Name
            </Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Jane"
              className="h-10"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lastName" className="text-xs font-medium">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className="h-10"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-xs font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            className="h-10"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="website" className="text-xs font-medium">
            Website Address
          </Label>
          <Input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourcompany.com"
            className="h-10"
          />
          <p className="text-[11px] text-muted-foreground">
            Optional. Helps us tailor content recommendations.
          </p>
        </div>
      </div>

      {/* Submit */}
      <Button
        size="lg"
        className="w-full gap-2 rounded-xl h-11"
        disabled={!isValid || submitting}
        onClick={handleSubmit}
      >
        {submitting ? (
          <>Building your template...</>
        ) : (
          <>
            <Sparkles className="size-4" />
            Create My Template
          </>
        )}
      </Button>

      <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
        By creating an account you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}
