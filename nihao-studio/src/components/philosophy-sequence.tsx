"use client";

import { useEffect, useRef, useState } from "react";

type PhilosophySequenceProps = {
  words: string[];
};

export function PhilosophySequence({ words }: PhilosophySequenceProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap items-center justify-center gap-3 text-center font-serif text-3xl text-ink sm:text-4xl lg:text-5xl">
      {words.map((word, index) => (
        <span
          key={word}
          className={`sequence-word ${active ? "sequence-word-visible" : ""}`.trim()}
          style={{ transitionDelay: `${index * 120}ms` }}
        >
          {word}
          {index < words.length - 1 ? <span className="mx-3 font-sans text-base text-muted/60">→</span> : null}
        </span>
      ))}
    </div>
  );
}
