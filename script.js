// =====================================================================
// SETUP: Grab references to all elements we need to interact with
// =====================================================================
const galleryItems = document.querySelectorAll(".gallery-item"); // all image cards
const filterButtons = document.querySelectorAll(".filter-btn");  // category buttons

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Build an array of image data (src + caption + category) from the DOM.
// This lets the lightbox know what to show next/previous without
// re-reading the HTML every time.
let imagesData = Array.from(galleryItems).map((item) => {
  const img = item.querySelector("img");
  const caption = item.querySelector("figcaption").textContent;
  return {
    src: img.src,
    alt: img.alt,
    caption: caption,
    category: item.dataset.category,
  };
});

// Tracks which image is currently open in the lightbox, and which
// images are currently visible (so next/prev only cycles through
// the FILTERED set, not hidden ones).
let currentIndex = 0;
let visibleIndexes = imagesData.map((_, i) => i); // starts as "all visible"

// =====================================================================
// FEATURE 1: CATEGORY FILTERING (Bonus feature)
// =====================================================================
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.category;

    // Update which button looks "active"
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Reset the list of currently visible image indexes
    visibleIndexes = [];

    galleryItems.forEach((item, index) => {
      const matches =
        selectedCategory === "all" || item.dataset.category === selectedCategory;

      // Show or hide each gallery card based on category match
      item.classList.toggle("hidden", !matches);

      if (matches) {
        visibleIndexes.push(index);
      }
    });
  });
});

// =====================================================================
// FEATURE 2: OPEN LIGHTBOX WHEN AN IMAGE IS CLICKED
// =====================================================================
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentIndex = index;
    openLightbox(currentIndex);
  });
});

function openLightbox(index) {
  const data = imagesData[index];
  lightboxImg.src = data.src;
  lightboxImg.alt = data.alt;
  lightboxCaption.textContent = data.caption;

  lightbox.classList.add("active"); // triggers CSS fade-in transition
  document.body.style.overflow = "hidden"; // prevents background scrolling
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = ""; // restore scrolling
}

// =====================================================================
// FEATURE 3: CLOSE LIGHTBOX (button click, background click, or ESC key)
// =====================================================================
lightboxClose.addEventListener("click", closeLightbox);

// Clicking the dark overlay (but not the image itself) also closes it
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// =====================================================================
// FEATURE 4: NEXT / PREVIOUS NAVIGATION
// Cycles only through currently visible (filtered) images
// =====================================================================
function showNext() {
  const positionInVisible = visibleIndexes.indexOf(currentIndex);
  const nextPosition = (positionInVisible + 1) % visibleIndexes.length;
  currentIndex = visibleIndexes[nextPosition];
  openLightbox(currentIndex);
}

function showPrev() {
  const positionInVisible = visibleIndexes.indexOf(currentIndex);
  const prevPosition =
    (positionInVisible - 1 + visibleIndexes.length) % visibleIndexes.length;
  currentIndex = visibleIndexes[prevPosition];
  openLightbox(currentIndex);
}

nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

// =====================================================================
// FEATURE 5: KEYBOARD SUPPORT (accessibility / convenience)
// Arrow keys navigate, Escape closes the lightbox
// =====================================================================
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return; // only when lightbox is open

  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "Escape") closeLightbox();
});
