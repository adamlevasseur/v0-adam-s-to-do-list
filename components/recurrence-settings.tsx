"use client"

import type React from "react"

import type { RecurrencePattern } from "@/types/todo"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface RecurrenceSettingsProps {
  recurrencePattern: RecurrencePattern
  onPatternChange: (pattern: RecurrencePattern) => void
}

export default function RecurrenceSettings({ recurrencePattern, onPatternChange }: RecurrenceSettingsProps) {
  const handleTypeChange = (type: string) => {
    onPatternChange({
      ...recurrencePattern,
      type: type as "daily" | "weekly" | "monthly",
    })
  }

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interval = Number.parseInt(e.target.value)
    if (interval > 0) {
      onPatternChange({
        ...recurrencePattern,
        interval,
      })
    }
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      onPatternChange({
        ...recurrencePattern,
        nextOccurrence: date.toISOString(),
      })
    }
  }

  return (
    <div className="space-y-4 p-4 border rounded-md bg-muted/50">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="recurrence-type">Repeat</Label>
          <Select value={recurrencePattern.type} onValueChange={handleTypeChange}>
            <SelectTrigger id="recurrence-type">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="recurrence-interval">Every</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="recurrence-interval"
              type="number"
              min="1"
              value={recurrencePattern.interval}
              onChange={handleIntervalChange}
              className="w-20"
            />
            <span className="text-sm text-muted-foreground">
              {recurrencePattern.type === "daily" && "days"}
              {recurrencePattern.type === "weekly" && "weeks"}
              {recurrencePattern.type === "monthly" && "months"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Start date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !recurrencePattern.nextOccurrence && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {recurrencePattern.nextOccurrence ? (
                format(new Date(recurrencePattern.nextOccurrence), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={recurrencePattern.nextOccurrence ? new Date(recurrencePattern.nextOccurrence) : undefined}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
