export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
};

export type Principle = {
  title: string;
  description: string;
};

export const contactDetails = {
  email: "hello@nihaostudio.sg",
  instagram: "@nihaostudio.sg",
  xiaohongshu: "@NIHAO Studio"
};

// Replace these local editorial placeholder SVGs with final photography in /public/images/* when available.
export const siteImages = {
  hero: "/images/hero/hero-main.jpg",
  caseStudyHero: "/images/case-study/coffee-hero-placeholder.svg",
  caseStudyDetail: "/images/case-study/coffee-detail-placeholder.svg",
  portrait: "/images/about/portrait-placeholder.svg",
  cta: "/images/hero/cta-placeholder.svg"
};

export const services: ServiceItem[] = [
  {
    id: "brand-content",
    title: "Brand Content",
    description:
      "Photography, short-form video and visual storytelling designed around the product, brand and consumer.",
    capabilities: [
      "Creative direction",
      "Food and product photography",
      "Short-form video",
      "Social content",
      "Visual storytelling"
    ]
  },
  {
    id: "product-launch",
    title: "Product Launch",
    description:
      "A focused creative programme that helps a new product enter the market with a clear story and distinctive visual identity.",
    capabilities: [
      "Product narrative",
      "Consumer perspective",
      "Creative concept",
      "Campaign photography",
      "Launch content",
      "Social storytelling"
    ]
  },
  {
    id: "brand-partnership",
    title: "Brand Partnership",
    description:
      "Ongoing creative support for brands that value consistency, quality and a strong point of view.",
    capabilities: [
      "Monthly creative planning",
      "Content production",
      "Creative direction",
      "Campaign development",
      "Brand storytelling",
      "Content review"
    ]
  }
];

export const principles: Principle[] = [
  {
    title: "Product First",
    description: "Understand what makes the product genuinely worth caring about."
  },
  {
    title: "Consumer Perspective",
    description: "Translate product value into something people can immediately understand and feel."
  },
  {
    title: "Commercial Relevance",
    description: "Creative work should strengthen the brand, not exist only for aesthetics."
  }
];

export const creatorStats = [
  { value: "XXK+", label: "Xiaohongshu Followers", note: "Placeholder value to replace" },
  { value: "XXM+", label: "Content Views", note: "Placeholder value to replace" },
  { value: "XX+", label: "Brand Collaborations", note: "Placeholder value to replace" }
];

export const creatorShots = [
  "/images/about/creator-shot-01.svg",
  "/images/about/creator-shot-02.svg"
];

export const clients = [
  "Client 01",
  "Client 02",
  "Client 03",
  "Client 04",
  "Client 05",
  "Client 06"
];

export const frameworkWords = ["Product", "Insight", "Story", "Visual", "Desire"];
