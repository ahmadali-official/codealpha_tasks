/* =========================================================
   PORTFOLIO SCRIPT.JS
   This file is split into small, clearly-named functions.
   Each function handles ONE feature. Scroll down to find the
   one you want to change.
========================================================== */

// Run everything only after the HTML has fully loaded
document.addEventListener("DOMContentLoaded", () => {
  setFooterYear();
  setupThemeToggle();
  setupMobileMenu();
  setupSmoothScrollActiveLink();
  setupScrollRevealAnimations();
  setupAnimatedCounters();
  setupProjectFilter();
  setupProjectModal();
  setupCertModal();
  setupContactFormValidation();
  setupBackToTop();
});

/* =========================================================
   1. FOOTER YEAR
   Puts the current year into the footer automatically so you
   never have to update it by hand.
========================================================== */
function setFooterYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/* =========================================================
   2. THEME TOGGLE (Light Mode <-> AMOLED Dark Mode)
   - Adds/removes the "dark-theme" class on <body>
   - Saves the choice in localStorage so it survives a refresh
========================================================== */
function setupThemeToggle() {
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  // 1. On page load, check if the user already picked a theme before
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }

  // 2. When the button is clicked, flip the theme and save the choice
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    const isDark = body.classList.contains("dark-theme");
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  });
}

/* =========================================================
   3. MOBILE HAMBURGER MENU
   Opens/closes the navigation links on small screens.
========================================================== */
function setupMobileMenu() {
  const menuBtn = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", isOpen);
  });

  // Close the menu automatically when a link is tapped (mobile UX)
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.classList.remove("open");
    });
  });
}

/* =========================================================
   4. ACTIVE NAV LINK ON SCROLL
   Highlights the nav link for whichever section is currently
   visible on screen, using IntersectionObserver.
========================================================== */
function setupSmoothScrollActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" } // triggers when section is near the middle of the screen
  );

  sections.forEach((section) => observer.observe(section));
}

/* =========================================================
   5. SCROLL-REVEAL ANIMATIONS (entrance animations)
   Every element with the class "reveal" starts hidden
   (see style.css). When it scrolls into view, we add the
   "visible" class, which CSS then animates smoothly.
========================================================== */
function setupScrollRevealAnimations() {
  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // "stagger" animations reveal one after another with a small delay,
          // which looks nice for grids of cards (stats, projects, skills, etc.)
          const delay = el.dataset.anim === "stagger" ? index * 80 : 0;

          setTimeout(() => {
            el.classList.add("visible");
          }, delay);

          observer.unobserve(el); // only animate once
        }
      });
    },
    { threshold: 0.15 } // fires when 15% of the element is visible
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* =========================================================
   6. ANIMATED NUMBER COUNTERS (About section stats)
   Counts up from 0 to the number in data-target once the
   stat card scrolls into view.
========================================================== */
function setupAnimatedCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(counterEl) {
  const target = parseInt(counterEl.dataset.target, 10) || 0;
  const duration = 1200; // milliseconds
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    counterEl.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counterEl.textContent = target; // make sure it lands exactly on target
    }
  }
  requestAnimationFrame(update);
}

/* =========================================================
   7. PROJECT FILTERING
   Clicking a filter button shows only the project cards that
   match its data-filter value (matched against data-category
   on each project card).
========================================================== */
function setupProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update which button looks "active"
      filterButtons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      projectCards.forEach((card) => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !matches);
      });
    });
  });
}

/* =========================================================
   8. PROJECT DETAILS MODAL
   Clicking "Details" on a project card opens a popup with
   more information about that specific project.
========================================================== */
function setupProjectModal() {
  const modal = document.getElementById("projectModal");
  const closeBtn = document.getElementById("projectModalClose");
  const titleEl = document.getElementById("projectModalTitle");
  const bodyEl = document.getElementById("projectModalBody");

  document.querySelectorAll(".project-details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".project-card");
      const title = card.querySelector("h3").textContent;
      const description = card.querySelector("p").textContent;

      titleEl.textContent = title;
      bodyEl.textContent = description; // Replace with a longer description if you like
      modal.classList.add("open");
    });
  });

  closeBtn.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open"); // click outside content = close
  });
}

/* =========================================================
   9. CERTIFICATE LIGHTBOX MODAL
   Clicking a certificate image opens a larger preview.
========================================================== */
function setupCertModal() {
  const modal = document.getElementById("certModal");
  const closeBtn = document.getElementById("certModalClose");

  document.querySelectorAll(".cert-view-btn").forEach((el) => {
    el.addEventListener("click", () => modal.classList.add("open"));
  });

  closeBtn.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
}

/* =========================================================
   10. CONTACT FORM VALIDATION (front-end only)
   Checks the fields are filled in correctly before "submitting".
   NOTE: This does NOT send a real email. To actually receive
   messages, connect a service like Formspree, EmailJS, or your
   own backend, and replace the code inside the submit handler.
========================================================== */
function setupContactFormValidation() {
  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("formSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop the page from reloading
    successMsg.classList.remove("show");

    const name = document.getElementById("cf-name");
    const email = document.getElementById("cf-email");
    const message = document.getElementById("cf-message");

    let isValid = true;

    // Name check
    if (name.value.trim().length < 2) {
      showError("err-name", "Please enter your name.");
      isValid = false;
    } else {
      showError("err-name", "");
    }

    // Simple email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      showError("err-email", "Please enter a valid email address.");
      isValid = false;
    } else {
      showError("err-email", "");
    }

    // Message check
    if (message.value.trim().length < 10) {
      showError("err-message", "Message should be at least 10 characters.");
      isValid = false;
    } else {
      showError("err-message", "");
    }

    if (isValid) {
      successMsg.classList.add("show");
      form.reset();
    }
  });
}

function showError(elementId, text) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = text;
}

/* =========================================================
   11. BACK TO TOP BUTTON
========================================================== */
function setupBackToTop() {
  const btn = document.getElementById("backToTop");
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
