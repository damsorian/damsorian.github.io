// Genera el sitio estático desde src/content.mjs:
//   index.html (inglés), es/index.html (español), cristian-urbano.md y es/cristian-urbano.md.
// Todo el contenido queda en el HTML, legible sin JavaScript (buscadores y agentes de IA).
// Uso: node src/build.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, COPY } from "./content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const LANGS = { en: "/", es: "/es/" };

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const CSS = `
:root{--ground:#f5f2ed;--ground-alt:#efece6;--ink:#161c2b;--ink-2:#303749;--ink-body:#3f4657;--muted:#535a6a;--subtle:#5d6474;--accent:#a6552e;--accent-strong:#833f1f;
--line:rgba(22,28,43,.1);--peach:#f2cf9e;--mint:#a9d6cf;--sky:#8fb9d6;--sand:#c7baa0;--cream:#f6efe6;
--display:"Space Grotesk",system-ui,sans-serif;--sans:"Instrument Sans",system-ui,sans-serif;--mono:"JetBrains Mono",ui-monospace,Menlo,monospace;color-scheme:light}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:var(--ground);font-family:var(--sans);color:var(--ink);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:var(--accent);text-decoration:none}
a:hover{color:var(--accent-strong)}
::selection{background:var(--mint)}
h1,h2,h3,p,ul{margin:0}
ul{padding:0;list-style:none}
.mono{font-family:var(--mono)}
.disp{font-family:var(--display)}
a:focus-visible,button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.skip{position:absolute;left:-9999px;top:8px;z-index:200;background:var(--ink);color:var(--ground);padding:8px 14px;border-radius:6px}
.skip:focus{left:8px;color:var(--ground)}
.wrap{max-width:1180px;margin:0 auto;padding-left:40px;padding-right:40px}

/* Barra superior */
.top{position:sticky;top:0;z-index:20;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);background:rgba(245,242,237,.72);border-bottom:1px solid rgba(22,28,43,.08)}
.top .wrap{display:flex;justify-content:space-between;align-items:center;padding-top:15px;padding-bottom:15px;gap:12px}
.wordmark{font-family:var(--mono);font-size:14px;font-weight:600;color:var(--ink);white-space:nowrap}
.wordmark span{color:var(--accent)}
.tools{display:flex;align-items:center;gap:11px;font-family:var(--mono);font-size:13px}
.lang{display:flex;border:1px solid rgba(22,28,43,.2);border-radius:6px;overflow:hidden}
.lang a{padding:5px 11px;font-size:12px;font-weight:600;color:var(--ink)}
.lang a[aria-current="page"]{background:var(--ink);color:var(--ground)}
.tbtn{display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(22,28,43,.2);border-radius:6px;padding:5px 11px;font-size:12px;font-weight:600;background:none;color:var(--ink);cursor:pointer;font-family:inherit}
.tbtn:hover{background:rgba(22,28,43,.06);color:var(--ink)}
.mdi{display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;border-radius:3px;background:var(--ink);color:var(--ground);font-size:9px;font-weight:700}
.mdi small{font-size:8px}

/* Portada */
.hero{position:relative;overflow:hidden}
.layer{position:absolute;inset:0}
.hero .mesh{background:radial-gradient(52% 90% at 10% 10%,var(--peach) 0%,rgba(242,207,158,0) 55%),radial-gradient(56% 100% at 92% 0%,var(--mint) 0%,rgba(169,214,207,0) 58%),radial-gradient(60% 110% at 82% 120%,var(--sky) 0%,rgba(143,185,214,0) 55%),radial-gradient(52% 100% at 18% 130%,var(--sand) 0%,rgba(199,186,160,0) 55%),radial-gradient(46% 80% at 55% 45%,var(--cream) 0%,rgba(246,239,230,0) 60%),var(--ground)}
.noise{background-image:${NOISE};opacity:.14;mix-blend-mode:multiply}
.dots{background-image:radial-gradient(rgba(22,28,43,.13) 1px,transparent 1px);background-size:26px 26px;mix-blend-mode:multiply}
.hero-in{position:relative;max-width:860px;margin:0 auto;display:flex;flex-direction:column;align-items:center;text-align:center;padding:52px 40px 64px}
.avatar{width:104px;height:104px;border-radius:50%;overflow:hidden;margin-bottom:22px;box-shadow:0 10px 34px rgba(22,28,43,.16)}
.avatar img{display:block;width:100%;height:100%;object-fit:cover;-webkit-mask-image:radial-gradient(circle at 50% 45%,#000 60%,transparent 90%);mask-image:radial-gradient(circle at 50% 45%,#000 60%,transparent 90%)}
.chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:22px;font-family:var(--mono)}
.chips li{background:rgba(22,28,43,.06);border:1px solid rgba(22,28,43,.14);border-radius:99px;padding:6px 13px;font-size:12px;color:var(--ink-body)}
h1{font-family:var(--display);font-weight:600;font-size:58px;line-height:1.05;letter-spacing:-.025em;margin:0 0 18px;text-wrap:balance;max-width:17ch}
h1 .acc{color:var(--accent);white-space:nowrap}
h1.stack{max-width:24ch}
h1.stack .line{display:block}
.lead{font-size:18px;line-height:1.6;color:var(--muted);max-width:58ch;margin:0 0 28px;text-wrap:pretty}
.ctas{display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:center}
.btn{display:inline-flex;align-items:center;gap:9px;padding:14px 22px;border-radius:8px;font-family:var(--mono);font-size:14px;font-weight:600}
.btn .arr{opacity:.6}
.btn-out{border:1px solid rgba(22,28,43,.25);color:var(--ink);font-weight:500}
.btn-out:hover{background:rgba(22,28,43,.07);color:var(--ink)}
.btn-dark{background:var(--ink);color:var(--ground);padding:14px 26px}
.btn-dark:hover{background:var(--ink-2);color:var(--ground)}
.loc{margin-top:22px;font-family:var(--mono);font-size:12.5px;color:var(--subtle);display:inline-flex;align-items:center;gap:6px}

/* Cifras */
.stats-band{border-top:1px solid rgba(22,28,43,.08);border-bottom:1px solid rgba(22,28,43,.08);background:rgba(255,255,255,.45)}
.stats{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr)}
.stat{padding:26px 40px;border-right:1px solid rgba(22,28,43,.08)}
.stat:last-child{border-right:0}
.stat-top{display:flex;align-items:baseline;flex-wrap:wrap;column-gap:5px}
.stat-num{font-family:var(--display);font-size:38px;font-weight:600;letter-spacing:-.02em}
.stat-unit{font-family:var(--mono);font-size:13px;color:var(--ink-body)}
.stat-label{font-family:var(--display);font-size:17px;font-weight:500;color:var(--ink);margin-top:2px}

/* Roles, skills y stack */
.cols{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.05fr 1fr;gap:64px;padding:76px 40px 80px}
.cols>section{min-width:0}
.sec-title{font-family:var(--mono);font-size:34px;font-weight:700;letter-spacing:-.03em;line-height:1.1;margin:0 0 8px;color:var(--ink)}
.sec-title .sl{color:var(--accent)}
.sec-sub{font-family:var(--display);font-size:19px;font-weight:500;letter-spacing:-.01em;line-height:1.35;color:var(--muted);margin:0 0 32px}
.role{padding:22px 0;border-bottom:1px solid var(--line)}
.role:first-child{padding-top:0}
.role:last-child{border-bottom:0;padding-bottom:0}
.role h3{font-family:var(--display);font-size:20px;font-weight:600;letter-spacing:-.01em}
.tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px;font-family:var(--mono)}
.tags li{font-size:11px;color:var(--subtle);border:1px solid rgba(22,28,43,.16);border-radius:6px;padding:3px 9px;white-space:nowrap}
.role p{font-size:15px;color:var(--ink-body);margin-top:12px;line-height:1.65;max-width:62ch;text-wrap:pretty}
.groups{display:flex;flex-direction:column;gap:28px}
.groups h3{font-family:var(--mono);font-size:16px;color:var(--accent);font-weight:600;margin-bottom:12px}
.cl{display:flex;flex-wrap:wrap;gap:8px;font-family:var(--mono)}
.cl li{border:1px solid rgba(22,28,43,.2);border-radius:7px;padding:8px 13px;font-size:12.5px}
.sec-title.next{margin-top:56px}

/* Contacto */
.contact{position:relative;overflow:hidden}
.contact .mesh{background:radial-gradient(60% 120% at 15% 0%,var(--mint) 0%,rgba(169,214,207,0) 55%),radial-gradient(55% 120% at 85% 100%,var(--peach) 0%,rgba(242,207,158,0) 55%),radial-gradient(50% 110% at 60% 120%,var(--sky) 0%,rgba(143,185,214,0) 55%),var(--ground-alt)}
.contact .dots{background-image:radial-gradient(rgba(22,28,43,.1) 1px,transparent 1px)}
.contact-in{position:relative;padding-top:72px;padding-bottom:72px;display:flex;justify-content:space-between;align-items:flex-end;gap:40px;flex-wrap:wrap}
.contact .sec-title{font-size:18px;margin-bottom:16px}
.contact-h{font-family:var(--display);font-size:44px;font-weight:600;line-height:1.05;letter-spacing:-.025em;max-width:22ch}
.contact .links{display:flex;gap:10px;flex-wrap:wrap}
.contact .btn{padding:13px 24px}
.foot{position:relative;border-top:1px solid var(--line)}
.foot .wrap{padding-top:20px;padding-bottom:20px;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;font-family:var(--mono);font-size:12.5px;color:var(--subtle)}
.foot .loc{margin:0;gap:5px}

/* Markdown */
dialog.md{width:min(840px,calc(100vw - 32px));height:86vh;padding:0;display:none;flex-direction:column;background:#12161f;border:1px solid rgba(255,255,255,.09);border-radius:16px;box-shadow:0 40px 120px rgba(0,0,0,.5);overflow:hidden;color:#c3c9d6}
dialog.md[open]{display:flex}
dialog.md::backdrop{background:rgba(15,14,18,.55);backdrop-filter:blur(6px)}
.md-bar{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);font-family:var(--mono)}
.md-name{display:flex;align-items:center;gap:10px;font-size:13px;color:#8a91a1}
.md-dots{display:flex;gap:6px}
.md-dots i{width:11px;height:11px;border-radius:50%;background:#ff5f56}
.md-dots i:nth-child(2){background:#ffbd2e}
.md-dots i:nth-child(3){background:#27c93f}
.md-name b{color:#c3c9d6;font-weight:400}
.md-act{display:flex;align-items:center;gap:9px;font-size:12px}
.md-act button,.md-act a{display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1px solid rgba(255,255,255,.14);border-radius:7px;padding:6px 13px;font-weight:600;background:none;color:#e8ebf2;cursor:pointer;font-family:inherit;font-size:12px}
.md-act .x{width:30px;height:30px;padding:0;font-size:15px}
.md-act button:hover,.md-act a:hover{background:rgba(255,255,255,.07);color:#e8ebf2}
dialog.md pre{margin:0;flex:1;overflow:auto;padding:26px 30px;font-family:var(--mono);font-size:13px;line-height:1.75;white-space:pre-wrap;word-break:break-word}

@media (max-width:860px){
  .wrap,.hero-in,.cols{padding-left:20px;padding-right:20px}
  .stat{padding:20px 16px}
  .stat-num{font-size:30px}
  .stat-label{font-size:14px}
  .cols{grid-template-columns:1fr;gap:56px}
  h1{font-size:40px}
  .sec-title{font-size:28px}
  .sec-sub{font-size:17px}
  .contact-h{font-size:34px}
}
@media (max-width:640px){
  .stat{padding:16px 10px}
  .stat-num{font-size:24px}
  .stat-unit{font-size:10px}
  .stat-label{font-size:12px;line-height:1.25}
}
@media (max-width:480px){
  .md-label,.pdf-pre{display:none}
  .tools{gap:6px}
  .lang a,.tbtn{padding:5px 8px}
  .stat{padding:14px 8px}
  .stat-num{font-size:20px}
  .stat-unit{font-size:9px}
  .stat-label{font-size:11px}
}
`;

const ICON_DL = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>`;
const ICON_PIN = s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
const ext = `target="_blank" rel="noopener noreferrer"`;

function markdown(t) {
  const m = t.mdFile;
  const roles = t.roles.map(r => `### ${r.title}\n*${m.where}:* ${r.where.join(", ")}\n${r.desc}`).join("\n\n");
  const groups = list => list.map(k => `**${k.name}:** ${k.chips.join(", ")}`).join("\n\n");
  return `# ${SITE.name}
> ${m.tagline}

**${m.role}:** ${t.heroChips.join(", ")}
**${m.location}:** ${SITE.location}
**${m.links}:** [LinkedIn](${SITE.linkedin}) · [GitHub](${SITE.github})

${t.heroText}

## ${m.glance}
- **${t.stats[0].num} ${t.stats[0].unit}** ${m.yearsEng}
- **${t.stats[1].num} ${t.stats[1].unit}** ${m.yearsLead}
- **${t.stats[2].num} ${t.stats[2].unit}** ${m.yearsAI}
- **${m.languages}:** ${m.langVal}

## ${m.roles}

${roles}

## ${m.skills}

${groups(t.skills)}

## ${m.stackTitle}

${groups(t.stack)}

## ${m.contact}
${m.contactText}
- LinkedIn — ${SITE.linkedin}
- GitHub — ${SITE.github}
`;
}

const today = new Date().toISOString().slice(0, 10);
const uniq = a => [...new Set(a)];

function jsonld(lang) {
  const t = COPY[lang], url = SITE.url + LANGS[lang];
  const person = {
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.name,
    givenName: "Cristian",
    familyName: "Urbano",
    jobTitle: t.heroChips,
    description: t.heroText,
    image: `${SITE.url}/assets/cristian-urbano-512.jpg`,
    url: `${SITE.url}/`,
    sameAs: [SITE.linkedin, SITE.github],
    address: { "@type": "PostalAddress", addressLocality: "San Carlos de Bariloche", addressRegion: "Río Negro", addressCountry: "AR" },
    knowsLanguage: ["es", "en"],
    knowsAbout: uniq(COPY.en.skills.flatMap(k => k.chips).concat(COPY.en.stack.find(k => k.name === "ai").chips)),
  };
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": url,
    url,
    name: t.meta.title,
    description: t.meta.description,
    inLanguage: lang,
    dateModified: today,
    mainEntity: person,
  };
}

function page(lang) {
  const t = COPY[lang], base = LANGS[lang], url = SITE.url + base;
  const h = t.h1;
  const h1 = h.stack
    ? `<h1 class="stack">${esc(h.a)}<span class="line"><span class="acc">${esc(h.accent)}</span>${esc(h.c)}</span><span class="line">${esc(h.d)}</span></h1>`
    : `<h1>${esc(h.a)}<span class="acc">${esc(h.accent)}</span>${esc(h.c)}</h1>`;
  const groups = list => `<div class="groups">${list.map(k => `<div><h3>${esc(k.name)}</h3><ul class="cl">${k.chips.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>`).join("")}</div>`;
  const alt = Object.entries(LANGS).map(([l, p]) => `<link rel="alternate" hreflang="${l}" href="${SITE.url}${p}">`).join("\n") + `\n<link rel="alternate" hreflang="x-default" href="${SITE.url}/">`;
  const skipLabel = lang === "es" ? "Ir al contenido" : "Skip to content";

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(t.meta.title)}</title>
<meta name="description" content="${esc(t.meta.description)}">
<link rel="canonical" href="${url}">
${alt}
<meta property="og:type" content="profile">
<meta property="og:title" content="${esc(t.meta.title)}">
<meta property="og:description" content="${esc(t.meta.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${t.meta.ogLocale}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="profile:first_name" content="Cristian">
<meta property="profile:last_name" content="Urbano">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f5f2ed">
<link rel="alternate" type="text/markdown" href="${url}cristian-urbano.md" title="${esc(t.mdTitle)}">
<script type="application/ld+json">${JSON.stringify(jsonld(lang))}</script>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap">
<style>${CSS.trim()}</style>
</head>
<body>
<a class="skip" href="#main">${skipLabel}</a>
<header class="top">
  <div class="wrap">
    <a class="wordmark" href="${base}"><span>~/</span>cristian-urbano</a>
    <nav class="tools" aria-label="${lang === "es" ? "Idioma y descargas" : "Language and downloads"}">
      <div class="lang">${Object.entries(LANGS).map(([l, p]) => `<a href="${p}" hreflang="${l}" lang="${l}" data-lang="${l}"${l === lang ? ` aria-current="page"` : ""} aria-label="${l === "es" ? "Español" : "English"}">${l.toUpperCase()}</a>`).join("")}</div>
      <a class="tbtn" href="/cristian-urbano-${lang}.pdf" download="Cristian-Urbano-CV-${lang.toUpperCase()}.pdf" title="${esc(t.pdfTitle)}">${ICON_DL}<span><span class="pdf-pre">${esc(t.pdfPre)} </span>${esc(t.pdfWord)}</span></a>
      <a class="tbtn" id="md-open" href="${base}cristian-urbano.md" type="text/markdown" title="${esc(t.mdTitle)}"><span class="mdi" aria-hidden="true">M<small>↓</small></span><span class="md-label">Markdown</span></a>
    </nav>
  </div>
</header>

<main id="main">
<section class="hero" id="about">
  <div class="layer mesh" aria-hidden="true"></div><div class="layer noise" aria-hidden="true"></div><div class="layer dots" aria-hidden="true"></div>
  <div class="hero-in">
    <div class="avatar"><img src="/assets/cristian-urbano.jpg" width="104" height="104" alt="${SITE.name}" fetchpriority="high"></div>
    <ul class="chips">${t.heroChips.map(c => `<li>${esc(c)}</li>`).join("")}</ul>
    ${h1}
    <p class="lead">${esc(t.heroText)}</p>
    <div class="ctas">
      <a class="btn btn-out" href="${SITE.github}" ${ext}>/github <span class="arr" aria-hidden="true">↗</span></a>
      <a class="btn btn-dark" href="${SITE.linkedin}" ${ext}>/linkedin <span class="arr" aria-hidden="true">↗</span></a>
    </div>
    <div class="loc">${ICON_PIN(12)}${SITE.location}</div>
  </div>
</section>

<section class="stats-band" aria-label="${esc(t.mdFile.glance)}">
  <div class="stats">
    ${t.stats.map(s => `<div class="stat"><div class="stat-top"><span class="stat-num">${esc(s.num)}</span><span class="stat-unit">${esc(s.unit)}</span></div><div class="stat-label">${esc(s.label)}</div></div>`).join("\n    ")}
    <div class="stat"><div class="stat-num">B1+</div><div class="stat-label">${esc(t.english)}</div></div>
  </div>
</section>

<div class="cols">
  <section id="experience" aria-labelledby="h-roles">
    <h2 class="sec-title" id="h-roles"><span class="sl" aria-hidden="true">/</span>${esc(t.rolesH)}</h2>
    <p class="sec-sub">${esc(t.rolesSub)}</p>
    <div>
      ${t.roles.map(r => `<article class="role"><h3>${esc(r.title)}</h3><ul class="tags">${r.where.map(w => `<li>${esc(w)}</li>`).join("")}</ul><p>${esc(r.desc)}</p></article>`).join("\n      ")}
    </div>
  </section>
  <section id="skills" aria-labelledby="h-skills">
    <h2 class="sec-title" id="h-skills"><span class="sl" aria-hidden="true">/</span>${esc(t.skillsH)}</h2>
    <p class="sec-sub">${esc(t.skillsSub)}</p>
    ${groups(t.skills)}
    <h2 class="sec-title next" id="h-stack"><span class="sl" aria-hidden="true">/</span>${esc(t.stackH)}</h2>
    <p class="sec-sub">${esc(t.stackSub)}</p>
    ${groups(t.stack)}
  </section>
</div>
</main>

<footer class="contact" id="contact">
  <div class="layer mesh" aria-hidden="true"></div><div class="layer dots" aria-hidden="true"></div>
  <div class="wrap contact-in">
    <div>
      <h2 class="sec-title"><span class="sl" aria-hidden="true">/</span>${esc(t.contactH)}</h2>
      <p class="contact-h">${esc(t.contactA)}<br>${esc(t.contactB)}</p>
    </div>
    <div class="links">
      <a class="btn btn-out" href="${SITE.github}" ${ext}>/github <span class="arr" aria-hidden="true">↗</span></a>
      <a class="btn btn-dark" href="${SITE.linkedin}" ${ext}>/linkedin <span class="arr" aria-hidden="true">↗</span></a>
    </div>
  </div>
  <div class="foot"><div class="wrap"><span>© 2026 ${SITE.name}</span><span class="loc">${ICON_PIN(11)}${SITE.location}</span></div></div>
</footer>

<dialog class="md" id="md" aria-label="cristian-urbano.md">
  <div class="md-bar">
    <div class="md-name"><span class="md-dots" aria-hidden="true"><i></i><i></i><i></i></span><b>cristian-urbano.md</b></div>
    <div class="md-act"><button type="button" id="md-copy" data-copy="${esc(t.copy)}" data-copied="${esc(t.copied)}" data-hint="${esc(t.selectHint)}">${esc(t.copy)}</button><button type="button" class="x" id="md-close" aria-label="${esc(t.close)}">✕</button></div>
  </div>
  <pre id="md-pre"></pre>
</dialog>

<script>
${lang === "en" ? `try{if(localStorage.getItem("cu-lang")==="es")location.replace("/es/"+location.hash)}catch(e){}
` : ""}(function(){
  var d=document.getElementById("md"),pre=document.getElementById("md-pre"),cp=document.getElementById("md-copy"),tm;
  try{document.querySelectorAll(".lang a").forEach(function(a){a.addEventListener("click",function(){try{localStorage.setItem("cu-lang",a.dataset.lang)}catch(e){}})});}catch(e){}
  if(!d||!d.showModal)return;
  var link=document.getElementById("md-open");link.addEventListener("click",function(e){e.preventDefault();if(pre.textContent){d.showModal();return;}fetch(link.getAttribute("href")).then(function(r){if(!r.ok)throw 0;return r.text();}).then(function(t){pre.textContent=t;d.showModal();}).catch(function(){location.href=link.getAttribute("href");});});
  document.getElementById("md-close").addEventListener("click",function(){d.close();});
  d.addEventListener("click",function(e){if(e.target===d)d.close();});
  function done(k){cp.textContent=cp.dataset[k];clearTimeout(tm);tm=setTimeout(function(){cp.textContent=cp.dataset.copy},2400);}
  function select(){var ok=false;try{var r=document.createRange();r.selectNodeContents(pre);var s=getSelection();s.removeAllRanges();s.addRange(r);ok=document.execCommand("copy");}catch(e){}done(ok?"copied":"hint");}
  cp.addEventListener("click",function(){try{navigator.clipboard.writeText(pre.textContent).then(function(){done("copied")},select);}catch(e){select();}});
})();
</script>
</body>
</html>
`;
}

const notFound = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>404 · ${SITE.name}</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&family=Instrument+Sans:wght@400&family=JetBrains+Mono:wght@600&display=swap">
<style>${CSS.trim()}
.nf{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:18px;position:relative;overflow:hidden;padding:40px 20px}
.nf .code{font-family:var(--mono);font-size:14px;font-weight:600;color:var(--accent)}
.nf p{color:var(--muted);font-size:17px}</style>
</head>
<body>
<main class="nf hero">
  <div class="layer mesh" aria-hidden="true"></div><div class="layer dots" aria-hidden="true"></div>
  <div style="position:relative;display:flex;flex-direction:column;align-items:center;gap:18px">
    <span class="code">404</span>
    <h1>Page not found</h1>
    <p lang="es">Página no encontrada.</p>
    <div class="ctas"><a class="btn btn-dark" href="/">~/cristian-urbano</a><a class="btn btn-out" href="/es/">Español</a></div>
  </div>
</main>
</body>
</html>
`;

const robots = `# Todo el sitio es público: buscadores y agentes de IA pueden leerlo.
User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Object.values(LANGS).map(p => `  <url>
    <loc>${SITE.url}${p}</loc>
    <lastmod>${today}</lastmod>
${Object.entries(LANGS).map(([l, q]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE.url}${q}"/>`).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE.url}/"/>
  </url>`).join("\n")}
</urlset>
`;

const en = COPY.en;
const llms = `# ${SITE.name}

> ${en.heroText}

${SITE.name} is a lead software engineer based in ${SITE.location}. Roles: ${en.heroChips.join(", ")}. Works in English and Spanish.

## Profile

- [Profile in Markdown (English)](${SITE.url}/cristian-urbano.md): roles, skills, stack and contact.
- [Perfil en Markdown (español)](${SITE.url}/es/cristian-urbano.md): el mismo perfil en español.
- [CV, one page (PDF, English)](${SITE.url}/cristian-urbano-en.pdf)
- [CV, una página (PDF, español)](${SITE.url}/cristian-urbano-es.pdf)

## Links

- [LinkedIn](${SITE.linkedin}): experience and contact.
- [GitHub](${SITE.github}): code.
`;

writeFileSync(join(root, "404.html"), notFound);
writeFileSync(join(root, "robots.txt"), robots);
writeFileSync(join(root, "sitemap.xml"), sitemap);
writeFileSync(join(root, "llms.txt"), llms);
console.log("404.html · robots.txt · sitemap.xml · llms.txt");

for (const lang of Object.keys(LANGS)) {
  const dir = join(root, LANGS[lang]);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), page(lang));
  writeFileSync(join(dir, "cristian-urbano.md"), markdown(COPY[lang]));
  console.log(`${LANGS[lang]}index.html · ${LANGS[lang]}cristian-urbano.md`);
}
