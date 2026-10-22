/**
 * Main application entry — public site interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollReveal();
  initDynamicYear();
  initSmoothScroll();
  initContactForm();
});

/* ---------- Mobile Navigation ---------- */
function initNavigation() {
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close on link click (mobile)
  menu.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      toggle.focus();
    }
  });

  // Set active nav link based on current page
  const path = window.location.pathname.split("/").pop() || "index.html";
  menu.querySelectorAll(".nav__link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------- Dynamic year in footer ---------- */
function initDynamicYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- Smooth scroll for anchor links ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ---------- Contact form (client-side validation only) ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearFormErrors(form);

    const name = form.querySelector("#contact-name");
    const email = form.querySelector("#contact-email");
    const message = form.querySelector("#contact-message");
    let valid = true;

    if (!name.value.trim()) {
      showFieldError(name, "Name is required");
      valid = false;
    }
    if (!email.value.trim() || !isValidEmail(email.value)) {
      showFieldError(email, "A valid email is required");
      valid = false;
    }
    if (!message.value.trim() || message.value.trim().length < 10) {
      showFieldError(message, "Message must be at least 10 characters");
      valid = false;
    }

    if (!valid) return;

    // Demo: show success message (no real backend)
    const feedback = form.querySelector(".form-feedback");
    if (feedback) {
      feedback.innerHTML =
        '<div class="alert alert--success" role="alert">Thank you! Your message has been received. We will respond shortly. <em>(Demo mode — no email was sent.)</em></div>';
    }
    form.reset();
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function showFieldError(input, message) {
  input.classList.add("is-invalid");
  const error = document.createElement("span");
  error.className = "form-error";
  error.setAttribute("role", "alert");
  error.textContent = message;
  input.parentElement.appendChild(error);
}

function clearFormErrors(form) {
  form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
  form.querySelectorAll(".form-error").forEach((el) => el.remove());
  const feedback = form.querySelector(".form-feedback");
  if (feedback) feedback.innerHTML = "";
}
