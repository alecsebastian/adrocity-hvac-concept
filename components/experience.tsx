"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow, Mark } from "./graphics";
import { embedUrl, site } from "@/lib/site";

type Mode = "request" | "call" | "privacy" | null;
type Answers = { service: string; area: string; system: string; issue: string; timeframe: string; contact: string };
const empty: Answers = { service: "", area: "", system: "", issue: "", timeframe: "", contact: "" };

export function Experience() {
  const [mode, setMode] = useState<Mode>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    function sync() { const hash = window.location.hash.slice(1); setMode(hash === "request" || hash === "call" || hash === "privacy" ? hash : null); }
    sync(); window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    if (mode) { if (!dialog.current?.open) opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; dialog.current?.showModal(); title.current?.focus(); document.body.style.overflow = "hidden"; }
    else { dialog.current?.close(); document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [mode]);
  function close() { window.history.replaceState(null, "", window.location.pathname + window.location.search); dialog.current?.close(); setMode(null); requestAnimationFrame(() => { if (opener.current?.isConnected) opener.current.focus({ preventScroll: true }); }); }
  return <dialog ref={dialog} className="experience-dialog" aria-labelledby="experience-title" onKeyDown={event => {
    if (event.key !== "Tab") return;
    const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]')).filter(element => element.getClientRects().length > 0);
    const first = elements[0]; const last = elements[elements.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === title.current || document.activeElement === stepTitleFallback())) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    function stepTitleFallback() { return dialog.current?.querySelector('.step-title, .preview-success h3'); }
  }} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close(); } }}>
    {mode && <div className="dialog-inner"><div className="dialog-top"><span className="eyebrow"><Mark />STEADY / {mode === "request" ? "A CLEARER NEXT STEP" : "CONCEPT PREVIEW"}</span><button className="close-dialog" onClick={close} aria-label="Close dialog">×</button></div>
      <h2 id="experience-title" ref={title} tabIndex={-1}>{mode === "request" ? "Start with your home." : mode === "call" ? "A real person.\nOne direct call." : "A concept, clearly."}</h2>
      {mode === "call" && <div className="call-preview"><p className="dialog-lead">On a real Steady website, this action would call the crew’s verified phone number.</p><div className="call-demo-box"><span className="eyebrow">CALL PREVIEW / NO NUMBER IS DIALED</span><p>“Tell us what’s happening.<br />We’ll talk through the next step.”</p><span>ILLUSTRATIVE DISPATCH GREETING</span></div><dl className="call-details"><div><dt>Example service area</dt><dd>Columbus & nearby neighborhoods</dd></div><div><dt>Illustrative office hours</dt><dd>{site.hours}</dd></div><div><dt>Availability</dt><dd>No live service, dispatch, or emergency coverage</dd></div></dl><p className="small-note">Steady is fictional. If you need service, contact an actual local contractor. For immediate danger, contact emergency services.</p><button className="button button-dark" onClick={close}>Got it <Arrow /></button><a className="text-link" href="#request">Planning ahead? Explore the assessment preview <Arrow /></a></div>}
      {mode === "privacy" && <div className="privacy-copy"><p>This website is a portfolio concept by Adrocity Studios. Steady Heating & Air is a fictional company, not an operating contractor.</p><h3>Your answers stay in this preview.</h3><p>The default assessment runs in temporary page memory. It does not submit, email, save to browser storage, or send your answers to analytics. Closing the preview clears your answers. Please use sample details.</p><h3>No claims disguised as proof.</h3><p>Service areas, office hours, crew descriptions, and work scenarios are illustrative. Photography is AI-generated. There are no real reviews, certifications, completed jobs, or live booking promises.</p><h3>External links and hosting.</h3><p>Visiting Adrocity Studios leaves this concept. A hosting provider may process ordinary access logs. If a verified external inquiry embed is configured later, it is identified before loading and its privacy terms apply.</p><a className="text-link" href={site.agency}>Visit Adrocity Studios <Arrow diagonal /></a></div>}
      {mode === "request" && <RequestFlow />}
    </div>}
  </dialog>;
}

function RequestFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ ...empty });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState(false);
  const [external, setExternal] = useState(false);
  const stepTitle = useRef<HTMLHeadingElement>(null);
  const content = useRef<HTMLDivElement>(null);
  function update(key: keyof Answers, value: string) { setAnswers(prev => ({ ...prev, [key]: value })); setErrors(prev => { const next = { ...prev }; delete next[key]; return next; }); }
  function move(next: number) { setStep(next); setErrors({}); requestAnimationFrame(() => { stepTitle.current?.focus(); content.current?.scrollIntoView({ block: "nearest" }); }); }
  function next() {
    const required: (keyof Answers)[] = step === 0 ? ["service"] : step === 1 ? ["area", "system"] : ["timeframe", "contact"];
    const problems: Record<string, string> = {};
    required.forEach(key => { if (!answers[key]) problems[key] = "Choose an option to continue."; });
    setErrors(problems);
    if (Object.keys(problems).length) { requestAnimationFrame(() => content.current?.querySelector<HTMLElement>("fieldset[aria-invalid='true'] input, select[aria-invalid='true']")?.focus()); return; }
    move(step + 1);
  }
  function reset() { setAnswers({ ...empty }); setSummary(false); move(0); }
  const select = (key: keyof Answers, label: string, options: string[]) => <div className="form-field"><label htmlFor={key}>{label} <span>(required)</span></label><select id={key} value={answers[key]} onChange={e => update(key, e.target.value)} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined}><option value="">Select an option</option>{options.map(option => <option key={option}>{option}</option>)}</select>{errors[key] && <p className="field-error" id={`${key}-error`}>{errors[key]}</p>}</div>;
  if (external && embedUrl) return <ExternalForm url={embedUrl} onBack={() => setExternal(false)} />;
  return <div ref={content} className="request-flow">
    <p className="demo-notice"><b>LOCAL PREVIEW</b> Use sample details. Nothing is sent or saved. This does not book service.</p>
    {step < 3 ? <>
      <div className="form-progress" aria-label={`Step ${step + 1} of 3`}><span>0{step + 1} / 03</span>{[0, 1, 2].map(i => <i key={i} className={i <= step ? "complete" : ""} />)}<span>{["THE REASON", "THE HOME", "THE NEXT STEP"][step]}</span></div>
      <h3 ref={stepTitle} tabIndex={-1} className="step-title">{["What brings you here?", "A little context goes a long way.", "How would a callback work best?"][step]}</h3>
      <form noValidate onSubmit={event => { event.preventDefault(); next(); }}>
        {step === 0 && <><fieldset className="choice-group" aria-invalid={!!errors.service} aria-describedby={errors.service ? "service-error" : undefined}><legend>Type of service <span>(required)</span></legend>{[{ value: "Replacement", title: "I’m considering a new system.", detail: "Compare options and plan an assessment." }, { value: "Repair", title: "Something isn’t working right.", detail: "Explain the issue and explore the repair path." }, { value: "Maintenance", title: "I want to look after my system.", detail: "Plan a check of the equipment you have." }].map(item => <label key={item.value} className={`choice ${answers.service === item.value ? "selected" : ""}`}><input type="radio" name="service" value={item.value} checked={answers.service === item.value} onChange={() => update("service", item.value)} aria-describedby={errors.service ? "service-error" : undefined} /><span><b>{item.title}</b><small>{item.detail}</small></span><Arrow /></label>)}{errors.service && <p id="service-error" className="field-error">{errors.service}</p>}</fieldset>{answers.service === "Repair" && <div className="urgent-branch"><b>Need help sooner?</b><p>A call is the faster route for an urgent repair. This concept has no live dispatch.</p><a href="#call" className="text-link">Explore the repair call demo <Arrow /></a></div>}</>}
        {step === 1 && <>{select("area", "Where is the home?", [...site.areas, "Elsewhere around Columbus", "Outside the example service area"])}{answers.area === "Outside the example service area" && <p className="inline-note">On a real site, the crew would confirm coverage before arranging a visit. You can still explore this demo.</p>}{select("system", "What system do you have?", ["Furnace & central AC", "Heat pump", "Ductless system", "Something else", "I’m not sure"])}<div className="form-field"><label htmlFor="issue">{answers.service === "Replacement" ? "What would you like to improve?" : answers.service === "Repair" ? "What have you noticed?" : "Anything you want the crew to look at?"} <span>(optional)</span></label><textarea id="issue" rows={3} maxLength={500} value={answers.issue} onChange={e => update("issue", e.target.value)} placeholder="Example: the upstairs is warmer than the rest of the house." aria-describedby="issue-help" /><small id="issue-help">Sample details only. No address, phone number, or personal information.</small></div></>}
        {step === 2 && <>{select("timeframe", "When are you thinking?", ["As soon as practical", "Within the next month", "Planning for the coming season", "Just exploring"])}{select("contact", "Preferred callback window", ["Phone · weekday morning", "Phone · weekday afternoon", "Email · when convenient", "No preference"])}<div className="inline-note"><b>No contact details needed here.</b><p>A real form would securely ask for the contact information needed to reply. This preview stops before collecting it.</p></div><p className="small-note">A request starts a conversation. It does not confirm an appointment, price, or availability.</p></>}
        <div className="form-actions">{step > 0 && <button type="button" className="text-link" onClick={() => move(step - 1)}>← Back</button>}<button className="button button-dark" type="submit">{step === 2 ? "Finish the preview" : "Continue"}<Arrow /></button></div>
      </form>
      {embedUrl && <div className="external-choice"><p>A configured external form is also available. It may send information to the form provider under its own privacy terms.</p><button className="text-link" onClick={() => setExternal(true)}>Open the connected form <Arrow /></button></div>}
    </> : <div className="preview-success"><span className="success-mark" aria-hidden="true">✓</span><h3 ref={stepTitle} tabIndex={-1}>That’s a clearer starting point.</h3><p>You’ve completed the demo. <b>No request was submitted and no callback is scheduled.</b> On a real site, the crew could use this context to prepare for the conversation.</p><div className="your-preview"><span className="eyebrow">YOUR TEMPORARY PREVIEW</span><dl><div><dt>Service</dt><dd>{answers.service}</dd></div><div><dt>Area</dt><dd>{answers.area}</dd></div><div><dt>System</dt><dd>{answers.system}</dd></div><div><dt>Timeframe</dt><dd>{answers.timeframe}</dd></div><div><dt>Callback</dt><dd>{answers.contact}</dd></div>{answers.issue && <div><dt>Context</dt><dd>{answers.issue}</dd></div>}</dl></div><button className="button button-dark" onClick={() => setSummary(!summary)} aria-expanded={summary} aria-controls="owner-summary">{summary ? "Hide" : "See"} a sample owner handoff<Arrow /></button>{summary && <div id="owner-summary" className="owner-summary"><span className="eyebrow">ADROCITY LEAD QUALIFIER / FICTIONAL SAMPLE</span><h4>A useful call, before it starts.</h4><p>This fixed example uses fictional sample details, not your answers.</p><dl><div><dt>Request</dt><dd>Replacement assessment · Worthington</dd></div><div><dt>Existing setup</dt><dd>Furnace & central AC; age unknown</dd></div><div><dt>Homeowner’s priority</dt><dd>Upstairs feels warmer; wants to compare repair and replacement.</dd></div><div><dt>Timing</dt><dd>Planning for the coming season</dd></div><div><dt>Follow-up</dt><dd>Phone · weekday afternoon</dd></div></dl><p><b>Useful first question:</b> “Has the upstairs always felt warmer, or is this a recent change?”</p><small>Service-area coverage and availability still need confirmation.</small></div>}<button className="text-link reset-preview" onClick={reset}>Reset and try another path <span aria-hidden="true">↺</span></button></div>}
    <p className="powered-by">THOUGHTFUL INQUIRIES, POWERED BY <a href={site.agency}>ADROCITY STUDIOS <span aria-hidden="true">↗</span></a></p>
  </div>;
}

function ExternalForm({ url, onBack }: { url: string; onBack: () => void }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  useEffect(() => { const timer = setTimeout(() => setStatus(current => current === "loading" ? "error" : current), 15000); return () => clearTimeout(timer); }, []);
  return <div className="external-form"><p>This is an external Adrocity Lead Qualifier form. The provider’s privacy terms apply. Only submit if you intend to share your information.</p><a href={url} target="_blank" rel="noreferrer" className="text-link">Open form in a new tab <Arrow diagonal /></a><p role="status">{status === "loading" ? "Loading the connected form…" : status === "error" ? "The form could not be confirmed as loaded. Open it in a new tab or return to the local preview." : "Connected form loaded. If the provider blocks embedding, use the new-tab link."}</p><iframe title="Adrocity Lead Qualifier inquiry form" src={url} onLoad={() => setStatus("loaded")} onError={() => setStatus("error")} referrerPolicy="strict-origin-when-cross-origin" /><button className="text-link" onClick={onBack}>← Return to the local preview</button></div>;
}

