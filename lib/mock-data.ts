export interface Attendee {
  name: string
  email: string
  initials: string
  warmth: "warm" | "cooling" | "cold"
  lastContact: string
}

export interface Meeting {
  id: string
  title: string
  time: string
  endTime: string
  duration: number
  status: "past" | "next" | "upcoming"
  minutesUntil?: number
  attendees: Attendee[]
  importance: "critical" | "important" | "routine" | "optional"
  health: "healthy" | "unclear" | "wasteful"
  prepTime: number
  openThreads: number
  worthMeeting: "yes" | "no" | "maybe"
  couldBeEmail: "no" | "likely" | "possibly"
  suggestedDuration?: number
  meetingCost: string
  description: string
  briefingReady: boolean
}

export interface PersonDetail {
  name: string
  email: string
  initials: string
  warmth: "warm" | "cooling" | "cold"
  lastContact: string
  context: string
  toneHint: string
  previousMeetings: number
  interactionHistory: string[]
}

export interface OpenThread {
  subject: string
  status: string
  suggestedAction: string
  urgency: "high" | "medium" | "low"
}

export interface Assessment {
  whyMeeting: string
  worthHaving: "yes" | "no" | "maybe"
  worthReason: string
  couldBeEmail: "no" | "likely" | "possibly"
  emailReason: string
  scheduledDuration: number
  suggestedDuration: number
  attendeeCount: number
  collectiveHoursAtStake: number
}

export interface ActiveBriefing {
  meetingId: string
  situation: string
  people: PersonDetail[]
  openThreads: OpenThread[]
  suggestedOpener: string
  confidence: "high" | "medium" | "low"
  confidenceReason: string
  emailThreadsFound: number
  generatedAt: string
  assessment: Assessment
}

export const MOCK_USER = {
  name: "Rohan Verma",
  email: "rohan@zepto.com",
  avatar: "RV",
  role: "Product Manager"
}

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: "m1",
    title: "Team Standup",
    time: "9:00 AM",
    endTime: "9:15 AM",
    duration: 15,
    status: "past",
    attendees: [
      { name: "Aisha Khan", email: "aisha@zepto.com", initials: "AK", warmth: "warm", lastContact: "Yesterday" },
      { name: "Dev Patel", email: "dev@zepto.com", initials: "DP", warmth: "warm", lastContact: "2 days ago" },
      { name: "Sneha Rao", email: "sneha@zepto.com", initials: "SR", warmth: "warm", lastContact: "3 days ago" },
      { name: "Karan Singh", email: "karan@zepto.com", initials: "KS", warmth: "cooling", lastContact: "8 days ago" },
    ],
    importance: "routine",
    health: "healthy",
    prepTime: 1,
    openThreads: 0,
    worthMeeting: "yes",
    couldBeEmail: "no",
    meetingCost: "1 hour",
    description: "Daily engineering and product sync",
    briefingReady: true,
  },
  {
    id: "m2",
    title: "Design Review: Mobile Checkout",
    time: "10:30 AM",
    endTime: "11:30 AM",
    duration: 60,
    status: "past",
    attendees: [
      { name: "Priya Nair", email: "priya.n@zepto.com", initials: "PN", warmth: "warm", lastContact: "4 days ago" },
      { name: "Arjun Mehta", email: "arjun@zepto.com", initials: "AM", warmth: "cooling", lastContact: "11 days ago" },
      { name: "Vikram Sood", email: "vikram@zepto.com", initials: "VS", warmth: "cold", lastContact: "3 weeks ago" },
    ],
    importance: "important",
    health: "healthy",
    prepTime: 5,
    openThreads: 2,
    worthMeeting: "yes",
    couldBeEmail: "no",
    meetingCost: "3 hours",
    description: "Review final designs for new checkout flow",
    briefingReady: true,
  },
  {
    id: "m3",
    title: "Q3 Product Strategy Sync",
    time: "1:00 PM",
    endTime: "1:30 PM",
    duration: 30,
    status: "next",
    minutesUntil: 18,
    attendees: [
      { name: "Arjun Mehta", email: "arjun@zepto.com", initials: "AM", warmth: "cooling", lastContact: "3 weeks ago" },
      { name: "Priya Sharma", email: "priya.s@zepto.com", initials: "PS", warmth: "cold", lastContact: "12 days ago" },
    ],
    importance: "critical",
    health: "healthy",
    prepTime: 7,
    openThreads: 4,
    worthMeeting: "yes",
    couldBeEmail: "no",
    meetingCost: "1.5 hours",
    description: "Quarterly review of product roadmap priorities",
    briefingReady: true,
  },
  {
    id: "m4",
    title: "Weekly Status Update — Growth",
    time: "2:30 PM",
    endTime: "3:30 PM",
    duration: 60,
    status: "upcoming",
    attendees: [
      { name: "Neha Gupta", email: "neha@zepto.com", initials: "NG", warmth: "warm", lastContact: "5 days ago" },
      { name: "Raj Kumar", email: "raj@zepto.com", initials: "RK", warmth: "cooling", lastContact: "10 days ago" },
      { name: "Ananya Das", email: "ananya@zepto.com", initials: "AD", warmth: "cooling", lastContact: "9 days ago" },
      { name: "Siddharth Bose", email: "sid@zepto.com", initials: "SB", warmth: "cold", lastContact: "3 weeks ago" },
      { name: "Tanvi Shah", email: "tanvi@zepto.com", initials: "TS", warmth: "warm", lastContact: "2 days ago" },
    ],
    importance: "optional",
    health: "wasteful",
    prepTime: 1,
    openThreads: 0,
    worthMeeting: "no",
    couldBeEmail: "likely",
    suggestedDuration: 20,
    meetingCost: "5 hours",
    description: "Weekly growth metrics review",
    briefingReady: true,
  },
  {
    id: "m5",
    title: "1:1 with Priya Sharma",
    time: "4:00 PM",
    endTime: "4:30 PM",
    duration: 30,
    status: "upcoming",
    attendees: [
      { name: "Priya Sharma", email: "priya.s@zepto.com", initials: "PS", warmth: "cold", lastContact: "12 days ago" },
    ],
    importance: "important",
    health: "unclear",
    prepTime: 10,
    openThreads: 3,
    worthMeeting: "maybe",
    couldBeEmail: "possibly",
    meetingCost: "1 hour",
    description: "Recurring 1:1 — no agenda set",
    briefingReady: false,
  },
  {
    id: "m6",
    title: "Engineering Incident Debrief",
    time: "5:30 PM",
    endTime: "6:30 PM",
    duration: 60,
    status: "upcoming",
    attendees: [
      { name: "Dev Patel", email: "dev@zepto.com", initials: "DP", warmth: "warm", lastContact: "2 days ago" },
      { name: "Karan Singh", email: "karan@zepto.com", initials: "KS", warmth: "cooling", lastContact: "8 days ago" },
      { name: "Arjun Mehta", email: "arjun@zepto.com", initials: "AM", warmth: "cooling", lastContact: "3 weeks ago" },
    ],
    importance: "critical",
    health: "healthy",
    prepTime: 10,
    openThreads: 6,
    worthMeeting: "yes",
    couldBeEmail: "no",
    meetingCost: "3 hours",
    description: "Post-mortem for May 28th payment service outage — SLAs missed",
    briefingReady: false,
  },
]

export const ACTIVE_BRIEFING: ActiveBriefing = {
  meetingId: "m3",
  situation: "You're heading into a critical cross-functional review of the Q3 roadmap. Arjun last raised concerns about feature prioritisation three weeks ago, and Priya's team is currently blocked on two dependencies from your side — neither of which has had an update in 10 days. This meeting will either unblock them or escalate upward to leadership.",
  people: [
    {
      name: "Arjun Mehta",
      email: "arjun@zepto.com",
      initials: "AM",
      warmth: "cooling",
      lastContact: "3 weeks ago",
      context: "Last spoke 3 weeks ago in a thread about Q2 retrospective findings. He flagged that the discovery feature shipped 2 weeks late and wants a tighter process going forward. Has not responded to your follow-up from May 15th.",
      toneHint: "Data-driven and direct. Comes prepared with numbers. He prefers you lead with data, not narrative — open with metrics if you have them.",
      previousMeetings: 4,
      interactionHistory: ["May 1 — Q2 Retro", "Apr 12 — Roadmap Review", "Mar 28 — Planning", "Mar 5 — Kickoff"]
    },
    {
      name: "Priya Sharma",
      email: "priya.s@zepto.com",
      initials: "PS",
      warmth: "cold",
      lastContact: "12 days ago",
      context: "Her last email (May 18th) asked for an update on the checkout API integration timeline. You haven't replied. She also CC'd her manager on the second follow-up — a sign of escalating urgency.",
      toneHint: "Collaborative but will escalate quickly if she feels ignored. Acknowledging her pending ask before the agenda will defuse the tension immediately.",
      previousMeetings: 2,
      interactionHistory: ["May 20 — Planning Sync", "Apr 30 — Kickoff"]
    }
  ],
  openThreads: [
    {
      subject: "Checkout API integration timeline — Priya Sharma",
      status: "You haven't replied to her email from May 18th. It has been 12 days. She CC'd her manager on May 22nd.",
      suggestedAction: "Address this in the first 5 minutes. Even a 'we're targeting June 10th' closes the loop and resets the tone.",
      urgency: "high"
    },
    {
      subject: "Q2 retrospective action items — Arjun Mehta",
      status: "Two process changes Arjun requested in the May 1st thread are unresolved. No formal response was sent.",
      suggestedAction: "Have a quick update ready on the two process changes — even 'still in progress, ETA next sprint' is enough.",
      urgency: "medium"
    },
    {
      subject: "Discovery feature post-mortem",
      status: "No post-mortem has been published for the delayed discovery feature despite Arjun's May 3rd request.",
      suggestedAction: "Acknowledge this is overdue and commit to a date. Don't let it come up as a surprise.",
      urgency: "medium"
    },
    {
      subject: "Q3 roadmap draft shared on May 12th",
      status: "You shared a draft roadmap 18 days ago. Neither Arjun nor Priya has commented on it in Docs.",
      suggestedAction: "Reference the specific sections you want their input on — they may not have read it yet.",
      urgency: "low"
    }
  ],
  suggestedOpener: "Before we go through the roadmap, I want to acknowledge Priya's question on the API timeline — we're targeting June 10th, and I'll send the detailed breakdown by end of day. Arjun, I also want to address the Q2 retro action items before we move forward.",
  confidence: "high",
  confidenceReason: "Based on 4 email threads in the last 3 weeks and 2 previous meetings with these attendees",
  emailThreadsFound: 4,
  generatedAt: "12:42 PM",
  assessment: {
    whyMeeting: "Finalise Q3 roadmap priorities, unblock two pending engineering decisions, and resolve the checkout API integration timeline that has been escalating via email for 12 days.",
    worthHaving: "yes",
    worthReason: "Four unresolved decisions require real-time alignment. Email has already failed twice.",
    couldBeEmail: "no",
    emailReason: "Active escalation in email thread suggests async has already broken down.",
    scheduledDuration: 30,
    suggestedDuration: 30,
    attendeeCount: 2,
    collectiveHoursAtStake: 1
  }
}

export const WASTEFUL_BRIEFING: ActiveBriefing = {
  meetingId: "m4",
  situation: "This is a recurring weekly status update meeting with no active decisions pending. The meeting has 5 attendees spending a collective 5 hours on what appears to be an informational sync that could be handled asynchronously.",
  people: [
    {
      name: "Neha Gupta",
      email: "neha@zepto.com",
      initials: "NG",
      warmth: "warm",
      lastContact: "5 days ago",
      context: "Regular contributor to growth metrics. Last shared weekly update via Slack on Friday.",
      toneHint: "Prefers async updates. Has mentioned in past meetings that these could be emails.",
      previousMeetings: 12,
      interactionHistory: ["Every Monday for 3 months"]
    },
    {
      name: "Raj Kumar",
      email: "raj@zepto.com",
      initials: "RK",
      warmth: "cooling",
      lastContact: "10 days ago",
      context: "Growth analytics lead. Typically shares dashboards that could be distributed async.",
      toneHint: "Data-focused. Would prefer reviewing metrics on his own time.",
      previousMeetings: 12,
      interactionHistory: ["Every Monday for 3 months"]
    }
  ],
  openThreads: [],
  suggestedOpener: "Given there are no active decisions or blockers this week, consider sending a status summary via email instead.",
  confidence: "low",
  confidenceReason: "Calendar event only — no email threads or active discussions found",
  emailThreadsFound: 0,
  generatedAt: "12:42 PM",
  assessment: {
    whyMeeting: "Weekly status update with no specific agenda or decisions required.",
    worthHaving: "no",
    worthReason: "No open decisions, no blockers, no active email threads. This appears to be purely informational.",
    couldBeEmail: "likely",
    emailReason: "Status updates can be shared asynchronously. No real-time discussion required.",
    scheduledDuration: 60,
    suggestedDuration: 20,
    attendeeCount: 5,
    collectiveHoursAtStake: 5
  }
}

export const DASHBOARD_STATS = {
  meetingsToday: 6,
  criticalMeetings: 2,
  lowValueMeetings: 1,
  totalPrepTime: 34,
  backToBackWarning: true,
  backToBackSlot: "2:30 PM – 6:30 PM (3 back-to-back with no break)",
  weeklyMeetingLoad: [4, 6, 8, 5, 3],
}

export const PREP_CHECKLIST = [
  "Review Q3 roadmap draft before walking in",
  "Prepare Checkout API update (target: June 10)",
  "Draft response to Q2 retro action items",
  "Confirm Q3 priority order with your notes"
]

export const RELATIONSHIP_HEALTH = {
  warm: 5,
  cooling: 4,
  cold: 3,
  coldContacts: ["Vikram Sood", "Siddharth Bose", "Priya Sharma"]
}

export const ALERTS = [
  { id: "a1", type: "critical" as const, message: "Priya Sharma's email unanswered for 12 days" },
  { id: "a2", type: "warning" as const, message: "No agenda set for 4:00 PM 1:1" },
  { id: "a3", type: "info" as const, message: "3 back-to-back meetings after 2:30 PM" }
]
