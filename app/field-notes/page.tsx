import Link from "next/link";
import { ClosingCTA, Eyebrow } from "@/components/editorial";
import { AirDial, Arrow, Mark } from "@/components/graphics";
import { articles } from "@/content/articles";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("Field notes for a better-informed home", "Plainspoken articles about HVAC repair, replacement, and useful conversations with your technician. A fictional Steady concept.", "/field-notes");
export default function FieldNotes() { return <>
  <section className="journal-hero page-gutter"><Eyebrow>04 / NOTES FROM THE WORK</Eyebrow><h1>FIELD NOTES<span className="journal-asterisk" aria-hidden="true">✳</span></h1><div><p>A little know-how.<br />A better conversation about your home.</p><span>THE STEADY JOURNAL<br />PRACTICAL, BY DESIGN.</span></div></section>
  <section className="journal-index page-gutter"><h2 className="sr-only">All field notes</h2>{articles.map((article, i) => <article key={article.slug} className="journal-index-row"><Link href={`/field-notes/${article.slug}`} className={`journal-index-art journal-art-${i}`} aria-label={`Read ${article.title}`}>{i === 0 ? <><span>REPAIR<br /><em>OR</em><br />REPLACE?</span><AirDial small /></> : <><Mark /><span>START<br />WITH WHAT<br />YOU NOTICE.</span><span className="index-art-rule" /></>}</Link><div><span className="eyebrow">FIELD NOTE / 0{i + 1} · {article.category}</span><h2><Link href={`/field-notes/${article.slug}`}>{article.title}</Link></h2><p>{article.intro}</p><div className="article-index-bottom"><span>{article.readTime}</span><Link className="text-link" href={`/field-notes/${article.slug}`}>Read the field note <Arrow diagonal /></Link></div></div></article>)}</section>
  <div className="editorial-disclaimer page-gutter"><p>Written for this fictional concept. General information, not a diagnosis or a substitute for a qualified technician’s assessment of your home.</p></div>
  <ClosingCTA />
</>; }
