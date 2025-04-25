export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Events", href: "#events" },
  { label: "Resources", href: "#resources" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  {
    id: 1,
    title: "Sign Language Classes",
    description: "Interactive classes for various sign language proficiency levels, taught by experienced deaf instructors.",
    icon: "hands",
    color: "primary",
  },
  {
    id: 2,
    title: "Community Support Groups",
    description: "Regular meetings and activities that foster connection and mutual support among community members.",
    icon: "users",
    color: "secondary",
  },
  {
    id: 3,
    title: "Educational Advocacy",
    description: "Assistance navigating educational systems and securing appropriate accommodations and resources.",
    icon: "graduation-cap",
    color: "accent",
  },
  {
    id: 4,
    title: "Employment Support",
    description: "Job search assistance, workplace accommodation guidance, and career development programs.",
    icon: "briefcase",
    color: "primary",
  },
  {
    id: 5,
    title: "Interpreting Services",
    description: "Professional sign language interpreters for medical appointments, legal proceedings, and other critical situations.",
    icon: "video",
    color: "secondary",
  },
  {
    id: 6,
    title: "Youth Programs",
    description: "Activities, mentorship, and leadership development specifically designed for deaf and hard of hearing youth.",
    icon: "child",
    color: "accent",
  },
];

export const events = [
  {
    id: 1,
    title: "Advanced ASL Workshop",
    description: "Join us for an advanced American Sign Language workshop led by certified deaf instructors.",
    date: "July 15, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Community Center",
    category: "Workshop",
    categoryColor: "primary",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
    ctaText: "Register Now",
  },
  {
    id: 2,
    title: "Youth Leadership Camp",
    description: "A week-long leadership development camp for deaf and hard of hearing youth ages 14-18.",
    date: "Aug 5-10, 2023",
    time: "Residential",
    location: "Lakeside Retreat Center",
    category: "Youth Program",
    categoryColor: "secondary",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=600&q=80",
    ctaText: "Apply Now",
  },
  {
    id: 3,
    title: "Annual Community Picnic",
    description: "Join us for food, games, and community building at our annual summer picnic celebration.",
    date: "July 22, 2023",
    time: "11:00 AM - 4:00 PM",
    location: "Riverside Park",
    category: "Social",
    categoryColor: "accent",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80",
    ctaText: "RSVP",
  },
];

export const resources = [
  {
    id: 1,
    title: "Educational Resources",
    icon: "book",
    color: "primary",
    links: [
      { text: "ASL Dictionary and Learning Tools", url: "#" },
      { text: "Deaf Education Guidelines", url: "#" },
      { text: "Scholarship Opportunities", url: "#" },
      { text: "Research Publications", url: "#" },
    ],
    ctaText: "Browse All Educational Resources",
  },
  {
    id: 2,
    title: "Legal & Rights Resources",
    icon: "gavel",
    color: "secondary",
    links: [
      { text: "ADA Guidelines & Rights", url: "#" },
      { text: "Workplace Accommodation Guide", url: "#" },
      { text: "Healthcare Rights Reference", url: "#" },
      { text: "Legal Advocacy Partners", url: "#" },
    ],
    ctaText: "Browse All Legal Resources",
  },
  {
    id: 3,
    title: "Assistive Technology",
    icon: "tools",
    color: "accent",
    links: [
      { text: "Hearing Aid Information", url: "#" },
      { text: "Visual Alert Systems", url: "#" },
      { text: "Communication Apps", url: "#" },
      { text: "Financial Assistance Programs", url: "#" },
    ],
    ctaText: "Browse All Technology Resources",
  },
];

export const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1532503332468-53bbe37d8b0c?auto=format&fit=crop&w=500&q=80",
    alt: "Community workshop on sign language education",
    caption: "Workshop Series",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1602052793312-b99c2a9ee797?auto=format&fit=crop&w=500&q=80",
    alt: "Youth leadership training event",
    caption: "Youth Leadership",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=500&q=80",
    alt: "Community picnic celebration",
    caption: "Summer Picnic",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=500&q=80",
    alt: "Advocacy day at the state capitol",
    caption: "Advocacy Day",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&w=500&q=80",
    alt: "Educational workshop for families",
    caption: "Family Workshop",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=500&q=80",
    alt: "ASL performance at cultural event",
    caption: "Cultural Performance",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?auto=format&fit=crop&w=500&q=80",
    alt: "Technology demonstration event",
    caption: "Tech Showcase",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1544250830-a6a084230d69?auto=format&fit=crop&w=500&q=80",
    alt: "Volunteer appreciation dinner",
    caption: "Volunteer Celebration",
  },
];

export const contactInfo = {
  address: {
    line1: "123 Inclusion Avenue",
    line2: "Community Center, Suite 101",
    city: "Harmony City, HS 12345",
  },
  email: "info@deafwelfaresociety.org",
  vrs: "(555) 123-4567",
  officeHours: {
    weekdays: "Monday-Friday: 9:00 AM - 5:00 PM",
    saturday: "Saturday: 10:00 AM - 2:00 PM",
    sunday: "Sunday: Closed",
  },
};

export const footerLinks = {
  programs: [
    { label: "Sign Language Classes", href: "#" },
    { label: "Youth Leadership", href: "#" },
    { label: "Interpreter Services", href: "#" },
    { label: "Employment Support", href: "#" },
    { label: "Community Workshops", href: "#" },
    { label: "Family Support Groups", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Accessibility Statement", href: "#" },
  ],
  social: [
    { platform: "facebook", href: "#", ariaLabel: "Facebook" },
    { platform: "twitter", href: "#", ariaLabel: "Twitter" },
    { platform: "instagram", href: "#", ariaLabel: "Instagram" },
    { platform: "youtube", href: "#", ariaLabel: "YouTube" },
  ],
};
