export const benefits = [
  {
    id: 1,
    slug: "job-seeker-allowance",
    title: "Job Seeker Allowance",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
    tagline: "Supporting Your Journey to Employment",
    description: "Receive financial support while actively seeking employment opportunities across Nigeria.",
    amount: "₦45,000 / month",
    highlights: ["Monthly stipend", "Career counseling", "Job matching", "Skill workshops"],
    eligibility: ["Unemployed graduates", "NYSC members", "Actively job hunting"],
    color: "#3b82f6"
  },
  {
    id: 2,
    slug: "single-parent-charge-benefit",
    title: "Single Parent Charge Benefit",
    heroImage: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=1200",
    tagline: "Supporting Families, One Parent at a Time",
    description: "Monthly financial assistance to help single parents raise their children.",
    amount: "₦1,500 / month",
    highlights: ["Monthly cash support", "Child education aid", "Healthcare assistance"],
    eligibility: ["Single parents", "Low income households", "Children under 18"],
    color: "#ec4899"
  },
  {
    id: 3,
    slug: "widow-widower-benefit",
    title: "Widow & Widower Benefit",
    heroImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200",
    tagline: "Honoring and Supporting Those Who've Lost a Spouse",
    description: "Comprehensive support for widows and widowers during challenging times.",
    amount: "₦35,000 / month",
    highlights: ["Financial assistance", "Emotional support", "Legal aid", "Community programs"],
    eligibility: ["Widows & Widowers", "Spouse passed within 5 years"],
    color: "#8b5cf6"
  },
  {
    id: 4,
    slug: "housing-benefit",
    title: "Housing Benefit",
    heroImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200",
    tagline: "Making Safe Housing Accessible",
    description: "Support for rent, mortgage, and affordable housing solutions.",
    amount: "Up to ₦500,000",
    highlights: ["Rent subsidy", "Home ownership support", "Housing grants"],
    eligibility: ["Low income earners", "First time home buyers"],
    color: "#10b981"
  },
  {
    id: 5,
    slug: "health-care-benefit",
    title: "Health Care Benefit",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200",
    tagline: "Your Health, Our Priority",
    description: "Access to quality healthcare services and medical financial support.",
    amount: "Free / Subsidized",
    highlights: ["Medical consultations", "Drug subsidy", "Hospital coverage"],
    eligibility: ["All registered citizens"],
    color: "#ef4444"
  },
  {
    id: 6,
    slug: "empowerment-benefit",
    title: "Empowerment Benefit",
    heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
    tagline: "Skill Development & Economic Empowerment",
    description: "Vocational training and startup support for youth and women.",
    amount: "₦150,000 grant",
    highlights: ["Vocational training", "Business startup capital", "Mentorship"],
    eligibility: ["Youth & Women", "Unemployed & Underemployed"],
    color: "#f59e0b"
  },
  // You can continue adding more. For now, here are a few more key ones:
  {
    id: 7,
    slug: "marriage-benefit",
    title: "Marriage Benefit",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611027288377?w=1200",
    tagline: "Supporting New Families",
    description: "Financial gift for newly married couples.",
    amount: "₦100,000",
    highlights: ["Wedding support", "Family startup grant"],
    eligibility: ["Newly married couples"],
    color: "#db2777"
  },
  {
    id: 8,
    slug: "child-care-benefit",
    title: "Child Care Benefit",
    heroImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200",
    tagline: "Supporting Nigeria's Future",
    description: "Support for quality childcare and early childhood development.",
    amount: "₦25,000 / child",
    highlights: ["Daycare support", "Educational materials"],
    eligibility: ["Parents with children 0-5 years"],
    color: "#14b8a6"
  }
];

export const getBenefitBySlug = (slug) => {
  return benefits.find(b => b.slug === slug);
};