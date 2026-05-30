const root = document.documentElement;
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = [...document.querySelectorAll("#nav-menu a")];
const revealItems = [...document.querySelectorAll(".reveal")];

window.addEventListener("pointermove", (event) => {
    root.style.setProperty("--cursor-x", `${event.clientX}px`);
    root.style.setProperty("--cursor-y", `${event.clientY}px`);
});

navToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle?.setAttribute("aria-expanded", "false");
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
        }
    });
}, { threshold: 0.18 });

revealItems.forEach((item) => observer.observe(item));

const sections = [...document.querySelectorAll("main header[id], section[id]")];
const setActiveLink = () => {
    let activeId = "home";
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 160) activeId = section.id;
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
};

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();
