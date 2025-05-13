// Form Validation for InsightBlog

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const formSubmissionMessage = document.getElementById(
    "form-submission-message"
  );

  if (!contactForm) return;

  const formFields = {
    name: {
      element: document.getElementById("name"),
      errorElement: document.getElementById("name-error"),
      validate: (value) => {
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        return "";
      },
    },
    email: {
      element: document.getElementById("email"),
      errorElement: document.getElementById("email-error"),
      validate: (value) => {
        if (!value.trim()) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email";
        return "";
      },
    },
    subject: {
      element: document.getElementById("subject"),
      errorElement: document.getElementById("subject-error"),
      validate: (value) => {
        if (!value.trim()) return "Subject is required";
        return "";
      },
    },
    message: {
      element: document.getElementById("message"),
      errorElement: document.getElementById("message-error"),
      validate: (value) => {
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        return "";
      },
    },
  };

  // Email validation function
  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Validate single field
  function validateField(fieldName) {
    const field = formFields[fieldName];
    const value = field.element.value;
    const errorMessage = field.validate(value);

    if (errorMessage) {
      field.errorElement.textContent = errorMessage;
      field.element.classList.add("error");
      return false;
    } else {
      field.errorElement.textContent = "";
      field.element.classList.remove("error");
      return true;
    }
  }

  // Validate all fields
  function validateForm() {
    let isValid = true;

    // Validate each field
    for (const fieldName in formFields) {
      if (!validateField(fieldName)) {
        isValid = false;
      }
    }

    return isValid;
  }

  // Set up live validation
  for (const fieldName in formFields) {
    const field = formFields[fieldName];

    // Validate on blur
    field.element.addEventListener("blur", () => {
      validateField(fieldName);
    });

    // Clear error on input
    field.element.addEventListener("input", () => {
      field.errorElement.textContent = "";
      field.element.classList.remove("error");
    });
  }

  // Handle form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      // Simulate form submission
      contactForm.reset();

      // Show success message
      formSubmissionMessage.textContent =
        "Thank you for your message! We'll get back to you shortly.";
      formSubmissionMessage.classList.add("success");

      // Clear message after 5 seconds
      setTimeout(() => {
        formSubmissionMessage.textContent = "";
        formSubmissionMessage.classList.remove("success");
      }, 5000);
    }
  });
});
