import type { CSSProperties } from "react";

export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return <svg className={`arrow ${className}`} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.8" /></svg>;
}
export function Mark({ className = "" }: { className?: string }) {
  return <svg className={className} width="39" height="39" viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M10 49V28a22 22 0 0 1 44 0v21M22 49V28a10 10 0 0 1 20 0v21M4 50h56" stroke="currentColor" strokeWidth="7" /></svg>;
}
export function AirDial({ small = false }: { small?: boolean }) {
  return <div className={`air-dial ${small ? "air-dial-small" : ""}`} aria-hidden="true">
    <svg viewBox="0 0 400 400" className="dial-art">
      <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="1" />
      {Array.from({ length: 60 }, (_, i) => <line key={i} x1="200" y1="19" x2="200" y2={i % 5 === 0 ? "38" : "27"} stroke="currentColor" strokeWidth={i % 5 === 0 ? "2" : "1"} transform={`rotate(${i * 6} 200 200)`} />)}
      {[0, 1, 2, 3].map(i => <path key={i} d={`M${96 + i * 27} 297V163a${104 - i * 27} ${104 - i * 27} 0 0 1 ${208 - i * 54} 0v134`} fill="none" stroke="currentColor" strokeWidth="10" />)}
      <path d="M79 299h242" stroke="currentColor" strokeWidth="10" />
      <circle cx="200" cy="329" r="4" fill="currentColor" />
    </svg>
    <span className="dial-caption">A BETTER WAY<br />TO FEEL AT HOME.</span>
  </div>;
}
export function RouteLine({ className = "" }: { className?: string }) {
  return <svg className={`route-line ${className}`} viewBox="0 0 900 180" fill="none" preserveAspectRatio="none" aria-hidden="true">{[0, 1, 2, 3].map(i => <path key={i} d={`M0 ${30 + i * 22}H290c100 0 85 75 185 75H900`} stroke="currentColor" strokeWidth="3" />)}</svg>;
}
export function ServiceAreaGraphic() {
  return <div className="area-graphic" aria-label="Illustrative service area centered on Columbus; not a navigational map" role="img">
    <div className="area-orbit orbit-one" /><div className="area-orbit orbit-two" /><div className="area-orbit orbit-three" />
    <span className="area-center"><Mark /><b>COLUMBUS</b><small>THE HOME BASE</small></span>
    {[{ n: "Dublin", x: 18, y: 23 }, { n: "Worthington", x: 49, y: 14 }, { n: "Westerville", x: 79, y: 25 }, { n: "Clintonville", x: 71, y: 48 }, { n: "Upper Arlington", x: 23, y: 62 }, { n: "Grandview", x: 51, y: 81 }].map(area => <span key={area.n} className="map-label" style={{ "--x": `${area.x}%`, "--y": `${area.y}%` } as CSSProperties}><i />{area.n}</span>)}
    <span className="map-caption">ILLUSTRATIVE GEOGRAPHY / NOT TO SCALE</span>
  </div>;
}
