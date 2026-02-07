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
