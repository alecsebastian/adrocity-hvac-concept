export const site = {
  name: "Steady",
  descriptor: "Heating & Air",
  location: "Columbus, Ohio",
  hours: "Mon–Fri, 8am–5pm ET",
  agency: "https://adrocitystudios.com",
  areas: ["Clintonville", "Worthington", "Upper Arlington", "Grandview Heights", "Dublin", "Westerville"],
  navigation: [
    { href: "/", label: "Home" },
    { href: "/repairs", label: "Repairs" },
    { href: "/new-systems", label: "New systems" },
    { href: "/crew", label: "The crew & area" },
    { href: "/field-notes", label: "Field notes" },
  ],
};
export const embedUrl = (() => {
  const raw = process.env.NEXT_PUBLIC_LEAD_QUALIFIER_EMBED_URL;
  if (!raw) return null;
  try { const url = new URL(raw); return url.protocol === "https:" ? url.href : null; } catch { return null; }
})();
export function pageMetadata(title: string, description: string, path: string) {
  return {
    title, description,
    alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: path } : undefined,
    openGraph: { title: `${title} | Steady Heating & Air`, description, type: "website" as const },
    twitter: { card: "summary" as const, title: `${title} | Steady Heating & Air`, description },
  };
}
