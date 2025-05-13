// Main JavaScript for InsightBlog

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");

      // Toggle hamburger to X
      const bars = document.querySelectorAll(".bar");
      if (menuToggle.classList.contains("active")) {
        bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
      } else {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (navMenu && navMenu.classList.contains("active")) {
      if (!event.target.closest("nav")) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");

        const bars = document.querySelectorAll(".bar");
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    }
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (question) {
      question.addEventListener("click", () => {
        // Close other open FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active");
          }
        });

        // Toggle current FAQ item
        item.classList.toggle("active");
      });
    }
  });

  // Newsletter Form Submission
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterMessage = document.getElementById("newsletter-message");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;

      // Simple email validation
      if (validateEmail(email)) {
        // Simulate form submission
        newsletterForm.reset();
        newsletterMessage.textContent = "Thank you for subscribing!";
        newsletterMessage.classList.add("success");

        // Clear message after 3 seconds
        setTimeout(() => {
          newsletterMessage.textContent = "";
          newsletterMessage.classList.remove("success");
        }, 3000);
      } else {
        newsletterMessage.textContent = "Please enter a valid email address.";
        newsletterMessage.classList.add("error");

        setTimeout(() => {
          newsletterMessage.textContent = "";
          newsletterMessage.classList.remove("error");
        }, 3000);
      }
    });
  }

  // Email validation function
  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});
