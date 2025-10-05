"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Minus, Plus } from "lucide-react"

interface GuestCounterProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function GuestCounter({ value, onChange, min = 0, max = 10 }: GuestCounterProps) {
  const increment = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const decrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">How many guests will join you?</Label>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          disabled={value <= min}
          className="h-10 w-10 bg-transparent"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div className="w-16 text-center">
          <span className="text-2xl font-semibold">{value}</span>
        </div>

        <Button variant="outline" size="icon" onClick={increment} disabled={value >= max} className="h-10 w-10">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
