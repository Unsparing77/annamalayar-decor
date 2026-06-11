let slider;
let autoScroll;
let scrollAmount = 0;

document.addEventListener("DOMContentLoaded", () => {
  slider = document.getElementById("gallerySlider");
  if (!slider) return;

  startAutoScroll();

  slider.addEventListener("mouseenter", stopAutoScroll);
  slider.addEventListener("mouseleave", startAutoScroll);
});

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

/* Lightbox */
// --- DYNAMIC IMAGE GALLERY GENERATOR ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Update this number whenever you upload new photos to your folder
    const totalImages = 9; 

    // 2. Select your gallery container element
    const galleryContainer = document.getElementById('image-gallery');

    // Only run if the gallery container exists on the current page
    if (galleryContainer) {
        for (let i = 1; i <= totalImages; i++) {
            // Create image element
            const img = document.createElement('img');
            
            // Set source and alt text dynamically
            img.src = `images/gallery${i}.jpeg`;
            img.alt = `Gallery Image ${i}`;
            
            // Bind the lightbox trigger to your existing openLightbox function
            img.onclick = function() {
                if (typeof openLightbox === "function") {
                    openLightbox(this.src);
                } else {
                    console.error("openLightbox function is not defined in script.js");
                }
            };
            
            // Inject the image into your gallery wrapper
            galleryContainer.appendChild(img);
        }
    }
});
