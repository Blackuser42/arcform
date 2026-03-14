import { useState, useEffect } from "react";

const GFONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');`;

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --P:#E63946;--P2:#C1121F;--S:#F1FAEE;--A:#457B9D;--D:#1D3557;
  --bg:#F1FAEE;--surf:#fff;--surf2:#E8F3EE;--brd:#C8DFD5;
  --txt:#1D3557;--muted:#5A7890;
  --shad:0 2px 20px rgba(29,53,87,.09);--shad2:0 8px 40px rgba(29,53,87,.13);
  --r:6px;--mono:'JetBrains Mono',monospace;
}
.dk{
  --bg:#1D3557;--surf:#162840;--surf2:#0F1E2E;--brd:#2A4060;
  --txt:#F1FAEE;--muted:#7AAABB;
  --shad:0 2px 20px rgba(0,0,0,.28);--shad2:0 8px 40px rgba(0,0,0,.4);
}
html,body{height:100%;font-family:'Lora',serif;background:var(--bg);color:var(--txt);transition:background .3s,color .3s}
.shell{min-height:100vh;display:flex;flex-direction:column;position:relative;overflow-x:hidden}
.shell::before{content:'';position:fixed;inset:0;
  background:radial-gradient(ellipse 70% 50% at 90% -10%,rgba(69,123,157,.12) 0%,transparent 55%),
             radial-gradient(ellipse 50% 40% at -5% 95%,rgba(230,57,70,.08) 0%,transparent 50%);
  pointer-events:none;z-index:0}

/* NAV */
.nav{position:relative;z-index:30;height:62px;display:flex;align-items:center;
  justify-content:space-between;padding:0 32px;border-bottom:1px solid var(--brd);
  background:rgba(241,250,238,.92);backdrop-filter:blur(16px)}
.dk .nav{background:rgba(22,40,64,.92)}
.brand{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;letter-spacing:.03em;
  color:var(--txt);display:flex;align-items:center;gap:9px;cursor:pointer}
.brand-dot{width:9px;height:9px;border-radius:50%;background:var(--P);box-shadow:0 0 0 3px rgba(230,57,70,.2)}
.nav-links{display:flex;align-items:center;gap:4px}
.nav-link{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;
  letter-spacing:.08em;padding:7px 14px;border-radius:var(--r);cursor:pointer;
  border:none;background:transparent;color:var(--muted);transition:all .2s}
.nav-link:hover{color:var(--txt);background:var(--surf2)}
.nav-link.active{color:var(--P);background:rgba(230,57,70,.07)}
.nav-r{display:flex;align-items:center;gap:8px}
.btn-mode{background:var(--surf2);border:1px solid var(--brd);color:var(--muted);
  border-radius:20px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;
  font-family:'Syne',sans-serif;letter-spacing:.06em;text-transform:uppercase;transition:all .2s}
.btn-mode:hover{border-color:var(--A);color:var(--A)}

/* STEP BAR */
.sbar{position:relative;z-index:10;max-width:860px;margin:0 auto;width:100%;
  padding:24px 32px 0;display:flex;align-items:center}
.si{display:flex;align-items:center;gap:8px;flex:1}
.si:last-child{flex:0}
.sn{width:30px;height:30px;border-radius:50%;border:2px solid var(--brd);
  display:flex;align-items:center;justify-content:center;font-family:var(--mono);
  font-size:12px;font-weight:500;color:var(--muted);background:var(--surf);transition:all .3s;flex-shrink:0}
.sn.a{border-color:var(--P);color:var(--P);background:rgba(230,57,70,.07)}
.sn.d{border-color:var(--A);background:var(--A);color:#fff}
.sl{font-family:'Syne',sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;
  letter-spacing:.09em;color:var(--muted);white-space:nowrap}
.sl.a{color:var(--P)}.sl.d{color:var(--A)}
.sline{flex:1;height:1px;background:var(--brd);margin:0 6px;opacity:.7}

/* MAIN */
.main{position:relative;z-index:5;max-width:860px;margin:0 auto;width:100%;padding:32px 32px 80px}
.h1{font-family:'Syne',sans-serif;font-size:32px;font-weight:800;line-height:1.15;margin-bottom:6px;letter-spacing:-.01em}
.h1 em{color:var(--P);font-style:normal}
.sub{font-size:14px;color:var(--muted);margin-bottom:28px;line-height:1.75;font-family:'Lora',serif;font-style:italic}

/* CARD */
.card{background:var(--surf);border:1px solid var(--brd);border-radius:var(--r);padding:24px 26px;box-shadow:var(--shad)}
.card+.card{margin-top:14px}
.fmeta{font-family:var(--mono);font-size:10px;color:var(--A);letter-spacing:.1em;text-transform:uppercase;margin-bottom:7px;opacity:.75}
.flabel{font-family:'Syne',sans-serif;font-size:12px;font-weight:700;text-transform:uppercase;
  letter-spacing:.09em;color:var(--muted);margin-bottom:9px;display:block}
.ta{width:100%;min-height:110px;background:var(--surf2);border:1.5px solid var(--brd);
  border-radius:var(--r);color:var(--txt);font-family:'Lora',serif;font-size:15px;
  line-height:1.75;padding:13px 15px;resize:vertical;outline:none;transition:border-color .2s}
.ta:focus{border-color:var(--A)}
.ta::placeholder{color:var(--muted);opacity:.6}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:7px;padding:11px 22px;border-radius:var(--r);
  font-family:'Syne',sans-serif;font-size:12px;font-weight:700;letter-spacing:.07em;
  text-transform:uppercase;border:none;cursor:pointer;transition:all .2s}
.btn-p{background:var(--P);color:#fff;box-shadow:0 3px 16px rgba(230,57,70,.28)}
.btn-p:hover:not(:disabled){background:var(--P2);transform:translateY(-2px);box-shadow:0 6px 24px rgba(230,57,70,.38)}
.btn-p:disabled{opacity:.4;cursor:not-allowed}
.btn-o{background:transparent;border:1.5px solid var(--A);color:var(--A)}
.btn-o:hover{background:rgba(69,123,157,.1)}
.btn-g{background:transparent;border:1.5px solid var(--brd);color:var(--muted);font-size:11px;padding:7px 14px}
.btn-g:hover{border-color:var(--A);color:var(--A)}
.row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:16px}
.divider{height:1px;background:var(--brd);margin:24px 0}

/* SELECT */
.sel{width:100%;padding:12px 38px 12px 14px;background:var(--surf2);border:1.5px solid var(--brd);
  border-radius:var(--r);color:var(--txt);font-family:'Syne',sans-serif;font-size:14px;font-weight:600;
  outline:none;cursor:pointer;appearance:none;transition:border-color .2s;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23457B9D' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 12px center}
.sel:focus{border-color:var(--A)}
.sel option{background:var(--surf)}
.sel-badge{display:inline-flex;align-items:center;gap:7px;margin-top:10px;background:rgba(230,57,70,.07);
  border:1px solid var(--P);border-radius:var(--r);padding:7px 14px;font-family:'Syne',sans-serif;
  font-size:12px;font-weight:700;color:var(--P);letter-spacing:.06em}

/* TABLE */
.tbl-wrap{overflow-x:auto;border-radius:var(--r);border:1px solid var(--brd);margin-top:14px}
table{width:100%;border-collapse:collapse;font-size:13px}
thead{background:var(--D);color:#F1FAEE}
.dk thead{background:rgba(69,123,157,.22)}
th{padding:10px 14px;text-align:left;font-family:var(--mono);font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
td{padding:10px 14px;border-top:1px solid var(--brd);vertical-align:top;line-height:1.6;color:var(--txt)}
tr:hover td{background:rgba(69,123,157,.04)}
.tag{display:inline-block;padding:2px 9px;border-radius:10px;font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.04em}
.tg{background:rgba(34,197,94,.1);color:#15803d}.dk .tg{color:#4ade80}
.ty{background:rgba(234,179,8,.11);color:#a16207}.dk .ty{color:#facc15}
.tr{background:rgba(230,57,70,.1);color:#c1121f}.dk .tr{color:#ff6b6b}
ul.pros{color:#15803d;padding-left:14px}.dk ul.pros{color:#4ade80}
ul.cons{color:#c1121f;padding-left:14px}.dk ul.cons{color:#ff6b6b}
li{margin-bottom:3px;font-size:12px}

/* FORMAT BAR */
.fmt-bar{display:flex;align-items:center;border:1.5px solid var(--brd);border-radius:var(--r);
  overflow:hidden;width:fit-content;margin-bottom:16px}
.fmt-btn{padding:7px 18px;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;
  text-transform:uppercase;letter-spacing:.09em;cursor:pointer;border:none;
  background:transparent;color:var(--muted);transition:all .2s}
.fmt-btn.active{background:var(--D);color:#F1FAEE}
.dk .fmt-btn.active{background:var(--A)}
.fmt-div{width:1px;background:var(--brd)}

/* PLAN STEPS */
.pl{display:flex;flex-direction:column;gap:10px}
.pi{border:1px solid var(--brd);border-radius:var(--r);overflow:hidden;background:var(--surf)}
.ph{display:flex;align-items:center;gap:12px;padding:13px 17px;cursor:pointer;
  border-bottom:1px solid transparent;user-select:none;transition:background .15s}
.ph:hover{background:rgba(69,123,157,.04)}
.ph.open{border-color:var(--brd)}
.pnum{width:27px;height:27px;border-radius:50%;background:var(--P);color:#fff;
  display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:12px;font-weight:500;flex-shrink:0}
.ptitle{flex:1;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--txt)}
.pchev{color:var(--muted);font-size:16px;transition:transform .3s}
.pchev.open{transform:rotate(180deg)}
.pb{padding:16px 16px 16px 56px}
.ps-lbl{font-family:var(--mono);font-size:10px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--A);margin-bottom:7px}
.ps{margin-bottom:14px}.ps:last-child{margin-bottom:0}
.pli{display:flex;gap:9px;font-size:13px;line-height:1.65;color:var(--txt);margin-bottom:5px;font-family:'Lora',serif}
.pli::before{content:'→';color:var(--P);flex-shrink:0;margin-top:1px;font-family:'Syne',sans-serif}
.sg{display:grid;grid-template-columns:60px 1fr;gap:5px 12px;font-size:13px;font-family:'Lora',serif}
.sw{font-family:var(--mono);font-size:10px;font-weight:700;color:var(--P);text-transform:uppercase;letter-spacing:.08em;padding-top:2px}
.rb{display:grid;grid-template-columns:1fr 65px 1fr;gap:10px;padding:9px 11px;
  border:1px solid var(--brd);border-radius:var(--r);margin-bottom:6px;font-size:12px;font-family:'Lora',serif}
.rl{font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);margin-bottom:3px}
.chips{display:flex;flex-wrap:wrap;gap:5px}
.chip{background:var(--surf2);border:1px solid var(--brd);border-radius:3px;padding:2px 9px;font-size:10px;font-family:var(--mono);color:var(--muted)}

/* MARKDOWN */
.md-view{font-family:'Lora',serif;font-size:14px;line-height:1.85;color:var(--txt)}
.md-view h1{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--P);margin:0 0 4px}
.md-view h2{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:var(--D);
  margin:20px 0 7px;padding-bottom:5px;border-bottom:1px solid var(--brd);text-transform:uppercase;letter-spacing:.07em}
.dk .md-view h2{color:var(--S)}
.md-view h3{font-family:'Syne',sans-serif;font-size:12px;font-weight:700;color:var(--A);margin:13px 0 5px;text-transform:uppercase;letter-spacing:.08em}
.md-view p{margin-bottom:9px;color:var(--muted);font-style:italic}
.md-view ul{padding-left:18px;margin-bottom:9px}
.md-view li{margin-bottom:4px}
.md-view strong{color:var(--P);font-weight:600;font-style:normal}
.md-view code{font-family:var(--mono);font-size:11px;background:var(--surf2);padding:1px 6px;border-radius:3px;color:var(--A)}
.md-view table{width:100%;border-collapse:collapse;margin:10px 0;font-size:13px}
.md-view th{background:var(--D);color:#F1FAEE;padding:7px 11px;text-align:left;font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase}
.dk .md-view th{background:rgba(69,123,157,.22)}
.md-view td{padding:7px 11px;border:1px solid var(--brd)}
.md-view blockquote{border-left:3px solid var(--P);padding-left:13px;margin:9px 0;color:var(--muted)}
.md-sep{border:none;border-top:1px dashed var(--brd);margin:16px 0}

/* JSON BLOCK */
.json-pre{background:var(--D);color:#a8d8a8;border-radius:var(--r);padding:16px;
  font-family:var(--mono);font-size:11px;line-height:1.7;overflow:auto;max-height:360px;
  white-space:pre-wrap;word-break:break-all}
.dk .json-pre{background:#080d15}
.vif{display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:10px;
  color:var(--A);background:rgba(69,123,157,.1);border:1px solid rgba(69,123,157,.25);
  border-radius:3px;padding:3px 9px;margin-bottom:14px;opacity:.85}

/* LOADING */
.ldwrap{display:flex;flex-direction:column;align-items:center;gap:14px;padding:44px}
.spin{width:30px;height:30px;border:2.5px solid rgba(230,57,70,.2);border-top-color:var(--P);border-radius:50%;animation:sp .7s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
.lt{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:var(--muted)}
.ls{font-family:var(--mono);font-size:10px;color:var(--muted);opacity:.6;letter-spacing:.1em;text-transform:uppercase}
.err{background:rgba(230,57,70,.07);border:1px solid var(--P);border-radius:var(--r);
  padding:11px 15px;color:var(--P);font-size:13px;margin-top:11px;font-family:'Lora',serif;font-style:italic}

/* ── HISTORY PANEL ── */
.hist-empty{text-align:center;padding:40px 20px;color:var(--muted);font-family:'Lora',serif;font-style:italic;font-size:14px}
.hist-grid{display:flex;flex-direction:column;gap:10px;margin-top:4px}
.hist-card{background:var(--surf);border:1px solid var(--brd);border-radius:var(--r);
  padding:14px 16px;cursor:pointer;transition:all .2s;display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.hist-card:hover{border-color:var(--A);box-shadow:var(--shad)}
.hist-info{flex:1;min-width:0}
.hist-name{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--txt);
  margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hist-meta{font-family:var(--mono);font-size:10px;color:var(--muted);display:flex;gap:10px;flex-wrap:wrap}
.hist-type{background:rgba(69,123,157,.12);color:var(--A);padding:1px 7px;border-radius:3px;font-weight:600}
.hist-actions{display:flex;gap:6px;flex-shrink:0}
.hist-btn{background:transparent;border:1px solid var(--brd);color:var(--muted);
  border-radius:3px;padding:4px 10px;font-family:var(--mono);font-size:10px;cursor:pointer;transition:all .2s}
.hist-btn:hover{border-color:var(--P);color:var(--P)}
.hist-btn.del:hover{border-color:var(--P);color:var(--P)}
.hist-count{font-family:var(--mono);font-size:11px;color:var(--muted);margin-bottom:14px;opacity:.7}

/* ── COMPLEXITY SCORE BADGE ── */
.complexity-wrap{display:flex;align-items:center;gap:10px;margin-bottom:16px;padding:10px 14px;
  background:var(--surf2);border:1px solid var(--brd);border-radius:var(--r)}
.complexity-label{font-family:var(--mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)}
.complexity-bar{flex:1;height:6px;background:var(--brd);border-radius:3px;overflow:hidden}
.complexity-fill{height:100%;border-radius:3px;transition:width .6s ease}
.complexity-val{font-family:'Syne',sans-serif;font-size:12px;font-weight:800;letter-spacing:.06em}

/* ── PRICING PAGE ── */
.pricing-wrap{max-width:860px;margin:0 auto;padding:32px 32px 80px;position:relative;z-index:5}
.pricing-hero{text-align:center;margin-bottom:48px}
.pricing-h{font-family:'Syne',sans-serif;font-size:36px;font-weight:800;letter-spacing:-.01em;margin-bottom:10px}
.pricing-h em{color:var(--P);font-style:normal}
.pricing-sub{font-family:'Lora',serif;font-size:15px;color:var(--muted);font-style:italic}
.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media(max-width:680px){.pricing-grid{grid-template-columns:1fr}}
.plan-card{background:var(--surf);border:1.5px solid var(--brd);border-radius:var(--r);
  padding:26px 22px;position:relative;transition:all .25s}
.plan-card.popular{border-color:var(--P);box-shadow:0 0 0 1px var(--P),0 8px 32px rgba(230,57,70,.14)}
.plan-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);
  background:var(--P);color:#fff;font-family:'Syne',sans-serif;font-size:10px;font-weight:800;
  letter-spacing:.1em;text-transform:uppercase;padding:3px 14px;border-radius:12px;white-space:nowrap}
.plan-name{font-family:'Syne',sans-serif;font-size:14px;font-weight:800;text-transform:uppercase;
  letter-spacing:.1em;color:var(--muted);margin-bottom:10px}
.plan-price{font-family:'Syne',sans-serif;font-size:38px;font-weight:800;color:var(--txt);line-height:1;margin-bottom:4px}
.plan-price span{font-size:16px;font-weight:600;color:var(--muted);vertical-align:top;margin-top:8px;display:inline-block}
.plan-period{font-family:var(--mono);font-size:11px;color:var(--muted);margin-bottom:18px}
.plan-divider{height:1px;background:var(--brd);margin-bottom:18px}
.plan-feature{display:flex;align-items:flex-start;gap:9px;font-size:13px;
  font-family:'Lora',serif;color:var(--txt);margin-bottom:9px;line-height:1.5}
.plan-check{color:var(--A);font-size:13px;flex-shrink:0;margin-top:1px}
.plan-check.no{color:var(--brd)}
.plan-feature.dim{color:var(--muted);opacity:.6}
.plan-cta{width:100%;margin-top:20px;padding:12px;font-size:12px}
.plan-cta.main{background:var(--P);color:#fff;border:none;box-shadow:0 3px 16px rgba(230,57,70,.28)}
.plan-cta.main:hover{background:var(--P2);transform:translateY(-1px)}
.plan-cta.outline{background:transparent;border:1.5px solid var(--A);color:var(--A)}
.plan-cta.outline:hover{background:rgba(69,123,157,.1)}
.plan-cta.ghost{background:transparent;border:1.5px solid var(--brd);color:var(--muted)}
.pricing-note{text-align:center;margin-top:28px;font-family:'Lora',serif;font-size:13px;color:var(--muted);font-style:italic}

/* TOAST */
.toast{position:fixed;bottom:24px;right:24px;z-index:9999;background:var(--D);color:#F1FAEE;
  border:1px solid var(--A);border-radius:var(--r);padding:10px 18px;font-family:'Syne',sans-serif;
  font-size:12px;font-weight:700;letter-spacing:.06em;box-shadow:var(--shad2);animation:fu .3s ease}
@keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

@media(max-width:620px){
  .main,.nav,.sbar,.pricing-wrap{padding-left:16px;padding-right:16px}
  .h1,.pricing-h{font-size:26px}
  .rb{grid-template-columns:1fr}.sg{grid-template-columns:1fr}
  .nav-links{display:none}
}
`;

// ── Helpers ────────────────────────────────────────────────────
function tc(v){const s=String(v).toLowerCase();if(s==="low"||s==="fast")return"tag tg";if(s==="medium"||s==="moderate")return"tag ty";return"tag tr";}

function getComplexityScore(bp){
  if(!bp)return{score:0,label:"—",color:"#ccc"};
  const phases=bp.phases||[];
  const total=phases.reduce((a,p)=>{
    return a+(p.risks?p.risks.filter(r=>r.level==="High").length*3:0)
            +(p.tasks?p.tasks.length:0)
            +(p.sprints?p.sprints.length:0);
  },0);
  if(total>14)return{score:90,label:"High",color:"#E63946"};
  if(total>7) return{score:55,label:"Medium",color:"#f4a261"};
  return{score:28,label:"Low",color:"#2a9d8f"};
}

async function callClaude(system,user){
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const res=await fetch("https://api.groq.com/openai/v1/chat/completions",{
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":"Bearer "+apiKey},
    body:JSON.stringify({
      model:"llama-3.3-70b-versatile",
      max_tokens:4000,
      temperature:0.3,
      messages:[
        {role:"system",content:system+"\n\nCRITICAL: Output ONLY a raw JSON object. No markdown fences, no explanation. Start with { end with }."},
        {role:"user",content:user}
      ]
    })
  });
  if(!res.ok){const e=await res.text();throw new Error("API "+res.status+": "+e);}
  const d=await res.json();
  const raw=d.choices?.[0]?.message?.content||"";
  const first=raw.indexOf("{"),last=raw.lastIndexOf("}");
  if(first===-1||last===-1)throw new Error("No JSON in response");
  return JSON.parse(raw.slice(first,last+1));
}

// ── localStorage History ────────────────────────────────────────
const HIST_KEY="arcform_history_v1";
function loadHistory(){try{return JSON.parse(localStorage.getItem(HIST_KEY)||"[]");}catch{return[];}}
function saveHistory(items){try{localStorage.setItem(HIST_KEY,JSON.stringify(items));}catch{}}

// ── PDF Generator (pure JS, no library) ────────────────────────
function generatePDF(bp,prompt){
  // Build HTML for print window
  const phases=(bp.phases||[]).map((p,i)=>{
    let html=`<div class="phase"><h2>${p.phase}</h2>`;
    if(p.objectives) html+=`<h3>Objectives</h3><ul>${p.objectives.map(o=>`<li>${o}</li>`).join("")}</ul>`;
    if(p.deliverables) html+=`<h3>Deliverables</h3><ul>${p.deliverables.map(d=>`<li>${d}</li>`).join("")}</ul>`;
    if(p.tasks) html+=`<h3>Tasks</h3><ul>${p.tasks.map(t=>`<li>${t}</li>`).join("")}</ul>`;
    if(p.tech_stack) html+=`<h3>Tech Stack</h3><p>${p.tech_stack.join(" · ")}</p>`;
    if(p.sprints) html+=`<h3>Sprint Plan</h3><table><tr><th>Week</th><th>Focus</th></tr>${p.sprints.map(s=>`<tr><td>${s.week}</td><td>${s.focus}</td></tr>`).join("")}</table>`;
    if(p.risks) html+=`<h3>Risk Register</h3><table><tr><th>Risk</th><th>Level</th><th>Mitigation</th></tr>${p.risks.map(r=>`<tr><td>${r.risk}</td><td><b>${r.level}</b></td><td>${r.mitigation}</td></tr>`).join("")}</table>`;
    if(p.qa_checks) html+=`<h3>QA Checklist</h3><ul>${p.qa_checks.map(q=>`<li>${q}</li>`).join("")}</ul>`;
    html+=`</div>`;
    return html;
  }).join("");

  const html=`<!DOCTYPE html><html><head><meta charset="utf-8">
  <title>${bp.project_name||"Blueprint"} — Arcform</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:Georgia,serif;font-size:13px;line-height:1.7;color:#1D3557;padding:40px;max-width:760px;margin:0 auto}
    .header{border-bottom:2px solid #E63946;padding-bottom:16px;margin-bottom:28px}
    .brand{font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#E63946;margin-bottom:6px}
    h1{font-family:Arial,sans-serif;font-size:26px;font-weight:800;color:#1D3557;margin-bottom:4px}
    .meta{font-size:12px;color:#5A7890;font-style:italic}
    .idea{background:#F1FAEE;border-left:3px solid #457B9D;padding:10px 14px;margin:16px 0;font-style:italic;color:#457B9D;font-size:13px}
    .phase{margin-bottom:28px;padding-bottom:20px;border-bottom:1px solid #C8DFD5}
    .phase:last-child{border-bottom:none}
    h2{font-family:Arial,sans-serif;font-size:15px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:#E63946;margin-bottom:12px;margin-top:20px}
    h3{font-family:Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#457B9D;margin:12px 0 6px}
    ul{padding-left:18px}li{margin-bottom:4px}
    table{width:100%;border-collapse:collapse;margin:8px 0;font-size:12px}
    th{background:#1D3557;color:#F1FAEE;padding:7px 10px;text-align:left;font-family:Arial,sans-serif;font-size:10px;letter-spacing:.08em;text-transform:uppercase}
    td{padding:7px 10px;border-bottom:1px solid #C8DFD5}
    .footer{margin-top:32px;padding-top:16px;border-top:1px solid #C8DFD5;text-align:center;font-family:Arial,sans-serif;font-size:10px;color:#5A7890;letter-spacing:.06em;text-transform:uppercase}
    @media print{body{padding:20px}.phase{page-break-inside:avoid}}
  </style></head>
  <body>
    <div class="header">
      <div class="brand">Arcform · Blueprint Report</div>
      <h1>${bp.project_name||"Blueprint"}</h1>
      <div class="meta">Type: ${bp.selected_type} · Generated ${new Date().toLocaleDateString()}</div>
      <div class="idea">"${prompt}"</div>
      <p>${bp.summary||""}</p>
    </div>
    ${phases}
    <div class="footer">Generated by Arcform · arcform.app</div>
  </body></html>`;

  const win=window.open("","_blank","width=900,height=700");
  win.document.write(html);
  win.document.close();
  setTimeout(()=>win.print(),600);
}

// ── Markdown helpers ───────────────────────────────────────────
function mdInline(s){return s.replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>");}
function MarkdownView({content}){
  const lines=content.split("\n");const els=[];let tb=null;let i=0;
  const flush=()=>{if(!tb)return;const[hdr,,...rows]=tb;const hs=hdr.split("|").map(s=>s.trim()).filter(Boolean);els.push(<table key={"t"+els.length}><thead><tr>{hs.map((h,j)=><th key={j} dangerouslySetInnerHTML={{__html:mdInline(h)}}/>)}</tr></thead><tbody>{rows.map((r,ri)=>{const cs=r.split("|").map(s=>s.trim()).filter(Boolean);return<tr key={ri}>{cs.map((c,ci)=><td key={ci} dangerouslySetInnerHTML={{__html:mdInline(c)}}/>)}</tr>})}</tbody></table>);tb=null;};
  while(i<lines.length){const l=lines[i];if(l.trim().startsWith("|")){if(!tb)tb=[];tb.push(l.trim());i++;continue;}else flush();
    if(l.startsWith("# "))els.push(<h1 key={i} dangerouslySetInnerHTML={{__html:mdInline(l.slice(2))}}/>);
    else if(l.startsWith("## "))els.push(<h2 key={i} dangerouslySetInnerHTML={{__html:mdInline(l.slice(3))}}/>);
    else if(l.startsWith("### "))els.push(<h3 key={i} dangerouslySetInnerHTML={{__html:mdInline(l.slice(4))}}/>);
    else if(l.startsWith("- "))els.push(<ul key={i}><li dangerouslySetInnerHTML={{__html:mdInline(l.slice(2))}}/></ul>);
    else if(l.startsWith("> "))els.push(<blockquote key={i} dangerouslySetInnerHTML={{__html:mdInline(l.slice(2))}}/>);
    else if(l.trim()==="---")els.push(<hr key={i} className="md-sep"/>);
    else if(l.trim())els.push(<p key={i} dangerouslySetInnerHTML={{__html:mdInline(l)}}/>);
    i++;}flush();
  return <div className="md-view">{els}</div>;
}
function buildPlanToMarkdown(bp){
  if(!bp)return"";
  let md=`# ${bp.project_name||"Blueprint"}\n\n> ${bp.summary||""}\n\n**Type:** \`${bp.selected_type}\`\n\n---\n\n`;
  (bp.phases||[]).forEach((p,i)=>{
    md+=`## ${p.phase}\n\n`;
    if(p.objectives){md+=`### Objectives\n`;p.objectives.forEach(o=>{md+=`- ${o}\n`;});md+="\n";}
    if(p.deliverables){md+=`### Deliverables\n`;p.deliverables.forEach(d=>{md+=`- ${d}\n`;});md+="\n";}
    if(p.tasks){md+=`### Tasks\n`;p.tasks.forEach(t=>{md+=`- ${t}\n`;});md+="\n";}
    if(p.tech_stack){md+=`### Tech Stack\n`;p.tech_stack.forEach(t=>{md+=`- \`${t}\`\n`;});md+="\n";}
    if(p.sprints){md+=`### Sprint Plan\n\n| Week | Focus |\n|------|-------|\n`;p.sprints.forEach(s=>{md+=`| ${s.week} | ${s.focus} |\n`;});md+="\n";}
    if(p.risks){md+=`### Risk Register\n\n| Risk | Level | Mitigation |\n|------|-------|------------|\n`;p.risks.forEach(r=>{md+=`| ${r.risk} | **${r.level}** | ${r.mitigation} |\n`;});md+="\n";}
    if(p.qa_checks){md+=`### QA Checklist\n`;p.qa_checks.forEach(q=>{md+=`- ${q}\n`;});md+="\n";}
    if(i<(bp.phases||[]).length-1)md+="---\n\n";
  });
  return md;
}

// ── PlanStep ───────────────────────────────────────────────────
function PlanStep({phase,index}){
  const[open,setOpen]=useState(index===0);
  return(
    <div className="pi">
      <div className={`ph ${open?"open":""}`} onClick={()=>setOpen(!open)}>
        <div className="pnum">{index+1}</div>
        <div className="ptitle">{phase.phase}</div>
        <div className={`pchev ${open?"open":""}`}>⌄</div>
      </div>
      {open&&<div className="pb">
        {phase.objectives&&<div className="ps"><div className="ps-lbl">Objectives</div>{phase.objectives.map((o,i)=><div className="pli" key={i}>{o}</div>)}</div>}
        {phase.deliverables&&<div className="ps"><div className="ps-lbl">Deliverables</div>{phase.deliverables.map((d,i)=><div className="pli" key={i}>{d}</div>)}</div>}
        {phase.tasks&&<div className="ps"><div className="ps-lbl">Tasks</div>{phase.tasks.map((t,i)=><div className="pli" key={i}>{t}</div>)}</div>}
        {phase.tech_stack&&<div className="ps"><div className="ps-lbl">Tech Stack</div><div className="chips">{phase.tech_stack.map((t,i)=><span className="chip" key={i}>{t}</span>)}</div></div>}
        {phase.sprints&&<div className="ps"><div className="ps-lbl">Sprint Plan</div><div className="sg">{phase.sprints.map((s,i)=><span key={i} style={{display:"contents"}}><div className="sw">Wk {s.week}</div><div>{s.focus}</div></span>)}</div></div>}
        {phase.risks&&<div className="ps"><div className="ps-lbl">Risk Register</div>{phase.risks.map((r,i)=><div className="rb" key={i}><div><div className="rl">Risk</div>{r.risk}</div><div><div className="rl">Level</div><span className={tc(r.level)}>{r.level}</span></div><div><div className="rl">Mitigation</div>{r.mitigation}</div></div>)}</div>}
        {phase.qa_checks&&<div className="ps"><div className="ps-lbl">QA Checklist</div>{phase.qa_checks.map((q,i)=><div className="pli" key={i}>{q}</div>)}</div>}
      </div>}
    </div>
  );
}

// ── FormatBar ──────────────────────────────────────────────────
function FormatBar({fmt,setFmt}){
  return(
    <div className="fmt-bar">
      {["JSON","Markdown"].map((f,i)=>(
        <span key={f} style={{display:"contents"}}>
          {i>0&&<div className="fmt-div" style={{width:1,background:"var(--brd)"}}/>}
          <button className={`fmt-btn ${fmt===f?"active":""}`} onClick={()=>setFmt(f)}>{f}</button>
        </span>
      ))}
    </div>
  );
}

// ── ComplexityScore ────────────────────────────────────────────
function ComplexityScore({bp}){
  const{score,label,color}=getComplexityScore(bp);
  return(
    <div className="complexity-wrap">
      <div className="complexity-label">Complexity</div>
      <div className="complexity-bar"><div className="complexity-fill" style={{width:score+"%",background:color}}/></div>
      <div className="complexity-val" style={{color}}>{label}</div>
    </div>
  );
}

// ── PricingPage ────────────────────────────────────────────────
const LS_LINKS={
  builder_monthly:"https://arcform.lemonsqueezy.com/checkout/buy/20dfc894-af43-444c-9c23-b3efabfa5f83",
  builder_annual: "https://arcform.lemonsqueezy.com/checkout/buy/1929f63c-f341-475e-a780-320e6c394970",
  pro_monthly:    "https://arcform.lemonsqueezy.com/checkout/buy/faa77507-88bc-4e2d-a868-3d0e3fe6119b",
  pro_annual:     "https://arcform.lemonsqueezy.com/checkout/buy/4d3b7572-4960-4d4b-9af7-6c94360af801",
};

function PricingPage(){
  const[annual,setAnnual]=useState(false);

  const plans=[
    {
      name:"Starter",
      price:{monthly:"Free",annual:"Free"},
      period:{monthly:"forever",annual:"forever"},
      link:{monthly:null,annual:null},
      popular:false,cta:"Start Free",ctaClass:"ghost",
      features:[
        {ok:true, text:"3 blueprints per month"},
        {ok:true, text:"Automation / App / Hybrid comparison"},
        {ok:true, text:"Markdown export"},
        {ok:true, text:"Complexity score"},
        {ok:false,text:"Blueprint history",dim:true},
        {ok:false,text:"PDF export",dim:true},
        {ok:false,text:"JSON download",dim:true},
        {ok:false,text:"Unlimited blueprints",dim:true},
      ]
    },
    {
      name:"Builder",
      price:{monthly:"$9",annual:"$90"},
      period:{monthly:"per month",annual:"per year · save $18"},
      link:{monthly:LS_LINKS.builder_monthly, annual:LS_LINKS.builder_annual},
      popular:true,cta:"Start Building",ctaClass:"main",
      features:[
        {ok:true,text:"Unlimited blueprints"},
        {ok:true,text:"Everything in Starter"},
        {ok:true,text:"Blueprint history (saved)"},
        {ok:true,text:"PDF download & print"},
        {ok:true,text:"JSON download"},
        {ok:true,text:"Priority AI generation"},
        {ok:false,text:"Team sharing",dim:true},
        {ok:false,text:"API access",dim:true},
      ]
    },
    {
      name:"Pro",
      price:{monthly:"$29",annual:"$290"},
      period:{monthly:"per month",annual:"per year · save $58"},
      link:{monthly:LS_LINKS.pro_monthly, annual:LS_LINKS.pro_annual},
      popular:false,cta:"Go Pro",ctaClass:"outline",
      features:[
        {ok:true,text:"Everything in Builder"},
        {ok:true,text:"Team sharing & collaboration"},
        {ok:true,text:"Custom branding on PDF"},
        {ok:true,text:"Notion & Linear export"},
        {ok:true,text:"API access"},
        {ok:true,text:"Priority support"},
        {ok:true,text:"Early access to new features"},
      ]
    }
  ];

  return(
    <div className="pricing-wrap">
      <div className="pricing-hero">
        <div className="pricing-h">Simple, <em>honest</em> pricing</div>
        <div className="pricing-sub">Start free. Upgrade when your ideas deserve more.</div>

        {/* Monthly / Annual toggle */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginTop:24}}>
          <span style={{fontFamily:"var(--mono)",fontSize:12,color:!annual?"var(--txt)":"var(--muted)",fontWeight:700}}>Monthly</span>
          <div onClick={()=>setAnnual(!annual)} style={{width:48,height:26,borderRadius:13,background:annual?"var(--P)":"var(--brd)",cursor:"pointer",position:"relative",transition:"background .25s"}}>
            <div style={{position:"absolute",top:3,left:annual?22:3,width:20,height:20,borderRadius:"50%",background:"#fff",transition:"left .25s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
          </div>
          <span style={{fontFamily:"var(--mono)",fontSize:12,color:annual?"var(--txt)":"var(--muted)",fontWeight:700}}>
            Annual <span style={{background:"rgba(230,57,70,.1)",color:"var(--P)",padding:"1px 7px",borderRadius:8,fontSize:10,fontWeight:800,marginLeft:4}}>2 months free</span>
          </span>
        </div>
      </div>

      <div className="pricing-grid">
        {plans.map(p=>{
          const price=p.price[annual?"annual":"monthly"];
          const period=p.period[annual?"annual":"monthly"];
          const link=p.link[annual?"annual":"monthly"];
          return(
            <div key={p.name} className={`plan-card ${p.popular?"popular":""}`}>
              {p.popular&&<div className="plan-badge">Most Popular</div>}
              <div className="plan-name">{p.name}</div>
              <div className="plan-price">
                {price==="Free"?price:<>{price}<span>{annual?"/yr":"/mo"}</span></>}
              </div>
              <div className="plan-period">{period}</div>
              <div className="plan-divider"/>
              {p.features.map((f,i)=>(
                <div key={i} className={`plan-feature ${f.dim?"dim":""}`}>
                  <span className={`plan-check ${f.ok?"":"no"}`}>{f.ok?"✓":"✕"}</span>
                  <span>{f.text}</span>
                </div>
              ))}
              {link
                ? <a href={link} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                    <button className={`btn plan-cta ${p.ctaClass}`} style={{width:"100%"}}>{p.cta}</button>
                  </a>
                : <button className={`btn plan-cta ${p.ctaClass}`}>{p.cta}</button>
              }
            </div>
          );
        })}
      </div>
      <div className="pricing-note">No credit card required for Starter · Cancel anytime · Prices in USD</div>
    </div>
  );
}

// ── HistoryPanel ───────────────────────────────────────────────
function HistoryPanel({history,onLoad,onDelete,onClear}){
  return(
    <div className="main">
      <div className="h1">Your <em>Blueprints</em></div>
      <div className="sub">All blueprints are saved locally in your browser.</div>
      {history.length===0
        ?<div className="hist-empty">No blueprints yet. Generate your first one!</div>
        :<>
          <div className="hist-count">{history.length} blueprint{history.length!==1?"s":""} saved</div>
          <div className="hist-grid">
            {history.map(item=>(
              <div key={item.id} className="hist-card" onClick={()=>onLoad(item)}>
                <div className="hist-info">
                  <div className="hist-name">{item.project_name||"Untitled Blueprint"}</div>
                  <div className="hist-meta">
                    <span className="hist-type">{item.selected_type}</span>
                    <span>{item.date}</span>
                    <span>{item.prompt?.slice(0,48)}{item.prompt?.length>48?"…":""}</span>
                  </div>
                </div>
                <div className="hist-actions" onClick={e=>e.stopPropagation()}>
                  <button className="hist-btn" onClick={()=>onLoad(item)}>Open</button>
                  <button className="hist-btn del" onClick={()=>onDelete(item.id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
          {history.length>0&&<div className="row" style={{marginTop:20}}><button className="btn btn-g" onClick={onClear}>Clear All History</button></div>}
        </>
      }
    </div>
  );
}

// ── ROOT APP ───────────────────────────────────────────────────
export default function App(){
  const[dark,setDark]=useState(false);
  const[page,setPage]=useState("app"); // app | history | pricing
  const[screen,setScreen]=useState("Home");
  const[userPrompt,setUP]=useState("");
  const[ideaSummary,setIS]=useState("");
  const[comparison,setComp]=useState(null);
  const[selectedType,setST]=useState("");
  const[buildPlan,setBP]=useState(null);
  const[loading,setLoading]=useState(false);
  const[loadMsg,setLM]=useState("");
  const[error,setError]=useState(null);
  const[toast,setToast]=useState(null);
  const[planFmt,setPlanFmt]=useState("JSON");
  const[showRaw,setShowRaw]=useState(false);
  const[history,setHistory]=useState(()=>loadHistory());

  useEffect(()=>{
    const mq=window.matchMedia("(prefers-color-scheme: dark)");
    setDark(mq.matches);
    mq.addEventListener("change",e=>setDark(e.matches));
  },[]);

  function showToast(m){setToast(m);setTimeout(()=>setToast(null),2400);}

  // ── Save to history ──
  function saveToHistory(bp,prompt){
    const item={
      id:Date.now(),
      project_name:bp.project_name||"Untitled",
      selected_type:bp.selected_type||"",
      prompt:prompt,
      date:new Date().toLocaleDateString(),
      buildPlan:bp,
      ideaSummary,
      comparison,
    };
    const updated=[item,...history].slice(0,20);
    setHistory(updated);
    saveHistory(updated);
  }

  function deleteHistory(id){
    const updated=history.filter(h=>h.id!==id);
    setHistory(updated);saveHistory(updated);showToast("Deleted ✓");
  }
  function clearHistory(){setHistory([]);saveHistory([]);showToast("History cleared");}

  function loadFromHistory(item){
    setUP(item.prompt||"");
    setIS(item.ideaSummary||"");
    setComp(item.comparison||null);
    setST(item.buildPlan?.selected_type||"");
    setBP(item.buildPlan);
    setPlanFmt("JSON");
    setPage("app");
    setScreen("BuildPlanScreen");
    showToast("Blueprint loaded ✓");
  }

  // ── Step 1 ──
  async function AI_generate_comparison(){
    if(!userPrompt.trim())return;
    setError(null);setLoading(true);setLM("Analysing idea…");
    try{
      const sys=`You are a software architect. Output ONLY a raw JSON object, no markdown, no explanation.
Schema: {"idea_summary":"string","comparison":[{"type":"Automation","pros":["string"],"cons":["string"],"complexity":"Low|Medium|High","time":"string","cost":"Low|Medium|High"},{"type":"App","pros":[],"cons":[],"complexity":"","time":"","cost":""},{"type":"Hybrid","pros":[],"cons":[],"complexity":"","time":"","cost":""}]}`;
      const d=await callClaude(sys,"Idea: "+userPrompt);
      setIS(d.idea_summary||"");setComp(d.comparison||[]);
      setST("");setBP(null);setPlanFmt("JSON");setScreen("ComparisonScreen");
    }catch(e){console.error(e);setError("Error: "+e.message);}
    finally{setLoading(false);}
  }

  // ── Step 2 ──
  async function trigger_build_plan(){
    if(!selectedType)return;
    setError(null);setLoading(true);setLM("Building blueprint…");
    try{
      const sys=`You are a senior product lead. Output ONLY a raw JSON object, no markdown, no explanation.
Required fields: project_name (string), selected_type (string), summary (string), phases (array of 5 objects).
Phase 1: {phase:"1. Define MVP", objectives:[], deliverables:[]}
Phase 2: {phase:"2. Minimal Architecture", objectives:[], deliverables:[], tech_stack:[]}
Phase 3: {phase:"3. Task Breakdown & Sprints", tasks:[], sprints:[{week:"1-2",focus:""},{week:"3-4",focus:""},{week:"5-6",focus:""}]}
Phase 4: {phase:"4. Risk Management", risks:[{risk:"",level:"High|Medium|Low",mitigation:""}]}
Phase 5: {phase:"5. Execution & QA", objectives:[], qa_checks:[]}
Keep each array to 2-3 concise items.`;
      const d=await callClaude(sys,"Idea: "+userPrompt+". Type: "+selectedType);
      setBP(d);
      saveToHistory(d,userPrompt);
      setScreen("BuildPlanScreen");
      showToast("Blueprint saved to history ✓");
    }catch(e){console.error(e);setError("Error: "+e.message);}
    finally{setLoading(false);}
  }

  function copyText(t){navigator.clipboard.writeText(t);showToast("Copied ✓");}
  function dlJSON(obj,n){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:"application/json"}));a.download=n;a.click();showToast("Downloaded ✓");}
  function dlMarkdown(str,n){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([str],{type:"text/markdown"}));a.download=n;a.click();showToast("Downloaded ✓");}

  const mdStr=buildPlan?buildPlanToMarkdown(buildPlan):"";
  const stepOf={Home:1,ComparisonScreen:2,BuildPlanScreen:3};
  const curStep=stepOf[screen]||1;

  return(
    <>
      <style>{GFONTS+CSS}</style>
      <div className={`shell ${dark?"dk":""}`}>

        {/* NAV */}
        <nav className="nav">
          <div className="brand" onClick={()=>{setPage("app");setScreen("Home");}}>
            <div className="brand-dot"/>Arcform
          </div>
          <div className="nav-links">
            <button className={`nav-link ${page==="app"?"active":""}`} onClick={()=>setPage("app")}>Builder</button>
            <button className={`nav-link ${page==="history"?"active":""}`} onClick={()=>setPage("history")}>
              History {history.length>0&&`(${history.length})`}
            </button>
            <button className={`nav-link ${page==="pricing"?"active":""}`} onClick={()=>setPage("pricing")}>Pricing</button>
          </div>
          <div className="nav-r">
            <button className="btn-mode" onClick={()=>setDark(!dark)}>{dark?"☀ Day":"☾ Night"}</button>
          </div>
        </nav>

        {/* ── HISTORY PAGE ── */}
        {page==="history"&&(
          <HistoryPanel history={history} onLoad={loadFromHistory} onDelete={deleteHistory} onClear={clearHistory}/>
        )}

        {/* ── PRICING PAGE ── */}
        {page==="pricing"&&<PricingPage/>}

        {/* ── BUILDER ── */}
        {page==="app"&&(<>
          {/* Step bar */}
          <div className="sbar">
            {[{n:1,l:"Idea"},{n:2,l:"Compare"},{n:3,l:"Blueprint"}].map((s,i,arr)=>(
              <div className="si" key={s.n}>
                <div className={`sn ${curStep===s.n?"a":curStep>s.n?"d":""}`}>{curStep>s.n?"✓":s.n}</div>
                <div className={`sl ${curStep===s.n?"a":curStep>s.n?"d":""}`}>{s.l}</div>
                {i<arr.length-1&&<div className="sline"/>}
              </div>
            ))}
          </div>

          <main className="main">

            {/* HOME */}
            {screen==="Home"&&(
              <>
                <div className="h1">Turn your idea into a <em>blueprint</em></div>
                <div className="sub">Describe what you want to build — Arcform generates a full SOP plan across Automation, App, and Hybrid approaches.</div>
                <div className="card">
                  <label className="flabel">Your idea</label>
                  <textarea className="ta" placeholder="e.g., I want a system to manage AI prompts and generate blueprints automatically." value={userPrompt} onChange={e=>setUP(e.target.value)}/>
                  {error&&<div className="err">{error}</div>}
                  <div className="row">
                    <button className="btn btn-p" onClick={AI_generate_comparison} disabled={loading||!userPrompt.trim()}>
                      {loading?<><div className="spin" style={{width:14,height:14,borderWidth:2}}/>{loadMsg}</>:"Generate Comparison →"}
                    </button>
                    {history.length>0&&<button className="btn btn-g" onClick={()=>setPage("history")}>📋 History ({history.length})</button>}
                  </div>
                  {loading&&<div className="ldwrap"><div className="spin"/><div className="lt">{loadMsg}</div><div className="ls">Step 1 of 2</div></div>}
                </div>
              </>
            )}

            {/* COMPARISON */}
            {screen==="ComparisonScreen"&&comparison&&(
              <>
                <div className="h1">Choose your <em>approach</em></div>
                <div className="sub">{ideaSummary}</div>
                <div className="card">
                  <div className="fmeta">comparison_table · data_source: AI_output_comparison</div>
                  <div className="tbl-wrap">
                    <table>
                      <thead><tr>{["Type","Pros","Cons","Complexity","Time","Cost"].map(c=><th key={c}>{c}</th>)}</tr></thead>
                      <tbody>
                        {comparison.map(row=>(
                          <tr key={row.type} style={selectedType===row.type?{background:"rgba(230,57,70,.05)"}:{}}>
                            <td style={{fontFamily:"var(--mono)",fontWeight:700,color:"var(--P)",fontSize:12}}>{row.type}</td>
                            <td><ul className="pros">{(row.pros||[]).map((p,i)=><li key={i}>{p}</li>)}</ul></td>
                            <td><ul className="cons">{(row.cons||[]).map((c,i)=><li key={i}>{c}</li>)}</ul></td>
                            <td><span className={tc(row.complexity)}>{row.complexity}</span></td>
                            <td style={{whiteSpace:"nowrap",fontSize:12}}>{row.time}</td>
                            <td><span className={tc(row.cost)}>{row.cost}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card">
                  <label className="flabel">Select approach</label>
                  <select className="sel" value={selectedType} onChange={e=>setST(e.target.value)}>
                    <option value="">— Choose —</option>
                    <option value="Automation">Automation</option>
                    <option value="App">App</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  {selectedType&&<div className="sel-badge">✦ {selectedType} selected</div>}
                </div>
                {error&&<div className="err">{error}</div>}
                <div className="row">
                  <button className="btn btn-g" onClick={()=>{setScreen("Home");setError(null);}}>← Back</button>
                  <button className="btn btn-p" onClick={trigger_build_plan} disabled={!selectedType||loading}>
                    {loading?<><div className="spin" style={{width:14,height:14,borderWidth:2}}/>{loadMsg}</>:"Generate Blueprint →"}
                  </button>
                </div>
                {loading&&<div className="ldwrap"><div className="spin"/><div className="lt">{loadMsg}</div><div className="ls">Step 2 of 2</div></div>}
              </>
            )}

            {/* BLUEPRINT */}
            {screen==="BuildPlanScreen"&&buildPlan&&(
              <>
                <div className="h1">{buildPlan.project_name||"Your Blueprint"}</div>
                <div className="sub">{buildPlan.summary}</div>

                <ComplexityScore bp={buildPlan}/>

                <div className="vif">selected_type: {buildPlan.selected_type} · auto-saved to history ✓</div>

                <FormatBar fmt={planFmt} setFmt={setPlanFmt}/>

                {planFmt==="JSON"&&(
                  <div className="pl">
                    {(buildPlan.phases||[]).map((phase,i)=><PlanStep key={i} phase={phase} index={i}/>)}
                  </div>
                )}
                {planFmt==="Markdown"&&(
                  <div className="card"><MarkdownView content={mdStr}/></div>
                )}

                <div className="divider"/>

                <div className="row">
                  <button className="btn btn-p" style={{fontSize:11,padding:"9px 18px"}} onClick={()=>generatePDF(buildPlan,userPrompt)}>⬇ Download PDF</button>
                  <button className="btn btn-o" style={{fontSize:11,padding:"9px 18px"}} onClick={()=>dlMarkdown(mdStr,"blueprint.md")}>⬇ Markdown</button>
                  <button className="btn btn-g" onClick={()=>dlJSON({buildPlan,comparison,userPrompt},"blueprint.json")}>⬇ JSON</button>
                  <button className="btn btn-g" onClick={()=>copyText(mdStr)}>⊕ Copy</button>
                  <button className="btn btn-g" onClick={()=>setScreen("ComparisonScreen")}>← Back</button>
                  <button className="btn btn-g" onClick={()=>{setScreen("Home");setComp(null);setBP(null);setST("");setUP("");setIS("");setPlanFmt("JSON");setError(null);}}>↺ New</button>
                </div>

                {showRaw&&<div className="card" style={{marginTop:14}}><div className="json-pre">{JSON.stringify(buildPlan,null,2)}</div></div>}
              </>
            )}

          </main>
        </>)}

        {toast&&<div className="toast">{toast}</div>}
      </div>
    </>
  );
}
