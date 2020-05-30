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
  let operators = "*/+-";
  let flag = false;

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.className == "number" || button.className == "dotBtn") {
        if (flag == true) {
          display.textContent = "";
          flag = false;
        } else if (button.textContent == "." && num.indexOf(".") != -1) {
          return;
        }
        num += button.textContent;
        display.textContent += button.textContent;
      } else if (button.className == "operator") {
        displayValue.push(num);
        displayValue.push(button.textContent);
        num = "";
        display.textContent += button.textContent;
      } else if (button.className == "clearBtn") {
        display.textContent = "";
        num = "";
        result = "";
        displayValue = [];
      } else if (button.className == "equalBtn") {
        displayValue.push(num);
        num = "";
        
        loop1:
        for (let e = 0; e < 4; e++) {
          for (let i = 0; i < displayValue.length; i++) {
            if (displayValue == Infinity){
              displayValue = "Can't divide by zero";
              break loop1;
            } else {
              calculate(displayValue, result, i, operators[e]);
            }
          }
        }
        display.textContent = Math.round(displayValue * 100) / 100;
        displayValue = [];
        flag = true;
      }
    }); 
  });
}

function calculate(calculation, result, i, operator) {
  switch (calculation[i]) {
    case "*":
      if(operator == "*" || operator == "/") {
        result = operate(+calculation[i - 1], +calculation[i + 1], "*");
        return calculation.splice(i - 1, 3, result);
      }
    case "/":
      if (operator == "/" || operator == "*") {
        result = operate(+calculation[i - 1], +calculation[i + 1], "/");
        return calculation.splice(i - 1, 3, result);
      }
    case "+":
      if (operator == "+" || operator == "-") {
        result = operate(+calculation[i - 1], +calculation[i + 1], "+");
        return calculation.splice(i - 1, 3, result);
      }
    case "-":
      if (operator == "-" || operator == "+") {
        result = operate(+calculation[i - 1], +calculation[i + 1], "-");
        return calculation.splice(i - 1, 3, result);
      }
    }
}

function createGrid() {

}

showNumbers();