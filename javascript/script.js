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
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

function showNumbers() {
  const display = document.querySelector("#display p");
  const buttons = document.querySelectorAll("button");
  let displayValue = [];
  let num = "";
  let result = "";

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      display.textContent += button.textContent;

      if(button.className == "number") {
        num += button.textContent;
      } else if(button.className == "operator") {
        displayValue.push(num);
        displayValue.push(button.textContent);
        num = "";
      } else if(button.className == "equalBtn") {
        displayValue.push(num);
        
        for(let i = 0; i < displayValue.length; i++) {
          calculate(displayValue, result, i)
          i = 0;
          display.textContent = displayValue;
          console.log(displayValue);
        }
      }
    }); 
  });
}

function calculate(calculation, result, i) {
  switch (calculation[i]) {
    case "+":
      result = operate(+calculation[i - 1], +calculation[i + 1], "+");
      return calculation.splice(calculation[i - 2], 3, result);
    case "-":
      result = operate(+calculation[i - 1], +calculation[i + 1], "-");
      return calculation.splice(calculation[i - 2], 3, result);
    case "*":
      result = operate(+calculation[i - 1], +calculation[i + 1], "*");
      return calculation.splice(calculation[i - 2], 3, result);
    case "/":
      result = operate(+calculation[i - 1], +calculation[i + 1], "/");
      return calculation.splice(calculation[i - 2], 3, result);
    }
}

showNumbers();