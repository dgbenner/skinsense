"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Droplets, Heart, Plus, Shield, Sparkles, Waves } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast"

interface ProductCardProps {
  name: string
  image: string
  classification: string
  ingredients: string
  primaryType: "Humectant" | "Moisturizer" | "Emollient" | "Occlusive"
  secondaryType?: "Humectant" | "Moisturizer" | "Emollient" | "Occlusive"
}

export function ProductCard({
  name,
  image,
  classification,
  ingredients,
  primaryType,
  secondaryType,
}: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Humectant":
        return <Droplets className="h-4 w-4" />
      case "Moisturizer":
        return <Waves className="h-4 w-4" />
      case "Emollient":
        return <Sparkles className="h-4 w-4" />
      case "Occlusive":
        return <Shield className="h-4 w-4" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Humectant":
        return "bg-sky-100 text-sky-800 hover:bg-sky-200"
      case "Moisturizer":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
      case "Emollient":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      case "Occlusive":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      default:
        return ""
    }
  }

  const handleAddToCollection = () => {
    setIsAdded(true)
    toast({
      title: "Added to your collection",
      description: `${name} has been added to your products.`,
    })

    // Reset after 2 seconds for demo purposes
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <Card className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={isAdded ? "default" : "outline"}
              className="absolute right-2 top-2 z-10 h-6 px-1 text-xs"
              onClick={handleAddToCollection}
            >
              {isAdded ? <Check className="h-3 w-3 mr-0.5" /> : <Plus className="h-3 w-3 mr-0.5" />}
              {isAdded ? "Added" : "Add"}
              <span className="sr-only">{isAdded ? "Added to collection" : "Add to collection"}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isAdded ? "Added to your collection" : "Add to your collection"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg pr-8">{name}</CardTitle>
        </div>
        <CardDescription>{classification}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-center mb-4">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={120}
            height={120}
            className="rounded-md object-contain"
          />
        </div>
        <div className="flex gap-2 mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className={`${getTypeColor(primaryType)} flex gap-1 items-center`}>
                  {getTypeIcon(primaryType)}
                  {primaryType}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Primary classification</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {secondaryType && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className={`${getTypeColor(secondaryType)} flex gap-1 items-center`}>
                    {getTypeIcon(secondaryType)}
                    {secondaryType}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Secondary classification</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {/* Composition indicator */}
        <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
          {primaryType === "Humectant" && (
            <div className="bg-sky-400" style={{ width: `${secondaryType ? "60%" : "100%"}` }}></div>
          )}
          {primaryType === "Moisturizer" && (
            <div className="bg-emerald-400" style={{ width: `${secondaryType ? "60%" : "100%"}` }}></div>
          )}
          {primaryType === "Emollient" && (
            <div className="bg-amber-400" style={{ width: `${secondaryType ? "60%" : "100%"}` }}></div>
          )}
          {primaryType === "Occlusive" && (
            <div className="bg-purple-400" style={{ width: `${secondaryType ? "60%" : "100%"}` }}></div>
          )}
          {secondaryType === "Humectant" && <div className="bg-sky-400" style={{ width: "40%" }}></div>}
          {secondaryType === "Moisturizer" && <div className="bg-emerald-400" style={{ width: "40%" }}></div>}
          {secondaryType === "Emollient" && <div className="bg-amber-400" style={{ width: "40%" }}></div>}
          {secondaryType === "Occlusive" && <div className="bg-purple-400" style={{ width: "40%" }}></div>}
        </div>
        <div className="text-xs text-muted-foreground line-clamp-2">
          <span className="font-medium">Key ingredients:</span> {ingredients}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
        <Button variant="outline" size="sm" className="w-8 p-0">
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
