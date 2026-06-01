"use client"

import { motion } from "framer-motion"
import { Briefcase, Mail, Calendar, Target, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0C0C14] relative overflow-hidden">
      {/* Top gold strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#E8C547]" />
      
      {/* Left gold strip */}
      <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-[#E8C547]" />

      {/* Dot grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #E8C547 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#E8C547]/70 text-xs tracking-[0.4em] uppercase mb-8"
          >
            AI PRE-MEETING INTELLIGENCE
          </motion.p>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-14 h-14 bg-[#E8C547] rounded-xl flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-[#0C0C14]" />
            </div>
            <h1 className="font-serif text-6xl md:text-7xl font-bold text-[#F5F5DC] tracking-tight">
              BRIEFCASE
            </h1>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 180 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="h-[1px] bg-[#E8C547] mx-auto mb-8"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[#E8C547] text-xl font-medium mb-6"
          >
            Walk in prepared. Every time.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-[#F5F5DC]/60 text-base leading-relaxed mb-10 max-w-lg mx-auto"
          >
            Briefcase reads your calendar and emails before every meeting
            and prepares your intelligence briefing automatically.
            No typing. No prompting. Just clarity.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-4 mb-16"
          >
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="bg-[#E8C547] hover:bg-[#D4B03D] text-[#0C0C14] font-semibold px-8 gap-2"
              >
                Enter Demo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#E8C547]/30 text-[#E8C547] hover:bg-[#E8C547]/10 px-8"
            >
              See How It Works
            </Button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { icon: Zap, text: "Zero input required" },
              { icon: Mail, text: "Email + Calendar combined" },
              { icon: Target, text: "Structured intelligence" }
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
              >
                <Icon className="w-4 h-4 text-[#E8C547]" />
                <span className="text-sm text-[#F5F5DC]/80">{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-32 w-full max-w-5xl"
        >
          <h2 className="text-center text-[#E8C547]/70 text-xs tracking-[0.3em] uppercase mb-12">
            HOW IT WORKS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Connect",
                description: "Link your Google Calendar and email. One-time setup."
              },
              {
                step: "02",
                title: "Analyze",
                description: "Briefcase scans your inbox for context about each meeting."
              },
              {
                step: "03",
                title: "Prepare",
                description: "Get an intelligence briefing before every meeting."
              },
              {
                step: "04",
                title: "Perform",
                description: "Walk in knowing what matters and what to say first."
              }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="bg-white/5 rounded-lg p-6 border-l-2 border-[#E8C547]"
              >
                <span className="font-mono text-[#E8C547] text-sm">{item.step}</span>
                <h3 className="text-[#F5F5DC] font-semibold text-lg mt-2 mb-2">{item.title}</h3>
                <p className="text-[#F5F5DC]/50 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-[#F5F5DC]/30 text-xs">
          A product concept by Briefcase Labs · 2024
        </p>
      </div>
    </div>
  )
}
