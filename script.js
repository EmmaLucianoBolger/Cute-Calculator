const equationDisplay = document.getElementById("equation");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

const boopSound = new Audio('boop.mp3');

let equation = "";
let lastPressed = "";

function updateDisplay() {
  equationDisplay.textContent = equation || "0";
  resultDisplay.textContent = calculateResult() || "0";
}

function calculateResult() {
  try {
    if (equation && /[0-9]$/.test(equation)) {
      return eval(equation).toString();
    }
  } catch {
    return "Error";
  }
  return "";
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    boopSound.currentTime = 0;
    boopSound.playbackRate = 1.5;
    boopSound.play();

    if (value === "C") {
      equation = "";
      updateDisplay();
      return;
    }

    if (value === "=") {
      try {
        equation = eval(equation).toString();
        updateDisplay();
        return;
      } catch {
        resultDisplay.textContent = "Error";
        equation = "";
        return;
      }
    }

    const isOperator = /[+\-*/]/.test(value);
    const lastChar = equation.slice(-1);

    if (isOperator && (equation === "" || /[+\-*/]/.test(lastChar))) {
      return; // Avoid invalid operator usage
    }

    if (lastPressed === "=" && !isOperator) {
      equation = value;
    } else {
      equation += value;
    }

    lastPressed = value;
    updateDisplay();
  });
});
