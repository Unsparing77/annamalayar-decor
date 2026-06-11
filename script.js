let slider;
let autoScroll;
let scrollAmount = 0;

document.addEventListener("DOMContentLoaded", () => {
  // 1. Generate the images instantly
  generateGalleryImages();

  // 2. Setup the slider references
  slider = document.getElementById("gallerySlider");
  if (!slider) return;

  // Start the autoscroller
  startAutoScroll();

  slider.addEventListener("mouseenter", stopAutoScroll);
  slider.addEventListener("mouseleave", startAutoScroll);
});

// --- GENERATE IMAGES USING INNERHTML (BULLETPROOF METHOD) ---
function generateGalleryImages() {
  const totalImages = 16; // Change this number when adding images!
  const galleryContainer = document.getElementById('gallerySlider');

  if (galleryContainer) {
    let htmlContent = "";
    
    // Loop and build a big string of HTML image tags
    for (let i = 1; i <= totalImages; i++) {
      htmlContent += `<img src="images/gallery${i}.jpeg" alt="Annamalayar Decors Gallery ${i}" onclick="openLightbox(this.src)">`;
    }
    
    // Drop them straight into the container
    galleryContainer.innerHTML = htmlContent;
  }
}

// --- AUTO SCROLL LOGIC ---
function startAutoScroll() {
  stopAutoScroll();
  autoScroll = setInterval(() => {
    scrollAmount += 300;
    if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
      scrollAmount = 0;
    }
    slider.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    });
  }, 3000);
}

function stopAutoScroll() {
  if (autoScroll) clearInterval(autoScroll);
}

// --- GLOBAL NAVIGATION ARROWS ---
window.scrollLeft = function() {
  if (slider) slider.scrollBy({ left: -300, behavior: "smooth" });
}

window.scrollRight = function() {
  if (slider) slider.scrollBy({ left: 300, behavior: "smooth" });
}

// --- LIGHTBOX SHOW / HIDE ---
window.openLightbox = function(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.style.setProperty('display', 'flex', 'important'); // Forces display over any CSS conflict
  }
}

window.closeLightbox = function() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.style.setProperty('display', 'none', 'important');
  }
}
