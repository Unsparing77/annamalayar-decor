let slider;
let autoScroll;
let scrollAmount = 0;

document.addEventListener("DOMContentLoaded", () => {
  // 1. Generate the images dynamically inside the slider wrapper first
  generateGalleryImages();

  // 2. Initialize the slider features
  slider = document.getElementById("gallerySlider");
  if (!slider) return;

  startAutoScroll();

  slider.addEventListener("mouseenter", stopAutoScroll);
  slider.addEventListener("mouseleave", startAutoScroll);
});

// --- DYNAMIC IMAGE GALLERY GENERATOR ---
function generateGalleryImages() {
  // Change this number whenever you upload new photos to your folder!
  const totalImages = 16; 

  const galleryContainer = document.getElementById('gallerySlider');

  if (galleryContainer) {
    for (let i = 1; i <= totalImages; i++) {
      const img = document.createElement('img');
      img.src = `images/gallery${i}.jpeg`;
      img.alt = `Annamalayar Decors Gallery ${i}`;
      
      // Bind the click event to open the lightbox
      img.onclick = function() {
        openLightbox(this.src);
      };
      
      galleryContainer.appendChild(img);
    }
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

// --- LIGHTBOX SHOW / HIDE LOGIC ---
window.openLightbox = function(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.add('active'); // Adds an active class to show it
    lightbox.style.display = "flex";  // Backup layout display toggle
  }
}

window.closeLightbox = function() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    lightbox.style.display = "none";
  }
}
