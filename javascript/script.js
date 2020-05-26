function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, num2, operator) {
  return add(num1, num2);
}

function showNumbers() {
  const display = document.querySelector("#display p");
  const buttons = document.querySelectorAll(".number");
  const operators = document.querySelectorAll(".operator");
  let displayValue = ""; 

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      display.textContent += button.textContent;
      displayValue += button.textContent;
      console.log(displayValue);
    });
  });

}

showNumbers();