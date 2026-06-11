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
function openLightbox(src) {
  document.getElementById("lightboxImg").src = src;
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// 1. Tell the script how many images you currently have
const totalImages = 16; // Change this number whenever you add new photos!

// 2. Find the gallery container in your HTML
const galleryContainer = document.getElementById('image-gallery');

// 3. Loop through and generate the HTML automatically
for (let i = 1; i <= totalImages; i++) {
    // Create the image element
    const img = document.createElement('img');
    
    // Set the source (e.g., "images/gallery1.jpeg")
    img.src = `images/gallery${i}.jpeg`;
    
    // Add your lightbox click event
    img.onclick = function() {
        openLightbox(this.src);
    };
    
    // Append the image to your gallery div
    galleryContainer.appendChild(img);
}
