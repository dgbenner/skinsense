"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function DailyCheckIn() {
  const [dryness, setDryness] = useState(5)
  const [itchiness, setItchiness] = useState(5)
  const [redness, setRedness] = useState(5)
  const [flaking, setFlaking] = useState(5)
  const [notes, setNotes] = useState("")
  const [usedProducts, setUsedProducts] = useState<string[]>([])

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Daily Check-In</CardTitle>
          </div>
          <CardDescription>{today}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Dryness</Label>
                <span className="text-sm text-muted-foreground">{dryness}/10</span>
              </div>
              <Slider value={[dryness]} min={1} max={10} step={1} onValueChange={(value) => setDryness(value[0])} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Itchiness</Label>
                <span className="text-sm text-muted-foreground">{itchiness}/10</span>
              </div>
              <Slider value={[itchiness]} min={1} max={10} step={1} onValueChange={(value) => setItchiness(value[0])} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Redness</Label>
                <span className="text-sm text-muted-foreground">{redness}/10</span>
              </div>
              <Slider value={[redness]} min={1} max={10} step={1} onValueChange={(value) => setRedness(value[0])} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>Flaking</Label>
                <span className="text-sm text-muted-foreground">{flaking}/10</span>
              </div>
              <Slider value={[flaking]} min={1} max={10} step={1} onValueChange={(value) => setFlaking(value[0])} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Products used today</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cerave" id="cerave" />
                <Label htmlFor="cerave">CeraVe Moisturizing Cream</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="eucerin" id="eucerin" />
                <Label htmlFor="eucerin">Eucerin Original Healing Cream</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutrogena" id="neutrogena" />
                <Label htmlFor="neutrogena">Neutrogena Hydro Boost</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional observations about your skin today..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Check-In</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
          <CardDescription>Track your skin's improvement over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground border border-dashed rounded-md">
            Chart visualization will appear here after multiple check-ins
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
