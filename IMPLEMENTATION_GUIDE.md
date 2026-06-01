# Briefcase - Frontend Implementation Guide

## Project Overview
**Briefcase** is an AI-powered pre-meeting intelligence agent UI prototype. This is a visualization demo with all mock data hardcoded - no backend, no API calls, just a beautiful, fully interactive UI.

---

## Tech Stack
- **React with TypeScript** - Core framework
- **Next.js 16** - App Router
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components (Badge, Card, Tooltip, Progress, Tabs, Avatar, Button, Separator, HoverCard)
- **Lucide React** - Icons
- **Framer Motion** - Animations

---

## Design System

### Color Palette
```css
/* Backgrounds */
--bg-primary:      #F5F5F2;    /* Main app background */
--bg-card:         #FFFFFF;    /* Card backgrounds */
--bg-card-hover:   #F8F8F6;    /* Card hover state */
--bg-elevated:     #FFFFFF;    /* Elevated surfaces */

/* Borders */
--border-subtle:   #ECECE8;    /* Light borders */
--border-soft:     #E1E1DB;    /* Soft borders */

/* Text */
--text-primary:    #18181B;    /* Primary text */
--text-secondary:  #71717A;    /* Secondary text */
--text-muted:      #A1A1AA;    /* Muted text */

/* Accents */
--accent-gold:     #D97706;    /* Primary accent (amber-600) */
--accent-gold-dim: #B45309;    /* Darker gold */

/* Status Colors */
--critical-red:    #DC2626;    /* Critical items */
--critical-bg:     #FEF2F2;    /* Critical background */
--healthy-green:   #16A34A;    /* Healthy status */
--healthy-bg:      #F0FDF4;    /* Healthy background */
--warning-amber:   #D97706;    /* Warnings */
--warning-bg:      #FFF7ED;    /* Warning background */
--important-blue:  #2563EB;    /* Important items */
--muted-grey:      #A1A1AA;    /* Muted elements */
```

### Typography
- **Headings/Display**: `font-serif` (Playfair Display)
- **Body text**: `font-sans` (Geist)
- **Data/Numbers/Timestamps**: `font-mono` (Geist Mono)

### Design Philosophy
- Dark editorial aesthetic
- Premium intelligence dossier feel
- NOT a chatbot, NOT a dashboard
- Think: classified briefing document meets modern macOS app

---

## File Structure
```
app/
├── globals.css              # Custom CSS variables & Tailwind config
├── layout.tsx               # Root layout with fonts
├── page.tsx                 # Main entry (Dashboard)
├── landing/
│   └── page.tsx             # Landing page route

components/
├── briefcase/
│   ├── data/
│   │   └── mock-data.ts     # All mock data
│   ├── dashboard/
│   │   ├── Dashboard.tsx            # Main dashboard layout
│   │   ├── TopNav.tsx               # Navigation bar
│   │   ├── StatsGrid.tsx            # 4-card stats grid
│   │   ├── AlertBanner.tsx          # Back-to-back warning
│   │   ├── MeetingTimeline.tsx      # Left panel timeline
│   │   ├── MeetingCard.tsx          # Individual meeting card
│   │   └── DayPicker.tsx            # M T W T F pills
│   ├── briefing/
│   │   ├── BriefingPanel.tsx        # Right panel container
│   │   ├── BriefingHeader.tsx       # Meeting title + countdown
│   │   ├── SituationSection.tsx     # "The Situation" narrative
│   │   ├── PeopleSection.tsx        # "The People" cards
│   │   ├── OpenThreadsSection.tsx   # "Open Threads" list
│   │   ├── HowToOpenSection.tsx     # Suggested opener
│   │   ├── AssessmentSection.tsx    # Meeting assessment grid
│   │   ├── PrepChecklist.tsx        # Interactive checklist
│   │   ├── OverrideBar.tsx          # Human override system
│   │   └── BriefingFooter.tsx       # Actions + metadata
│   ├── shared/
│   │   ├── WarmthIndicator.tsx      # 🟢🟡🔴 warmth dots
│   │   ├── ImportanceBadge.tsx      # Critical/Important/Routine badges
│   │   ├── HealthBadge.tsx          # Healthy/Unclear/Wasteful badges
│   │   ├── CountdownTimer.tsx       # Live countdown
│   │   ├── LoadingBriefing.tsx      # Shimmer loading state
│   │   └── KeyboardShortcuts.tsx    # Shortcuts panel
│   ├── focus/
│   │   └── FocusMode.tsx            # Full-screen briefing view
│   └── landing/
│       └── LandingPage.tsx          # Marketing landing page
```

---

## Component Specifications

### 1. Dashboard Layout (Two-Panel)
- **Left Panel**: 32% width - Stats + Timeline
- **Right Panel**: 68% width - Active Briefing
- Independent scroll for each panel
- Responsive: collapses to single column on mobile

### 2. Top Navigation Bar
```
[Left]  ◼ BRIEFCASE (logo + wordmark, serif font, gold icon)
[Center] Monday, June 2 · 12:44 PM (monospace, muted)
[Right]  [DEMO MODE badge] [Focus Mode toggle] [Avatar: RV] Rohan Verma
```

### 3. Stats Grid (2×2)
| Card | Value | Subtext |
|------|-------|---------|
| Meetings Today | 6 | Mini week heatmap |
| Critical | 2 | "Require preparation now" |
| Low Value | 1 | "May be skippable" |
| Prep Time | 34 min | Progress bar |

### 4. Meeting Timeline Cards

**Card Types:**
1. **Past Meeting** - Dimmed (70% opacity), compact
2. **NEXT Meeting** - Hero card with gold border, countdown
3. **Upcoming** - Standard style
4. **Low-Value** - Amber warning indicator
5. **Ungenerated** - "Generate Brief →" button

**Card Content:**
- Importance badge + time countdown (for NEXT)
- Title, time, duration, attendee count
- Avatar row
- Prep time, Open threads, Meeting cost
- Worth Meeting status

### 5. Briefing Panel Sections

**Section 1: The Situation**
- Narrative prose (2-3 sentences)
- Gold left border accent
- No bullets

**Section 2: The People**
- Person cards with:
  - Avatar + name + email
  - Warmth indicator (🟢🟡🔴)
  - Context paragraph
  - Tone hint
  - Previous meetings timeline

**Section 3: Open Threads**
- Urgency color-coded cards
- Subject, status, suggested action
- HIGH (red), MEDIUM (amber), LOW (blue)

**Section 4: How to Open**
- Large, italic editorial treatment
- Suggested opener quote
- Attribution line

**Section 5: Meeting Assessment (2×2 grid)**
- Purpose, Worth Having?, Could Be Email?, Duration

**Section 6: Prep Checklist**
- Interactive checkboxes
- "You're ready" when all checked

**Section 7: Human Override**
- Mark as Optional/Wasteful buttons
- Toast confirmation on save

---

## Animations (Framer Motion)

1. **Countdown Timer** - Updates every second, red pulse under 5 min
2. **Card Hover** - Background brighten + translate-x-1
3. **Section Stagger** - 120ms stagger, opacity + translateY
4. **Loading State** - Shimmer + cycling status messages
5. **Checklist** - Green checkmark + strikethrough animation
6. **Override Toast** - Slide in from bottom-right

---

## State Management

```typescript
// Main dashboard state
const [activeMeetingId, setActiveMeetingId] = useState("m3")
const [focusMode, setFocusMode] = useState(false)
const [overrides, setOverrides] = useState<Record<string, string>>({})
const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])
const [selectedDay, setSelectedDay] = useState(2) // Wednesday (0-indexed)
const [generatingBriefings, setGeneratingBriefings] = useState<string[]>([])
```

---

## Responsive Breakpoints

- **Desktop (>1024px)**: Two-panel layout
- **Tablet (768-1024px)**: Collapsible left panel
- **Mobile (<768px)**: Single column, full-screen briefing on tap

---

## Importance Color System

| Importance | Badge Color | Background | Border |
|-----------|-------------|------------|--------|
| Critical | #DC2626 | #FEF2F2 | #DC2626 |
| Important | #2563EB | #EFF6FF | #2563EB |
| Routine | #6B7280 | #F9FAFB | #6B7280 |
| Optional | #4A4A5A | #F3F4F6 | #4A4A5A |

## Warmth Indicator System

| Status | Color | Condition |
|--------|-------|-----------|
| Warm | #16A34A | Last contact < 7 days |
| Cooling | #D97706 | Last contact 7-14 days |
| Cold | #DC2626 | Last contact > 14 days |

---

## Key Features

1. **Meeting Switching** - Click timeline card → briefing updates
2. **Focus Mode** - Full-screen distraction-free view
3. **Live Countdown** - Real-time timer to next meeting
4. **Interactive Checklist** - Track prep progress
5. **Human Override** - Override AI assessments
6. **Loading States** - Shimmer with cycling messages
7. **Keyboard Shortcuts** - J/K navigate, R refresh, F focus
8. **Demo Banner** - Always visible reminder of demo mode

---

## Implementation Order

1. ✅ Set up design system (globals.css, fonts)
2. ✅ Create mock data file
3. ✅ Build shared components (badges, indicators)
4. ✅ Build dashboard layout + navigation
5. ✅ Build stats grid
6. ✅ Build meeting timeline
7. ✅ Build briefing panel sections
8. ✅ Add animations
9. ✅ Implement state management
10. ✅ Build focus mode
11. ✅ Build landing page
12. ✅ Add responsive behavior

---

## Notes for Demo

- Default view: Dashboard with "Q3 Product Strategy Sync" active
- All interactions work (checkboxes, overrides, meeting switching)
- Countdown timer is live
- Focus mode is toggleable
- No actual API calls - pure frontend demo
