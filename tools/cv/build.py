"""Genera cristian-urbano-en.pdf y cristian-urbano-es.pdf (A4, una página).

Uso (desde la raíz del repo):  python3 tools/cv/build.py
Requiere: macOS (sips), Google Chrome. Necesita internet (Google Fonts).
El contenido está duplicado a propósito en DATA (el PDF es una versión condensada del sitio):
si cambia el texto del sitio, actualizar DATA y volver a correr.
"""
import base64, html, os, subprocess, sys, tempfile
D = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(D, "..", ".."))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP = tempfile.mkdtemp(prefix="cv-")
_photo = os.path.join(TMP, "photo.jpg")
subprocess.run(["sips", "-Z", "360", "-s", "format", "jpeg", "-s", "formatOptions", "82",
                os.path.join(ROOT, "uploads", "crisur2.png"), "--out", _photo],
               check=True, stdout=subprocess.DEVNULL)
photo = base64.b64encode(open(_photo, "rb").read()).decode()

DATA = {
"en": dict(
  lang="en", file="cristian-urbano-en.pdf",
  chips=["Tech Lead & Architect","AI Engineer & Automation","Full-Stack TypeScript","Developer Experience"],
  h1=("Building ","AI-Human-First"," products, end to end."),
  lead="Lead software engineer with 15+ years building digital products. Specialized in AI Agents, Workflows and Platforms, Developer Experience and the full Product Cycle, with deep technical craft and a human-centered eye.",
  unit="years",
  stats=[("15+","engineering"),("8+","leading teams"),("4+","AI specialized")], english="English",
  rolesH="Roles I take on and enjoy", skillsH="Strengths and focus areas", stackH="Frameworks and tools",
  roles=[
   ("AI Adoption & DEX",["Bridge","Freelance","Startups"],"Makes AI part of how teams build every day: tools, workflows and review practices, guided by Developer Experience (DEX)."),
   ("AI Engineer & Automation",["Bridge","Freelance","Startups"],"Agents and automated workflows in production, including LLM features for a healthcare platform, from prompt to integrations."),
   ("Full-Cycle Product",["Bridge","Freelance","Startups"],"Owns a product from the first conversation to launch: what to build and why, design, planning and implementation."),
   ("Tech Strategy & Innovation",["Bridge","Freelance","Startups"],"Evaluates new tools early and turns them into clear options for leadership, through small experiments and realistic plans."),
   ("Tech Lead & Architect",["Bridge","Freelance","Startups"],"Has led engineering teams for over eight years: architecture, trade-offs and technical direction, with mentoring throughout."),
   ("Lead UX & Frontend Engineer",["Bridge","Globant","Olapic"],"Design systems, UX and component architecture on enterprise and user-generated-content platforms."),
   ("Full-Stack Engineer",["Bridge","Unisono","Moobin","Freelance"],"15+ years following features from interface to API to cloud, with a clear view of how each layer shapes the others."),
  ],
  skills=[
   ("engineering",["Full-Stack Development","Frontend Architecture","Solution Architecture","System Design","Web Applications"]),
   ("ai_engineering",["AI Agents","Agentic Workflows","AI Automation","Prompt Engineering","LLM Applications"]),
   ("developer_experience",["Developer Experience","AI Adoption","AI-driven SDLC","AI-assisted Development","Agentic Coding","Developer Productivity","Team Enablement"]),
   ("product_design",["Product Design","UX Design","Design Systems","UX Engineering"]),
   ("product_cycle",["Product Management","Planning & Delivery","Supervision","Idea to Launch"]),
   ("leadership",["Technical Leadership","Team Leadership","Mentorship","Innovation & Strategy"]),
  ],
  stack=[
   ("ai",["MastraAI","LangChain","LangGraph","n8n","OpenAI","Claude","Google Vertex AI"]),
   ("frontend",["TypeScript","JavaScript","Angular","React","Next.js","Tailwind CSS","Turborepo"]),
   ("backend & cloud",["TypeScript","Node.js","Nest.js","Supabase","MongoDB","Google Cloud","Firebase","GitHub","CI/CD"]),
   ("design & management",["Claude Design","Artifacts","Figma","Miro","Jira","Linear","Google Workspace","Claude Workspace"]),
  ], foot="CV · EN"),
"es": dict(
  lang="es", file="cristian-urbano-es.pdf",
  chips=["Tech Lead & Architect","AI Engineer & Automation","Full-Stack TypeScript","Developer Experience"],
  h1=("Construyendo productos ","AI-Human-First",", de punta a punta."),
  lead="Lead software engineer con más de 15 años construyendo productos digitales. Especializado en Agentes, Workflows y Plataformas de IA, Developer Experience y Ciclo de Producto, con una mirada centrada en las personas.",
  unit="años",
  stats=[("15+","ingeniería"),("8+","liderando equipos"),("4+","especializado en IA")], english="Inglés",
  rolesH="Roles que asumo y disfruto", skillsH="Fortalezas y focos", stackH="Frameworks y herramientas",
  roles=[
   ("AI Adoption & DEX",["Bridge","Freelance","Startups"],"Integra la IA en la forma diaria de construir de los equipos: herramientas, workflows y prácticas de revisión, guiado por Developer Experience (DEX)."),
   ("AI Engineer & Automation",["Bridge","Freelance","Startups"],"Agentes y workflows automatizados en producción, incluidas funcionalidades con LLMs para una plataforma de salud, del prompt a las integraciones."),
   ("Producto de ciclo completo",["Bridge","Freelance","Startups"],"Se hace cargo de un producto desde la primera conversación hasta el lanzamiento: qué construir y por qué, diseño, plan e implementación."),
   ("Tech Strategy & Innovation",["Bridge","Freelance","Startups"],"Evalúa herramientas nuevas desde temprano y las convierte en opciones claras para la dirección, con experimentos chicos y planes realistas."),
   ("Tech Lead & Architect",["Bridge","Freelance","Startups"],"Lidera equipos de ingeniería hace más de ocho años: arquitectura, compromisos y dirección técnica, con mentoría constante."),
   ("Lead UX & Frontend Engineer",["Bridge","Globant","Olapic"],"Design systems, UX y arquitectura de componentes en plataformas enterprise y de contenido generado por usuarios."),
   ("Full-Stack Engineer",["Bridge","Unisono","Moobin","Freelance"],"Más de 15 años siguiendo funcionalidades de la interfaz a la API y a la nube, con visión de cómo cada capa influye en las otras."),
  ],
  skills=[
   ("ingenieria",["Desarrollo full-stack","Arquitectura frontend","Arquitectura de soluciones","Diseño de sistemas","Aplicaciones web"]),
   ("ingenieria_ia",["Agentes de IA","Workflows agénticos","Automatización con IA","Prompt Engineering","Aplicaciones con LLMs"]),
   ("developer_experience",["Developer Experience","Adopción de IA","SDLC impulsado por IA","Desarrollo asistido por IA","Agentic Coding","Developer Productivity","Team Enablement"]),
   ("diseno_producto",["Diseño de producto","Diseño UX","Design Systems","Ingeniería de UX"]),
   ("producto_ciclo",["Product Management","Planificación y delivery","Supervisión","De la idea al lanzamiento"]),
   ("liderazgo",["Liderazgo técnico","Liderazgo de equipos","Mentoría","Innovación y estrategia"]),
  ],
  stack=[
   ("ia",["MastraAI","LangChain","LangGraph","n8n","OpenAI","Claude","Google Vertex AI"]),
   ("frontend",["TypeScript","JavaScript","Angular","React","Next.js","Tailwind CSS","Turborepo"]),
   ("backend & cloud",["TypeScript","Node.js","Nest.js","Supabase","MongoDB","Google Cloud","Firebase","GitHub","CI/CD"]),
   ("diseno & gestion",["Claude Design","Artifacts","Figma","Miro","Jira","Linear","Google Workspace","Claude Workspace"]),
  ], foot="CV · ES"),
}

e = html.escape
def chips(items, cls="chip"): return "".join(f'<span class="{cls}">{e(i)}</span>' for i in items)

def page(d):
    roles = "".join(f'<div class="role"><div class="rt"><b>{e(t)}</b><span class="wh">{chips(w,"wc")}</span></div><p>{e(p)}</p></div>' for t,w,p in d["roles"])
    skills = "".join(f'<div class="grp"><div class="gn">{e(n)}</div><div class="cw">{chips(c)}</div></div>' for n,c in d["skills"])
    stack = "".join(f'<div class="grp"><div class="gn">{e(n)}</div><div class="cw">{chips(c)}</div></div>' for n,c in d["stack"])
    stats = "".join(f'<div class="st"><div class="sn">{n}</div><div class="sc"><small>{d["unit"]}</small><div class="sl">{e(l)}</div></div></div>' for n,l in d["stats"])
    a,b,c = d["h1"]
    return f'''<!doctype html><html lang="{d["lang"]}"><head><meta charset="utf-8"><title>Cristian Urbano</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<style>
@page{{size:A4;margin:0}}
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{width:210mm;height:297mm;background:#f5f2ed;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{font-family:Inter,sans-serif;color:#1a1720;position:relative;overflow:hidden}}
.mono{{font-family:"JetBrains Mono",monospace}}
.hero{{position:relative;height:229px;padding:30px 48px 0}}
.bg{{position:absolute;inset:0 0 0 0;background:
 radial-gradient(52% 90% at 10% 10%,#f2cf9e 0%,rgba(242,207,158,0) 55%),
 radial-gradient(56% 100% at 92% 0%,#a9d6cf 0%,rgba(169,214,207,0) 58%),
 radial-gradient(60% 110% at 82% 120%,#8fb9d6 0%,rgba(143,185,214,0) 55%),
 radial-gradient(52% 100% at 18% 130%,#c7baa0 0%,rgba(199,186,160,0) 55%),
 radial-gradient(46% 80% at 55% 45%,#f6efe6 0%,rgba(246,239,230,0) 60%),#f5f2ed}}
.dots{{position:absolute;inset:0;background-image:radial-gradient(rgba(26,23,32,.22) 1px,transparent 1.2px);background-size:22px 22px;opacity:.55}}
.top{{position:relative;display:flex;gap:20px;align-items:center}}
.ph{{width:96px;height:96px;border-radius:50%;background:url(data:image/jpeg;base64,{photo}) center/cover;box-shadow:0 8px 20px rgba(26,23,32,.18);flex:none}}
.nm{{flex:1}}
.nm h1{{font-family:Inter,sans-serif;font-weight:700;font-size:34px;letter-spacing:-.02em;margin-bottom:9px}}
.cr{{display:flex;flex-wrap:wrap;gap:7px;max-width:350px}}
.tag{{border:1px solid rgba(26,23,32,.22);background:rgba(26,23,32,.05);border-radius:999px;padding:3px 10px;font:500 9.5px "JetBrains Mono",monospace}}
.ct{{font:500 10.5px "JetBrains Mono",monospace;display:flex;flex-direction:column;gap:9px}}
.ct div{{display:flex;align-items:center;gap:7px}}
.ct svg{{width:15px;height:15px;flex:none}}
.tl{{position:relative;margin-top:22px;font:700 17px Inter,sans-serif;letter-spacing:-.01em}}
.tl em{{font-style:normal;color:#a6552e}}
.lead{{position:relative;margin-top:7px;font-size:12px;line-height:1.55;color:#3a3542;max-width:700px}}
.stats{{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(26,23,32,.08);border-bottom:1px solid rgba(26,23,32,.08);background:rgba(255,255,255,.5)}}
.st,.en{{padding:9px 0 9px 48px;border-right:1px solid rgba(26,23,32,.08);display:flex;align-items:center;gap:7px}}
.st:nth-child(n+2),.en{{padding-left:16px}}
.sn{{font:700 22px Inter,sans-serif;letter-spacing:-.02em;position:relative}}
.sc{{display:flex;flex-direction:column;line-height:1.15}}
.sc small{{font:500 8.5px "JetBrains Mono",monospace;color:#4a4552}}
.sl{{font:600 11.5px Inter,sans-serif}}
.en{{border-right:0}}
.main{{display:grid;grid-template-columns:1fr 1.02fr;gap:30px;padding:20px 48px 0}}
h2{{font:700 22px "JetBrains Mono",monospace;display:flex;align-items:baseline;gap:9px;margin-bottom:10px}}
h2 i{{font-style:normal;color:#a6552e}}
h2 span{{font:400 10.5px Inter,sans-serif;color:#4a4552}}
.role{{padding:12px 0 11px;border-top:1px solid rgba(26,23,32,.09)}}
.rt{{display:flex;justify-content:space-between;align-items:center;gap:8px}}
.rt b{{white-space:nowrap;font:600 13px Inter,sans-serif}}
.wh{{display:flex;gap:3px;flex:none}}
.wc{{font:500 7.5px "JetBrains Mono",monospace;border:1px solid rgba(26,23,32,.2);border-radius:3px;padding:1.5px 6px;color:#4a4552;background:rgba(255,255,255,.35)}}
.role p{{margin-top:5px;font-size:11.6px;line-height:1.5;color:#3a3542}}
.grp{{margin-bottom:7px}}
.gn{{font:600 9.5px "JetBrains Mono",monospace;color:#a6552e;margin-bottom:3px}}
.cw{{display:flex;flex-wrap:wrap;gap:4px}}
.chip{{font:500 8.8px "JetBrains Mono",monospace;border:1px solid rgba(26,23,32,.25);border-radius:4px;padding:2.5px 7px;background:rgba(255,255,255,.4)}}
.sk h2{{margin-bottom:8px}}
.sk .stackh{{margin-top:14px}}
.foot{{position:absolute;left:0;right:0;bottom:0;height:34px;border-top:1px solid rgba(26,23,32,.08);padding:0 48px;display:flex;justify-content:space-between;align-items:center;font:500 9px "JetBrains Mono",monospace;color:#6f6a78}}
.foot b{{color:#1a1720;font-weight:700}}
</style></head><body>
<div class="hero"><div class="bg"></div><div class="dots"></div>
 <div class="top"><div class="ph"></div>
  <div class="nm"><h1>Cristian Urbano</h1><div class="cr">{chips(d["chips"],"tag")}</div></div>
  <div class="ct">
   <div><svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#1a1720"/><path fill="#f5f2ed" d="M6.9 9.5h2.4V17H6.9zM8.1 5.8a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8zM10.6 9.5h2.3v1c.4-.7 1.2-1.2 2.4-1.2 2.4 0 2.8 1.5 2.8 3.5V17h-2.4v-3.6c0-.9 0-2-1.2-2s-1.4.9-1.4 1.9V17h-2.4z"/></svg>linkedin.com/in/cristianurbano</div>
   <div><svg viewBox="0 0 24 24"><path fill="#1a1720" d="M12 .5a11.5 11.5 0 00-3.6 22.4c.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.3 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.100.8 2.200v3.300c0 .3.2.7.8.6A11.500 11.500 0 0012 .5z"/></svg>github.com/damsorian</div>
   <div><svg viewBox="0 0 24 24" fill="none" stroke="#a6552e" stroke-width="2"><path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.800-7 11-7 11z"/><circle cx="12" cy="10" r="2.500"/></svg>Bariloche, Argentina</div>
  </div></div>
 <div class="tl">{e(a)}<em>{e(b)}</em>{e(c)}</div>
 <p class="lead">{e(d["lead"])}</p>
</div>
<div class="stats">{stats}<div class="en"><div class="sn">B1+</div><div class="sl" style="margin-left:0">{e(d["english"])}</div></div></div>
<div class="main">
 <div><h2><i>/</i>roles<span>{e(d["rolesH"])}</span></h2>{roles}</div>
 <div class="sk"><h2><i>/</i>skills<span>{e(d["skillsH"])}</span></h2>{skills}<h2 class="stackh"><i>/</i>stack<span>{e(d["stackH"])}</span></h2>{stack}</div>
</div>
<div class="foot"><span><b>~/cristian-urbano</b></span><span>{e(d["foot"])}</span></div>
</body></html>'''

for k, d in DATA.items():
    src = os.path.join(TMP, f"cv-{k}.html")
    open(src, "w").write(page(d))
    out = os.path.join(ROOT, d["file"])
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                    "--virtual-time-budget=15000", f"--print-to-pdf={out}", "file://" + src],
                   check=True, stderr=subprocess.DEVNULL)
    print("escrito", out)
