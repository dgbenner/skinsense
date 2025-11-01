"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Droplets, Plus, Shield, Waves } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCompositionChart } from "@/components/product-composition-chart"
import { IngredientFunctionBreakdown } from "@/components/ingredient-function-breakdown"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ProductAnalysis() {
  // Sample ingredient data with function contributions
  const ingredients = [
    {
      name: "Ceramides (NP, AP, EOP)",
      functions: {
        moisturizer: 30,
      },
      description:
        "Essential lipids naturally found in skin that help restore and maintain the skin's barrier, preventing moisture loss and protecting against environmental damage.",
    },
    {
      name: "Glycerin",
      functions: {
        humectant: 10,
      },
      description:
        "A powerful humectant that attracts water from the environment and deeper skin layers to hydrate the outer layer of skin.",
    },
    {
      name: "Petrolatum",
      functions: {
        occlusive: 25,
      },
      description:
        "Forms a protective barrier on the skin's surface that prevents water loss and helps repair the skin barrier.",
    },
    {
      name: "Cetearyl Alcohol",
      functions: {
        emollient: 15,
        moisturizer: 5,
      },
      description:
        "A fatty alcohol that softens skin and helps stabilize formulations. Unlike drying alcohols, it's beneficial for dry skin.",
    },
    {
      name: "Hyaluronic Acid",
      functions: {
        humectant: 5,
        moisturizer: 5,
      },
      description:
        "Can hold up to 1000 times its weight in water, helping to plump and hydrate the skin while reducing the appearance of fine lines.",
    },
    {
      name: "Caprylic/Capric Triglyceride",
      functions: {
        emollient: 5,
        moisturizer: 10,
      },
      description:
        "Derived from coconut oil and glycerin, it functions as an emollient and replenishes skin's moisture barrier.",
    },
    {
      name: "Dimethicone",
      functions: {
        occlusive: 5,
        emollient: 5,
      },
      description:
        "A silicone-based polymer that forms a breathable barrier on skin, reducing water loss while giving a smooth feel.",
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
          <h1 className="text-2xl font-bold tracking-tight">Product Analysis</h1>
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-6">
          <Card className="relative">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute right-2 top-2 z-10 h-6 px-1 text-xs"
                    onClick={() => {
                      // Add to collection
                    }}
                  >
                    <Plus className="h-3 w-3 mr-0.5" />
                    Add
                    <span className="sr-only">Add to collection</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to your collection</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <CardHeader className="pb-2">
              <CardTitle className="pr-8">CeraVe Moisturizing Cream</CardTitle>
              <CardDescription>Moisturizer with Ceramides</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="CeraVe Moisturizing Cream"
                width={160}
                height={160}
                className="rounded-md object-contain mb-4"
              />
              <div className="flex flex-wrap gap-2 w-full justify-center">
                <Badge
                  variant="outline"
                  className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 flex gap-1 items-center"
                >
                  <Waves className="h-3 w-3" />
                  Moisturizer
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-100 text-purple-800 hover:bg-purple-200 flex gap-1 items-center"
                >
                  <Shield className="h-3 w-3" />
                  Occlusive
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingredient Analysis</CardTitle>
              <CardDescription>Breakdown of key ingredients and their functions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="ingredients">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  <TabsTrigger value="composition">Composition</TabsTrigger>
                  <TabsTrigger value="classification">Classification</TabsTrigger>
                </TabsList>
                <TabsContent value="ingredients" className="pt-4">
                  <IngredientFunctionBreakdown ingredients={ingredients} />
                </TabsContent>
                <TabsContent value="composition" className="pt-4">
                  <ProductCompositionChart humectant={10} moisturizer={50} emollient={15} occlusive={25} />
                </TabsContent>
                <TabsContent value="classification" className="pt-4 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Waves className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">Moisturizer</span>
                      </div>
                      <span className="text-sm">50%</span>
                    </div>
                    <Progress value={50} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Contains ceramides and fatty alcohols that help restore the skin barrier
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Occlusive</span>
                      </div>
                      <span className="text-sm">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Contains petrolatum that forms a protective barrier to lock in moisture
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-sky-600" />
                        <span className="font-medium">Humectant</span>
                      </div>
                      <span className="text-sm">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                    <p className="text-sm text-muted-foreground">Contains glycerin that attracts water to the skin</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full">Add to My Products</Button>
              <Button variant="outline" className="w-full">
                View Similar Products
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Routine</CardTitle>
            <CardDescription>
              Based on this product's classification, here's how to incorporate it into your routine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-sm font-medium">
                        1
                      </span>
                      <CardTitle className="text-base">Cleanse</CardTitle>
                    </div>
                    <CardDescription>Start with a gentle cleanser</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Use a gentle, fragrance-free cleanser to remove dirt and impurities without stripping your skin's
                      natural oils.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-sm font-medium">
                        2
                      </span>
                      <CardTitle className="text-base">Humectant</CardTitle>
                    </div>
                    <CardDescription>Apply water-attracting ingredients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Apply a humectant-rich product like hyaluronic acid serum to damp skin to draw moisture into the
                      skin.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-sm font-medium">
                        3
                      </span>
                      <CardTitle className="text-base">Moisturize</CardTitle>
                    </div>
                    <CardDescription>Lock in moisture with this product</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Apply CeraVe Moisturizing Cream to seal in moisture and repair your skin barrier with ceramides.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Pro Tip</h3>
                <p className="text-sm text-muted-foreground">
                  For severe eczema, consider adding an occlusive like petroleum jelly as a final step at night to
                  create a stronger moisture barrier while you sleep.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
