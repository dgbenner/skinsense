"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Shield, Sparkles, Waves } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Radar } from "@/components/ui/chart"

interface ProductCompositionProps {
  humectant: number
  moisturizer: number
  emollient: number
  occlusive: number
}

export function ProductCompositionChart({ humectant, moisturizer, emollient, occlusive }: ProductCompositionProps) {
  const data = [
    {
      category: "Composition",
      humectant,
      moisturizer,
      emollient,
      occlusive,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Composition</CardTitle>
        <CardDescription>Breakdown of product properties by percentage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-sky-600" />
                <span className="font-medium">Humectant</span>
                <span className="text-xs text-muted-foreground">(Attracts water to skin)</span>
              </div>
              <span className="text-sm">{humectant}%</span>
            </div>
            <Progress value={humectant} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Waves className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">Moisturizer</span>
                <span className="text-xs text-muted-foreground">(Repairs skin barrier)</span>
              </div>
              <span className="text-sm">{moisturizer}%</span>
            </div>
            <Progress value={moisturizer} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span className="font-medium">Emollient</span>
                <span className="text-xs text-muted-foreground">(Softens skin)</span>
              </div>
              <span className="text-sm">{emollient}%</span>
            </div>
            <Progress value={emollient} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Occlusive</span>
                <span className="text-xs text-muted-foreground">(Seals in moisture)</span>
              </div>
              <span className="text-sm">{occlusive}%</span>
            </div>
            <Progress value={occlusive} className="h-2" />
          </div>
        </div>

        <div className="h-[300px] w-full">
          <Radar
            data={data}
            index="category"
            categories={["humectant", "moisturizer", "emollient", "occlusive"]}
            valueFormatter={(value) => `${value}%`}
            colors={["hsl(var(--primary))"] as any}
            yAxisWidth={50}
            className="h-full w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}
