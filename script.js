document.addEventListener("DOMContentLoaded", () => {
  // CONFIGURATION ENGINE
  // Change this number whenever you dump new photos into your directory!
  const TOTAL_GALLERY_IMAGES = 16; 

  // Initialize Elements
  renderDynamicBentoGrid(TOTAL_GALLERY_IMAGES);
  initializeLightboxEngine();
});

/**
 * Generates the clean Bento Masonry Layout dynamically
 */
function renderDynamicBentoGrid(total) {
  const bentoContainer = document.getElementById("dynamicBentoGrid");
  if (!bentoContainer) return;

  let compiledHtml = "";

  for (let i = 1; i <= total; i++) {
    compiledHtml += `
      <div class="bento-item" data-src="images/gallery${i}.jpeg">
        <img src="images/gallery${i}.jpeg" alt="Annamalayar Decors Showcase ${i}" loading="lazy">
        <div class="bento-overlay">
          <div class="bento-info">
            <h4>Signature Creation ${i}</h4>
          </div>
        </div>
      </div>
    `;
  }

  bentoContainer.innerHTML = compiledHtml;
}

/**
 * Initializes full-screen image portal logic using event delegation
 */
function initializeLightboxEngine() {
  const bentoContainer = document.getElementById("dynamicBentoGrid");
  const lightboxPortal = document.getElementById("portalLightbox");
  const portalActiveImg = document.getElementById("portalActiveImg");
  const portalCloseBtn = document.getElementById("portalCloseBtn");

  if (!bentoContainer || !lightboxPortal || !portalActiveImg) return;

  // Listen globally inside the container grid for click actions
  bentoContainer.addEventListener("click", (event) => {
    const clickedItem = event.target.closest(".bento-item");
    if (!clickedItem) return;

    const highResSource = clickedItem.getAttribute("data-src");
    if (highResSource) {
      portalActiveImg.src = highResSource;
      lightboxPortal.classList.add("active");
      document.body.style.overflow = "hidden"; // Locks backpage scroll
    }
  });

  // Close Event Handler Function
  const closePortal = () => {
    lightboxPortal.classList.remove("active");
    document.body.style.overflow = ""; // Restores normal viewport scroll
    portalActiveImg.src = ""; // Clears asset pipelines
  };

  if (portalCloseBtn) portalCloseBtn.addEventListener("click", closePortal);
  lightboxPortal.addEventListener("click", (e) => {
    if (e.target === lightboxPortal) closePortal();
  });
}
