import Image from "next/image";
import Link from "next/link";
import { PhilosophySequence } from "@/components/philosophy-sequence";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import {
  clients,
  contactDetails,
  creatorShots,
  creatorStats,
  frameworkWords,
  principles,
  services,
  siteImages,
} from "@/data/site-content";
import { workProjects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";

const workLayoutClasses = {
  featureLandscape: "md:col-span-7 md:row-span-2",
  featurePortrait: "md:col-span-5 md:row-span-2",
  portrait: "md:col-span-4 md:row-span-2",
  wide: "md:col-span-8",
  medium: "md:col-span-4",
  narrow: "md:col-span-3"
} as const;

export default function Home() {
  return (
    <main id="top" className="bg-ivory text-ink">
      <SiteHeader />

      <section className="relative isolate overflow-hidden border-b border-[rgba(58,34,24,0.08)] bg-[linear-gradient(180deg,#f2e8da_0%,#eadbca_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(122,74,62,0.05),transparent_22%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(122,74,62,0.06),transparent_30%)]" />

        <div className="section-shell relative z-10 grid min-h-[96vh] items-center gap-10 pb-10 pt-28 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14 lg:pb-14 lg:pt-36">
          <Reveal className="order-2 max-w-[640px] lg:order-1">
            <p className="eyebrow text-accent/78">{siteConfig.heroLabel}</p>
            <h1 className="mt-5 font-serif text-[2.9rem] leading-[0.95] tracking-[-0.02em] text-ink sm:text-[4.1rem] lg:text-[5rem]">
              {siteConfig.brandName}
            </h1>
            <p className="mt-6 max-w-[11ch] font-serif text-[2.2rem] leading-[0.96] tracking-[-0.025em] text-ink sm:text-[2.9rem] lg:text-[4rem]">
              {siteConfig.heroHeadline}
            </p>
            <p className="mt-8 max-w-[32rem] text-base leading-8 text-muted sm:text-lg">
              {siteConfig.heroDescription}
            </p>

            <div className="mt-10 flex flex-wrap gap-8 text-sm uppercase tracking-[0.14em] text-ink sm:text-[0.78rem]">
              <Link href="#work" className="border-b border-ink/65 pb-2 transition hover:border-ink hover:text-ink">
                View Our Work
              </Link>
              <Link href="#contact" className="border-b border-ink/30 pb-2 text-muted transition hover:border-ink hover:text-ink">
                Work With Us
              </Link>
            </div>

            <div className="mt-10 border-t border-[rgba(58,34,24,0.12)] pt-5 text-[0.8rem] uppercase tracking-[0.18em] text-accent/72">
              F&amp;B Brand &amp; Creative Studio
            </div>

            <div className="mt-14 flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.18em] text-accent/64">
              <span className="block h-px w-16 bg-accent/34" />
              <span>Scroll</span>
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[860px]">
              <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-full border border-[rgba(122,74,62,0.18)] lg:block" />
              <div className="absolute -bottom-8 -right-8 hidden h-28 w-28 rounded-full bg-[rgba(122,74,62,0.08)] lg:block" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] border border-[rgba(58,34,24,0.12)] bg-[#d9c7b2] shadow-[0_30px_90px_rgba(58,34,24,0.16)] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src={siteImages.hero}
                  alt="Editorial NIHAO Studio hero photography featuring plated dessert and coffee."
                  fill
                  priority
                  unoptimized
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 56vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,23,0.02),rgba(23,23,23,0.12))]" />
              </div>
              <div className="surface-warm absolute bottom-5 left-5 rounded-[20px] px-5 py-4 sm:bottom-6 sm:left-6 sm:px-6 lg:max-w-[260px]">
                <p className="eyebrow text-accent/74">Editorial Note</p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  Replace with NIHAO&apos;s strongest signature food image once final art direction is locked.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="work" className="section-shell pt-24 sm:pt-28">
        <Reveal>
          <p className="eyebrow">Selected Work</p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">Selected Work</h2>
            <p className="max-w-xl text-base leading-7 text-muted sm:text-lg">
              Food, drink and brands we believe deserve attention.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid auto-rows-[300px] grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[230px] lg:auto-rows-[250px] lg:gap-6">
          {workProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 70} className={workLayoutClasses[project.layout]}>
              <article className="group relative h-full overflow-hidden rounded-[30px] border border-[rgba(58,34,24,0.1)] bg-canvas/70 shadow-soft">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  unoptimized
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,23,0.02),rgba(23,23,23,0.58))] opacity-95 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-ivory sm:p-6">
                  <p className="eyebrow text-ivory/68">{project.category}</p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="max-w-[14ch] font-serif text-[2.05rem] leading-[1.02] tracking-[-0.02em]">{project.name}</h3>
                      <p className="mt-1 text-sm text-ivory/74">{project.year}</p>
                    </div>
                    <span className="translate-y-3 text-sm text-ivory/0 transition duration-500 group-hover:translate-y-0 group-hover:text-ivory/90">
                      View Project
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pt-24 sm:pt-28">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Brand Philosophy</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {siteConfig.philosophyHeadline}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            {siteConfig.philosophyDescription}
          </p>
        </Reveal>

        <div className="mt-16 rounded-[36px] border border-[rgba(58,34,24,0.08)] bg-[rgba(230,215,197,0.62)] px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
          <PhilosophySequence words={frameworkWords} />
          <Reveal className="mx-auto mt-10 max-w-3xl text-center text-base leading-8 text-muted sm:text-lg">
            <p>
              We begin with the product and the people it is made for, then build the story, creative direction and visual language around it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pt-24 sm:pt-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">Featured Case — Specialty Coffee Brand</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Translating craft into desire.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              A great coffee product can be technically exceptional, yet still difficult for consumers to understand. Our role is to translate craftsmanship, flavour and product thinking into a visual language that creates curiosity and desire.
            </p>

            <div className="mt-10 grid gap-8 border-t border-black/8 pt-8 sm:grid-cols-2">
              <div>
                <h3 className="font-serif text-2xl">The Challenge</h3>
                <p className="mt-3 text-base leading-7 text-muted">
                  Communicate the quality, complexity and personality of the product without making the brand feel technical or inaccessible.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl">Our Approach</h3>
                <ul className="mt-3 space-y-2 text-base text-muted">
                  {[
                    "Product understanding",
                    "Creative concept",
                    "Art direction",
                    "Photography",
                    "Short-form visual content",
                    "Social storytelling"
                  ].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="surface-warm mt-10 rounded-[28px] px-6 py-6 sm:px-8">
              <p className="eyebrow">Campaign / Content Results</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {[
                  "Placeholder metric 01",
                  "Placeholder metric 02",
                  "Placeholder metric 03"
                ].map((metric) => (
                  <div key={metric} className="border-t border-black/8 pt-4">
                    <p className="text-sm uppercase tracking-[0.16em] text-muted">To Replace</p>
                    <p className="mt-2 font-serif text-2xl">{metric}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="space-y-5 lg:space-y-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-black/6">
              <Image
                src={siteImages.caseStudyHero}
                alt="Featured specialty coffee case study hero image."
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-black/6">
                <Image
                  src={siteImages.caseStudyDetail}
                  alt="Detailed editorial photography for specialty coffee packaging and espresso."
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
              <div className="surface-warm rounded-[28px] p-6 sm:p-7">
                <p className="eyebrow">The Work</p>
                <p className="mt-4 text-base leading-7 text-muted">
                  Large campaign visuals, tactile product imagery, short-form launch content and a softer storytelling system designed to make expertise feel desirable rather than technical.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="section-shell pt-24 sm:pt-28">
        <Reveal>
          <p className="eyebrow">What We Do</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">What We Do</h2>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              From individual launches to long-term partnerships, we help brands express what makes them worth choosing.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 90}>
              <article className="surface-warm flex h-full flex-col rounded-[30px] p-7 sm:p-8">
                <p className="eyebrow">0{index + 1}</p>
                <h3 className="mt-5 font-serif text-3xl">{service.title}</h3>
                <p className="mt-4 text-base leading-7 text-muted">{service.description}</p>
                <ul className="mt-7 space-y-3 border-t border-black/8 pt-6 text-sm text-muted">
                  {service.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
                <Link href="#contact" className="mt-8 inline-flex w-fit border-b border-ink pb-2 text-sm uppercase tracking-[0.14em] text-ink transition hover:opacity-70">
                  Start a Conversation →
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pt-24 sm:pt-28">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">How We Think</p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
              Beyond making things look good.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
              We believe the strongest creative work sits at the intersection of product, consumer and business.
            </p>
          </Reveal>

          <div className="grid gap-5">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 90}>
                <article className="surface-warm rounded-[28px] p-6 sm:p-8">
                  <h3 className="font-serif text-3xl">{principle.title}</h3>
                  <p className="mt-4 max-w-xl text-base leading-7 text-muted">{principle.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section-shell pt-24 sm:pt-28">
        <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[34px] border border-black/6 bg-canvas">
              <Image
                src={siteImages.portrait}
                alt="Editorial portrait placeholder for Nihao, founder of NIHAO Studio."
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 36vw"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">About Nihao</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Creative instinct. Analytical mind.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                NIHAO Studio was founded by Nihao, a Singapore-based food creator with an unconventional path into the creative industry.
              </p>
              <p>
                Trained in Finance at the National University of Singapore, she began her career in commodity risk management, a world shaped by analysis, discipline and commercial decision-making.
              </p>
              <p>
                Alongside her professional career, a long-standing obsession with food, restaurants and visual storytelling grew into a leading food-focused presence on Xiaohongshu and collaborations with some of Singapore&apos;s most exciting F&amp;B brands.
              </p>
              <p>Today, she brings those two worlds together: analytical thinking and creative taste.</p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "NUS Finance",
                "Commodity Risk",
                "Food Creator",
                "Brand Creative"
              ].map((item) => (
                <div key={item} className="rounded-full border border-black/10 px-4 py-3 text-sm uppercase tracking-[0.13em] text-muted">
                  {item}
                </div>
              ))}
            </div>

            <blockquote className="mt-10 border-l border-black/10 pl-5 font-serif text-2xl text-ink sm:text-3xl">
              From analysing risk to understanding taste.
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pt-24 sm:pt-28">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">Creator Perspective</p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
              Creator. Observer. Consumer.
            </h2>
            <div className="mt-6 max-w-2xl space-y-5 text-base leading-8 text-muted sm:text-lg">
              <p>
                Years of creating food content have given Nihao a first-hand view of how consumers discover restaurants, respond to products and decide what is worth trying.
              </p>
              <p>That perspective shapes every project at NIHAO Studio.</p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {creatorStats.map((stat) => (
                <div key={stat.label} className="surface-warm rounded-[24px] p-5">
                  <p className="font-serif text-4xl">{stat.value}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.14em] text-muted">{stat.label}</p>
                  <p className="mt-2 text-xs text-muted/80">{stat.note}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {creatorShots.map((shot, index) => (
              <Reveal key={shot} delay={index * 80}>
                <div className="surface-warm rounded-[30px] p-4">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[24px] border border-[rgba(58,34,24,0.08)] bg-[#deccba]">
                    <Image
                      src={shot}
                      alt={`Editable Xiaohongshu content placeholder ${index + 1}.`}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 24vw"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-24 sm:pt-28">
        <Reveal>
          <p className="eyebrow">Selected Clients & Collaborations</p>
          <h2 className="mt-5 font-serif text-4xl sm:text-5xl">Selected Clients &amp; Collaborations</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((client, index) => (
            <Reveal key={client} delay={index * 60}>
              <div className="surface-warm flex min-h-24 items-center justify-center rounded-[22px] px-4 py-6 text-center text-sm uppercase tracking-[0.16em] text-muted">
                {client}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell pb-10 pt-24 sm:pb-14 sm:pt-28">
        <div className="overflow-hidden rounded-[34px] border border-black/8 bg-[#1D1A18] text-ivory">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <Reveal className="px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
              <p className="eyebrow text-ivory/62">Contact</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                {siteConfig.contactHeadline}
              </h2>
              <p className="mt-3 font-serif text-2xl text-ivory/88 sm:text-3xl">{siteConfig.contactSubheadline}</p>
              <p className="mt-6 max-w-xl text-base leading-8 text-ivory/72 sm:text-lg">
                {siteConfig.contactDescription}
              </p>
              <Link href={`mailto:${contactDetails.email}`} className="mt-10 inline-flex border-b border-ivory/80 pb-2 text-sm uppercase tracking-[0.14em] text-ivory transition hover:opacity-70">
                Start a Conversation →
              </Link>

              <div className="mt-10 grid gap-5 border-t border-ivory/12 pt-8 sm:grid-cols-3">
                <div>
                  <p className="eyebrow text-ivory/52">Email</p>
                  <a href={`mailto:${contactDetails.email}`} className="mt-2 block text-sm text-ivory/86 transition hover:text-ivory">
                    {contactDetails.email}
                  </a>
                </div>
                <div>
                  <p className="eyebrow text-ivory/52">Instagram</p>
                  <a href={siteConfig.social.instagramUrl} target="_blank" rel="noreferrer" className="mt-2 block text-sm text-ivory/86 transition hover:text-ivory">
                    {contactDetails.instagram}
                  </a>
                </div>
                <div>
                  <p className="eyebrow text-ivory/52">Xiaohongshu</p>
                  <a href={siteConfig.social.xiaohongshuUrl} target="_blank" rel="noreferrer" className="mt-2 block text-sm text-ivory/86 transition hover:text-ivory">
                    {contactDetails.xiaohongshu}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140} className="relative min-h-[360px] lg:min-h-full">
              <Image
                src={siteImages.cta}
                alt="Closing call to action food image placeholder for NIHAO Studio."
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,23,0.04),rgba(23,23,23,0.35))]" />
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="section-shell border-t border-black/8 py-8 sm:py-10">
        <div className="flex flex-col gap-5 text-sm text-muted md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-2xl text-ink">{siteConfig.brandName}</p>
            <p className="mt-2">{siteConfig.shortLocation}</p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a href={siteConfig.social.instagramUrl} target="_blank" rel="noreferrer" className="link-quiet">
              Instagram
            </a>
            <a href={siteConfig.social.xiaohongshuUrl} target="_blank" rel="noreferrer" className="link-quiet">
              Xiaohongshu
            </a>
            <a href={`mailto:${contactDetails.email}`} className="link-quiet">
              Email
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.14em] text-muted/80">© 2026 {siteConfig.brandName}</p>
      </footer>
    </main>
  );
}
