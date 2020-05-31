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

function calculate(calc, i, operator) {
  if(calc[i] == "*" && (operator == "*" || operator == "/")) {
    return calc.splice(i - 1, 3, operate(+calc[i - 1], +calc[i + 1], "*"));
  } else if (calc[i] == "/" && (operator == "/" || operator == "*")) {
    return calc.splice(i - 1, 3, operate(+calc[i - 1], +calc[i + 1], "/"));
  } else if (calc[i] == "+" && (operator == "+" || operator == "-")) {
    return calc.splice(i - 1, 3, operate(+calc[i - 1], +calc[i + 1], "+"));
  } else if (calc[i] == "-" && (operator == "-" || operator == "+")) {
    return calc.splice(i - 1, 3, operate(+calc[i - 1], +calc[i + 1], "-"));
  }   
}

function getOperator(e, btn = "") {
  let value = e.key ? e.key : btn.textContent
  display.textContent += value;
  displayValue.push(num, value);
  num = "";
}

function getClear() {
  display.textContent = "";
  displayValue = [];
  num = "";
}

function undoneLastNum() {
  num = num.slice(0, -1);
  display.textContent = display.textContent.slice(0, -1);
}

function getResult() {
  displayValue.push(num);
  num = "";
  
  loop1:
  for (let e = 0; e < 4; e++) {
    for (let i = 0; i < displayValue.length; i++) {
      if (displayValue == Infinity){
        displayValue = "Can't divide by zero";
        break loop1;
      } 
      calculate(displayValue, i, operators[e]);
    }
  }

  display.textContent = Math.round(displayValue * 100) / 100;
  displayValue = [];
  newText = true;
}

function getNumber(e, btn = "") {
  if (newText == true) {
    display.textContent = "";
    newText = false;
  }
  let value = e.key ? e.key : btn.textContent
  num += value;
  display.textContent += value;
}

function checkEnterDot(e, btn = "") {
  console.log(e.key);
  if (btn.textContent == "." && num.indexOf(".") != -1) {
    return true;
  } else if (e.key == "." && num.indexOf(".") != -1) {
    return true;
  }
}

function respondClickInput(e, btn) {
  if (btn.className == "number" || btn.className == "dotBtn") {
    if (checkEnterDot(e, btn)) return;
    getNumber(e, btn);
  } else if (btn.className == "operator") {
    getOperator(e, btn);
  } else if (btn.className == "clearBtn") {
    getClear();
  } else if (btn.className == "undoneBtn") {
    undoneLastNum();
  } else if (btn.className == "equalBtn") {
    getResult();
  }
}

function respondKeyInput(e) {
  if (numberKeyCodes.includes(e.key) || e.key == ".") {
    if (checkEnterDot(e)) return;
    getNumber(e);
  } else if (operatorKeyCodes.includes(e.key)) {
    getOperator(e);
  } else if (e.key == "c" || e.key == "C") {
    getClear();
  } else if (e.key == "Backspace") {
    undoneLastNum();
  } else if (e.key == "=") {
    getResult();
  }
}

const display = document.querySelector("#display p");
const buttons = document.querySelectorAll("button");
const operatorKeyCodes = ["*", "/", "+", "-",];
const numberKeyCodes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",];
let displayValue = [];
let num = "";
let operators = "*/+-";
let newText = false;

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    respondClickInput(e, btn);
  });
});

document.addEventListener("keydown", (e) => {
  respondKeyInput(e);
});

