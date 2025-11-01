"use client"

import Link from "next/link"
import { ArrowLeft, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { IngredientDetailModal } from "@/components/ingredient-detail-modal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function IngredientDatabase() {
  // Sample ingredient data with detailed information
  const ingredients = [
    {
      name: "Ceramides",
      functions: {
        moisturizer: 80,
        occlusive: 20,
      },
      description:
        "Essential lipids naturally found in skin that help restore and maintain the skin's barrier, preventing moisture loss and protecting against environmental damage.",
      benefits: [
        "Restores skin barrier function",
        "Prevents moisture loss",
        "Protects against environmental damage",
        "Reduces inflammation",
      ],
      sources: ["Synthetic", "Plant-derived (phytoceramides)", "Animal-derived (rare in modern formulations)"],
    },
    {
      name: "Glycerin",
      functions: {
        humectant: 90,
        moisturizer: 10,
      },
      description:
        "A powerful humectant that attracts water from the environment and deeper skin layers to hydrate the outer layer of skin.",
      benefits: [
        "Attracts water to the skin",
        "Improves skin hydration",
        "Helps other ingredients penetrate",
        "Soothes irritation",
      ],
      sources: ["Plant oils", "Animal fats", "Synthetic production"],
    },
    {
      name: "Petrolatum",
      functions: {
        occlusive: 90,
        emollient: 10,
      },
      description:
        "Forms a protective barrier on the skin's surface that prevents water loss and helps repair the skin barrier.",
      benefits: ["Creates a protective barrier", "Prevents water loss", "Protects damaged skin", "Allows skin to heal"],
      concerns: ["Derived from petroleum", "Can feel greasy", "May trap bacteria if applied to dirty skin"],
      sources: ["Petroleum refinement"],
    },
    {
      name: "Hyaluronic Acid",
      functions: {
        humectant: 80,
        moisturizer: 20,
      },
      description:
        "Can hold up to 1000 times its weight in water, helping to plump and hydrate the skin while reducing the appearance of fine lines.",
      benefits: ["Intense hydration", "Plumps skin", "Reduces appearance of fine lines", "Works for all skin types"],
      sources: ["Bacterial fermentation", "Synthetic production"],
    },
    {
      name: "Shea Butter",
      functions: {
        emollient: 60,
        occlusive: 30,
        moisturizer: 10,
      },
      description:
        "A rich, natural fat extracted from the nuts of the shea tree that softens and smooths skin while providing mild occlusive properties.",
      benefits: [
        "Softens skin",
        "Provides mild sun protection",
        "Anti-inflammatory properties",
        "Rich in vitamins A, E, and F",
      ],
      sources: ["Shea tree nuts (primarily from West Africa)"],
    },
    {
      name: "Dimethicone",
      functions: {
        occlusive: 50,
        emollient: 50,
      },
      description:
        "A silicone-based polymer that forms a breathable barrier on skin, reducing water loss while giving a smooth feel.",
      benefits: [
        "Creates breathable barrier",
        "Fills in fine lines temporarily",
        "Gives smooth, silky feel",
        "Protects skin",
      ],
      concerns: ["Environmental concerns about silicones", "Can cause breakouts in some people"],
      sources: ["Synthetic production from silica (sand)"],
    },
    {
      name: "Squalane",
      functions: {
        emollient: 70,
        occlusive: 30,
      },
      description:
        "A lightweight oil that mimics skin's natural sebum, making it excellent for balancing and moisturizing without feeling heavy.",
      benefits: ["Lightweight moisturization", "Balances oil production", "Antioxidant properties", "Non-comedogenic"],
      sources: ["Olive oil", "Sugar cane", "Synthetic production"],
    },
    {
      name: "Niacinamide",
      functions: {
        moisturizer: 60,
        humectant: 10,
      },
      description:
        "A form of vitamin B3 that helps improve skin barrier function, reduce inflammation, and regulate oil production.",
      benefits: [
        "Strengthens skin barrier",
        "Reduces redness and inflammation",
        "Regulates oil production",
        "Brightens skin tone",
      ],
      sources: ["Synthetic production"],
    },
  ]

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Ingredient Database</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search ingredients..." className="pl-8" />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="humectant">Humectants</TabsTrigger>
            <TabsTrigger value="moisturizer">Moisturizers</TabsTrigger>
            <TabsTrigger value="emollient">Emollients</TabsTrigger>
            <TabsTrigger value="occlusive">Occlusives</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ingredients.map((ingredient) => (
                <Card key={ingredient.name} className="overflow-hidden relative">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute right-2 top-2 z-10 h-6 px-1 text-xs"
                          onClick={() => {
                            // Add to tracked ingredients
                          }}
                        >
                          <Plus className="h-3 w-3 mr-0.5" />
                          Track
                          <span className="sr-only">Track ingredient</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Track this ingredient in your products</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-base pr-8">{ingredient.name}</CardTitle>
                    <CardDescription className="text-xs flex flex-wrap gap-1 mt-1">
                      {Object.entries(ingredient.functions).map(
                        ([functionName, value]) =>
                          value && (
                            <Badge
                              key={functionName}
                              variant="outline"
                              className={
                                functionName === "humectant"
                                  ? "bg-sky-100 text-sky-800"
                                  : functionName === "moisturizer"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : functionName === "emollient"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-purple-100 text-purple-800"
                              }
                            >
                              {functionName.charAt(0).toUpperCase() + functionName.slice(1)}
                            </Badge>
                          ),
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-xs text-muted-foreground line-clamp-3">{ingredient.description}</p>
                    <IngredientDetailModal
                      ingredient={ingredient}
                      trigger={
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs mt-1">
                          View details
                        </Button>
                      }
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="humectant" className="mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ingredients
                .filter((ingredient) => ingredient.functions.humectant)
                .map((ingredient) => (
                  <Card key={ingredient.name} className="overflow-hidden relative">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute right-2 top-2 z-10 h-6 px-1 text-xs"
                            onClick={() => {
                              // Add to tracked ingredients
                            }}
                          >
                            <Plus className="h-3 w-3 mr-0.5" />
                            Track
                            <span className="sr-only">Track ingredient</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Track this ingredient in your products</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-base pr-8">{ingredient.name}</CardTitle>
                      <CardDescription className="text-xs flex flex-wrap gap-1 mt-1">
                        {Object.entries(ingredient.functions).map(
                          ([functionName, value]) =>
                            value && (
                              <Badge
                                key={functionName}
                                variant="outline"
                                className={
                                  functionName === "humectant"
                                    ? "bg-sky-100 text-sky-800"
                                    : functionName === "moisturizer"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : functionName === "emollient"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-purple-100 text-purple-800"
                                }
                              >
                                {functionName.charAt(0).toUpperCase() + functionName.slice(1)}
                              </Badge>
                            ),
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-xs text-muted-foreground line-clamp-3">{ingredient.description}</p>
                      <IngredientDetailModal
                        ingredient={ingredient}
                        trigger={
                          <Button variant="link" size="sm" className="h-auto p-0 text-xs mt-1">
                            View details
                          </Button>
                        }
                      />
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          {/* Similar TabsContent for other tabs (moisturizer, emollient, occlusive) */}
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Ingredient Functions</CardTitle>
            <CardDescription>How different ingredients work to help your skin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-100 text-sky-800">
                    H
                  </span>
                  Humectants
                </h3>
                <p className="text-sm text-muted-foreground">
                  Humectants attract water from the environment or deeper skin layers to hydrate the outer layer of
                  skin. They're the first step in hydration.
                </p>
                <p className="text-sm">
                  <span className="font-medium">Examples:</span> Glycerin, Hyaluronic Acid, Urea, Aloe Vera
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800">
                    M
                  </span>
                  Moisturizers
                </h3>
                <p className="text-sm text-muted-foreground">
                  Moisturizers help repair and strengthen the skin barrier, improving its ability to retain moisture and
                  protect against irritants.
                </p>
                <p className="text-sm">
                  <span className="font-medium">Examples:</span> Ceramides, Niacinamide, Panthenol, Fatty Acids
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800">
                    E
                  </span>
                  Emollients
                </h3>
                <p className="text-sm text-muted-foreground">
                  Emollients fill in the gaps between skin cells, creating a smooth surface and soft feel. They help
                  with skin flexibility.
                </p>
                <p className="text-sm">
                  <span className="font-medium">Examples:</span> Shea Butter, Squalane, Jojoba Oil, Fatty Alcohols
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-800">
                    O
                  </span>
                  Occlusives
                </h3>
                <p className="text-sm text-muted-foreground">
                  Occlusives form a protective seal on the skin's surface to prevent water loss. They're typically the
                  final step in a routine.
                </p>
                <p className="text-sm">
                  <span className="font-medium">Examples:</span> Petrolatum, Dimethicone, Beeswax, Mineral Oil
                </p>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Layering Strategy for Eczema</h3>
              <p className="text-sm text-muted-foreground">
                For optimal results, layer products in this order: humectants first (on damp skin), followed by
                moisturizers to repair the barrier, then emollients to soften, and finally occlusives to seal everything
                in. This "HMEO" approach maximizes hydration and protection.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
