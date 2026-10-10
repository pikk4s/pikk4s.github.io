// Iconos planos (trazo). El color lo da el gradiente: metal o prisma (definidos en index.html)
const ICONS = {
  play: '<rect x="6" y="12" width="52" height="40" rx="9"/><path d="M27 23.5v17l14-8.5z"/>',
  vertical: '<rect x="18" y="5" width="28" height="54" rx="6"/><path d="M28 51h8"/><path d="M28 24v14l11-7z"/>',
  motion: '<path d="M8 46c10-26 22-26 30-10s16 14 18-10"/><circle cx="56" cy="22" r="4"/><circle cx="8" cy="46" r="3"/>',
  audio: '<path d="M8 32h6M16 22v20M24 14v36M32 24v16M40 10v44M48 20v24M56 32h0"/>',
  strategy: '<path d="M32 6l6 20 20 6-20 6-6 20-6-20-20-6 20-6z"/>'
};
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

document.getElementById("grid").innerHTML = projects.map(p => {
  const tag = p.link ? "a" : "div";
  const href = p.link ? ` href="${esc(p.link)}" target="_blank" rel="noopener"` : "";
  const thumb = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`
    : `<div class="icon"><svg viewBox="0 0 64 64" fill="none" stroke="url(#${p.featured ? "g-prism" : "g-metal"})" stroke-width="${p.featured ? 2.4 : 2}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[p.icon] || ICONS.play}</svg></div>`;
  const badge = p.badge ? `<span class="badge">${esc(p.badge)}</span>` : "";
  const stats = p.stats
    ? `<div class="stats">${p.stats.map(([n, l]) => `<div class="stat"><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join("")}</div>`
    : "";
  return `<${tag} class="card reveal${p.featured ? " featured" : ""}"${href}>
    <div class="thumb">${thumb}${badge}</div>
    <div class="card-body">
      <div class="client">${esc(p.client)}</div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      ${stats}
    </div>
  </${tag}>`;
}).join("");

// Testimonios (audio / vídeo). Sin "src" se muestra un hueco "Próximamente".
const T_ICON = {
  audio: '<path d="M8 32h4M14 24v16M20 16v32M26 26v12M32 12v40M38 22v20M44 18v28M50 27v10M56 32h0"/>',
  video: '<rect x="6" y="12" width="52" height="40" rx="9"/><path d="M27 23.5v17l14-8.5z"/>'
};
document.getElementById("testimonials").innerHTML = testimonials.map((t, i) => {
  const kind = t.type === "video" ? "video" : "audio";
  let media;
  if (t.src && kind === "video") {
    media = `<video src="${esc(t.src)}"${t.poster ? ` poster="${esc(t.poster)}"` : ""} controls preload="metadata" playsinline></video>`;
  } else if (t.src) {
    media = `<div class="t-wave"><svg viewBox="0 0 64 64" fill="none" stroke="url(#g-metal)" stroke-width="2" stroke-linecap="round" aria-hidden="true">${T_ICON.audio}</svg></div>
      <audio src="${esc(t.src)}" controls preload="none"></audio>`;
  } else {
    media = `<div class="t-empty"><svg viewBox="0 0 64 64" fill="none" stroke="url(#${i === 1 ? "g-prism" : "g-metal"})" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${T_ICON[kind]}</svg>
      <span>${kind === "video" ? "Vídeo" : "Audio"}</span></div>`;
  }
  const quote = t.quote ? `<blockquote>“${esc(t.quote)}”</blockquote>` : "";
  const who = t.author
    ? `<div class="t-who"><b>${esc(t.author)}</b>${t.role ? `<span>${esc(t.role)}</span>` : ""}</div>`
    : `<div class="t-who"><span>${t.src ? "Testimonio" : "Próximamente"}</span></div>`;
  return `<article class="t-card reveal${i === 1 ? " featured" : ""}">
    <div class="t-media ${kind}">${media}</div>
    ${quote}${who}
  </article>`;
}).join("");

document.getElementById("year").textContent = new Date().getFullYear();

// Aparición suave al hacer scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Vidrio líquido: el reflejo sigue al puntero dentro de cada superficie
const glassSel = ".nav, .panel, .card, .t-card, .btn-metal, .tools li";
document.addEventListener("pointermove", e => {
  const el = e.target.closest && e.target.closest(glassSel);
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}, { passive: true });
