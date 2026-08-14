const workProjects = [
  {
    name: "Specialty Coffee",
    category: "Brand Content",
    year: "2026",
    image: "./images/work/work-01.svg",
    layout: "feature-landscape"
  },
  {
    name: "Restaurant Launch",
    category: "Product Launch",
    year: "2026",
    image: "./images/work/work-02.svg",
    layout: "feature-portrait"
  },
  {
    name: "Seasonal Dessert",
    category: "Food Brand / Campaign",
    year: "2026",
    image: "./images/work/work-03.svg",
    layout: "portrait"
  },
  {
    name: "Hospitality Table",
    category: "Lifestyle / Editorial",
    year: "2026",
    image: "./images/work/work-04.svg",
    layout: "wide"
  },
  {
    name: "Consumer Packaged Goods",
    category: "Food Brand / Launch",
    year: "2026",
    image: "./images/work/work-05.svg",
    layout: "medium"
  },
  {
    name: "Cafe Moments",
    category: "Lifestyle / Brand Story",
    year: "2026",
    image: "./images/work/work-06.svg",
    layout: "narrow"
  },
  {
    name: "Launch Details",
    category: "Product Story",
    year: "2026",
    image: "./images/work/work-07.svg",
    layout: "medium"
  }
];

const services = [
  {
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

const principles = [
  ["Product First", "Understand what makes the product genuinely worth caring about."],
  [
    "Consumer Perspective",
    "Translate product value into something people can immediately understand and feel."
  ],
  ["Commercial Relevance", "Creative work should strengthen the brand, not exist only for aesthetics."]
];

const clients = ["Client 01", "Client 02", "Client 03", "Client 04", "Client 05", "Client 06"];
const philosophyWords = ["Product", "Insight", "Story", "Visual", "Desire"];

document.getElementById("work-grid").innerHTML = workProjects
  .map(
    (project) => `
      <article class="work-card ${project.layout}">
        <img src="${project.image}" alt="${project.name}" />
        <div class="work-meta">
          <p class="eyebrow">${project.category}</p>
          <h3>${project.name}</h3>
          <span>${project.year}</span>
        </div>
      </article>
    `
  )
  .join("");

document.getElementById("services-grid").innerHTML = services
  .map(
    (service, index) => `
      <article class="service-card reveal">
        <p class="eyebrow">0${index + 1}</p>
        <h3>${service.title}</h3>
        <p class="section-copy">${service.description}</p>
        <ul>${service.capabilities.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    `
  )
  .join("");

document.getElementById("principles-grid").innerHTML = principles
  .map(
    ([title, description]) => `
      <article class="principle-card reveal">
        <h3>${title}</h3>
        <p class="section-copy">${description}</p>
      </article>
    `
  )
  .join("");

document.getElementById("clients-grid").innerHTML = clients
  .map((client) => `<div class="reveal">${client}</div>`)
  .join("");

document.getElementById("philosophy-words").innerHTML = philosophyWords
  .map((word) => `<span>${word}</span>`)
  .join("");

document.getElementById("year").textContent = new Date().getFullYear();

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const reveals = document.querySelectorAll(".reveal");

window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  },
  { passive: true }
);

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.14 }
);

reveals.forEach((element) => observer.observe(element));
