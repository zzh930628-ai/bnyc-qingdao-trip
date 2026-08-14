export type WorkLayout =
  | "featureLandscape"
  | "featurePortrait"
  | "portrait"
  | "wide"
  | "medium"
  | "narrow";

export type WorkProject = {
  name: string;
  category: string;
  year: string;
  image: string;
  alt: string;
  layout: WorkLayout;
};

// Replace these local editorial placeholder SVGs with final photography in /public/images/work when available.
export const workProjects: WorkProject[] = [
  {
    name: "Specialty Coffee",
    category: "Brand Content",
    year: "2026",
    image: "/images/work/work-01.svg",
    alt: "Editorial image for a specialty coffee brand campaign.",
    layout: "featureLandscape"
  },
  {
    name: "Restaurant Launch",
    category: "Product Launch",
    year: "2026",
    image: "/images/work/work-02.svg",
    alt: "Restaurant launch photography with plated dishes.",
    layout: "featurePortrait"
  },
  {
    name: "Seasonal Dessert",
    category: "Food Brand / Campaign",
    year: "2026",
    image: "/images/work/work-03.svg",
    alt: "Dessert campaign photography in an editorial style.",
    layout: "portrait"
  },
  {
    name: "Hospitality Table",
    category: "Lifestyle / Editorial",
    year: "2026",
    image: "/images/work/work-04.svg",
    alt: "Boutique hospitality breakfast editorial image.",
    layout: "wide"
  },
  {
    name: "Consumer Packaged Goods",
    category: "Food Brand / Launch",
    year: "2026",
    image: "/images/work/work-05.svg",
    alt: "Consumer packaged food product editorial photography.",
    layout: "medium"
  },
  {
    name: "Cafe Moments",
    category: "Lifestyle / Brand Story",
    year: "2026",
    image: "/images/work/work-06.svg",
    alt: "Cafe lifestyle brand story image.",
    layout: "narrow"
  },
  {
    name: "Launch Details",
    category: "Product Story",
    year: "2026",
    image: "/images/work/work-07.svg",
    alt: "Detailed food product launch image.",
    layout: "medium"
  }
];
