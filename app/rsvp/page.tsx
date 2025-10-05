"use client"

import { motion } from "framer-motion"
import { RsvpForm } from "@/components/rsvp-form"

export default function RsvpPage() {
  return (
    <motion.main
      className="min-h-screen bg-background flex items-center justify-center p-4"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <RsvpForm />
    </motion.main>
  )
}
