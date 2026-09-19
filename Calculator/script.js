/* =========================================================
   BASIC CALCULATOR - script.js
   ========================================================= */

/* ---------- 1. Grab all the elements we need once, up front ---------- */

const calculatorEl    = document.querySelector(".calculator");
const expressionEl    = document.getElementById("expression");
const currentEl       = document.getElementById("current");
const numberButtons   = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-action='operator']");
const decimalButton   = document.querySelector("[data-action='decimal']");
const equalsButton    = document.querySelector("[data-action='equals']");
const clearButton     = document.querySelector("[data-action='clear']");
const deleteButton    = document.querySelector("[data-action='delete']");
const allButtons      = document.querySelectorAll(".btn");
const themeToggle     = document.getElementById("themeToggle");
const themeLabel      = document.getElementById("themeLabel");
const themeIcons      = document.querySelectorAll(".theme-icon");

/* ---------- 2. Calculator "memory" (the state) ----------
   currentInput       -> the RAW number being typed, no commas
                          (e.g. "12345"), used for all math.
   previousInput      -> the first number, saved after an operator.
   operator           -> "+", "-", "*", "/", or null.
   shouldResetCurrent -> true right after "=" or "%" so the next
                         digit typed starts a brand new number.
------------------------------------------------------------ */
let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetCurrent = false;

/* =========================================================
   SECTION A: DISPLAY
   ========================================================= */

// Turns a raw number string like "12345.6" into "12,345.6" for
// display purposes ONLY. The raw, comma-free value in
// currentInput/previousInput is what's actually used for math.

function formatNumberString(numStr) {
  if (numStr === "" || numStr === undefined) return numStr;

  // Scientific notation (e.g. "1e+21") shouldn't be comma-formatted
  if (numStr.includes("e") || numStr.includes("E")) return numStr;

  const isNegative = numStr.startsWith("-");
  const unsigned = isNegative ? numStr.slice(1) : numStr;

  const [rawIntPart, decimalPart] = unsigned.split(".");
  const intPart = rawIntPart === "" ? "0" : rawIntPart;

  // Add a comma every 3 digits from the right (standard grouping)
  const withCommas = Number(intPart).toLocaleString("en-US");

  let result = withCommas;
  if (decimalPart !== undefined) {
    result += "." + decimalPart; // keep decimals exactly as typed
  }

  return (isNegative ? "-" : "") + result;
}

// Redraws both lines of the screen based on the current state
function updateDisplay() {
  currentEl.textContent = formatNumberString(currentInput);
  currentEl.classList.remove("error");

  if (operator && previousInput !== "") {
    expressionEl.textContent = `${formatNumberString(previousInput)} ${operatorSymbol(operator)}`;
  } else {
    expressionEl.textContent = "";
  }
}

function operatorSymbol(op) {
  switch (op) {
    case "+": return "+";
    case "-": return "−";
    case "*": return "×";
    case "/": return "÷";
    default:  return "";
  }
}

/* =========================================================
   SECTION B: TYPING NUMBERS
   ========================================================= */

function inputNumber(digit) {
  if (shouldResetCurrent) {
    currentInput = "0";
    shouldResetCurrent = false;
  }

  currentInput = currentInput === "0" ? digit : currentInput + digit;
  updateDisplay();
}

function inputDecimal() {
  if (shouldResetCurrent) {
    currentInput = "0";
    shouldResetCurrent = false;
  }

  // Only one decimal point allowed per number
  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateDisplay();
  }
}

/* =========================================================
   SECTION C: OPERATORS & MATH
   ========================================================= */

function chooseOperator(op) {
  // If an operator is already active and the user types another
  // one before entering a second number, solve what we have so far.
  if (operator !== null && !shouldResetCurrent) {
    const success = calculate();
    if (!success) return; // an error (e.g. divide by zero) was shown - stop here
  }

  previousInput = currentInput;
  operator = op;
  shouldResetCurrent = true;
  updateDisplay();
}

// Does the actual math. Returns TRUE if it worked, FALSE if an
// error was shown instead (so the caller knows not to overwrite
// the error message with a normal display update).
function calculate() {
  if (operator === null || previousInput === "") return true;

  const first  = parseFloat(previousInput);
  const second = parseFloat(currentInput);
  if (isNaN(first) || isNaN(second)) return true;

  let result;

  switch (operator) {
    case "+":
      result = first + second;
      break;
    case "-":
      result = first - second;
      break;
    case "*":
      result = first * second;
      break;
    case "/":
      // THE FIX: division by zero now properly stops here and
      // shows a real error instead of silently becoming "0".
      if (second === 0) {
        showError("Cannot divide by zero");
        return false;
      }
      result = first / second;
      break;
    default:
      return true;
  }

  // Rounding fixes tiny floating-point mistakes like 0.1 + 0.2
  result = Math.round(result * 1e10) / 1e10;

  currentInput = result.toString();
  previousInput = "";
  operator = null;
  shouldResetCurrent = true;
  return true;
}

// Called when "=" (or Enter) is pressed
function handleEquals() {
  if (operator === null) return;

  const success = calculate();

  // Only redraw the screen with the result if there was no error.
  // If calculate() failed, showError() already put the error
  // message on screen - redrawing here would wipe it out.
  if (success) {
    updateDisplay();
    playAnimation(currentEl, "pop");
  }
}

/* =========================================================
   SECTION D: CLEAR, DELETE & ERRORS
   ========================================================= */

function showError(message) {
  currentEl.textContent = message;
  currentEl.classList.add("error");
  expressionEl.textContent = "";

  currentInput = "0";
  previousInput = "";
  operator = null;
  shouldResetCurrent = true;

  playAnimation(currentEl.parentElement, "shake");
}

function clearAll() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  shouldResetCurrent = false;
  updateDisplay();
  playAnimation(currentEl.parentElement, "shake");
}

function deleteLast() {
  if (shouldResetCurrent) return; // nothing sensible to delete right after "="

  currentInput = currentInput.slice(0, -1);
  if (currentInput === "" || currentInput === "-") {
    currentInput = "0";
  }
  updateDisplay();
}

/* =========================================================
   SECTION E: SMALL ANIMATION HELPERS
   ========================================================= */

function playAnimation(element, className) {
  element.classList.remove(className);
  void element.offsetWidth; // forces the browser to notice the reset
  element.classList.add(className);

  element.addEventListener(
    "animationend",
    () => element.classList.remove(className),
    { once: true }
  );
}

function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const size = Math.max(button.clientWidth, button.clientHeight);

  circle.classList.add("ripple");
  circle.style.width = circle.style.height = `${size}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - size / 2}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - size / 2}px`;

  button.appendChild(circle);
  circle.addEventListener("animationend", () => circle.remove());
}

/* =========================================================
   SECTION F: WIRING UP ALL THE BUTTONS
   ========================================================= */

allButtons.forEach((btn) => btn.addEventListener("click", createRipple));

numberButtons.forEach((btn) => {
  btn.addEventListener("click", () => inputNumber(btn.dataset.number));
});

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => chooseOperator(btn.dataset.operator));
});

decimalButton.addEventListener("click", inputDecimal);

equalsButton.addEventListener("click", () => {
  handleEquals();
  playAnimation(equalsButton, "pressed");
});

clearButton.addEventListener("click", clearAll);
deleteButton.addEventListener("click", deleteLast);

/* =========================================================
   SECTION G: KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    inputNumber(key);
  } else if (key === ".") {
    inputDecimal();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    chooseOperator(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    handleEquals();
    playAnimation(equalsButton, "pressed");
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearAll();
  }
});

/* =========================================================
   SECTION H2: LIGHT / DARK (AMOLED) THEME SWITCHING
   ========================================================= */

// Applies a theme by setting a data-theme attribute on <html>.
// style.css reads this attribute to swap all the color variables,
// and every color already has a CSS transition, so this alone
// is what makes the switch animate smoothly.
function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeLabel.textContent = "Dark";
  } else {
    document.documentElement.removeAttribute("data-theme"); // default = light
    themeLabel.textContent = "Light";
  }

  // Little bounce on the sun/moon icons for extra feedback
  themeIcons.forEach((icon) => playAnimation(icon, "icon-bounce"));
}

// Remember the user's choice so it's still applied next time
// they open the page. Wrapped in try/catch in case storage is
// unavailable (e.g. private browsing).
function saveThemePreference(theme) {
  try {
    localStorage.setItem("calculatorTheme", theme);
  } catch (err) {
    // Ignore - theme just won't persist, calculator still works fine
  }
}

function loadThemePreference() {
  try {
    return localStorage.getItem("calculatorTheme");
  } catch (err) {
    return null;
  }
}

// Toggle switch: checked = dark theme, unchecked = light theme
themeToggle.addEventListener("change", () => {
  const chosenTheme = themeToggle.checked ? "dark" : "light";
  applyTheme(chosenTheme);
  saveThemePreference(chosenTheme);
});

// On page load, restore whatever theme the user picked last time
const savedTheme = loadThemePreference();
if (savedTheme === "dark") {
  themeToggle.checked = true;
  applyTheme("dark");
}

/* =========================================================
   SECTION H: "EXIT" ANIMATION
   ========================================================= */
window.addEventListener("beforeunload", () => {
  calculatorEl.classList.add("exit");
});

/* =========================================================
   SECTION I: FIRST RENDER
   ========================================================= */
updateDisplay();
