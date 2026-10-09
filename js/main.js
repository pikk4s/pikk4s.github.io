const initials = s => s.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

document.getElementById("grid").innerHTML = projects.map(p => {
  const tag = p.link ? "a" : "div";
  const href = p.link ? ` href="${esc(p.link)}" target="_blank" rel="noopener"` : "";
  const thumb = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`
    : `<div class="placeholder" style="background:linear-gradient(135deg, ${p.color}, #000)">${esc(p.badge || initials(p.title))}</div>`;
  const stats = p.stats
    ? `<div class="stats">${p.stats.map(([n, l]) => `<div class="stat"><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join("")}</div>`
    : "";
  return `<${tag} class="card reveal${p.featured ? " featured" : ""}"${href}>
    <div class="thumb">${thumb}</div>
    <div class="card-body">
      <div class="client">${esc(p.client)}</div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      ${stats}
    </div>
  </${tag}>`;
}).join("");

document.getElementById("year").textContent = new Date().getFullYear();

// Aparición suave al hacer scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
