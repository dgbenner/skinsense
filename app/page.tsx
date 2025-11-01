import Link from "next/link"
import { Calendar, Camera, FileText, Link2, Plus, Search, Scan } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { DailyCheckIn } from "@/components/daily-check-in"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">SkinSense</h1>
          <p className="text-muted-foreground">Your personalized eczema product classifier</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add a new product</CardTitle>
            <CardDescription>Scan a product label, enter ingredients, or paste a URL to analyze</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <Camera className="h-6 w-6" />
                <span>Scan Label</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <FileText className="h-6 w-6" />
                <span>Enter Text</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <Link2 className="h-6 w-6" />
                <span>Paste URL</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col gap-2">
                <Search className="h-6 w-6" />
                <span>Search Products</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Store Scanner Card */}
          <Link href="/store-product-scanner">
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-colors cursor-pointer">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-bold text-lg">Store Product Scanner</h3>
                  <p className="text-muted-foreground">Scan store shelves to find products by function</p>
                </div>
                <Scan className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
          </Link>

          {/* Symptom Tracker Card */}
          <Link href="/symptom-tracker">
            <Card className="bg-gradient-to-r from-amber-50 to-rose-50 hover:from-amber-100 hover:to-rose-100 transition-colors cursor-pointer">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-bold text-lg">Symptom Tracker</h3>
                  <p className="text-muted-foreground">Track your eczema progress with photos over time</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
          </Link>
        </div>

        <Tabs defaultValue="my-products">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-products">My Products</TabsTrigger>
            <TabsTrigger value="daily-tracking">Daily Tracking</TabsTrigger>
          </TabsList>
          <TabsContent value="my-products" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ProductCard
                name="CeraVe Moisturizing Cream"
                image="/placeholder.svg?height=200&width=200"
                classification="Moisturizer with Ceramides"
                ingredients="Aqua, Glycerin, Cetearyl Alcohol, Caprylic/Capric Triglyceride, Cetyl Alcohol, Ceteareth-20, Petrolatum, Potassium Phosphate, Ceramide NP, Ceramide AP, Ceramide EOP"
                primaryType="Moisturizer"
                secondaryType="Occlusive"
              />
              <ProductCard
                name="Eucerin Original Healing Cream"
                image="/placeholder.svg?height=200&width=200"
                classification="Emollient & Occlusive"
                ingredients="Aqua, Glycerin, Cetyl Alcohol, Petrolatum, Mineral Oil, Lanolin Alcohol, Phenoxyethanol, Piroctone Olamine"
                primaryType="Emollient"
                secondaryType="Occlusive"
              />
              <ProductCard
                name="Neutrogena Hydro Boost"
                image="/placeholder.svg?height=200&width=200"
                classification="Humectant"
                ingredients="Aqua, Glycerin, Dimethicone, Cetearyl Olivate, Sodium Hyaluronate, Hydroxyethyl Urea, Dimethicone/Vinyl Dimethicone Crosspolymer"
                primaryType="Humectant"
                secondaryType="Moisturizer"
              />
              <Link
                href="/add-product"
                className="flex items-center justify-center h-full min-h-[200px] border-2 border-dashed rounded-lg border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors"
              >
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Plus className="h-8 w-8" />
                  <span>Add New Product</span>
                </div>
              </Link>
            </div>
          </TabsContent>
          <TabsContent value="daily-tracking" className="mt-4">
            <DailyCheckIn />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
