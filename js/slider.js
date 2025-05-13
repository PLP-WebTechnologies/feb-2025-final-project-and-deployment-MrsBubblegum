// Image Slider for InsightBlog

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const dotsContainer = document.querySelector(".slider-dots");

  if (!slides.length || !prevBtn || !nextBtn || !dotsContainer) return;

  let currentSlide = 0;
  let slideInterval;
  const intervalTime = 5000; // 5 seconds per slide

  // Create slider dots
  function createDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("slider-dot");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

      if (index === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        goToSlide(index);
        resetInterval();
      });

      dotsContainer.appendChild(dot);
    });
  }

  // Show specific slide
  function goToSlide(n) {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove("active");
    document
      .querySelectorAll(".slider-dot")
      [currentSlide].classList.remove("active");

    // Set new current slide
    currentSlide = (n + slides.length) % slides.length;

    // Add active class to new current slide and dot
    slides[currentSlide].classList.add("active");
    document
      .querySelectorAll(".slider-dot")
      [currentSlide].classList.add("active");
  }

  // Next slide function
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  // Previous slide function
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Reset interval
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  // Initialize slider
  function initSlider() {
    createDots();

    // Set up event listeners
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetInterval();
    });

    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetInterval();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
        resetInterval();
      } else if (e.key === "ArrowRight") {
        nextSlide();
        resetInterval();
      }
    });

    // Start automatic slide change
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  // Initialize slider
  initSlider();
});
