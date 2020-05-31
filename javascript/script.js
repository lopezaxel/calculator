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

function getOperator(btn) {
  display.textContent += btn.textContent;
  displayValue.push(num, btn.textContent);
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

function getNumber(btn) {
  if (newText == true) {
    display.textContent = "";
    newText = false;
  }
  num += btn.textContent;
  display.textContent += btn.textContent;
}

function checkEnterDot(btn) {
  if (btn.textContent == "." && num.indexOf(".") != -1) {
    return true;
  };
}

function startCalculator() {
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.className == "number" || btn.className == "dotBtn") {
        if (checkEnterDot(btn)) return;
        getNumber(btn);
      } else if (btn.className == "operator") {
        getOperator(btn);
      } else if (btn.className == "clearBtn") {
        getClear();
      } else if (btn.className == "undoneBtn") {
        undoneLastNum();
      } else if (btn.className == "equalBtn") {
        getResult();
      }
    }); 
  });  
}

const display = document.querySelector("#display p");
const buttons = document.querySelectorAll("button");
let displayValue = [];
let num = "";
let operators = "*/+-";
let newText = false;

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 48) {
    console.log("dou 0");
  }
})

startCalculator();