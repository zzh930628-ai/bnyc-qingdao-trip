"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isScrolled ? "border-b border-black/6 bg-ivory/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link href="#top" className="font-serif text-2xl tracking-[0.08em] text-ink transition-opacity hover:opacity-70">
            NIHAO Studio
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="link-quiet">
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-ink md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span className={`block h-px bg-current transition-transform duration-300 ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-px bg-current transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-current transition-transform duration-300 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[#171717]/25 backdrop-blur-sm transition-all duration-300 md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed inset-x-5 top-20 z-50 rounded-[28px] border border-black/8 bg-ivory p-6 shadow-soft transition-all duration-300 md:hidden ${
          isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-5 text-lg text-ink">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="border-b border-black/8 pb-3">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
