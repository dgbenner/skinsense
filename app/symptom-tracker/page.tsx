"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { format, subDays } from "date-fns"
import { ArrowLeft, Calendar, Camera, ChevronLeft, ChevronRight, Edit, Sliders, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PhotoAdjustmentTools } from "@/components/photo-adjustment-tools"
import { ReminderCalendar } from "@/components/reminder-calendar"

export default function SymptomTracker() {
  const [activeTab, setActiveTab] = useState("photos")
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [isAdjusting, setIsAdjusting] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Sample symptom tracking data
  const symptomData = [
    {
      id: 1,
      date: new Date(),
      image: "/placeholder.svg?height=300&width=300",
      location: "Inner elbow",
      severity: 7,
      itchiness: 8,
      redness: 9,
      notes: "Flare-up after using new detergent. Applied CeraVe and hydrocortisone.",
      triggers: ["Detergent", "Stress"],
      treatments: ["CeraVe Moisturizing Cream", "Hydrocortisone 1%"],
      environment: {
        humidity: 32, // percentage
        temperature: {
          high: 78, // Fahrenheit
          low: 65,
        },
        airQuality: "Moderate", // Good, Moderate, Unhealthy, Very Unhealthy, Hazardous
        airQualityIndex: 75, // 0-500 scale
        weather: "Dry",
      },
    },
    {
      id: 2,
      date: subDays(new Date(), 4),
      image: "/placeholder.svg?height=300&width=300",
      location: "Inner elbow",
      severity: 8,
      itchiness: 9,
      redness: 8,
      notes: "Worsening despite treatment. Increased moisturizer application frequency.",
      triggers: ["Unknown"],
      treatments: ["CeraVe Moisturizing Cream", "Hydrocortisone 1%"],
      environment: {
        humidity: 25,
        temperature: {
          high: 82,
          low: 68,
        },
        airQuality: "Unhealthy for Sensitive Groups",
        airQualityIndex: 110,
        weather: "Very Dry",
      },
    },
    {
      id: 3,
      date: subDays(new Date(), 8),
      image: "/placeholder.svg?height=300&width=300",
      location: "Inner elbow",
      severity: 6,
      itchiness: 7,
      redness: 7,
      notes: "Slight improvement. Continuing with current treatment plan.",
      triggers: ["Stress"],
      treatments: ["CeraVe Moisturizing Cream", "Hydrocortisone 1%"],
      environment: {
        humidity: 45,
        temperature: {
          high: 75,
          low: 62,
        },
        airQuality: "Good",
        airQualityIndex: 42,
        weather: "Mild",
      },
    },
    {
      id: 4,
      date: subDays(new Date(), 12),
      image: "/placeholder.svg?height=300&width=300",
      location: "Inner elbow",
      severity: 9,
      itchiness: 9,
      redness: 10,
      notes: "Initial flare-up. Started treatment with moisturizer and hydrocortisone.",
      triggers: ["Weather change", "Stress"],
      treatments: ["CeraVe Moisturizing Cream", "Hydrocortisone 1%"],
      environment: {
        humidity: 18,
        temperature: {
          high: 65,
          low: 42,
        },
        airQuality: "Moderate",
        airQualityIndex: 88,
        weather: "Cold & Dry",
      },
    },
  ]

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? symptomData.length - 1 : prev - 1))
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === symptomData.length - 1 ? 0 : prev + 1))
  }

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return "bg-green-100 text-green-800"
    if (severity <= 6) return "bg-amber-100 text-amber-800"
    return "bg-red-100 text-red-800"
  }

  const getTrendIcon = (current: number, previous: number | undefined) => {
    if (!previous) return null
    if (current < previous) return "↓" // Improving
    if (current > previous) return "↑" // Worsening
    return "→" // Stable
  }

  const getTrendColor = (current: number, previous: number | undefined) => {
    if (!previous) return ""
    if (current < previous) return "text-green-600" // Improving
    if (current > previous) return "text-red-600" // Worsening
    return "text-amber-600" // Stable
  }

  const getHumidityStatus = (humidity: number) => {
    if (humidity < 20) return { label: "Very Dry", color: "bg-red-100 text-red-800" }
    if (humidity < 30) return { label: "Dry", color: "bg-amber-100 text-amber-800" }
    if (humidity < 50) return { label: "Moderate", color: "bg-emerald-100 text-emerald-800" }
    if (humidity < 70) return { label: "Humid", color: "bg-blue-100 text-blue-800" }
    return { label: "Very Humid", color: "bg-purple-100 text-purple-800" }
  }

  const getAirQualityStatus = (aqi: number) => {
    if (aqi <= 50) return { label: "Good", color: "bg-green-100 text-green-800" }
    if (aqi <= 100) return { label: "Moderate", color: "bg-yellow-100 text-yellow-800" }
    if (aqi <= 150) return { label: "Unhealthy for Sensitive Groups", color: "bg-orange-100 text-orange-800" }
    if (aqi <= 200) return { label: "Unhealthy", color: "bg-red-100 text-red-800" }
    if (aqi <= 300) return { label: "Very Unhealthy", color: "bg-purple-100 text-purple-800" }
    return { label: "Hazardous", color: "bg-rose-100 text-rose-800" }
  }

  const getTemperatureStatus = (high: number, low: number) => {
    const avg = (high + low) / 2
    if (avg < 40) return { label: "Very Cold", color: "bg-blue-100 text-blue-800" }
    if (avg < 55) return { label: "Cold", color: "bg-sky-100 text-sky-800" }
    if (avg < 75) return { label: "Mild", color: "bg-emerald-100 text-emerald-800" }
    if (avg < 85) return { label: "Warm", color: "bg-amber-100 text-amber-800" }
    return { label: "Hot", color: "bg-red-100 text-red-800" }
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
          <h1 className="text-2xl font-bold tracking-tight">Symptom Tracker</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="photos">
              <Camera className="h-4 w-4 mr-2" />
              Photo Timeline
            </TabsTrigger>
            <TabsTrigger value="trends">
              <Sliders className="h-4 w-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="reminders">
              <Calendar className="h-4 w-4 mr-2" />
              Reminders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Eczema Photo Timeline</CardTitle>
                <CardDescription>Track changes in your skin condition over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo carousel */}
                <div className="relative">
                  <div className="overflow-hidden rounded-lg border">
                    <div className="relative aspect-[4/3] w-full">
                      <div
                        className="absolute inset-0 flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {symptomData.map((entry, index) => (
                          <div key={entry.id} className="min-w-full">
                            <div className="relative aspect-[4/3] w-full">
                              <Image
                                src={entry.image || "/placeholder.svg"}
                                alt={`Eczema on ${entry.location} - ${format(entry.date, "MMM d, yyyy")}`}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
                                  {format(entry.date, "MMM d, yyyy")}
                                </Badge>
                              </div>
                              <div className="absolute top-2 right-2">
                                <Badge variant={getSeverityColor(entry.severity)}>Severity: {entry.severity}/10</Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute bottom-2 right-2 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
                                onClick={() => setIsAdjusting(true)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Adjust photo</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
                    onClick={handlePrevSlide}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous photo</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
                    onClick={handleNextSlide}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next photo</span>
                  </Button>
                </div>

                {/* Carousel indicators */}
                <div className="flex justify-center gap-1">
                  {symptomData.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full ${index === currentSlide ? "bg-primary" : "bg-muted"}`}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <span className="sr-only">Go to slide {index + 1}</span>
                    </button>
                  ))}
                </div>

                {/* Current photo details */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-muted">
                      Location: {symptomData[currentSlide].location}
                    </Badge>
                    <Badge variant={getSeverityColor(symptomData[currentSlide].severity)}>
                      Severity: {symptomData[currentSlide].severity}/10
                      {currentSlide < symptomData.length - 1 && (
                        <span
                          className={`ml-1 ${getTrendColor(
                            symptomData[currentSlide].severity,
                            symptomData[currentSlide + 1]?.severity,
                          )}`}
                        >
                          {getTrendIcon(symptomData[currentSlide].severity, symptomData[currentSlide + 1]?.severity)}
                        </span>
                      )}
                    </Badge>
                    <Badge
                      variant={
                        symptomData[currentSlide].itchiness > 5
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }
                    >
                      Itchiness: {symptomData[currentSlide].itchiness}/10
                    </Badge>
                    <Badge
                      variant={
                        symptomData[currentSlide].redness > 5
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }
                    >
                      Redness: {symptomData[currentSlide].redness}/10
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Triggers</h4>
                    <div className="flex flex-wrap gap-1">
                      {symptomData[currentSlide].triggers.map((trigger, i) => (
                        <Badge key={i} variant="outline">
                          {trigger}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Treatments Used</h4>
                    <div className="flex flex-wrap gap-1">
                      {symptomData[currentSlide].treatments.map((treatment, i) => (
                        <Badge key={i} variant="outline" className="bg-blue-100 text-blue-800">
                          {treatment}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Notes</h4>
                    <p className="text-sm text-muted-foreground">{symptomData[currentSlide].notes}</p>
                  </div>

                  <div className="pt-2">
                    <Textarea
                      placeholder="Add or update notes about this flare-up..."
                      defaultValue={symptomData[currentSlide].notes}
                      className="min-h-[100px]"
                    />
                  </div>
                  {/* Environmental factors */}
                  <div className="space-y-2 mt-4">
                    <h4 className="text-sm font-medium">Environmental Factors</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border rounded-md p-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Humidity</span>
                          <Badge
                            variant="outline"
                            className={getHumidityStatus(symptomData[currentSlide].environment.humidity).color}
                          >
                            {symptomData[currentSlide].environment.humidity}% -{" "}
                            {getHumidityStatus(symptomData[currentSlide].environment.humidity).label}
                          </Badge>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              symptomData[currentSlide].environment.humidity < 30
                                ? "bg-amber-500"
                                : symptomData[currentSlide].environment.humidity > 60
                                  ? "bg-blue-500"
                                  : "bg-emerald-500"
                            }`}
                            style={{ width: `${symptomData[currentSlide].environment.humidity}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {symptomData[currentSlide].environment.humidity < 30
                            ? "Low humidity can trigger eczema flares by drying out skin"
                            : symptomData[currentSlide].environment.humidity > 60
                              ? "High humidity can cause sweating that irritates eczema"
                              : "Moderate humidity is generally better for eczema"}
                        </p>
                      </div>

                      <div className="border rounded-md p-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Temperature</span>
                          <Badge
                            variant="outline"
                            className={
                              getTemperatureStatus(
                                symptomData[currentSlide].environment.temperature.high,
                                symptomData[currentSlide].environment.temperature.low,
                              ).color
                            }
                          >
                            {
                              getTemperatureStatus(
                                symptomData[currentSlide].environment.temperature.high,
                                symptomData[currentSlide].environment.temperature.low,
                              ).label
                            }
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>Low: {symptomData[currentSlide].environment.temperature.low}°F</span>
                          <span>High: {symptomData[currentSlide].environment.temperature.high}°F</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {getTemperatureStatus(
                            symptomData[currentSlide].environment.temperature.high,
                            symptomData[currentSlide].environment.temperature.low,
                          ).label === "Very Cold" ||
                          getTemperatureStatus(
                            symptomData[currentSlide].environment.temperature.high,
                            symptomData[currentSlide].environment.temperature.low,
                          ).label === "Cold"
                            ? "Cold temperatures can trigger eczema flares and dry out skin"
                            : getTemperatureStatus(
                                  symptomData[currentSlide].environment.temperature.high,
                                  symptomData[currentSlide].environment.temperature.low,
                                ).label === "Hot"
                              ? "Hot temperatures can cause sweating that irritates eczema"
                              : "Mild temperatures are generally better for eczema"}
                        </p>
                      </div>

                      <div className="border rounded-md p-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Air Quality</span>
                          <Badge
                            variant="outline"
                            className={getAirQualityStatus(symptomData[currentSlide].environment.airQualityIndex).color}
                          >
                            {getAirQualityStatus(symptomData[currentSlide].environment.airQualityIndex).label}
                          </Badge>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              symptomData[currentSlide].environment.airQualityIndex <= 50
                                ? "bg-green-500"
                                : symptomData[currentSlide].environment.airQualityIndex <= 100
                                  ? "bg-yellow-500"
                                  : symptomData[currentSlide].environment.airQualityIndex <= 150
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                            }`}
                            style={{
                              width: `${Math.min(symptomData[currentSlide].environment.airQualityIndex / 3, 100)}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          AQI: {symptomData[currentSlide].environment.airQualityIndex} -{" "}
                          {symptomData[currentSlide].environment.airQualityIndex > 100
                            ? "Poor air quality can irritate skin and trigger eczema flares"
                            : "Good air quality is better for sensitive skin"}
                        </p>
                      </div>

                      <div className="border rounded-md p-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Weather Condition</span>
                          <Badge variant="outline">{symptomData[currentSlide].environment.weather}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {symptomData[currentSlide].environment.weather.includes("Dry")
                            ? "Dry weather can remove moisture from skin and trigger eczema flares"
                            : symptomData[currentSlide].environment.weather.includes("Cold")
                              ? "Cold weather can stress the skin barrier and worsen eczema"
                              : "Current weather conditions may affect your skin differently"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </Button>
                <Button className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Take New Photo
                </Button>
              </CardFooter>
            </Card>

            {/* Timeline comparison */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Side-by-Side Comparison</CardTitle>
                <CardDescription>Compare your condition over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {symptomData.map((entry) => (
                    <div key={entry.id} className="space-y-2">
                      <div className="relative aspect-square overflow-hidden rounded-md border">
                        <Image
                          src={entry.image || "/placeholder.svg"}
                          alt={`Eczema on ${entry.date.toDateString()}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                          {format(entry.date, "MMM d")}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge variant={getSeverityColor(entry.severity)}>Severity: {entry.severity}/10</Badge>
                        <Badge variant={getHumidityStatus(entry.environment.humidity).color} className="text-xs">
                          Humidity: {entry.environment.humidity}%
                        </Badge>
                        <Badge
                          variant={getAirQualityStatus(entry.environment.airQualityIndex).color}
                          className="text-xs"
                        >
                          AQI: {entry.environment.airQualityIndex}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Symptom Trends</CardTitle>
                <CardDescription>Track how your symptoms change over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                  Symptom trend chart will appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reminders" className="mt-4">
            <ReminderCalendar />
          </TabsContent>
        </Tabs>

        {/* Photo adjustment dialog */}
        <Dialog open={isAdjusting} onOpenChange={setIsAdjusting}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adjust Photo</DialogTitle>
              <DialogDescription>Standardize your photo for better comparison over time</DialogDescription>
            </DialogHeader>
            <PhotoAdjustmentTools imageUrl={symptomData[currentSlide].image} onSave={() => setIsAdjusting(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
