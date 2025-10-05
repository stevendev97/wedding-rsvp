"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { GuestCounter } from "@/components/guest-counter"

interface RsvpData {
  attending: boolean | null
  guests: number
  total: number
}

export function RsvpForm() {
  const [attending, setAttending] = useState<boolean | null>(null)
  const [guests, setGuests] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")

  // Load saved RSVP data on mount
  useEffect(() => {
    const saved = localStorage.getItem("wedding-rsvp")
    if (saved) {
      try {
        const data: RsvpData = JSON.parse(saved)
        setAttending(data.attending)
        setGuests(data.guests)
      } catch (error) {
        console.error("Failed to load saved RSVP:", error)
      }
    }
  }, [])

  const handleSubmit = async () => {
    if (attending === null || (!email && !phone) || name.trim() === "") {
      alert("Please provide your name and either an email or a phone number.");
      return;
    }
  
    const rsvpData = {
      name,
      email,
      phone,
      attending,
      guests: attending ? guests : 0,
      total: attending ? guests + 1 : 0,
    };
  
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rsvpData),
      });
  
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const error = await response.json();
        alert(error.error); // Show error message to the user
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    }
  };

  const canSubmit =
    (email.trim() !== "" || phone.trim() !== "") &&
    attending !== null &&
    (attending === false || guests >= 0);

  const total = attending ? guests + 1 : 0

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md p-8 text-center shadow-lg">
        <div className="space-y-6">
          <h1 className="text-2xl font-serif text-foreground">Thank you! We've recorded your RSVP.</h1>

          <p className="text-muted-foreground">
            {attending
              ? `We're excited to celebrate with ${total === 1 ? "you" : `all ${total} of you`}!`
              : "We'll miss you but understand. Thank you for letting us know."}
          </p>

          <Button asChild variant="ghost">
            <Link href="/">Back to Invitation</Link>
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md p-8 shadow-lg">
      <div className="space-y-6">
        <h1 className="text-2xl font-serif text-center text-foreground text-balance">Can you celebrate with us?</h1>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-base font-medium">Are you coming to our wedding?</Label>
            <RadioGroup
              value={attending === null ? "" : attending.toString()}
              onValueChange={(value) => setAttending(value === "true")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {attending === false && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-muted-foreground text-center">We'll miss you! Thanks for letting us know.</p>
            </div>
          )}

          {attending === true && (
            <div className="space-y-4">
              <GuestCounter value={guests} onChange={setGuests} />

              <div className="space-y-4">
                <Label className="text-base font-medium">Your Name</Label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Your Email</Label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Label className="text-base font-medium">Your Phone Number</Label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-center font-medium">
                  Total attending: {total}{" "}
                  {total === 1 ? "(just you)" : `(you + ${guests} guest${guests === 1 ? "" : "s"})`}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={handleSubmit} disabled={!canSubmit} className="flex-1">
            Submit RSVP
          </Button>

          <Button asChild variant="ghost">
            <Link href="/">Back</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
