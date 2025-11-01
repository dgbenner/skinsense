"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export function ReminderCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [reminders, setReminders] = useState([
    { id: 1, date: new Date(2025, 4, 3), title: "Take photo of elbow area" },
    { id: 2, date: new Date(2025, 4, 7), title: "Take photo of elbow area" },
    { id: 3, date: new Date(2025, 4, 11), title: "Take photo of elbow area" },
    { id: 4, date: new Date(2025, 4, 15), title: "Take photo of elbow area" },
    { id: 5, date: new Date(2025, 4, 19), title: "Take photo of elbow area" },
    { id: 6, date: new Date(2025, 4, 23), title: "Take photo of elbow area" },
    { id: 7, date: new Date(2025, 4, 27), title: "Take photo of elbow area" },
  ])

  // Function to check if a date has reminders
  const hasReminder = (day: Date) => {
    return reminders.some(
      (reminder) =>
        reminder.date.getDate() === day.getDate() &&
        reminder.date.getMonth() === day.getMonth() &&
        reminder.date.getFullYear() === day.getFullYear(),
    )
  }

  // Get reminders for selected date
  const selectedDateReminders = reminders.filter(
    (reminder) =>
      date &&
      reminder.date.getDate() === date.getDate() &&
      reminder.date.getMonth() === date.getMonth() &&
      reminder.date.getFullYear() === date.getFullYear(),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Photo Reminders</CardTitle>
          <CardDescription>Schedule reminders to track your eczema consistently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                hasReminder: (date) => hasReminder(date),
              }}
              modifiersClassNames={{
                hasReminder: "bg-primary/10 font-bold text-primary",
              }}
            />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{date ? format(date, "MMMM d, yyyy") : "Select a date"}</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      Add
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Add Reminder</h4>
                        <p className="text-sm text-muted-foreground">Set a reminder to take a photo on this date.</p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Button className="col-span-3">Save Reminder</Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {selectedDateReminders.length > 0 ? (
                <div className="space-y-2">
                  {selectedDateReminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between rounded-md border p-3">
                      <span className="text-sm">{reminder.title}</span>
                      <Badge variant="outline">{format(reminder.date, "h:mm a")}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[140px] items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">No reminders for this date</p>
                    <Button variant="link" size="sm" className="mt-1.5">
                      Add a reminder
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tracking Schedule</CardTitle>
          <CardDescription>Recommended photo tracking frequency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Current Schedule</h4>
              <p className="text-sm text-muted-foreground mb-2">
                You're currently set to take photos every 4 days to track your eczema progress.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10">
                  Every 4 days
                </Badge>
                <Badge variant="outline">Inner elbow</Badge>
                <Badge variant="outline">Wrist</Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <Button variant="outline" className="flex flex-col h-auto py-3">
                <span className="text-sm font-medium">Daily</span>
                <span className="text-xs text-muted-foreground mt-1">For acute flares</span>
              </Button>
              <Button variant="default" className="flex flex-col h-auto py-3">
                <span className="text-sm font-medium">Every 4 days</span>
                <span className="text-xs mt-1">Recommended</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-3">
                <span className="text-sm font-medium">Weekly</span>
                <span className="text-xs text-muted-foreground mt-1">For maintenance</span>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Update Schedule</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
