"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Camera, FileText, Link2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function AddProduct() {
  const [activeTab, setActiveTab] = useState("text")
  const [productName, setProductName] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [productUrl, setProductUrl] = useState("")

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
          <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="camera" className="flex flex-col gap-1 py-2 h-auto">
              <Camera className="h-4 w-4" />
              <span className="text-xs">Scan</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="flex flex-col gap-1 py-2 h-auto">
              <FileText className="h-4 w-4" />
              <span className="text-xs">Text</span>
            </TabsTrigger>
            <TabsTrigger value="url" className="flex flex-col gap-1 py-2 h-auto">
              <Link2 className="h-4 w-4" />
              <span className="text-xs">URL</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex flex-col gap-1 py-2 h-auto">
              <Search className="h-4 w-4" />
              <span className="text-xs">Search</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Scan Product Label</CardTitle>
                <CardDescription>Take a photo of the product label or ingredients list</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg border-muted-foreground/20">
                  <Camera className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">Tap to take a photo</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled>
                  Analyze Photo
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="text" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Enter Product Details</CardTitle>
                <CardDescription>Enter the product name and ingredients list</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    placeholder="e.g., CeraVe Moisturizing Cream"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ingredients">Ingredients List</Label>
                  <Textarea
                    id="ingredients"
                    placeholder="Paste the full ingredients list here..."
                    className="min-h-[150px]"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Analyze Ingredients</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="url" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Enter Product URL</CardTitle>
                <CardDescription>Paste a link to the product page (e.g., from Amazon, Walmart, etc.)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="product-url">Product URL</Label>
                  <Input
                    id="product-url"
                    placeholder="https://www.example.com/product"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Fetch Product Data</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Search Products</CardTitle>
                <CardDescription>Search our database for common eczema products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search products..." className="pl-8" />
                  </div>
                  <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-sm text-muted-foreground">Search results will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
