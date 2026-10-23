"use strict";

const clinicLocations = [
  {
    name: "Dr. Ronak R. Kucheria",
    clinic: "Skin, Hair & Nail Clinic",
    area: "BHANDUP WEST · MUMBAI",
    appointmentValue: "Bhandup West — Dr. Ronak R. Kucheria Skin, Hair & Nail Clinic",
    address: "SAS Hospital, 23-C, Tank Rd, opp. Shivaji Talao, Miniland, Valmik Nagar, Bhandup West, Mumbai, Maharashtra 400078",
    services: "Skin · Hair · Nails",
    directions: "https://www.google.com/maps/dir/?api=1&destination=19.1472702%2C72.92981",
    listing: "https://www.google.com/maps/search/?api=1&query=Dr.%20Ronak%20R.%20Kucheria%20Skin%20Hair%20Nail%20Clinic%2C%20Bhandup%20West%2C%20Mumbai&query_place_id=ChIJn3Zx6rC55zsR1UTyVUx0MuU",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=75",
    imageAlt: "Illustrative contemporary clinic interior",
  },
  {
    name: "Dr. Ronak R. Kucheria",
    clinic: "Skin, Hair & Nail Clinic",
    area: "AIROLI · NAVI MUMBAI",
    appointmentValue: "Airoli — Dr. Ronak R. Kucheria Skin, Hair & Nail Clinic",
    address: "Next to Suruchi Eye Centre, near Durga Mata Mandir Road, Sector 4, Airoli, Navi Mumbai, Maharashtra 400708",
    services: "Skin · Hair · Nails",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Dr.%20Ronak%20R.%20Kucheria%20Skin%2C%20Hair%20%26%20Nail%20Clinic%2C%20Airoli%2C%20Navi%20Mumbai&destination_place_id=ChIJZWodmHa_5zsR-PRXwTXHuVc",
    listing: "https://www.google.com/maps/search/?api=1&query=Dr.%20Ronak%20R.%20Kucheria%20Skin%20Hair%20Nail%20Clinic%2C%20Airoli%2C%20Navi%20Mumbai&query_place_id=ChIJZWodmHa_5zsR-PRXwTXHuVc",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=75",
    imageAlt: "Illustrative spa-care stock image, not the actual clinic",
  },
  {
    name: "Aesthetic Intelligence",
    clinic: "Skin, Hair, Nail & Laser Clinic",
    area: "LOKMANYA NAGAR · THANE",
    appointmentValue: "Thane — Aesthetic Intelligence Clinic",
    address: "Sinhgarjana CHS. Ltd, Bus Depot, D/5, Plot No. 63, near Lokmanya Nagar, Thane, Maharashtra 400606",
    services: "Skin · Hair · Nails · Laser",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Aesthetic%20Intelligence%20Clinic%2C%20D%2F5%2C%20Plot%20No.%2063%2C%20Thane%2C%20Maharashtra%20400606",
    listing: "https://www.google.com/maps/search/?api=1&query=Aesthetic%20Intelligence%20Clinic%20Skin%20Hair%20Nail%20Laser%2C%20Lokmanya%20Nagar%2C%20Thane",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=75",
    imageAlt: "Illustrative contemporary clinic interior, not the actual clinic",
  },
];

const googleReviewLinks = [
  "", // Bhandup West — add the official link supplied by the clinic owner.
  "", // Airoli — add the official link supplied by the clinic owner.
  "", // Thane — add the official link supplied by the clinic owner.
];

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.querySelectorAll("[data-scroll-top]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
  });
});

if (menuToggle && primaryNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    menuToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !open);
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

const heroPhoto = document.querySelector(".hero-photo-frame");
const quoteImage = document.querySelector(".quote-image img");
let scrollScheduled = false;

if ((heroPhoto || quoteImage) && !reduceMotion.matches) {
  const updateScrollImages = () => {
    if (heroPhoto) {
      const hero = heroPhoto.closest(".hero").getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -hero.top / (hero.height * 0.8)));
      heroPhoto.style.setProperty("--hero-shift", `${Math.round(progress * 22)}px`);
    }
    if (quoteImage) {
      const section = quoteImage.closest(".care-quote").getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - section.top) / (window.innerHeight + section.height)));
      quoteImage.style.transform = `translateY(${Math.round((progress - 0.5) * 20)}px) scale(1.04)`;
    }
    scrollScheduled = false;
  };

  window.addEventListener("scroll", () => {
    if (!scrollScheduled) {
      window.requestAnimationFrame(updateScrollImages);
      scrollScheduled = true;
    }
  }, { passive: true });
  updateScrollImages();
}

const dateInput = document.querySelector("#preferred-date");
if (dateInput) {
  const now = new Date();
  dateInput.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

const clinicTabs = [...document.querySelectorAll(".clinic-tab")];
const clinicPanel = document.querySelector("#clinic-detail");
const clinicImage = document.querySelector("#clinic-image");
const reviewChoices = [...document.querySelectorAll(".review-choice")];
const viewReviews = document.querySelector("#view-reviews");
const writeReview = document.querySelector("#write-review");
const reviewLinkNote = document.querySelector("#review-link-note");

const selectClinic = (index) => {
  const clinic = clinicLocations[index];
  if (!clinic) return;

  clinicTabs.forEach((tab, tabIndex) => {
    const selected = tabIndex === index;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  const tab = clinicTabs[index];
  clinicPanel.setAttribute("aria-labelledby", tab.id);
  document.querySelector("#clinic-number").textContent = String(index + 1).padStart(2, "0");
  document.querySelector("#clinic-area").textContent = clinic.area;
  const clinicName = document.querySelector("#clinic-name");
  const clinicNameSuffix = document.createElement("span");
  clinicNameSuffix.textContent = clinic.clinic;
  clinicName.replaceChildren(document.createTextNode(clinic.name), document.createElement("br"), clinicNameSuffix);
  document.querySelector("#clinic-address").textContent = clinic.address;
  document.querySelector("#clinic-services").textContent = clinic.services;
  document.querySelector("#clinic-directions").href = clinic.directions;
  document.querySelector("#clinic-image-caption").textContent = "STOCK IMAGE · NOT THIS CLINIC";
  clinicImage.alt = clinic.imageAlt;
  clinicImage.src = clinic.image;
  document.querySelector("#clinic-book").dataset.clinic = clinic.appointmentValue;

  reviewChoices.forEach((choice, choiceIndex) => {
    const selected = choiceIndex === index;
    choice.classList.toggle("is-active", selected);
    choice.setAttribute("aria-pressed", String(selected));
  });

  viewReviews.href = clinic.listing;
  if (googleReviewLinks[index]) {
    writeReview.href = googleReviewLinks[index];
    writeReview.removeAttribute("aria-disabled");
    writeReview.removeAttribute("title");
    writeReview.target = "_blank";
    writeReview.rel = "noopener noreferrer";
    reviewLinkNote.textContent = "This link opens Google's official review flow for the selected clinic.";
  } else {
    writeReview.href = "#";
    writeReview.setAttribute("aria-disabled", "true");
    writeReview.title = "Official review link not supplied yet";
    writeReview.removeAttribute("target");
    writeReview.removeAttribute("rel");
    reviewLinkNote.textContent = "The clinic’s official review link has not been supplied yet. It can be added in the clearly marked review-link configuration in script.js.";
  }
};

clinicTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectClinic(index));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowDown") nextIndex = (index + 1) % clinicTabs.length;
    if (event.key === "ArrowUp") nextIndex = (index - 1 + clinicTabs.length) % clinicTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = clinicTabs.length - 1;
    selectClinic(nextIndex);
    clinicTabs[nextIndex].focus();
  });
});

reviewChoices.forEach((button, index) => {
  button.addEventListener("click", () => selectClinic(index));
});

writeReview.addEventListener("click", (event) => {
  if (writeReview.getAttribute("aria-disabled") === "true") event.preventDefault();
});

document.querySelectorAll("[data-clinic]").forEach((link) => {
  link.addEventListener("click", () => {
    const clinic = document.querySelector("#patient-clinic");
    if (clinic) clinic.value = link.dataset.clinic;
  });
});

const appointmentForm = document.querySelector("#appointment-form");
const requestPreview = document.querySelector("#request-preview");
const previewDetails = document.querySelector("#preview-details");
const formStatus = document.querySelector("#form-status");
const editRequest = document.querySelector("#edit-request");
const sendWhatsapp = document.querySelector("#send-whatsapp");
let appointmentRequest = null;

if (appointmentForm && requestPreview && previewDetails && formStatus && editRequest && sendWhatsapp) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!appointmentForm.reportValidity()) return;

    const values = new FormData(appointmentForm);
    appointmentRequest = {
      clinic: values.get("clinic"),
      name: values.get("name").trim(),
      phone: values.get("phone").trim(),
      date: values.get("date"),
      time: values.get("time"),
      message: values.get("message").trim(),
    };

    const entries = [
      ["Clinic", appointmentRequest.clinic],
      ["Name", appointmentRequest.name],
      ["Phone", appointmentRequest.phone],
      ["Preferred date", appointmentRequest.date],
      ["Preferred time", appointmentRequest.time || "Not specified"],
      ["Message", appointmentRequest.message || "None"],
    ];
    previewDetails.replaceChildren();
    entries.forEach(([label, value]) => {
      const term = document.createElement("dt");
      const detail = document.createElement("dd");
      term.textContent = label;
      detail.textContent = value;
      previewDetails.append(term, detail);
    });
    requestPreview.hidden = false;
    formStatus.textContent = "";
    requestPreview.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "nearest" });
  });

  editRequest.addEventListener("click", () => {
    requestPreview.hidden = true;
    formStatus.textContent = "";
    document.querySelector("#patient-clinic").focus();
  });

  sendWhatsapp.addEventListener("click", () => {
    if (!appointmentRequest) return;
    const message = [
      "Hello Dr. Ronak,",
      "",
      "I’d like to request an appointment at your clinic. Here are my details:",
      "",
      `🔹 Clinic: ${appointmentRequest.clinic}`,
      `🔹 Name: ${appointmentRequest.name}`,
      `🔹 Phone: ${appointmentRequest.phone}`,
      `🔹 Preferred Date: ${appointmentRequest.date}`,
      `🔹 Preferred Time: ${appointmentRequest.time || "Not specified"}`,
      `🔹 Message: ${appointmentRequest.message || "Not provided"}`,
      "",
      "Please note: This is an appointment request and is not a confirmed booking.",
    ].join("\n");
    const whatsappUrl = `https://wa.me/918828272084?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank");

    if (whatsappWindow) {
      whatsappWindow.opener = null;
      formStatus.textContent = "Your request is ready in WhatsApp. Review it there and choose Send; the clinic must reply to confirm availability.";
    } else {
      formStatus.replaceChildren(document.createTextNode("WhatsApp could not be opened. "));
      const fallback = document.createElement("a");
      fallback.href = whatsappUrl;
      fallback.target = "_blank";
      fallback.rel = "noopener noreferrer";
      fallback.textContent = "Open your prepared request";
      formStatus.append(fallback, document.createTextNode("."));
    }
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());
