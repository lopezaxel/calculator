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
  const buttons = document.querySelectorAll("button");
  let displayValue = [];
  let num = "";
  let operator = "";
  let firstNum = "";
  let result = "";

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // displayValue += button.textContent;
      display.textContent += button.textContent;
      
      if(button.className == "number") {
        num += button.textContent;
      } else if(button.className == "operator") {
        firstNum = num;
        operator = button.textContent;
        num = "";
        displayValue.push(firstNum);
        displayValue.push(operator);
      } else if(button.className == "equalBtn") {
        displayValue.push(num);
        
        for(let i = 0; i <= displayValue.length; i++) {
          switch (displayValue[i]) {
            case "+":
              result = +displayValue[i - 1] + +displayValue[i + 1];
              displayValue.splice(displayValue[i - 2], 3, result);
              i = 0;
              break;
            case "-":
              result = +displayValue[i - 1] - +displayValue[i + 1];
              displayValue.splice(displayValue[i - 2], 3, result);
              i = 0;
              break;
            case "*":
              result = +displayValue[i - 1] * +displayValue[i + 1];
              displayValue.splice(displayValue[i - 2], 3, result);
              i = 0;
              break;
            case "/":
              result = +displayValue[i - 1] / +displayValue[i + 1];
              displayValue.splice(displayValue[i - 2], 3, result);
              i = 0;
              break;
          }
          console.log(displayValue);
          console.log('Result :' + result);
        }
      }
    }); 
  });
}

function findOperator(string, index, direction) {
  let operators = /[=+-/*//]/;
  if(direction == +1) {
    for(let i = index + 1; i < string.length; i++) {
      if(operators.test(string[i])) {
        return i - 1;
      }
    }
  } else if (direction == -1) {
    for(let i = index - 1; i > 0; i--) {
      if(operators.test(string[i])) {
        return i;
      }
    }
  }
}

function determineOperator(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(+num1, +num2);
    case "-":
      return subtract(+num1, +num2);
    case "*":
      return multiply(+num1, +num2);
    case "/":
      return divide(+num1, +num2);
  }
}

showNumbers();