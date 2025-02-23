const technical_events = document.querySelector(".technical-events");
const cultural_events = document.querySelector(".cultural-events");
const technical = document.querySelector(".technical");
const cultural = document.querySelector(".cultural");
const management = document.querySelector(".management");
const management_events = document.querySelector(".management-events");
const form = document.querySelector("[data-multi-step]");
let count = 0;
// import config from "./config";
const baseURL = "/api/v1";
const inputFieldState = {
  name: "",
  usn: "",
  college: "",
  email: "",
  phone: "",
  events: [],
};
const proceedButton = document.querySelector(".proceed");

function toggleProceedButton() {
  if (count <= 0) {
    proceedButton.classList.add("disabled");
  } else {
    proceedButton.classList.remove("disabled");
  }
}

toggleProceedButton();

function createEventCard(
  eventId,
  eventImg,
  eventTitle,
  eventDate,
  eventTime,
  eventDescription,
  eventType
) {
  const eventCard = document.createElement("div");
  eventCard.className = "event-card";
  eventCard.dataset.eventId = eventId;

  const checkIcon = document.createElement("span");
  checkIcon.className = "material-symbols-outlined";
  checkIcon.innerHTML = "check_circle";
  eventCard.appendChild(checkIcon);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "checkbox";
  checkBox.id = eventId;
  checkBox.value = eventId;
  checkBox.style = "display:none";
  eventCard.appendChild(checkBox);

  const img = document.createElement("img");
  img.src = eventImg;
  img.alt = "event";

  const details = document.createElement("div");
  details.className = "details";

  const titleAndDate = document.createElement("div");
  titleAndDate.className = "title-date";

  const title = document.createElement("h4");
  const boldText = document.createElement("b");
  boldText.textContent = eventTitle;
  title.appendChild(boldText);
  const dtaeAndTime = document.createElement("div");
  dtaeAndTime.className = "date-time";

  const dtaeDiv = document.createElement("div");
  dtaeDiv.className = "date";
  dtaeDiv.textContent = `Date: ${eventDate}`;
  details.appendChild(dtaeAndTime);

  const timeDiv = document.createElement("div");
  timeDiv.className = "time";
  timeDiv.textContent = `Time: ${eventTime}`;

  dtaeAndTime.appendChild(dtaeDiv);
  dtaeAndTime.appendChild(timeDiv);

  const description = document.createElement("div");
  description.className = "time";
  description.className = "date";
  // description.textContent = eventDescription;

  titleAndDate.appendChild(title);
  // titleAndDate.appendChild(dtaeAndTime);

  details.appendChild(titleAndDate);
  details.appendChild(dtaeAndTime);

  eventCard.appendChild(img);
  eventCard.appendChild(details);

  eventCard.addEventListener("click", () => {
    if (checkBox.checked) {
      checkBox.checked = false;
      eventCard.classList.remove("checked");
      inputFieldState.events = inputFieldState.events.filter(
        (event) => event !== checkBox.value
      );
      count--;
    } else {
      checkBox.checked = true;
      eventCard.classList.add("checked");
      inputFieldState.events.push(checkBox.value);
      count++;
    }
    // toggleCards();
    toggleProceedButton();
  });

  if (eventType === "technical") {
    technical.classList.add("active");
    technical_events.appendChild(eventCard);
  } else if (eventType === "cultural") {
    cultural.classList.add("active");
    cultural_events.appendChild(eventCard);
  } else {
    management.classList.add("active");
    management_events.appendChild(eventCard);
  }
}

// function toggleCards() {
//   const allCards = document.querySelectorAll(".event-card");
//   allCards.forEach((card) => {
//     const checkBox = card.querySelector(".checkbox");
//     if (!checkBox.checked && count >= 5) {
//       card.classList.add("disabled");
//     } else {
//       card.classList.remove("disabled");
//     }
//   });
// }

const events = fetch(`${baseURL}/api/v1/event`)
  .then((response) => response.json())
  .then((data) =>
    data.forEach((event) => {
      createEventCard(
        event._id,
        event.img,
        event.name,
        event.date,
        event.time,
        event.venue,
        event.type
      );
    })
  )
  .catch((error) => console.error("Error:", error));

document.addEventListener("DOMContentLoaded", () => {
  // Get the form and all step elements
  const multiStepForm = document.querySelector("[data-multi-step]");
  const formSteps = Array.from(multiStepForm.querySelectorAll("[data-step]"));

  // Determine which step is active; default to the first if none is active
  let currentStep = formSteps.findIndex((step) =>
    step.classList.contains("active")
  );
  if (currentStep < 0) {
    currentStep = 0;
    showCurrentStep();
  }

  // Function to show only the current step
  function showCurrentStep() {
    formSteps.forEach((step, index) => {
      step.classList.toggle("active", index === currentStep);
    });
  }

  // Object to track each field's validity
  const validationState = {
    name: false,
    usn: false,
    college: false,
    email: false,
    phone: false,
  };

  // Elements for the "Next" and "Previous" buttons
  const nextButton = document.querySelector("[data-next]");
  const prevButton = document.querySelector("[data-previous]");

  // Input elements
  const nameInput = document.querySelector("#name");
  const usnInput = document.querySelector("#usn");
  const collegeInput = document.querySelector("#college");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");

  // Message elements
  const nameMsg = document.querySelector(".nameMsg");
  const usnMsg = document.querySelector(".usnMsg");
  const collegeMsg = document.querySelector(".collegeMsg");
  const emailMsg = document.querySelector(".emailMsg");
  const phoneMsg = document.querySelector(".phoneMsg");

  // Regex patterns for validation
  const namePattern = /^[a-zA-Z\s]+$/;
  const usnPattern = /^[a-zA-Z0-9]+$/;
  const collegePattern = /^[a-zA-Z0-9\s]+$/;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^[6-9]\d{9}$/;

  // Update the state of the "Next" button based on validation
  function updateNextButton() {
    const allValid = Object.values(validationState).every(Boolean);
    if (allValid) {
      nextButton.classList.remove("disabled");
    } else {
      nextButton.classList.add("disabled");
    }
  }
  function validateField(
    input,
    pattern,
    errorMsg,
    emptyMsg,
    msgElement,
    fieldKey
  ) {
    const value = input.value.trim();
    if (!value) {
      msgElement.textContent = emptyMsg;
      validationState[fieldKey] = false;
    } else if (!pattern.test(value)) {
      msgElement.textContent = errorMsg;
      validationState[fieldKey] = false;
    } else {
      msgElement.textContent = "";
      validationState[fieldKey] = true;
    }
    updateNextButton();
  }

  // Attach event listeners to each input field (both for real-time and blur validation)
  nameInput.addEventListener("input", (e) => {
    validateField(
      nameInput,
      namePattern,
      "* Invalid Name",
      "* Name required",
      nameMsg,
      "name"
    );
    inputFieldState.name = e.target.value;
  });
  nameInput.addEventListener("blur", () => {
    validateField(
      nameInput,
      namePattern,
      "* Invalid Name",
      "* Name required",
      nameMsg,
      "name"
    );
  });

  usnInput.addEventListener("input", (e) => {
    validateField(
      usnInput,
      usnPattern,
      "* Invalid USN",
      "* USN required",
      usnMsg,
      "usn"
    );
    inputFieldState.usn = e.target.value;
  });
  usnInput.addEventListener("blur", () => {
    validateField(
      usnInput,
      usnPattern,
      "* Invalid USN",
      "* USN required",
      usnMsg,
      "usn"
    );
  });

  collegeInput.addEventListener("input", (e) => {
    validateField(
      collegeInput,
      collegePattern,
      "* Invalid College",
      "* College required",
      collegeMsg,
      "college"
    );
    inputFieldState.college = e.target.value;
  });
  collegeInput.addEventListener("blur", () => {
    validateField(
      collegeInput,
      collegePattern,
      "* Invalid College",
      "* College required",
      collegeMsg,
      "college"
    );
  });

  emailInput.addEventListener("input", (e) => {
    validateField(
      emailInput,
      emailPattern,
      "* Invalid Email",
      "* Email required",
      emailMsg,
      "email"
    );
    inputFieldState.email = e.target.value;
  });
  emailInput.addEventListener("blur", () => {
    validateField(
      emailInput,
      emailPattern,
      "* Invalid Email",
      "* Email required",
      emailMsg,
      "email"
    );
  });

  phoneInput.addEventListener("input", (e) => {
    validateField(
      phoneInput,
      phonePattern,
      "* Invalid Phone",
      "* Phone required",
      phoneMsg,
      "phone"
    );
    inputFieldState.phone = e.target.value;
  });
  phoneInput.addEventListener("blur", () => {
    validateField(
      phoneInput,
      phonePattern,
      "* Invalid Phone",
      "* Phone required",
      phoneMsg,
      "phone"
    );
  });

  // Navigation: Go to the next step only if all fields are valid.
  nextButton.addEventListener("click", () => {
    updateNextButton();
    // Prevent navigation if button is disabled
    if (nextButton.classList.contains("disabled")) return;
    currentStep = Math.min(currentStep + 1, formSteps.length - 1);
    showCurrentStep();
  });

  // Navigation for the Previous button
  prevButton.addEventListener("click", () => {
    currentStep = Math.max(currentStep - 1, 0);
    showCurrentStep();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    //register the students to the server
    try {
      const response = await fetch(`${baseURL}/api/v1/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputFieldState),
      });

      if (response.ok) {
        console.log("Request successful, status:", response.status);
        window.location.href = "./Payment.html";
      } else {
        console.error("Request failed, status:", response.status);
      }
    } catch (error) {
      console.error("Network error or other issue:", error);
    }
  });

  proceedButton.addEventListener("click", (event) => {
    if (count <= 0) {
      event.preventDefault();
      toggleProceedButton();
    }
  });
});
