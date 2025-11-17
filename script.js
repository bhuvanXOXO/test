const root = document.documentElement;
const toggleButton = document.getElementById("theme-toggle");
const yearSpan = document.getElementById("year");

const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

const applyTheme = (mode) => {
  root.dataset.theme = mode;
  localStorage.setItem("theme", mode);
};

const currentTheme =
  localStorage.getItem("theme") || (prefersLight.matches ? "light" : "dark");

applyTheme(currentTheme);

toggleButton.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  applyTheme(next);
});

prefersLight.addEventListener("change", (event) => {
  if (!localStorage.getItem("theme")) {
    applyTheme(event.matches ? "light" : "dark");
  }
});

const revealElements = document.querySelectorAll(
  ".section, .hero__visual, .hero__stats"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

