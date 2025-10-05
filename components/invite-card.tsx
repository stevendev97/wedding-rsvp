import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function InviteCard() {
  return (
    <Card className="w-full max-w-md md:max-w-xl p-8 text-center shadow-lg">
      <div className="space-y-6">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-md">
          <Image src="/elegant-wedding-invitation-with-flowers-and-gold-a.jpg" alt="Wedding invitation" fill className="object-cover" priority />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-serif text-balance text-foreground leading-tight">
            You're invited to Steven & Jasmine's wedding
          </h1>

          <Button asChild size="lg" className="w-full md:w-auto px-8">
            <Link href="/rsvp">RSVP</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
