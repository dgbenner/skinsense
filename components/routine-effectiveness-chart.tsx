"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Droplets, Plus, Shield, Sparkles, Star, Waves } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Product {
  id: string
  name: string
  image: string
  type: "Humectant" | "Moisturizer" | "Emollient" | "Occlusive"
  effectiveness: number
  description: string
  ingredients: string[]
}

export function RoutineEffectivenessChart() {
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>({
    humectant: true,
    moisturizer: true,
    emollient: true,
    occlusive: true,
  })

  // Sample user products organized by type
  const userProducts: Record<string, Product[]> = {
    humectant: [
      {
        id: "h1",
        name: "Neutrogena Hydro Boost",
        image: "/placeholder.svg?height=80&width=80",
        type: "Humectant",
        effectiveness: 85,
        description: "Gel-cream with hyaluronic acid",
        ingredients: ["Hyaluronic Acid", "Glycerin", "Dimethicone"],
      },
      {
        id: "h2",
        name: "The Ordinary Hyaluronic Acid 2% + B5",
        image: "/placeholder.svg?height=80&width=80",
        type: "Humectant",
        effectiveness: 92,
        description: "Concentrated serum for deep hydration",
        ingredients: ["Hyaluronic Acid", "Vitamin B5", "Sodium Hyaluronate"],
      },
    ],
    moisturizer: [
      {
        id: "m1",
        name: "CeraVe Moisturizing Cream",
        image: "/placeholder.svg?height=80&width=80",
        type: "Moisturizer",
        effectiveness: 90,
        description: "Rich cream with ceramides",
        ingredients: ["Ceramides", "Hyaluronic Acid", "Glycerin"],
      },
    ],
    emollient: [
      {
        id: "e1",
        name: "First Aid Beauty Ultra Repair Cream",
        image: "/placeholder.svg?height=80&width=80",
        type: "Emollient",
        effectiveness: 78,
        description: "Soothing cream for dry skin",
        ingredients: ["Colloidal Oatmeal", "Shea Butter", "Allantoin"],
      },
    ],
    occlusive: [
      {
        id: "o1",
        name: "Aquaphor Healing Ointment",
        image: "/placeholder.svg?height=80&width=80",
        type: "Occlusive",
        effectiveness: 95,
        description: "Protective ointment for very dry skin",
        ingredients: ["Petrolatum", "Mineral Oil", "Lanolin Alcohol"],
      },
      {
        id: "o2",
        name: "Eucerin Original Healing Cream",
        image: "/placeholder.svg?height=80&width=80",
        type: "Occlusive",
        effectiveness: 88,
        description: "Rich cream for dry, sensitive skin",
        ingredients: ["Petrolatum", "Mineral Oil", "Lanolin Alcohol"],
      },
    ],
  }

  // Calculate layer effectiveness
  const layerEffectiveness = {
    humectant: userProducts.humectant.length
      ? userProducts.humectant.reduce((sum, product) => sum + product.effectiveness, 0) / userProducts.humectant.length
      : 0,
    moisturizer: userProducts.moisturizer.length
      ? userProducts.moisturizer.reduce((sum, product) => sum + product.effectiveness, 0) /
        userProducts.moisturizer.length
      : 0,
    emollient: userProducts.emollient.length
      ? userProducts.emollient.reduce((sum, product) => sum + product.effectiveness, 0) / userProducts.emollient.length
      : 0,
    occlusive: userProducts.occlusive.length
      ? userProducts.occlusive.reduce((sum, product) => sum + product.effectiveness, 0) / userProducts.occlusive.length
      : 0,
  }

  // Calculate overall routine effectiveness
  const overallEffectiveness =
    (layerEffectiveness.humectant +
      layerEffectiveness.moisturizer +
      layerEffectiveness.emollient +
      layerEffectiveness.occlusive) /
    4

  const toggleLayer = (layer: string) => {
    setExpandedLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }))
  }

  const getLayerIcon = (layer: string) => {
    switch (layer) {
      case "humectant":
        return <Droplets className="h-5 w-5 text-sky-600" />
      case "moisturizer":
        return <Waves className="h-5 w-5 text-emerald-600" />
      case "emollient":
        return <Sparkles className="h-5 w-5 text-amber-600" />
      case "occlusive":
        return <Shield className="h-5 w-5 text-purple-600" />
      default:
        return null
    }
  }

  const getLayerColor = (layer: string) => {
    switch (layer) {
      case "humectant":
        return "bg-sky-50 border-sky-200"
      case "moisturizer":
        return "bg-emerald-50 border-emerald-200"
      case "emollient":
        return "bg-amber-50 border-amber-200"
      case "occlusive":
        return "bg-purple-50 border-purple-200"
      default:
        return ""
    }
  }

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 90) return "text-green-600"
    if (effectiveness >= 75) return "text-emerald-600"
    if (effectiveness >= 60) return "text-amber-600"
    return "text-red-600"
  }

  const getEffectivenessStars = (effectiveness: number) => {
    const fullStars = Math.floor(effectiveness / 20)
    const hasHalfStar = effectiveness % 20 >= 10
    const stars = []

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-3 w-3 fill-current text-amber-500" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-3 w-3 text-amber-500 fill-[50%]" />)
      } else {
        stars.push(<Star key={i} className="h-3 w-3 text-gray-300" />)
      }
    }

    return stars
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Skincare Routine Effectiveness</CardTitle>
        <CardDescription>Analysis of your product layering strategy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall effectiveness */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Overall Routine Effectiveness</h3>
            <div className="flex items-center gap-2">
              <div className="flex">{getEffectivenessStars(overallEffectiveness)}</div>
              <span className={`font-medium ${getEffectivenessColor(overallEffectiveness)}`}>
                {Math.round(overallEffectiveness)}%
              </span>
            </div>
          </div>
          <Progress value={overallEffectiveness} className="h-2.5" />
        </div>

        {/* Skin layers visualization */}
        <div className="space-y-3 relative">
          <div className="absolute left-0 w-0.5 bg-gray-200 h-full z-0 ml-6"></div>

          {/* Occlusive layer - top layer (applied last) */}
          <div className={`relative z-10 rounded-lg border p-4 ${getLayerColor("occlusive")}`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                {getLayerIcon("occlusive")}
                <h3 className="font-medium">Occlusive Layer</h3>
                <Badge variant="outline" className="bg-white">
                  {userProducts.occlusive.length} products
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">{getEffectivenessStars(layerEffectiveness.occlusive)}</div>
                <span className={`font-medium ${getEffectivenessColor(layerEffectiveness.occlusive)}`}>
                  {Math.round(layerEffectiveness.occlusive)}%
                </span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleLayer("occlusive")}>
                  {expandedLayers.occlusive ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {expandedLayers.occlusive && (
              <div className="space-y-3 mt-3">
                {userProducts.occlusive.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 bg-white rounded-md p-2 border border-gray-100"
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md object-contain"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-xs text-muted-foreground">{product.description}</p>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="outline" className="h-6 px-1 text-xs">
                                <Plus className="h-3 w-3 mr-0.5" />
                                Add
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add to your collection</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex gap-1">
                          {product.ingredients.slice(0, 2).map((ingredient, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {ingredient}
                            </Badge>
                          ))}
                          {product.ingredients.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.ingredients.length - 2} more
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex">{getEffectivenessStars(product.effectiveness)}</div>
                          <span className={`text-xs font-medium ${getEffectivenessColor(product.effectiveness)}`}>
                            {product.effectiveness}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Emollient layer */}
          <div className={`relative z-20 rounded-lg border p-4 ${getLayerColor("emollient")}`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                {getLayerIcon("emollient")}
                <h3 className="font-medium">Emollient Layer</h3>
                <Badge variant="outline" className="bg-white">
                  {userProducts.emollient.length} products
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">{getEffectivenessStars(layerEffectiveness.emollient)}</div>
                <span className={`font-medium ${getEffectivenessColor(layerEffectiveness.emollient)}`}>
                  {Math.round(layerEffectiveness.emollient)}%
                </span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleLayer("emollient")}>
                  {expandedLayers.emollient ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {expandedLayers.emollient && (
              <div className="space-y-3 mt-3">
                {userProducts.emollient.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 bg-white rounded-md p-2 border border-gray-100"
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md object-contain"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-xs text-muted-foreground">{product.description}</p>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="outline" className="h-6 px-1 text-xs">
                                <Plus className="h-3 w-3 mr-0.5" />
                                Add
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add to your collection</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex gap-1">
                          {product.ingredients.slice(0, 2).map((ingredient, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {ingredient}
                            </Badge>
                          ))}
                          {product.ingredients.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.ingredients.length - 2} more
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex">{getEffectivenessStars(product.effectiveness)}</div>
                          <span className={`text-xs font-medium ${getEffectivenessColor(product.effectiveness)}`}>
                            {product.effectiveness}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Moisturizer layer */}
          <div className={`relative z-30 rounded-lg border p-4 ${getLayerColor("moisturizer")}`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                {getLayerIcon("moisturizer")}
                <h3 className="font-medium">Moisturizer Layer</h3>
                <Badge variant="outline" className="bg-white">
                  {userProducts.moisturizer.length} products
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">{getEffectivenessStars(layerEffectiveness.moisturizer)}</div>
                <span className={`font-medium ${getEffectivenessColor(layerEffectiveness.moisturizer)}`}>
                  {Math.round(layerEffectiveness.moisturizer)}%
                </span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleLayer("moisturizer")}>
                  {expandedLayers.moisturizer ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {expandedLayers.moisturizer && (
              <div className="space-y-3 mt-3">
                {userProducts.moisturizer.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 bg-white rounded-md p-2 border border-gray-100"
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md object-contain"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-xs text-muted-foreground">{product.description}</p>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="outline" className="h-6 px-1 text-xs">
                                <Plus className="h-3 w-3 mr-0.5" />
                                Add
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add to your collection</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex gap-1">
                          {product.ingredients.slice(0, 2).map((ingredient, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {ingredient}
                            </Badge>
                          ))}
                          {product.ingredients.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.ingredients.length - 2} more
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex">{getEffectivenessStars(product.effectiveness)}</div>
                          <span className={`text-xs font-medium ${getEffectivenessColor(product.effectiveness)}`}>
                            {product.effectiveness}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Humectant layer - bottom layer (applied first) */}
          <div className={`relative z-40 rounded-lg border p-4 ${getLayerColor("humectant")}`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                {getLayerIcon("humectant")}
                <h3 className="font-medium">Humectant Layer</h3>
                <Badge variant="outline" className="bg-white">
                  {userProducts.humectant.length} products
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">{getEffectivenessStars(layerEffectiveness.humectant)}</div>
                <span className={`font-medium ${getEffectivenessColor(layerEffectiveness.humectant)}`}>
                  {Math.round(layerEffectiveness.humectant)}%
                </span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleLayer("humectant")}>
                  {expandedLayers.humectant ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {expandedLayers.humectant && (
              <div className="space-y-3 mt-3">
                {userProducts.humectant.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 bg-white rounded-md p-2 border border-gray-100"
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md object-contain"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-xs text-muted-foreground">{product.description}</p>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="sm" variant="outline" className="h-6 px-1 text-xs">
                                <Plus className="h-3 w-3 mr-0.5" />
                                Add
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add to your collection</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex gap-1">
                          {product.ingredients.slice(0, 2).map((ingredient, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {ingredient}
                            </Badge>
                          ))}
                          {product.ingredients.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.ingredients.length - 2} more
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex">{getEffectivenessStars(product.effectiveness)}</div>
                          <span className={`text-xs font-medium ${getEffectivenessColor(product.effectiveness)}`}>
                            {product.effectiveness}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Skin layer (bottom) */}
          <div className="relative z-50 rounded-lg border border-dashed border-gray-300 p-4 bg-gradient-to-r from-rose-50 to-pink-50">
            <div className="flex justify-center items-center">
              <span className="font-medium text-gray-600">Your Skin</span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Routine Recommendations</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-emerald-600">✓</span>
              <span>Your occlusive layer is strong, providing excellent moisture retention.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600">⚠</span>
              <span>Consider adding another emollient product to improve skin softening.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">✓</span>
              <span>Your humectant products work well together for optimal hydration.</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
