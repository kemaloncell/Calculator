class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperant = "";
    this.previousOperant = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperant = this.currentOperant.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperant.includes(".")) return;
    this.currentOperant = this.currentOperant.toString() + number.toString();
  }
  choseOperation(operation) {
    if (this.currentOperant === "") return;
    if (this.previousOperant !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperant = this.currentOperant;
    this.currentOperant = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperant);
    const current = parseFloat(this.currentOperant);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperant = computation;
    this.operation = undefined;
    this.previousOperant = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperant
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperant} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButton = document.querySelectorAll("[data-number");
const operationButton = document.querySelectorAll("[data-operation");
const equalsButton = document.querySelector("[data-equals");
const deleteButton = document.querySelector("[data-delete");
const allClearButton = document.querySelector("[data-all-clear");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.choseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
