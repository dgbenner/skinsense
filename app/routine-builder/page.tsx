import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, DotIcon as DragHandleDots2Icon, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function RoutineBuilder() {
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
          <h1 className="text-2xl font-bold tracking-tight">Routine Builder</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Eczema Care Routine</CardTitle>
            <CardDescription>Build a personalized skincare routine based on your skin needs</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="morning">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="morning">Morning Routine</TabsTrigger>
                <TabsTrigger value="evening">Evening Routine</TabsTrigger>
              </TabsList>
              <TabsContent value="morning" className="pt-4">
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <DragHandleDots2Icon className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <CardTitle className="text-base">Step 1: Gentle Cleanser</CardTitle>
                          <CardDescription>Start with a mild, fragrance-free cleanser</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                          <Plus className="h-6 w-6" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          No product selected.{" "}
                          <Button variant="link" className="h-auto p-0">
                            Add product
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <DragHandleDots2Icon className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <CardTitle className="text-base">Step 2: Humectant</CardTitle>
                          <CardDescription>Apply to damp skin to attract moisture</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="Neutrogena Hydro Boost"
                          width={64}
                          height={64}
                          className="rounded-md object-contain"
                        />
                        <div>
                          <h4 className="text-sm font-medium">Neutrogena Hydro Boost</h4>
                          <p className="text-xs text-muted-foreground">Humectant</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <DragHandleDots2Icon className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <CardTitle className="text-base">Step 3: Moisturizer</CardTitle>
                          <CardDescription>Seal in moisture and repair skin barrier</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="CeraVe Moisturizing Cream"
                          width={64}
                          height={64}
                          className="rounded-md object-contain"
                        />
                        <div>
                          <h4 className="text-sm font-medium">CeraVe Moisturizing Cream</h4>
                          <p className="text-xs text-muted-foreground">Moisturizer with Ceramides</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Step
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="evening" className="pt-4">
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <DragHandleDots2Icon className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <CardTitle className="text-base">Step 1: Gentle Cleanser</CardTitle>
                          <CardDescription>Start with a mild, fragrance-free cleanser</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                          <Plus className="h-6 w-6" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          No product selected.{" "}
                          <Button variant="link" className="h-auto p-0">
                            Add product
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <DragHandleDots2Icon className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <CardTitle className="text-base">Step 2: Humectant</CardTitle>
                          <CardDescription>Apply to damp skin to attract moisture</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="Neutrogena Hydro Boost"
                          width={64}
                          height={64}
                          className="rounded-md object-contain"
                        />
                        <div>
                          <h4 className="text-sm font-medium">Neutrogena Hydro Boost</h4>
                          <p className="text-xs text-muted-foreground">Humectant</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <DragHandleDots2Icon className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <CardTitle className="text-base">Step 3: Moisturizer</CardTitle>
                          <CardDescription>Seal in moisture and repair skin barrier</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="CeraVe Moisturizing Cream"
                          width={64}
                          height={64}
                          className="rounded-md object-contain"
                        />
                        <div>
                          <h4 className="text-sm font-medium">CeraVe Moisturizing Cream</h4>
                          <p className="text-xs text-muted-foreground">Moisturizer with Ceramides</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <DragHandleDots2Icon className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <CardTitle className="text-base">Step 4: Occlusive</CardTitle>
                          <CardDescription>Seal everything in with a protective barrier</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-4">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="Eucerin Original Healing Cream"
                          width={64}
                          height={64}
                          className="rounded-md object-contain"
                        />
                        <div>
                          <h4 className="text-sm font-medium">Eucerin Original Healing Cream</h4>
                          <p className="text-xs text-muted-foreground">Emollient & Occlusive</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Step
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Routine</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Products</CardTitle>
            <CardDescription>Based on your skin needs and current routine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">La Roche-Posay Lipikar Balm AP+</CardTitle>
                  <CardDescription className="text-xs">Moisturizer with Ceramides</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-center mb-2">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="La Roche-Posay Lipikar Balm AP+"
                      width={80}
                      height={80}
                      className="rounded-md object-contain"
                    />
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <Badge variant="outline" className="text-xs bg-emerald-100 text-emerald-800">
                      Moisturizer
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                      Occlusive
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Add to Routine
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Aveeno Eczema Therapy Cream</CardTitle>
                  <CardDescription className="text-xs">Colloidal Oatmeal Treatment</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-center mb-2">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Aveeno Eczema Therapy Cream"
                      width={80}
                      height={80}
                      className="rounded-md object-contain"
                    />
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <Badge variant="outline" className="text-xs bg-emerald-100 text-emerald-800">
                      Moisturizer
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800">
                      Emollient
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Add to Routine
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Vanicream Moisturizing Skin Cream</CardTitle>
                  <CardDescription className="text-xs">Fragrance-Free Moisturizer</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-center mb-2">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt="Vanicream Moisturizing Skin Cream"
                      width={80}
                      height={80}
                      className="rounded-md object-contain"
                    />
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <Badge variant="outline" className="text-xs bg-emerald-100 text-emerald-800">
                      Moisturizer
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                      Occlusive
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Add to Routine
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
