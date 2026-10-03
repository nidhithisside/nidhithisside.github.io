// ===== Mobile menu =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Close the menu after tapping a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", false);
  });
});

// ===== Nav shadow on scroll =====
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 10);
});

// ===== Rotating hero tagline =====
const roles = ["Brand Strategist", "Content Creator", "Performance Marketer", "Campaign Storyteller"];
const rotator = document.getElementById("rotator");
let roleIndex = 0;

setInterval(() => {
  rotator.classList.add("out");
  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    rotator.textContent = roles[roleIndex];
    rotator.classList.remove("out");
  }, 400);
}, 2600);

// ===== Count-up numbers =====
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const duration = 1600;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // slows down near the end
    el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ===== Reveal elements as they scroll into view =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      entry.target.querySelectorAll(".counter").forEach(animateCounter);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== Campaign filters =====
const filters = document.querySelectorAll(".filter");
const campaigns = document.querySelectorAll(".campaign");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    campaigns.forEach((card) => {
      const cats = card.dataset.cat.split(" ");
      card.classList.toggle("hidden", filter !== "all" && !cats.includes(filter));
    });
  });
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
