import { CardStackItem } from "../components/ui/card-stack";

export const pastSessions: CardStackItem[] = [
  {
    id: "ai-in-payments",
    title: "AI in Payments: Beyond Fraud Detection",
    description: "See how leading teams use AI across routing, operations, and reliability — not just fraud. Panel discussion with payments product leaders and architects.",
    date: "30 May 2025",
    format: "In-Person • Chennai",
    imageSrc: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60",
    href: "#",
  },
  {
    id: "qa-instant-payments",
    title: "QA for Instant Payments",
    description: "Dive into advanced techniques for load, concurrency, and failure-point testing crucial for any instant or high-velocity payment infrastructure.",
    date: "22 Jul 2025",
    format: "Webinar",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    href: "#",
  },
  {
    id: "vibe-coding",
    title: "Vibe Coding Workshop",
    description: "Go from idea to working fintech prototype in days, not weeks, using AI and low-code tools together. With Jeremy Asirwaad from InVideo.",
    date: "12 Aug 2025",
    format: "Live Session",
    imageSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    href: "#",
  },
  {
    id: "ai-powered-qa",
    title: "AI-Powered QA: The Practitioners' Workshop",
    description: "Turn flaky, manual-heavy test suites into an AI-augmented pipeline that actually ships faster. With experts from Philips, Venzo & Keploy.",
    date: "12 Nov 2025",
    format: "Virtual Workshop",
    imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
    href: "#",
  },
];

export type PastSession = typeof pastSessions[0];
