"use client"

import type React from "react"

import { useState } from "react"
import { Droplets, Shield, Sparkles, Waves } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

interface IngredientDetailModalProps {
  ingredient: {
    name: string
    functions: {
      humectant?: number
      moisturizer?: number
      emollient?: number
      occlusive?: number
    }
    description: string
    benefits: string[]
    concerns?: string[]
    sources?: string[]
  }
  trigger: React.ReactNode
}

export function IngredientDetailModal({ ingredient, trigger }: IngredientDetailModalProps) {
  const [open, setOpen] = useState(false)

  const getFunctionIcon = (functionName: string) => {
    switch (functionName) {
      case "humectant":
        return <Droplets className="h-4 w-4" />
      case "moisturizer":
        return <Waves className="h-4 w-4" />
      case "emollient":
        return <Sparkles className="h-4 w-4" />
      case "occlusive":
        return <Shield className="h-4 w-4" />
      default:
        return null
    }
  }

  const getFunctionColor = (functionName: string) => {
    switch (functionName) {
      case "humectant":
        return "bg-sky-100 text-sky-800"
      case "moisturizer":
        return "bg-emerald-100 text-emerald-800"
      case "emollient":
        return "bg-amber-100 text-amber-800"
      case "occlusive":
        return "bg-purple-100 text-purple-800"
      default:
        return ""
    }
  }

  const getFunctionLabel = (functionName: string) => {
    return functionName.charAt(0).toUpperCase() + functionName.slice(1)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="pr-8">{ingredient.name}</DialogTitle>
          <DialogDescription>Detailed ingredient information and function analysis</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex flex-wrap gap-1">
            {Object.entries(ingredient.functions).map(
              ([functionName, value]) =>
                value && (
                  <Badge
                    key={functionName}
                    variant="outline"
                    className={`${getFunctionColor(functionName)} flex gap-1 items-center`}
                  >
                    {getFunctionIcon(functionName)}
                    {getFunctionLabel(functionName)}
                  </Badge>
                ),
            )}
          </div>

          <p className="text-sm">{ingredient.description}</p>

          <div className="space-y-3">
            {Object.entries(ingredient.functions).map(
              ([functionName, value]) =>
                value && (
                  <div key={functionName} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {getFunctionIcon(functionName)}
                        <span className="text-sm font-medium">{getFunctionLabel(functionName)}</span>
                      </div>
                      <span className="text-sm">{value}%</span>
                    </div>
                    <Progress value={value} className="h-1.5" />
                  </div>
                ),
            )}
          </div>

          {ingredient.benefits && ingredient.benefits.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Benefits</h4>
              <ul className="text-sm space-y-1 list-disc pl-5">
                {ingredient.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {ingredient.concerns && ingredient.concerns.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Potential Concerns</h4>
              <ul className="text-sm space-y-1 list-disc pl-5">
                {ingredient.concerns.map((concern, index) => (
                  <li key={index}>{concern}</li>
                ))}
              </ul>
            </div>
          )}

          {ingredient.sources && ingredient.sources.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Common Sources</h4>
              <ul className="text-sm space-y-1 list-disc pl-5">
                {ingredient.sources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
