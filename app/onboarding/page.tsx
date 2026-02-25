"use client"

import { useState } from "react"
import { OnboardingTopic } from "@/components/onboarding/onboarding-topic"
import { OnboardingTemplate } from "@/components/onboarding/onboarding-template"
import { OnboardingAccount } from "@/components/onboarding/onboarding-account"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedTopic, setSelectedTopic] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal top bar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            M
          </div>
          <span className="text-base font-semibold tracking-tight">ModularMail</span>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s === step ? "w-8 bg-primary" : s < step ? "w-8 bg-primary/40" : "w-8 bg-border"
              }`}
            />
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          Step {step} of 3
        </div>
      </header>

      {/* Step content */}
      <main className="flex-1 overflow-auto">
        {step === 1 && (
          <OnboardingTopic
            value={selectedTopic}
            onChange={setSelectedTopic}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <OnboardingTemplate
            selected={selectedTemplate}
            onSelect={setSelectedTemplate}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <OnboardingAccount
            onBack={() => setStep(2)}
          />
        )}
      </main>
    </div>
  )
}
