import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Shield, Sparkles, Waves } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCompositionChart } from "@/components/product-composition-chart"

export default function ProductComparison() {
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
          <h1 className="text-2xl font-bold tracking-tight">Product Comparison</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>CeraVe Moisturizing Cream</CardTitle>
              <CardDescription>Moisturizer with Ceramides</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="CeraVe Moisturizing Cream"
                  width={150}
                  height={150}
                  className="rounded-md object-contain"
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
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

              <ProductCompositionChart humectant={10} moisturizer={65} emollient={15} occlusive={25} />

              <div className="space-y-2">
                <h3 className="font-medium">Key Ingredients</h3>
                <ul className="text-sm space-y-1">
                  <li>Ceramides (NP, AP, EOP)</li>
                  <li>Glycerin</li>
                  <li>Petrolatum</li>
                  <li>Cetearyl Alcohol</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eucerin Original Healing Cream</CardTitle>
              <CardDescription>Emollient & Occlusive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="Eucerin Original Healing Cream"
                  width={150}
                  height={150}
                  className="rounded-md object-contain"
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <Badge
                  variant="outline"
                  className="bg-amber-100 text-amber-800 hover:bg-amber-200 flex gap-1 items-center"
                >
                  <Sparkles className="h-3 w-3" />
                  Emollient
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-100 text-purple-800 hover:bg-purple-200 flex gap-1 items-center"
                >
                  <Shield className="h-3 w-3" />
                  Occlusive
                </Badge>
              </div>

              <ProductCompositionChart humectant={5} moisturizer={20} emollient={35} occlusive={55} />

              <div className="space-y-2">
                <h3 className="font-medium">Key Ingredients</h3>
                <ul className="text-sm space-y-1">
                  <li>Petrolatum</li>
                  <li>Mineral Oil</li>
                  <li>Lanolin Alcohol</li>
                  <li>Glycerin</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Composition Comparison</CardTitle>
            <CardDescription>Side-by-side comparison of product properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-5 gap-4">
                <div></div>
                <div className="font-medium text-center">Humectant</div>
                <div className="font-medium text-center">Moisturizer</div>
                <div className="font-medium text-center">Emollient</div>
                <div className="font-medium text-center">Occlusive</div>

                <div className="font-medium">CeraVe</div>
                <div className="text-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center">
                    10%
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    65%
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                    15%
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center">
                    25%
                  </span>
                </div>

                <div className="font-medium">Eucerin</div>
                <div className="text-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center">
                    5%
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    20%
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                    35%
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center">
                    55%
                  </span>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  CeraVe is primarily a moisturizer with moderate occlusive properties, making it ideal for daily use to
                  repair the skin barrier. Eucerin has stronger occlusive and emollient properties, making it better for
                  sealing in moisture and providing relief for very dry skin. For optimal results, consider using CeraVe
                  during the day and Eucerin at night as your final step.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Add Both to My Routine</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
