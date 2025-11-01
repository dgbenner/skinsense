import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoutineEffectivenessChart } from "@/components/routine-effectiveness-chart"

export default function RoutineAnalysis() {
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
          <h1 className="text-2xl font-bold tracking-tight">Routine Analysis</h1>
        </div>

        <Tabs defaultValue="effectiveness">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="effectiveness">Effectiveness</TabsTrigger>
            <TabsTrigger value="gaps">Gaps & Overlaps</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          <TabsContent value="effectiveness" className="mt-4">
            <RoutineEffectivenessChart />
          </TabsContent>
          <TabsContent value="gaps" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Routine Gaps & Overlaps</CardTitle>
                <CardDescription>Identify missing elements or redundancies in your routine</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground border border-dashed rounded-md">
                  Gap analysis visualization will appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recommendations" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>Products and routine adjustments based on your skin needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground border border-dashed rounded-md">
                  Personalized product recommendations will appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
