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

function startCalculator() {
  const display = document.querySelector("#display p");
  const buttons = document.querySelectorAll("button");
  let displayValue = [];
  let num = "";
  let operators = "*/+-";
  let newText = false;

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      switch (btn.className) {
        case "dotBtn":
        case "number":
          if (newText == true) {
            display.textContent = "";
            newText = false;
          } else if (btn.textContent == "." && num.indexOf(".") != -1) return; 
          num += btn.textContent;
          display.textContent += btn.textContent;
          break;          
        case "operator":
          display.textContent += btn.textContent;
          displayValue.push(num, btn.textContent);
          num = "";
          break;
        case "clearBtn":
          display.textContent = "";
          displayValue = [];
          num = "";
          break;
        case "undoneBtn":
          num = num.slice(0, -1);
          display.textContent = display.textContent.slice(0, -1);
          break;
        case "equalBtn":
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
          break;
      }
    }); 
  });
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

startCalculator();