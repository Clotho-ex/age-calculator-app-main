/* Reference to Output elements */

const outputYear = document.querySelector(".year");
const outputMonth = document.querySelector(".month");
const outputDay = document.querySelector(".day");
const submitButton = document.querySelector(".submit-btn");

/* Referance to Input elements */

let isValid = false;
const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");

/* Reference to Error elements */

const errorDay = document.querySelector(".error-day");
const errorMonth = document.querySelector(".error-month");
const errorYear = document.querySelector(".error-year");

/* Add an event listener for submit button */

submitButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent page reload on form submission
  calculateDate();
});

/* Add an event listener to input element */

let dayValue, monthValue;

/* Add event listeners for input fields */
inputDay.addEventListener("input", validateDate);
inputMonth.addEventListener("input", validateDate);
inputYear.addEventListener("input", validateDate);

inputYear.addEventListener("blur", () => {
  if (inputYear.value.trim() === "") {
    errorYear.textContent = "";
  }
});

/* Validate date function */
function validateDate() {
  const dayValue = parseInt(inputDay.value);
  const monthValue = parseInt(inputMonth.value);
  const yearValue = parseInt(inputYear.value);

  // Reset error messages
  errorDay.textContent = "";
  errorMonth.textContent = "";
  errorYear.textContent = "";

  // Check for empty fields
  if (
    isNaN(dayValue) ||
    isNaN(monthValue) ||
    isNaN(yearValue) ||
    dayValue === 0 ||
    monthValue === 0 ||
    yearValue === 0
  ) {
    return; // Do not proceed with validation if any field is empty or zero
  }

  // Validate day
  const daysInMonth = new Date(yearValue, monthValue, 0).getDate();
  if (dayValue <= 0 || dayValue > daysInMonth) {
    errorDay.textContent = "Invalid Day";
    isValid = false;
  }

  // Validate month
  if (monthValue > 12 || monthValue < 1) {
    errorMonth.textContent = "Invalid Month";
    isValid = false;
  }

  // Validate year
  const currentYear = new Date().getFullYear();
  if (yearValue > currentYear) {
    errorYear.textContent = "Invalid Year";
    isValid = false;
  }

  // If all fields are valid, set isValid to true
  if (
    errorDay.textContent === "" &&
    errorMonth.textContent === "" &&
    errorYear.textContent === ""
  ) {
    isValid = true;
  }
}

/* Date calculation function */
function calculateDate() {
  // Validate the date before proceeding with calculation
  validateDate();

  if (isValid) {
    const inputYearValue = parseInt(inputYear.value);
    const inputMonthValue = parseInt(inputMonth.value) - 1; // Months are zero-based
    const inputDayValue = parseInt(inputDay.value);

    const birthday = new Date(inputYearValue, inputMonthValue, inputDayValue);
    const today = new Date();

    let ageYear = today.getFullYear() - birthday.getFullYear();
    let ageMonth = today.getMonth() - birthday.getMonth();
    let ageDay = today.getDate() - birthday.getDate();

    // Adjust for negative values in ageMonth and ageDay
    if (
      ageMonth < 0 ||
      (ageMonth === 0 && today.getDate() < birthday.getDate())
    ) {
      ageYear--;
      ageMonth += 12;
    }
    if (ageDay < 0) {
      ageMonth--;
      ageDay += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    outputDay.textContent = ageDay;
    outputMonth.textContent = ageMonth;
    outputYear.textContent = ageYear;
  } else {
    alert("Error. Please fill in all required fields correctly.");
  }
}
