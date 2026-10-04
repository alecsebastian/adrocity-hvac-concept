"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Arrow, Mark } from "./graphics";

export function Header() {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const listener = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
      if (event.key === "Tab") {
        const links = menuRef.current?.querySelectorAll<HTMLAnchorElement>("a");
        if (!links?.length) return;
        if (!event.shiftKey && document.activeElement === links[links.length - 1]) { event.preventDefault(); menuButton.current?.focus(); }
        if (event.shiftKey && document.activeElement === menuButton.current) { event.preventDefault(); links[links.length - 1].focus(); }
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [open]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="concept-strip"><span>FICTIONAL HVAC COMPANY <span className="strip-dash">/</span> A WEBSITE CONCEPT BY <a href={site.agency}>ADROCITY STUDIOS <span aria-hidden="true">↗</span></a></span><span className="strip-end">GOOD DESIGN. REAL POSSIBILITIES.</span></div>
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Steady Heating & Air home" onClick={() => setOpen(false)}><Mark /><span>STEADY<small>HEATING & AIR</small></span></Link>
      <nav aria-label="Main navigation" className="desktop-nav">{site.navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href || (item.href === "/field-notes" && pathname.startsWith("/field-notes/")) ? "page" : undefined}>{item.label}</Link>)}</nav>
      <a className="header-call" href="#call">Call Steady <span className="demo-tag">DEMO</span><Arrow diagonal /></a>
      <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "×" : "+"}</span></button>
      {open && <nav id="mobile-menu" ref={menuRef} className="mobile-menu" aria-label="Mobile navigation">{site.navigation.map((item, i) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}><small>0{i + 1}</small>{item.label}<Arrow /></Link>)}<a href="#request" onClick={() => setOpen(false)}>Request an assessment<Arrow /></a><p>Columbus & nearby neighborhoods<br />Illustrative hours: {site.hours}</p></nav>}
    </header>
  </>;
}

export function Footer() {
  return <>
    <footer className="site-footer">
      <div className="footer-top"><Link href="/" className="wordmark" aria-label="Steady Heating & Air home"><Mark /><span>STEADY<small>HEATING & AIR</small></span></Link><p>Good air. Steady hands.<br />A little more certainty at home.</p><a href="#main" className="back-top">Back to top <span aria-hidden="true">↑</span></a></div>
      <div className="footer-columns"><div><span className="eyebrow">THE NEIGHBORHOOD</span><p>{site.location} & nearby communities.<br />Illustrative hours: {site.hours}<br />No live service or emergency dispatch.</p></div><nav aria-label="Footer navigation">{site.navigation.slice(1).map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><div><span className="eyebrow">BUILT TO START A CONVERSATION</span><p>This is a fictional company and portfolio concept.<br />No appointments, calls, or leads are collected.</p><a className="text-link" href={site.agency}>Made by Adrocity Studios <Arrow diagonal /></a></div></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} ADROCITY STUDIOS · STEADY IS A FICTIONAL BRAND.</span><a href="#privacy">Privacy & demo details</a><span>THOUGHT THROUGH. BUILT WITH CARE.</span></div>
    </footer>
    <div className="mobile-actions" aria-label="Quick service actions"><a href="#call">Repair call <span>DEMO</span><Arrow diagonal /></a><a href="#request">Plan a new system<Arrow /></a></div>
  </>;
}
