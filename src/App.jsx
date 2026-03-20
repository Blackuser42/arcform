import { useState, useEffect, useRef } from "react";

const GFONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');`;

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --P:#E63946;--P2:#C1121F;--S:#F1FAEE;--A:#457B9D;--D:#1D3557;
  --bg:#F1FAEE;--surf:#fff;--surf2:#E8F3EE;--brd:#C8DFD5;
  --txt:#1D3557;--muted:#5A7890;
  --shad:0 2px 20px rgba(29,53,87,.09);--shad2:0 8px 40px rgba(29,53,87,.14);
  --r:8px;--mono:'JetBrains Mono',monospace;
}
.dk{--bg:#1D3557;--surf:#162840;--surf2:#0F1E2E;--brd:#2A4060;--txt:#F1FAEE;--muted:#7AAABB;
  --shad:0 2px 20px rgba(0,0,0,.28);--shad2:0 8px 40px rgba(0,0,0,.4);}
html,body{height:100%;font-family:'Lora',serif;background:var(--bg);color:var(--txt);transition:background .3s,color .3s}
.shell{min-height:100vh;display:flex;flex-direction:column;position:relative;overflow-x:hidden}
.shell::before{content:'';position:fixed;inset:0;
  background:radial-gradient(ellipse 70% 50% at 90% -10%,rgba(69,123,157,.12) 0%,transparent 55%),
             radial-gradient(ellipse 50% 40% at -5% 95%,rgba(230,57,70,.08) 0%,transparent 50%);
  pointer-events:none;z-index:0}

.nav{position:relative;z-index:30;height:62px;display:flex;align-items:center;justify-content:space-between;
  padding:0 32px;border-bottom:1px solid var(--brd);background:rgba(241,250,238,.92);backdrop-filter:blur(16px)}
.dk .nav{background:rgba(22,40,64,.92)}
.brand{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;letter-spacing:.03em;color:var(--txt);
  display:flex;align-items:center;gap:9px;cursor:pointer}
.brand-dot{width:9px;height:9px;border-radius:50%;background:var(--P);box-shadow:0 0 0 3px rgba(230,57,70,.2)}
.nav-links{display:flex;align-items:center;gap:4px}
.nav-link{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;
  padding:7px 14px;border-radius:var(--r);cursor:pointer;border:none;background:transparent;color:var(--muted);transition:all .2s}
.nav-link:hover{color:var(--txt);background:var(--surf2)}
.nav-link.active{color:var(--P);background:rgba(230,57,70,.07)}
.nav-r{display:flex;align-items:center;gap:8px}
.btn-mode{background:var(--surf2);border:1px solid var(--brd);color:var(--muted);border-radius:20px;
  padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Syne',sans-serif;
  letter-spacing:.06em;text-transform:uppercase;transition:all .2s}
.btn-mode:hover{border-color:var(--A);color:var(--A)}

.pbar{position:relative;z-index:10;max-width:760px;margin:0 auto;width:100%;padding:24px 32px 0;display:flex;align-items:center}
.pbi{display:flex;align-items:center;gap:8px;flex:1}.pbi:last-child{flex:0}
.pbn{width:32px;height:32px;border-radius:50%;border:2px solid var(--brd);display:flex;align-items:center;
  justify-content:center;font-family:var(--mono);font-size:12px;font-weight:700;color:var(--muted);
  background:var(--surf);transition:all .3s;flex-shrink:0}
.pbn.a{border-color:var(--P);color:var(--P);background:rgba(230,57,70,.08)}
.pbn.d{border-color:var(--A);background:var(--A);color:#fff}
.pbl{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;
  letter-spacing:.08em;color:var(--muted);white-space:nowrap}
.pbl.a{color:var(--P)}.pbl.d{color:var(--A)}
.pbline{flex:1;height:1px;background:var(--brd);margin:0 6px;opacity:.6}

.main{position:relative;z-index:5;max-width:760px;margin:0 auto;width:100%;padding:28px 32px 80px}
.h1{font-family:'Syne',sans-serif;font-size:30px;font-weight:800;line-height:1.15;margin-bottom:6px;letter-spacing:-.01em}
.h1 em{color:var(--P);font-style:normal}
.sub{font-size:14px;color:var(--muted);margin-bottom:24px;line-height:1.75;font-family:'Lora',serif;font-style:italic}
.card{background:var(--surf);border:1px solid var(--brd);border-radius:var(--r);padding:22px 24px;box-shadow:var(--shad)}
.card+.card{margin-top:12px}

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
.row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:14px}
.divider{height:1px;background:var(--brd);margin:20px 0}
.ta{width:100%;min-height:110px;background:var(--surf2);border:1.5px solid var(--brd);border-radius:var(--r);
  color:var(--txt);font-family:'Lora',serif;font-size:15px;line-height:1.75;padding:13px 15px;
  resize:vertical;outline:none;transition:border-color .2s}
.ta:focus{border-color:var(--A)}
.ta::placeholder{color:var(--muted);opacity:.6}

/* CHAT */
.chat-wrap{display:flex;flex-direction:column;background:var(--surf);border:1px solid var(--brd);
  border-radius:var(--r);overflow:hidden;box-shadow:var(--shad)}
.chat-msgs{padding:20px;display:flex;flex-direction:column;gap:14px;min-height:260px;max-height:400px;overflow-y:auto}
.chat-msgs::-webkit-scrollbar{width:4px}
.chat-msgs::-webkit-scrollbar-thumb{background:var(--brd);border-radius:2px}
.msg{display:flex;gap:10px;align-items:flex-start;animation:msgIn .25s ease}
@keyframes msgIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.msg.user{flex-direction:row-reverse}
.msg-av{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-size:13px;flex-shrink:0;margin-top:2px;font-family:'Syne',sans-serif;font-weight:800}
.msg.ai .msg-av{background:var(--P);color:#fff}
.msg.user .msg-av{background:var(--A);color:#fff}
.msg-bub{max-width:82%;padding:11px 15px;border-radius:12px;font-size:14px;line-height:1.65;font-family:'Lora',serif}
.msg.ai .msg-bub{background:var(--surf2);color:var(--txt);border-bottom-left-radius:3px}
.msg.user .msg-bub{background:var(--A);color:#fff;border-bottom-right-radius:3px}
.msg-bub strong{font-weight:700}
.typing{display:flex;gap:5px;align-items:center;padding:4px 0}
.typing span{width:7px;height:7px;border-radius:50%;background:var(--muted);animation:bounce .9s infinite}
.typing span:nth-child(2){animation-delay:.15s}.typing span:nth-child(3){animation-delay:.3s}
@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
.chat-inp-wrap{display:flex;border-top:1px solid var(--brd);background:var(--surf2)}
.chat-inp{flex:1;background:transparent;border:none;padding:14px 16px;font-family:'Lora',serif;
  font-size:14px;color:var(--txt);outline:none;resize:none;min-height:52px;max-height:120px}
.chat-inp::placeholder{color:var(--muted);opacity:.6}
.chat-send{background:var(--P);border:none;color:#fff;padding:0 20px;cursor:pointer;
  font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em;
  text-transform:uppercase;transition:background .2s;flex-shrink:0}
.chat-send:hover:not(:disabled){background:var(--P2)}
.chat-send:disabled{opacity:.4;cursor:not-allowed}

/* RECOMMENDATION */
.rec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px}
@media(max-width:640px){.rec-grid{grid-template-columns:1fr}}
.rec-card{border:2px solid var(--brd);border-radius:var(--r);padding:18px;cursor:pointer;
  transition:all .25s;background:var(--surf);position:relative}
.rec-card:hover{border-color:var(--A);transform:translateY(-2px)}
.rec-card.sel{border-color:var(--P);box-shadow:0 0 0 1px var(--P),0 6px 24px rgba(230,57,70,.12)}
.rec-badge{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--P);
  color:#fff;font-family:'Syne',sans-serif;font-size:9px;font-weight:800;letter-spacing:.1em;
  text-transform:uppercase;padding:2px 12px;border-radius:10px;white-space:nowrap}
.rec-type{font-family:'Syne',sans-serif;font-size:14px;font-weight:800;color:var(--P);margin-bottom:6px}
.rec-why{font-size:12px;color:var(--muted);line-height:1.55;margin-bottom:10px;font-family:'Lora',serif}
.rec-meta{display:flex;flex-direction:column;gap:5px}
.rec-row{display:flex;justify-content:space-between;align-items:center;font-size:11px}
.rec-key{color:var(--muted);font-family:var(--mono);text-transform:uppercase;letter-spacing:.06em}
.tag{display:inline-block;padding:2px 8px;border-radius:8px;font-family:var(--mono);font-size:10px;font-weight:700}
.tg{background:rgba(34,197,94,.1);color:#15803d}.dk .tg{color:#4ade80}
.ty{background:rgba(234,179,8,.11);color:#a16207}.dk .ty{color:#facc15}
.tr{background:rgba(230,57,70,.1);color:#c1121f}.dk .tr{color:#ff6b6b}

/* BLUEPRINT */
.cx-wrap{display:flex;align-items:center;gap:10px;margin-bottom:14px;padding:9px 14px;
  background:var(--surf2);border:1px solid var(--brd);border-radius:var(--r)}
.cx-label{font-family:var(--mono);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--muted)}
.cx-bar{flex:1;height:5px;background:var(--brd);border-radius:3px;overflow:hidden}
.cx-fill{height:100%;border-radius:3px;transition:width .6s ease}
.cx-val{font-family:'Syne',sans-serif;font-size:12px;font-weight:800;letter-spacing:.06em}
.tools-row{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:14px}
.tool-chip{display:flex;align-items:center;gap:6px;background:var(--surf);border:1px solid var(--brd);
  border-radius:20px;padding:5px 12px;font-size:12px;font-family:var(--mono);color:var(--txt)}
.tool-dot{width:7px;height:7px;border-radius:50%;background:var(--P);flex-shrink:0}
.fmt-bar{display:flex;align-items:center;border:1.5px solid var(--brd);border-radius:var(--r);
  overflow:hidden;width:fit-content;margin-bottom:14px}
.fmt-btn{padding:7px 16px;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;
  text-transform:uppercase;letter-spacing:.09em;cursor:pointer;border:none;background:transparent;color:var(--muted);transition:all .2s}
.fmt-btn.active{background:var(--D);color:#F1FAEE}
.dk .fmt-btn.active{background:var(--A)}
.pl{display:flex;flex-direction:column;gap:10px}
.pi{border:1px solid var(--brd);border-radius:var(--r);overflow:hidden;background:var(--surf)}
.ph{display:flex;align-items:center;gap:12px;padding:13px 16px;cursor:pointer;
  border-bottom:1px solid transparent;user-select:none;transition:background .15s}
.ph:hover{background:rgba(69,123,157,.04)}.ph.open{border-color:var(--brd)}
.pnum{width:27px;height:27px;border-radius:50%;background:var(--P);color:#fff;display:flex;
  align-items:center;justify-content:center;font-family:var(--mono);font-size:12px;font-weight:500;flex-shrink:0}
.ptitle{flex:1;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--txt)}
.ptl{font-family:var(--mono);font-size:10px;color:var(--muted);background:var(--surf2);padding:2px 8px;border-radius:4px;flex-shrink:0}
.pchev{color:var(--muted);font-size:16px;transition:transform .3s}
.pchev.open{transform:rotate(180deg)}
.pb{padding:16px 16px 16px 55px}
.ps-lbl{font-family:var(--mono);font-size:10px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--A);margin-bottom:7px}
.ps{margin-bottom:14px}.ps:last-child{margin-bottom:0}
.pli{display:flex;gap:9px;font-size:13px;line-height:1.65;color:var(--txt);margin-bottom:5px;font-family:'Lora',serif}
.pli::before{content:'→';color:var(--P);flex-shrink:0;margin-top:1px;font-family:'Syne',sans-serif}
.sg{display:grid;grid-template-columns:60px 1fr;gap:5px 12px;font-size:13px;font-family:'Lora',serif}
.sw{font-family:var(--mono);font-size:10px;font-weight:700;color:var(--P);text-transform:uppercase;letter-spacing:.08em;padding-top:2px}
.rb{display:grid;grid-template-columns:1fr 65px 1fr;gap:10px;padding:9px 11px;border:1px solid var(--brd);
  border-radius:var(--r);margin-bottom:6px;font-size:12px;font-family:'Lora',serif}
.rl{font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);margin-bottom:3px}
.chips{display:flex;flex-wrap:wrap;gap:5px}
.chip{background:var(--surf2);border:1px solid var(--brd);border-radius:3px;padding:2px 9px;font-size:10px;font-family:var(--mono);color:var(--muted)}
.md-view{font-family:'Lora',serif;font-size:14px;line-height:1.85;color:var(--txt)}
.md-view h1{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:var(--P);margin:0 0 4px}
.md-view h2{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:var(--D);margin:18px 0 7px;
  padding-bottom:4px;border-bottom:1px solid var(--brd);text-transform:uppercase;letter-spacing:.07em}
.dk .md-view h2{color:var(--S)}
.md-view h3{font-family:'Syne',sans-serif;font-size:12px;font-weight:700;color:var(--A);margin:12px 0 5px;text-transform:uppercase;letter-spacing:.08em}
.md-view p{margin-bottom:8px;color:var(--muted);font-style:italic}
.md-view ul{padding-left:18px;margin-bottom:8px}.md-view li{margin-bottom:4px}
.md-view strong{color:var(--P);font-weight:600;font-style:normal}
.md-view code{font-family:var(--mono);font-size:11px;background:var(--surf2);padding:1px 6px;border-radius:3px;color:var(--A)}
.md-view table{width:100%;border-collapse:collapse;margin:10px 0;font-size:13px}
.md-view th{background:var(--D);color:#F1FAEE;padding:7px 11px;text-align:left;font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase}
.dk .md-view th{background:rgba(69,123,157,.22)}
.md-view td{padding:7px 11px;border:1px solid var(--brd)}
.md-view blockquote{border-left:3px solid var(--P);padding-left:13px;margin:9px 0;color:var(--muted)}
.md-sep{border:none;border-top:1px dashed var(--brd);margin:14px 0}
.json-pre{background:var(--D);color:#a8d8a8;border-radius:var(--r);padding:16px;font-family:var(--mono);
  font-size:11px;line-height:1.7;overflow:auto;max-height:340px;white-space:pre-wrap;word-break:break-all}
.dk .json-pre{background:#080d15}

/* HISTORY */
.hist-grid{display:flex;flex-direction:column;gap:10px;margin-top:4px}
.hist-card{background:var(--surf);border:1px solid var(--brd);border-radius:var(--r);padding:14px 16px;
  cursor:pointer;transition:all .2s;display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.hist-card:hover{border-color:var(--A);box-shadow:var(--shad)}
.hist-info{flex:1;min-width:0}
.hist-name{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--txt);
  margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hist-meta{font-family:var(--mono);font-size:10px;color:var(--muted);display:flex;gap:10px;flex-wrap:wrap}
.hist-type{background:rgba(69,123,157,.12);color:var(--A);padding:1px 7px;border-radius:3px;font-weight:600}
.hist-actions{display:flex;gap:6px;flex-shrink:0}
.hist-btn{background:transparent;border:1px solid var(--brd);color:var(--muted);border-radius:3px;
  padding:4px 10px;font-family:var(--mono);font-size:10px;cursor:pointer;transition:all .2s}
.hist-btn:hover{border-color:var(--P);color:var(--P)}

/* PRICING */
.pricing-wrap{max-width:760px;margin:0 auto;padding:32px 32px 80px;position:relative;z-index:5}
.pricing-hero{text-align:center;margin-bottom:44px}
.pricing-h{font-family:'Syne',sans-serif;font-size:34px;font-weight:800;letter-spacing:-.01em;margin-bottom:10px}
.pricing-h em{color:var(--P);font-style:normal}
.pricing-sub{font-family:'Lora',serif;font-size:15px;color:var(--muted);font-style:italic}
.pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:660px){.pricing-grid{grid-template-columns:1fr}}
.plan-card{background:var(--surf);border:1.5px solid var(--brd);border-radius:var(--r);padding:24px 20px;position:relative;transition:all .25s}
.plan-card.popular{border-color:var(--P);box-shadow:0 0 0 1px var(--P),0 8px 32px rgba(230,57,70,.12)}
.plan-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:var(--P);color:#fff;
  font-family:'Syne',sans-serif;font-size:9px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  padding:3px 14px;border-radius:12px;white-space:nowrap}
.plan-name{font-family:'Syne',sans-serif;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:10px}
.plan-price{font-family:'Syne',sans-serif;font-size:36px;font-weight:800;color:var(--txt);line-height:1;margin-bottom:4px}
.plan-price span{font-size:15px;font-weight:600;color:var(--muted);vertical-align:top;margin-top:7px;display:inline-block}
.plan-period{font-family:var(--mono);font-size:10px;color:var(--muted);margin-bottom:16px}
.plan-div{height:1px;background:var(--brd);margin-bottom:16px}
.plan-feat{display:flex;align-items:flex-start;gap:9px;font-size:13px;font-family:'Lora',serif;color:var(--txt);margin-bottom:8px;line-height:1.5}
.plan-ck{color:var(--A);font-size:13px;flex-shrink:0;margin-top:1px}
.plan-ck.no{color:var(--brd)}.plan-feat.dim{color:var(--muted);opacity:.55}
.plan-cta{width:100%;margin-top:18px;padding:11px;font-size:11px}
.plan-cta.main{background:var(--P);color:#fff;border:none;box-shadow:0 3px 16px rgba(230,57,70,.28)}
.plan-cta.main:hover{background:var(--P2);transform:translateY(-1px)}
.plan-cta.outline{background:transparent;border:1.5px solid var(--A);color:var(--A)}
.plan-cta.outline:hover{background:rgba(69,123,157,.1)}
.plan-cta.ghost{background:transparent;border:1.5px solid var(--brd);color:var(--muted)}
.pricing-note{text-align:center;margin-top:24px;font-family:'Lora',serif;font-size:13px;color:var(--muted);font-style:italic}

.spin{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:sp .7s linear infinite;display:inline-block}
.spin.dark{border-color:rgba(230,57,70,.2);border-top-color:var(--P)}
@keyframes sp{to{transform:rotate(360deg)}}
.err{background:rgba(230,57,70,.07);border:1px solid var(--P);border-radius:var(--r);padding:11px 15px;color:var(--P);font-size:13px;margin-top:11px;font-family:'Lora',serif;font-style:italic}
.toast{position:fixed;bottom:24px;right:24px;z-index:9999;background:var(--D);color:#F1FAEE;border:1px solid var(--A);
  border-radius:var(--r);padding:10px 18px;font-family:'Syne',sans-serif;font-size:12px;font-weight:700;
  letter-spacing:.06em;box-shadow:var(--shad2);animation:fu .3s ease}
@keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:620px){
  .main,.nav,.pbar,.pricing-wrap{padding-left:16px;padding-right:16px}
  .h1,.pricing-h{font-size:24px}.rb{grid-template-columns:1fr}.sg{grid-template-columns:1fr}.nav-links{display:none}
}
`;

// ── Groq API ───────────────────────────────────────────────────
async function callGroq(systemPrompt, messages) {
  const key = import.meta.env.VITE_GROQ_API_KEY;
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", max_tokens: 4000, temperature: 0.4,
      messages: [
        { role: "system", content: systemPrompt + "\n\nIMPORTANT: Output ONLY a raw JSON object. No markdown fences, no text before or after. Start with { end with }." },
        ...messages
      ]
    })
  });
  if (!res.ok) { const e = await res.text(); throw new Error("API " + res.status + ": " + e); }
  const d = await res.json();
  const raw = d.choices?.[0]?.message?.content || "";
  const first = raw.indexOf("{"), last = raw.lastIndexOf("}");
  if (first === -1 || last === -1) throw new Error("No JSON found in response");
  return JSON.parse(raw.slice(first, last + 1));
}

// ── Storage ────────────────────────────────────────────────────
const HKEY = "arcform_v2";
function loadHist() { try { return JSON.parse(localStorage.getItem(HKEY) || "[]"); } catch { return []; } }
function saveHist(h) { try { localStorage.setItem(HKEY, JSON.stringify(h)); } catch {} }

// ── Utils ──────────────────────────────────────────────────────
function tc(v) { const s = String(v).toLowerCase(); if (s === "low" || s === "fast") return "tag tg"; if (s === "medium") return "tag ty"; return "tag tr"; }
function getCX(bp) {
  if (!bp) return { score: 0, label: "—", color: "#ccc" };
  const t = (bp.phases || []).reduce((a, p) => a + (p.risks ? p.risks.filter(r => r.level === "High").length * 3 : 0) + (p.tasks ? p.tasks.length : 0) + (p.sprints ? p.sprints.length : 0), 0);
  if (t > 14) return { score: 88, label: "High", color: "#E63946" };
  if (t > 7) return { score: 52, label: "Medium", color: "#f4a261" };
  return { score: 26, label: "Low", color: "#2a9d8f" };
}

function mdInline(s) { return s.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>"); }

function MarkdownView({ content }) {
  const lines = content.split("\n"); const els = []; let tb = null; let i = 0;
  const flush = () => { if (!tb) return; const [h, , ...rows] = tb; const hs = h.split("|").map(s => s.trim()).filter(Boolean); els.push(<table key={"t" + els.length}><thead><tr>{hs.map((hh, j) => <th key={j} dangerouslySetInnerHTML={{ __html: mdInline(hh) }} />)}</tr></thead><tbody>{rows.map((r, ri) => { const cs = r.split("|").map(s => s.trim()).filter(Boolean); return <tr key={ri}>{cs.map((c, ci) => <td key={ci} dangerouslySetInnerHTML={{ __html: mdInline(c) }} />)}</tr>; })}</tbody></table>); tb = null; };
  while (i < lines.length) {
    const l = lines[i];
    if (l.trim().startsWith("|")) { if (!tb) tb = []; tb.push(l.trim()); i++; continue; } else flush();
    if (l.startsWith("# ")) els.push(<h1 key={i} dangerouslySetInnerHTML={{ __html: mdInline(l.slice(2)) }} />);
    else if (l.startsWith("## ")) els.push(<h2 key={i} dangerouslySetInnerHTML={{ __html: mdInline(l.slice(3)) }} />);
    else if (l.startsWith("### ")) els.push(<h3 key={i} dangerouslySetInnerHTML={{ __html: mdInline(l.slice(4)) }} />);
    else if (l.startsWith("- ")) els.push(<ul key={i}><li dangerouslySetInnerHTML={{ __html: mdInline(l.slice(2)) }} /></ul>);
    else if (l.startsWith("> ")) els.push(<blockquote key={i} dangerouslySetInnerHTML={{ __html: mdInline(l.slice(2)) }} />);
    else if (l.trim() === "---") els.push(<hr key={i} className="md-sep" />);
    else if (l.trim()) els.push(<p key={i} dangerouslySetInnerHTML={{ __html: mdInline(l) }} />);
    i++;
  } flush();
  return <div className="md-view">{els}</div>;
}

function bpToMd(bp) {
  if (!bp) return "";
  let md = `# ${bp.project_name || "Blueprint"}\n\n> ${bp.summary || ""}\n\n**Type:** \`${bp.selected_type}\`\n\n`;
  if (bp.tools?.length) md += `**Tools:** ${bp.tools.join(" · ")}\n\n---\n\n`;
  (bp.phases || []).forEach((p, i) => {
    md += `## ${p.phase}\n\n`;
    if (p.timeline) md += `*${p.timeline}*\n\n`;
    if (p.objectives) { md += `### Objectives\n`; p.objectives.forEach(o => { md += `- ${o}\n`; }); md += "\n"; }
    if (p.deliverables) { md += `### Deliverables\n`; p.deliverables.forEach(d => { md += `- ${d}\n`; }); md += "\n"; }
    if (p.tasks) { md += `### Tasks\n`; p.tasks.forEach(t => { md += `- ${t}\n`; }); md += "\n"; }
    if (p.tech_stack) { md += `### Tech Stack\n`; p.tech_stack.forEach(t => { md += `- \`${t}\`\n`; }); md += "\n"; }
    if (p.sprints) { md += `### Sprints\n\n| Week | Focus |\n|------|-------|\n`; p.sprints.forEach(s => { md += `| ${s.week} | ${s.focus} |\n`; }); md += "\n"; }
    if (p.risks) { md += `### Risks\n\n| Risk | Level | Mitigation |\n|------|-------|------------|\n`; p.risks.forEach(r => { md += `| ${r.risk} | **${r.level}** | ${r.mitigation} |\n`; }); md += "\n"; }
    if (p.qa_checks) { md += `### QA\n`; p.qa_checks.forEach(q => { md += `- ${q}\n`; }); md += "\n"; }
    if (i < (bp.phases || []).length - 1) md += "---\n\n";
  });
  return md;
}

function generatePDF(bp, idea) {
  const phases = (bp.phases || []).map(p => {
    let h = `<div class="phase"><h2>${p.phase}</h2>`;
    if (p.timeline) h += `<p class="tl">${p.timeline}</p>`;
    if (p.objectives) h += `<h3>Objectives</h3><ul>${p.objectives.map(o => `<li>${o}</li>`).join("")}</ul>`;
    if (p.deliverables) h += `<h3>Deliverables</h3><ul>${p.deliverables.map(d => `<li>${d}</li>`).join("")}</ul>`;
    if (p.tasks) h += `<h3>Tasks</h3><ul>${p.tasks.map(t => `<li>${t}</li>`).join("")}</ul>`;
    if (p.tech_stack) h += `<h3>Tech Stack</h3><p>${p.tech_stack.join(" · ")}</p>`;
    if (p.sprints) h += `<h3>Sprints</h3><table><tr><th>Week</th><th>Focus</th></tr>${p.sprints.map(s => `<tr><td>${s.week}</td><td>${s.focus}</td></tr>`).join("")}</table>`;
    if (p.risks) h += `<h3>Risks</h3><table><tr><th>Risk</th><th>Level</th><th>Mitigation</th></tr>${p.risks.map(r => `<tr><td>${r.risk}</td><td><b>${r.level}</b></td><td>${r.mitigation}</td></tr>`).join("")}</table>`;
    if (p.qa_checks) h += `<h3>QA</h3><ul>${p.qa_checks.map(q => `<li>${q}</li>`).join("")}</ul>`;
    return h + `</div>`;
  }).join("");
  const win = window.open("", "_blank", "width=900,height=700");
  win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${bp.project_name} — Arcform</title>
  <style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Georgia,serif;font-size:13px;line-height:1.7;color:#1D3557;padding:40px;max-width:760px;margin:0 auto}
  .header{border-bottom:2px solid #E63946;padding-bottom:16px;margin-bottom:28px}
  .brand{font-family:Arial;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#E63946;margin-bottom:6px}
  h1{font-family:Arial;font-size:24px;font-weight:800;color:#1D3557;margin-bottom:4px}
  .meta{font-size:12px;color:#5A7890;font-style:italic;margin-bottom:8px}
  .idea{background:#F1FAEE;border-left:3px solid #457B9D;padding:10px 14px;margin:12px 0;font-style:italic;color:#457B9D;font-size:13px}
  .tools{margin:10px 0;display:flex;flex-wrap:wrap;gap:6px}
  .tool{background:#F1FAEE;border:1px solid #C8DFD5;border-radius:4px;padding:2px 10px;font-family:monospace;font-size:11px}
  .phase{margin-bottom:26px;padding-bottom:18px;border-bottom:1px solid #C8DFD5}
  h2{font-family:Arial;font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:#E63946;margin:18px 0 10px}
  h3{font-family:Arial;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#457B9D;margin:10px 0 5px}
  .tl{font-style:italic;color:#5A7890;font-size:12px;margin-bottom:8px}
  ul{padding-left:18px}li{margin-bottom:4px}p{margin-bottom:6px}
  table{width:100%;border-collapse:collapse;margin:8px 0;font-size:12px}
  th{background:#1D3557;color:#F1FAEE;padding:6px 10px;text-align:left;font-family:Arial;font-size:10px;letter-spacing:.08em;text-transform:uppercase}
  td{padding:6px 10px;border-bottom:1px solid #C8DFD5}
  .footer{margin-top:28px;padding-top:14px;border-top:1px solid #C8DFD5;text-align:center;font-family:Arial;font-size:10px;color:#5A7890;letter-spacing:.06em;text-transform:uppercase}
  @media print{body{padding:20px}.phase{page-break-inside:avoid}}</style></head>
  <body><div class="header"><div class="brand">Arcform · Blueprint</div>
  <h1>${bp.project_name}</h1><div class="meta">${bp.selected_type} · ${new Date().toLocaleDateString()}</div>
  <div class="idea">"${idea}"</div><p>${bp.summary || ""}</p>
  <div class="tools">${(bp.tools || []).map(t => `<span class="tool">${t}</span>`).join("")}</div></div>
  ${phases}<div class="footer">arcform.vercel.app</div></body></html>`);
  win.document.close(); setTimeout(() => win.print(), 600);
}

// ── PlanStep ───────────────────────────────────────────────────
function PlanStep({ phase, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="pi">
      <div className={`ph ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
        <div className="pnum">{index + 1}</div>
        <div className="ptitle">{phase.phase}</div>
        {phase.timeline && <div className="ptl">{phase.timeline}</div>}
        <div className={`pchev ${open ? "open" : ""}`}>⌄</div>
      </div>
      {open && <div className="pb">
        {phase.objectives && <div className="ps"><div className="ps-lbl">Objectives</div>{phase.objectives.map((o, i) => <div className="pli" key={i}>{o}</div>)}</div>}
        {phase.deliverables && <div className="ps"><div className="ps-lbl">Deliverables</div>{phase.deliverables.map((d, i) => <div className="pli" key={i}>{d}</div>)}</div>}
        {phase.tasks && <div className="ps"><div className="ps-lbl">Tasks</div>{phase.tasks.map((t, i) => <div className="pli" key={i}>{t}</div>)}</div>}
        {phase.tech_stack && <div className="ps"><div className="ps-lbl">Tech Stack</div><div className="chips">{phase.tech_stack.map((t, i) => <span className="chip" key={i}>{t}</span>)}</div></div>}
        {phase.sprints && <div className="ps"><div className="ps-lbl">Sprints</div><div className="sg">{phase.sprints.map((s, i) => <span key={i} style={{ display: "contents" }}><div className="sw">Wk {s.week}</div><div>{s.focus}</div></span>)}</div></div>}
        {phase.risks && <div className="ps"><div className="ps-lbl">Risks</div>{phase.risks.map((r, i) => <div className="rb" key={i}><div><div className="rl">Risk</div>{r.risk}</div><div><div className="rl">Level</div><span className={tc(r.level)}>{r.level}</span></div><div><div className="rl">Mitigation</div>{r.mitigation}</div></div>)}</div>}
        {phase.qa_checks && <div className="ps"><div className="ps-lbl">QA</div>{phase.qa_checks.map((q, i) => <div className="pli" key={i}>{q}</div>)}</div>}
      </div>}
    </div>
  );
}

// ── Pricing ────────────────────────────────────────────────────
function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const plans = [
    { name: "Starter", price: { m: "Free", a: "Free" }, period: { m: "forever", a: "forever" }, link: { m: null, a: null }, popular: false, cta: "Start Free", cls: "ghost", features: [{ ok: true, t: "3 blueprints / month" }, { ok: true, t: "Phase 1 — AI analysis" }, { ok: true, t: "Phase 2 — Recommendation" }, { ok: false, t: "Phase 3 — Full blueprint", dim: true }, { ok: false, t: "PDF + JSON + Markdown", dim: true }, { ok: false, t: "History", dim: true }] },
    { name: "Builder", price: { m: "$12", a: "$99" }, period: { m: "per month", a: "per year · save $45" }, link: { m: "https://posta42db.gumroad.com/l/sujsy", a: "https://posta42db.gumroad.com/l/sujsy" }, popular: true, cta: "Start Building", cls: "main", features: [{ ok: true, t: "Unlimited blueprints" }, { ok: true, t: "All 3 phases" }, { ok: true, t: "Tool recommendations" }, { ok: true, t: "PDF + Markdown + JSON" }, { ok: true, t: "Blueprint history" }, { ok: false, t: "API access", dim: true }] },
    { name: "Pro", price: { m: "$29", a: "$249" }, period: { m: "per month", a: "per year · save $99" }, link: { m: "https://posta42db.gumroad.com/l/zlqsd", a: "https://posta42db.gumroad.com/l/zlqsd" }, popular: false, cta: "Go Pro", cls: "outline", features: [{ ok: true, t: "Everything in Builder" }, { ok: true, t: "API access" }, { ok: true, t: "Custom PDF branding" }, { ok: true, t: "Notion & Linear export" }, { ok: true, t: "Priority support" }, { ok: true, t: "Early feature access" }] }
  ];
  return (
    <div className="pricing-wrap">
      <div className="pricing-hero">
        <div className="pricing-h">Simple, <em>honest</em> pricing</div>
        <div className="pricing-sub">Start free. Upgrade when your ideas deserve more.</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 22 }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: !annual ? "var(--txt)" : "var(--muted)", fontWeight: 700 }}>Monthly</span>
          <div onClick={() => setAnnual(!annual)} style={{ width: 46, height: 25, borderRadius: 13, background: annual ? "var(--P)" : "var(--brd)", cursor: "pointer", position: "relative", transition: "background .25s" }}>
            <div style={{ position: "absolute", top: 3, left: annual ? 21 : 3, width: 19, height: 19, borderRadius: "50%", background: "#fff", transition: "left .25s", boxShadow: "0 1px 4px rgba(0,0,0,.2)" }} />
          </div>
          <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: annual ? "var(--txt)" : "var(--muted)", fontWeight: 700 }}>Annual <span style={{ background: "rgba(230,57,70,.1)", color: "var(--P)", padding: "1px 7px", borderRadius: 8, fontSize: 10, fontWeight: 800, marginLeft: 4 }}>2 months free</span></span>
        </div>
      </div>
      <div className="pricing-grid">
        {plans.map(p => {
          const price = p.price[annual ? "a" : "m"], period = p.period[annual ? "a" : "m"], link = p.link[annual ? "a" : "m"];
          return (
            <div key={p.name} className={`plan-card ${p.popular ? "popular" : ""}`}>
              {p.popular && <div className="plan-badge">Most Popular</div>}
              <div className="plan-name">{p.name}</div>
              <div className="plan-price">{price === "Free" ? price : <>{price}<span>{annual ? "/yr" : "/mo"}</span></>}</div>
              <div className="plan-period">{period}</div>
              <div className="plan-div" />
              {p.features.map((f, i) => <div key={i} className={`plan-feat ${f.dim ? "dim" : ""}`}><span className={`plan-ck ${f.ok ? "" : "no"}`}>{f.ok ? "✓" : "✕"}</span><span>{f.t}</span></div>)}
              {link ? <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}><button className={`btn plan-cta ${p.cls}`} style={{ width: "100%" }}>{p.cta}</button></a> : <button className={`btn plan-cta ${p.cls}`}>{p.cta}</button>}
            </div>
          );
        })}
      </div>
      <div className="pricing-note">No credit card required for Starter · Cancel anytime · Prices in USD</div>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("app");
  const [phase, setPhase] = useState("start"); // start | p1 | p2 | p3
  const [idea, setIdea] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState("");
  const [questions, setQs] = useState([]);
  const [answers, setAs] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [rec, setRec] = useState(null);
  const [selType, setSelType] = useState("");
  const [bp, setBp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fmt, setFmt] = useState("Visual");
  const [hist, setHist] = useState(() => loadHist());
  const [toast, setToast] = useState(null);
  const [err, setErr] = useState(null);
  const endRef = useRef(null);

  useEffect(() => { const mq = window.matchMedia("(prefers-color-scheme: dark)"); setDark(mq.matches); mq.addEventListener("change", e => setDark(e.matches)); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  function toast_(m) { setToast(m); setTimeout(() => setToast(null), 2400); }
  function addMsg(role, text) { setMsgs(prev => [...prev, { role, text, id: Date.now() + Math.random() }]); }
  function reset() { setPhase("start"); setIdea(""); setMsgs([]); setInp(""); setQs([]); setAs([]); setQIdx(0); setRec(null); setSelType(""); setBp(null); setErr(null); setFmt("Visual"); }

  function msgHtml(t) { return t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>"); }

  // Phase 1 — start
  async function startP1() {
    if (!idea.trim()) return;
    setPhase("p1"); setLoading(true); setErr(null);
    addMsg("user", idea);
    try {
      const d = await callGroq(
        `You are Arcform, an expert product architect. Generate 3-5 smart clarifying questions to understand the user's idea before recommending Automation, App Build, or Hybrid. Focus on: budget, technical skill, timeline, target users, scale. Return JSON: {"questions":["q1","q2","q3"]}`,
        [{ role: "user", content: `My idea: "${idea}"` }]
      );
      const qs = d.questions || [];
      setQs(qs); setQIdx(0);
      addMsg("ai", `Great idea! I have a few quick questions to find your best approach.\n\n**${qs[0]}**`);
    } catch (e) { setErr("Error: " + e.message); setPhase("start"); }
    finally { setLoading(false); }
  }

  // Phase 1 — answer
  async function sendAnswer() {
    if (!inp.trim() || loading) return;
    const ans = inp.trim(); setInp("");
    addMsg("user", ans);
    const newAs = [...answers, { q: questions[qIdx], a: ans }];
    setAs(newAs);
    const next = qIdx + 1;
    if (next < questions.length) {
      setQIdx(next);
      setTimeout(() => addMsg("ai", `**${questions[next]}**`), 350);
    } else {
      setLoading(true);
      setTimeout(() => addMsg("ai", "Perfect! Analysing your answers..."), 300);
      try {
        const qa = newAs.map(x => `Q: ${x.q}\nA: ${x.a}`).join("\n\n");
        const d = await callGroq(
          `You are Arcform. Based on the user's idea and Q&A, recommend the best approach. Return JSON: {"options":[{"type":"Automation","why":"short reason","complexity":"Low|Medium|High","time":"e.g. 1-2 weeks","cost":"Low|Medium|High","recommended":true},{"type":"App","why":"...","complexity":"...","time":"...","cost":"...","recommended":false},{"type":"Hybrid","why":"...","complexity":"...","time":"...","cost":"...","recommended":false}],"summary":"one sentence why you recommend the top choice"}. Only one recommended:true.`,
          [{ role: "user", content: `Idea: "${idea}"\n\n${qa}` }]
        );
        setRec(d);
        const top = d.options?.find(o => o.recommended);
        addMsg("ai", `Based on your answers, I recommend **${top?.type}** — ${d.summary}\n\nReview the options below and confirm your choice:`);
        setPhase("p2");
      } catch (e) { setErr("Error: " + e.message); }
      finally { setLoading(false); }
    }
  }

  // Phase 3 — generate blueprint
  async function genBP(type) {
    setSelType(type); setLoading(true); setErr(null);
    const qa = answers.map(x => `Q: ${x.q}\nA: ${x.a}`).join("\n\n");
    addMsg("ai", `Building your **${type}** blueprint...`);
    setPhase("p3_load");
    try {
      const d = await callGroq(
        `You are Arcform. Generate a detailed personalized build blueprint. Return JSON: {"project_name":"short name","selected_type":"${type}","summary":"2 sentences","tools":["tool1","tool2","tool3"],"phases":[{"phase":"1. Define MVP","timeline":"Week 1","objectives":[],"deliverables":[]},{"phase":"2. Architecture & Stack","timeline":"Week 1-2","objectives":[],"deliverables":[],"tech_stack":[]},{"phase":"3. Task Breakdown","timeline":"Week 2-4","tasks":[],"sprints":[{"week":"1-2","focus":""},{"week":"3-4","focus":""}]},{"phase":"4. Risk Management","timeline":"Ongoing","risks":[{"risk":"","level":"High|Medium|Low","mitigation":""}]},{"phase":"5. Launch & QA","timeline":"Week 5-6","objectives":[],"qa_checks":[]}]}. Tools should match type: Automation→Zapier/Make/n8n, App→Cursor/Replit/Bolt, Hybrid→both. Keep arrays to 2-3 items.`,
        [{ role: "user", content: `Idea: "${idea}"\nType: ${type}\nContext:\n${qa}` }]
      );
      setBp(d); setPhase("p3");
      addMsg("ai", `✓ Blueprint ready! **${d.project_name}**`);
      const item = { id: Date.now(), project_name: d.project_name, selected_type: type, idea, date: new Date().toLocaleDateString(), buildPlan: d };
      const upd = [item, ...hist].slice(0, 20); setHist(upd); saveHist(upd);
      toast_("Blueprint saved ✓");
    } catch (e) { setErr("Error: " + e.message); setPhase("p2"); }
    finally { setLoading(false); }
  }

  function cp(t) { navigator.clipboard.writeText(t); toast_("Copied ✓"); }
  function dl(content, name, type) { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([content], { type })); a.download = name; a.click(); toast_("Downloaded ✓"); }

  const mdStr = bp ? bpToMd(bp) : "";
  const cx = getCX(bp);
  const phN = { start: 0, p1: 1, p2: 2, p3_load: 3, p3: 3 }[phase] || 0;

  return (
    <>
      <style>{GFONTS + CSS}</style>
      <div className={`shell ${dark ? "dk" : ""}`}>
        <nav className="nav">
          <div className="brand" onClick={() => { setPage("app"); reset(); }}><div className="brand-dot" />Arcform</div>
          <div className="nav-links">
            <button className={`nav-link ${page === "app" ? "active" : ""}`} onClick={() => setPage("app")}>Builder</button>
            <button className={`nav-link ${page === "history" ? "active" : ""}`} onClick={() => setPage("history")}>History {hist.length > 0 && `(${hist.length})`}</button>
            <button className={`nav-link ${page === "pricing" ? "active" : ""}`} onClick={() => setPage("pricing")}>Pricing</button>
          </div>
          <div className="nav-r"><button className="btn-mode" onClick={() => setDark(!dark)}>{dark ? "☀ Day" : "☾ Night"}</button></div>
        </nav>

        {/* HISTORY */}
        {page === "history" && (
          <div className="main">
            <div className="h1">Your <em>Blueprints</em></div>
            <div className="sub">Saved locally in your browser.</div>
            {hist.length === 0
              ? <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--muted)", fontStyle: "italic" }}>No blueprints yet.</div>
              : <><div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", marginBottom: 14 }}>{hist.length} blueprint{hist.length !== 1 ? "s" : ""}</div>
                <div className="hist-grid">
                  {hist.map(item => (
                    <div key={item.id} className="hist-card" onClick={() => { setBp(item.buildPlan); setIdea(item.idea || ""); setSelType(item.selected_type); setPhase("p3"); setPage("app"); toast_("Loaded ✓"); }}>
                      <div className="hist-info"><div className="hist-name">{item.project_name}</div>
                        <div className="hist-meta"><span className="hist-type">{item.selected_type}</span><span>{item.date}</span><span>{item.idea?.slice(0, 48)}{item.idea?.length > 48 ? "…" : ""}</span></div></div>
                      <div className="hist-actions" onClick={e => e.stopPropagation()}>
                        <button className="hist-btn" onClick={() => { setBp(item.buildPlan); setIdea(item.idea || ""); setPhase("p3"); setPage("app"); }}>Open</button>
                        <button className="hist-btn" onClick={() => { const u = hist.filter(h => h.id !== item.id); setHist(u); saveHist(u); toast_("Deleted"); }}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row"><button className="btn btn-g" onClick={() => { setHist([]); saveHist([]); toast_("Cleared"); }}>Clear All</button></div>
              </>}
          </div>
        )}

        {/* PRICING */}
        {page === "pricing" && <PricingPage />}

        {/* BUILDER */}
        {page === "app" && (
          <>
            {phase !== "start" && (
              <div className="pbar">
                {[{ n: 1, l: "Analysis" }, { n: 2, l: "Planning" }, { n: 3, l: "Blueprint" }].map((s, i, arr) => (
                  <div className="pbi" key={s.n}>
                    <div className={`pbn ${phN === s.n ? "a" : phN > s.n ? "d" : ""}`}>{phN > s.n ? "✓" : s.n}</div>
                    <div className={`pbl ${phN === s.n ? "a" : phN > s.n ? "d" : ""}`}>{s.l}</div>
                    {i < arr.length - 1 && <div className="pbline" />}
                  </div>
                ))}
              </div>
            )}

            <main className="main">

              {/* START */}
              {phase === "start" && (
                <>
                  <div className="h1">Turn your idea into a <em>blueprint</em></div>
                  <div className="sub">Describe what you want to build — Arcform analyses it, asks smart questions, then generates a personalised step-by-step plan.</div>
                  <div className="card">
                    <label style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--A)", marginBottom: 10, display: "block" }}>Your idea</label>
                    <textarea className="ta" placeholder='"I want an AI system to manage prompts and generate blueprints automatically"'
                      value={idea} onChange={e => setIdea(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter" && e.metaKey) startP1(); }} />
                    {err && <div className="err">{err}</div>}
                    <div className="row">
                      <button className="btn btn-p" onClick={startP1} disabled={!idea.trim() || loading}>
                        {loading ? <><div className="spin" />Analysing...</> : "Analyse My Idea →"}
                      </button>
                      {hist.length > 0 && <button className="btn btn-g" onClick={() => setPage("history")}>📋 History ({hist.length})</button>}
                    </div>
                  </div>
                </>
              )}

              {/* PHASE 1 CHAT */}
              {(phase === "p1" || phase === "p2" || phase === "p3_load") && (
                <>
                  <div className="h1">{phase === "p1" ? <><em>Analysis</em> Phase</> : <><em>Planning</em> Phase</>}</div>
                  <div className="sub">{phase === "p1" ? "A few quick questions to build a better plan." : "Review the recommendation and confirm your approach."}</div>
                  <div className="chat-wrap">
                    <div className="chat-msgs">
                      {msgs.map(m => (
                        <div key={m.id} className={`msg ${m.role}`}>
                          <div className="msg-av">{m.role === "ai" ? "A" : "U"}</div>
                          <div className="msg-bub" dangerouslySetInnerHTML={{ __html: msgHtml(m.text) }} />
                        </div>
                      ))}
                      {loading && <div className="msg ai"><div className="msg-av">A</div><div className="msg-bub"><div className="typing"><span /><span /><span /></div></div></div>}
                      <div ref={endRef} />
                    </div>
                    {phase === "p1" && (
                      <div className="chat-inp-wrap">
                        <textarea className="chat-inp" placeholder="Type your answer... (Enter to send)"
                          value={inp} onChange={e => setInp(e.target.value)}
                          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendAnswer(); } }}
                          disabled={loading} rows={1} />
                        <button className="chat-send" onClick={sendAnswer} disabled={!inp.trim() || loading}>Send</button>
                      </div>
                    )}
                  </div>
                  {err && <div className="err">{err}</div>}

                  {/* Phase 2 — Recommendation */}
                  {phase === "p2" && rec && (
                    <>
                      <div className="rec-grid">
                        {(rec.options || []).map(opt => (
                          <div key={opt.type} className={`rec-card ${selType === opt.type ? "sel" : ""}`} onClick={() => setSelType(opt.type)}>
                            {opt.recommended && <div className="rec-badge">AI Pick ✦</div>}
                            <div className="rec-type">{opt.type}</div>
                            <div className="rec-why">{opt.why}</div>
                            <div className="rec-meta">
                              <div className="rec-row"><span className="rec-key">Complexity</span><span className={tc(opt.complexity)}>{opt.complexity}</span></div>
                              <div className="rec-row"><span className="rec-key">Timeline</span><span style={{ fontSize: 12 }}>{opt.time}</span></div>
                              <div className="rec-row"><span className="rec-key">Cost</span><span className={tc(opt.cost)}>{opt.cost}</span></div>
                            </div>
                            {selType === opt.type && <div style={{ marginTop: 10, textAlign: "center", fontSize: 11, color: "var(--P)", fontFamily: "var(--mono)", fontWeight: 700 }}>✦ SELECTED</div>}
                          </div>
                        ))}
                      </div>
                      <div className="row">
                        <button className="btn btn-p" onClick={() => genBP(selType || rec.options?.find(o => o.recommended)?.type || "Hybrid")} disabled={loading}>
                          {loading ? <><div className="spin" />Building...</> : "Generate Blueprint →"}
                        </button>
                        <button className="btn btn-g" onClick={reset}>← Start Over</button>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* PHASE 3 — BLUEPRINT */}
              {phase === "p3" && bp && (
                <>
                  <div className="h1">{bp.project_name}</div>
                  <div className="sub">{bp.summary}</div>

                  <div className="cx-wrap">
                    <div className="cx-label">Complexity</div>
                    <div className="cx-bar"><div className="cx-fill" style={{ width: cx.score + "%", background: cx.color }} /></div>
                    <div className="cx-val" style={{ color: cx.color }}>{cx.label}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", marginLeft: 8 }}>{bp.selected_type}</div>
                  </div>

                  {bp.tools?.length > 0 && (
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--A)", marginBottom: 8 }}>Recommended Tools</div>
                      <div className="tools-row">{bp.tools.map((t, i) => <div key={i} className="tool-chip"><div className="tool-dot" />{t}</div>)}</div>
                    </div>
                  )}

                  <div className="fmt-bar">
                    {["Visual", "Markdown", "JSON"].map((f, i) => (
                      <span key={f} style={{ display: "contents" }}>
                        {i > 0 && <div style={{ width: 1, background: "var(--brd)" }} />}
                        <button className={`fmt-btn ${fmt === f ? "active" : ""}`} onClick={() => setFmt(f)}>{f}</button>
                      </span>
                    ))}
                  </div>

                  {fmt === "Visual" && <div className="pl">{(bp.phases || []).map((p, i) => <PlanStep key={i} phase={p} index={i} />)}</div>}
                  {fmt === "Markdown" && <div className="card"><MarkdownView content={mdStr} /></div>}
                  {fmt === "JSON" && <div className="json-pre">{JSON.stringify(bp, null, 2)}</div>}

                  <div className="divider" />
                  <div className="row">
                    <button className="btn btn-p" style={{ fontSize: 11, padding: "9px 18px" }} onClick={() => generatePDF(bp, idea)}>⬇ PDF</button>
                    <button className="btn btn-o" style={{ fontSize: 11, padding: "9px 18px" }} onClick={() => dl(mdStr, "blueprint.md", "text/markdown")}>⬇ Markdown</button>
                    <button className="btn btn-g" onClick={() => dl(JSON.stringify(bp, null, 2), "blueprint.json", "application/json")}>⬇ JSON</button>
                    <button className="btn btn-g" onClick={() => cp(mdStr)}>⊕ Copy</button>
                    <button className="btn btn-g" onClick={reset}>↺ New</button>
                  </div>

                  {msgs.length > 0 && (
                    <details style={{ marginTop: 18 }}>
                      <summary style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", cursor: "pointer", letterSpacing: ".06em", textTransform: "uppercase" }}>View Analysis Chat</summary>
                      <div className="chat-wrap" style={{ marginTop: 10 }}>
                        <div className="chat-msgs" style={{ maxHeight: 260 }}>
                          {msgs.map(m => (
                            <div key={m.id} className={`msg ${m.role}`}>
                              <div className="msg-av">{m.role === "ai" ? "A" : "U"}</div>
                              <div className="msg-bub" dangerouslySetInnerHTML={{ __html: msgHtml(m.text) }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </details>
                  )}
                </>
              )}
            </main>
          </>
        )}
        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}
