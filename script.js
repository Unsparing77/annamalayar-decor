let slider;
let autoScroll;
let scrollAmount = 0;

document.addEventListener("DOMContentLoaded", () => {
  // 1. First, generate the images dynamically into the slider
  generateGalleryImages();

  // 2. Now find the slider (which now has the images inside it!)
  slider = document.getElementById("gallerySlider");
  if (!slider) return;

  startAutoScroll();

  slider.addEventListener("mouseenter", stopAutoScroll);
  slider.addEventListener("mouseleave", startAutoScroll);
});

// --- DYNAMIC IMAGE GALLERY GENERATOR ---
function generateGalleryImages() {
  // Change this number whenever you upload new photos!
  const totalImages = 9; 

  // We look for "gallerySlider" so it injects right into your slider carousel
  const galleryContainer = document.getElementById('gallerySlider');

  if (galleryContainer) {
    for (let i = 1; i <= totalImages; i++) {
      const img = document.createElement('img');
      img.src = `images/gallery${i}.jpeg`;
      img.alt = `Gallery Image ${i}`;
      
      // Fixed: Lightbox trigger
      img.onclick = function() {
        if (typeof openLightbox === "function") {
          openLightbox(this.src);
        } else {
          // If your lightbox function is in another file, this will still trigger it
          window.openLightbox ? window.openLightbox(this.src) : console.log("Lightbox function missing");
        }
      };
      
      galleryContainer.appendChild(img);
    }
  }
}

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

/* 🔥 THESE MUST BE GLOBAL */
function scrollLeft() {
  slider.scrollBy({ left: -300, behavior: "smooth" });
}

function scrollRight() {
  slider.scrollBy({ left: 300, behavior: "smooth" });
}
