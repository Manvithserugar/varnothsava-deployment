const offlineBtn = document.querySelector(".offline-button");
const onlineBtn = document.querySelector(".online-button");
const form = document.getElementById("screen-shot");
const fileInput = document.getElementById("transaction-snap");
const message = document.getElementById("message");
const baseURL = "/api/v1";

offlineBtn.addEventListener("click", async () => {
  const response = await fetch(`${baseURL}/payment/offline`, {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    window.location.href = "./thankyou.html";
  }
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    onlineBtn.classList.remove("disabled");
    message.textContent = "";
    message.classList.remove("error");
  } else {
    onlineBtn.classList.add("disabled");
    message.textContent =
      "* No file selected. Please upload the payment proof.";
    message.classList.add("error");
  }
});

document
  .getElementById("transaction-snap")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const previewContainer = document.getElementById("image-preview");
        previewContainer.innerHTML = ""; // Clear previous preview
        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = "Uploaded Preview";
        img.style.maxWidth = "200px"; // Adjust as needed
        img.style.marginTop = "10px";
        img.style.border = "1px solid #ccc";
        img.style.borderRadius = "5px";
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (fileInput.files.length > 0) {
    try {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);

      const response = await fetch(`${baseURL}/payment/online`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.href = "./thankyou.html";
      } else {
        const errorMessage = await response.text();
        message.textContent = `* Error: ${errorMessage}`;
        message.classList.add("error");
      }
    } catch (error) {
      message.textContent = "* An error occurred. Please try again.";
      message.classList.add("error");
    }
  } else {
    message.textContent =
      "* No file selected. Please upload the payment proof.";
    onlineBtn.classList.add("disabled");
    message.classList.add("error");
  }
});
