"use client"

import { useState } from "react"
import Image from "next/image"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PhotoAdjustmentToolsProps {
  imageUrl: string
  onSave: () => void
}

export function PhotoAdjustmentTools({ imageUrl, onSave }: PhotoAdjustmentToolsProps) {
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [redBalance, setRedBalance] = useState(100)
  const [activeTab, setActiveTab] = useState("basic")

  const [humidity, setHumidity] = useState(45)
  const [tempLow, setTempLow] = useState(65)
  const [tempHigh, setTempHigh] = useState(75)
  const [airQuality, setAirQuality] = useState(50)
  const [weatherCondition, setWeatherCondition] = useState("Mild")

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Eczema photo"
          fill
          className="object-cover"
          style={{
            filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
          }}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Adjustments</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Brightness</span>
              <span className="text-sm text-muted-foreground">{brightness}%</span>
            </div>
            <Slider
              value={[brightness]}
              min={50}
              max={150}
              step={1}
              onValueChange={(value) => setBrightness(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Contrast</span>
              <span className="text-sm text-muted-foreground">{contrast}%</span>
            </div>
            <Slider value={[contrast]} min={50} max={150} step={1} onValueChange={(value) => setContrast(value[0])} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Saturation</span>
              <span className="text-sm text-muted-foreground">{saturation}%</span>
            </div>
            <Slider
              value={[saturation]}
              min={0}
              max={200}
              step={1}
              onValueChange={(value) => setSaturation(value[0])}
            />
          </div>
        </TabsContent>
        <TabsContent value="advanced" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Red Balance</span>
              <span className="text-sm text-muted-foreground">{redBalance}%</span>
            </div>
            <Slider
              value={[redBalance]}
              min={50}
              max={150}
              step={1}
              onValueChange={(value) => setRedBalance(value[0])}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              Auto White Balance
            </Button>
            <Button variant="outline" className="w-full">
              Auto Color Correct
            </Button>
          </div>

          <div className="bg-muted/50 p-3 rounded-md">
            <h4 className="text-sm font-medium mb-1">Standardization</h4>
            <p className="text-xs text-muted-foreground">
              Auto color correction helps ensure your photos are standardized for accurate comparison over time,
              regardless of lighting conditions.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="environment" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Humidity (%)</span>
                <span className="text-sm text-muted-foreground">{humidity}%</span>
              </div>
              <Slider value={[humidity]} min={0} max={100} step={1} onValueChange={(value) => setHumidity(value[0])} />
              <p className="text-xs text-muted-foreground">
                {humidity < 30
                  ? "Low humidity (dry air) can trigger eczema flares"
                  : humidity > 60
                    ? "High humidity can cause sweating that irritates eczema"
                    : "Moderate humidity is generally better for eczema"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium">Temperature Low (°F)</span>
                <Slider value={[tempLow]} min={0} max={100} step={1} onValueChange={(value) => setTempLow(value[0])} />
                <span className="text-sm text-muted-foreground">{tempLow}°F</span>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">Temperature High (°F)</span>
                <Slider
                  value={[tempHigh]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setTempHigh(value[0])}
                />
                <span className="text-sm text-muted-foreground">{tempHigh}°F</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Air Quality Index</span>
                <span className="text-sm text-muted-foreground">{airQuality}</span>
              </div>
              <Slider
                value={[airQuality]}
                min={0}
                max={300}
                step={1}
                onValueChange={(value) => setAirQuality(value[0])}
              />
              <div className="flex justify-between text-xs">
                <span className="text-green-600">Good (0-50)</span>
                <span className="text-yellow-600">Moderate (51-100)</span>
                <span className="text-red-600">Unhealthy (101+)</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">Weather Condition</span>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={weatherCondition === "Dry" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWeatherCondition("Dry")}
                >
                  Dry
                </Button>
                <Button
                  variant={weatherCondition === "Cold & Dry" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWeatherCondition("Cold & Dry")}
                >
                  Cold & Dry
                </Button>
                <Button
                  variant={weatherCondition === "Mild" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWeatherCondition("Mild")}
                >
                  Mild
                </Button>
                <Button
                  variant={weatherCondition === "Humid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWeatherCondition("Humid")}
                >
                  Humid
                </Button>
                <Button
                  variant={weatherCondition === "Hot & Humid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWeatherCondition("Hot & Humid")}
                >
                  Hot & Humid
                </Button>
                <Button
                  variant={weatherCondition === "Windy" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWeatherCondition("Windy")}
                >
                  Windy
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onSave}>
          Cancel
        </Button>
        <Button onClick={onSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Adjustments
        </Button>
      </div>
    </div>
  )
}
