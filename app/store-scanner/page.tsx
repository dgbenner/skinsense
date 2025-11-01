"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Camera, Filter, Info, Layers, Scan } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProductScannerOverlay } from "@/components/product-scanner-overlay"

export default function StoreScanner() {
  const [activeTab, setActiveTab] = useState("camera")
  const [scanMode, setScanMode] = useState<"all" | "humectant" | "moisturizer" | "emollient" | "occlusive">("all")
  const [isScanning, setIsScanning] = useState(false)
  const [hasScanned, setHasScanned] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<null | {
    name: string
    type: string
    effectiveness: number
    description: string
    ingredients: string[]
  }>(null)

  const handleScan = () => {
    setIsScanning(true)

    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
      setHasScanned(true)
    }, 2000)
  }

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product)
  }

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
          <h1 className="text-2xl font-bold tracking-tight">Store Scanner</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="camera">
              <Camera className="h-4 w-4 mr-2" />
              Camera
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <Layers className="h-4 w-4 mr-2" />
              Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Scan Product Shelf</CardTitle>
                <CardDescription>Point your camera at products to identify them by function</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md border">
                  {!hasScanned ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50">
                      {isScanning ? (
                        <>
                          <Scan className="h-12 w-12 text-muted-foreground animate-pulse" />
                          <p className="mt-2 text-muted-foreground">Scanning products...</p>
                        </>
                      ) : (
                        <>
                          <Camera className="h-12 w-12 text-muted-foreground" />
                          <p className="mt-2 text-muted-foreground">Tap scan to identify products</p>
                        </>
                      )}
                    </div>
                  ) : (
                    <ProductScannerOverlay
                      imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/moisturizer-plastic-waste.jpg-qTJB3e7cnWxZKnrhVBVpHurnTPZTZV.jpeg"
                      scanMode={scanMode}
                      onProductSelect={handleProductSelect}
                    />
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={scanMode === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setScanMode("all")}
                  >
                    All Products
                  </Button>
                  <Button
                    variant={scanMode === "humectant" ? "default" : "outline"}
                    size="sm"
                    className={scanMode === "humectant" ? "bg-sky-600 hover:bg-sky-700" : ""}
                    onClick={() => setScanMode("humectant")}
                  >
                    Humectants
                  </Button>
                  <Button
                    variant={scanMode === "moisturizer" ? "default" : "outline"}
                    size="sm"
                    className={scanMode === "moisturizer" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                    onClick={() => setScanMode("moisturizer")}
                  >
                    Moisturizers
                  </Button>
                  <Button
                    variant={scanMode === "emollient" ? "default" : "outline"}
                    size="sm"
                    className={scanMode === "emollient" ? "bg-amber-600 hover:bg-amber-700" : ""}
                    onClick={() => setScanMode("emollient")}
                  >
                    Emollients
                  </Button>
                  <Button
                    variant={scanMode === "occlusive" ? "default" : "outline"}
                    size="sm"
                    className={scanMode === "occlusive" ? "bg-purple-600 hover:bg-purple-700" : ""}
                    onClick={() => setScanMode("occlusive")}
                  >
                    Occlusives
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setHasScanned(false)}
                    disabled={!hasScanned}
                  >
                    Reset
                  </Button>
                  <Button className="flex-1" onClick={handleScan} disabled={isScanning || hasScanned}>
                    {isScanning ? "Scanning..." : "Scan Products"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Saved Scans</CardTitle>
                <CardDescription>View your previously scanned product shelves</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[4/3] rounded-md border bg-muted flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                    <p className="text-sm font-medium">Drugstore - 05/01</p>
                    <p className="text-xs text-muted-foreground">12 products identified</p>
                  </div>
                  <div className="aspect-[4/3] rounded-md border bg-muted flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                    <p className="text-sm font-medium">Pharmacy - 04/28</p>
                    <p className="text-xs text-muted-foreground">8 products identified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {hasScanned && (
          <Card>
            <CardHeader>
              <CardTitle>Scan Results</CardTitle>
              <CardDescription>
                {scanMode === "all" ? "All identified products" : `Identified ${scanMode}s on the shelf`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {scanMode === "all" ? "Showing all product types" : `Filtering by ${scanMode} products`}
                    </span>
                  </div>
                  <Badge variant="outline">18 products found</Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="border rounded-md p-2 flex flex-col items-center text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() =>
                        handleProductSelect({
                          name: i % 2 === 0 ? "CeraVe Moisturizing Cream" : "Nivea Soft Moisturizing Cream",
                          type:
                            i % 4 === 0
                              ? "Moisturizer"
                              : i % 4 === 1
                                ? "Occlusive"
                                : i % 4 === 2
                                  ? "Humectant"
                                  : "Emollient",
                          effectiveness: 75 + Math.floor(Math.random() * 20),
                          description: "Rich, moisturizing cream for dry to very dry skin",
                          ingredients: ["Ceramides", "Hyaluronic Acid", "Glycerin", "Petrolatum"],
                        })
                      }
                    >
                      <div className="h-16 w-16 bg-muted rounded-md mb-2"></div>
                      <p className="text-xs font-medium line-clamp-2">
                        {i % 2 === 0 ? "CeraVe Moisturizing Cream" : "Nivea Soft Moisturizing Cream"}
                      </p>
                      <Badge
                        variant="outline"
                        className={`mt-1 text-[10px] ${
                          i % 4 === 0
                            ? "bg-emerald-100 text-emerald-800"
                            : i % 4 === 1
                              ? "bg-purple-100 text-purple-800"
                              : i % 4 === 2
                                ? "bg-sky-100 text-sky-800"
                                : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {i % 4 === 0
                          ? "Moisturizer"
                          : i % 4 === 1
                            ? "Occlusive"
                            : i % 4 === 2
                              ? "Humectant"
                              : "Emollient"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        {selectedProduct && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogDescription>Product details and analysis</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 bg-muted rounded-md"></div>
                <div>
                  <Badge
                    variant="outline"
                    className={
                      selectedProduct.type === "Moisturizer"
                        ? "bg-emerald-100 text-emerald-800"
                        : selectedProduct.type === "Occlusive"
                          ? "bg-purple-100 text-purple-800"
                          : selectedProduct.type === "Humectant"
                            ? "bg-sky-100 text-sky-800"
                            : "bg-amber-100 text-amber-800"
                    }
                  >
                    {selectedProduct.type}
                  </Badge>
                  <p className="text-sm mt-1">{selectedProduct.description}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Effectiveness Score</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        selectedProduct.effectiveness >= 90
                          ? "bg-green-500"
                          : selectedProduct.effectiveness >= 75
                            ? "bg-emerald-500"
                            : "bg-amber-500"
                      }`}
                      style={{ width: `${selectedProduct.effectiveness}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{selectedProduct.effectiveness}%</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Key Ingredients</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedProduct.ingredients.map((ingredient, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Info className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" className="flex-1">
                  Add to Collection
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  )
}
