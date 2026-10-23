"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.querySelectorAll("[data-scroll-top]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  });
});

if (menuToggle && primaryNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const revealItems = document.querySelectorAll(".reveal");
if (reduceMotion.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const heroPortrait = document.querySelector(".portrait-image-wrap");
let scrollPending = false;

if (heroPortrait && !reduceMotion.matches) {
  const updateHeroParallax = () => {
    const heroBounds = heroPortrait.closest(".hero").getBoundingClientRect();
    const travel = Math.max(0, Math.min(1, -heroBounds.top / (heroBounds.height * 0.75)));
    heroPortrait.style.setProperty("--hero-shift", `${Math.round(travel * 30)}px`);
    scrollPending = false;
  };

  window.addEventListener("scroll", () => {
    if (!scrollPending) {
      window.requestAnimationFrame(updateHeroParallax);
      scrollPending = true;
    }
  }, { passive: true });
  updateHeroParallax();
}

const dateInput = document.querySelector("#preferred-date");
if (dateInput) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = localToday;
}

document.querySelectorAll("[data-clinic]").forEach((link) => {
  link.addEventListener("click", () => {
    const clinicSelect = document.querySelector("#preferred-clinic");
    if (clinicSelect) clinicSelect.value = link.dataset.clinic;
  });
});

const enquiryForm = document.querySelector("#enquiry-form");
const formNote = document.querySelector("#form-note");
if (enquiryForm && formNote) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;

    const formData = new FormData(enquiryForm);
    const message = [
      "Hello, I’d like to enquire about an appointment.",
      `Name: ${formData.get("name")}`,
      `Phone: ${formData.get("phone")}`,
      `Preferred clinic: ${formData.get("clinic")}`,
      formData.get("date") ? `Preferred date: ${formData.get("date")}` : "",
      formData.get("message") ? `Message: ${formData.get("message")}` : "",
    ].filter(Boolean).join("\n");

    const whatsappUrl = `https://wa.me/918828272084?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank");

    if (whatsappWindow) {
      whatsappWindow.opener = null;
      formNote.textContent = "Your message is ready in WhatsApp. Review it there and choose Send when you’re ready.";
    } else {
      formNote.replaceChildren(document.createTextNode("WhatsApp could not be opened. "));
      const fallbackLink = document.createElement("a");
      fallbackLink.href = whatsappUrl;
      fallbackLink.target = "_blank";
      fallbackLink.rel = "noopener noreferrer";
      fallbackLink.textContent = "Open your prepared message";
      formNote.append(fallbackLink, document.createTextNode("."));
    }
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());
