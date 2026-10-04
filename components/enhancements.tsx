"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Arrow, Mark } from "./graphics";

export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

export function ContactNudge() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed || visible) return;
    const onScroll = () => {
      if (window.scrollY > Math.max(520, window.innerHeight * 0.8)) setVisible(true);
    };
    const timer = window.setTimeout(() => setVisible(true), 12000);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, [dismissed, visible]);

  if (!visible || dismissed) return null;
  return <aside className="contact-nudge" aria-label="Customize this website">
    <button type="button" className="nudge-close" onClick={() => setDismissed(true)} aria-label="Dismiss design inquiry">×</button>
    <Mark />
    <p className="nudge-eyebrow">AN ADROCITY STUDIOS CONCEPT</p>
    <h2>Like the design?</h2>
    <p>Customize this site to stand apart from your competitors.</p>
    <a href="mailto:alec@adrocitystudios.com?subject=Steady%20website%20concept" className="button button-lime">Contact now! <Arrow diagonal /></a>
  </aside>;
}
