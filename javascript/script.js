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
  let displayValue = "";
  let num = "";
  let operator = "";
  let firstNum = "";

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      displayValue += button.textContent;
      display.textContent += button.textContent;
      console.log(displayValue);

      if(button.className == "number") {
        num += button.textContent;
      } else if(button.className == "operator") {
        firstNum = num;
        operator = button.textContent;
        num = "";
        console.log(`First num: ${firstNum} Operator ${operator}`);
      } else if(button.className == "equalBtn") {
        for(let i = 0; i < displayValue.length; i++) {
          let multiplyOp = displayValue.indexOf("*");
          if(multiplyOp != -1) {
            let nextOperator = findOperator(displayValue, multiplyOp, +1);
            console.log(`Operator ${multiplyOp} Index ${nextOperator}`);
          } 
        }
      }
    }); 
  });
}

function findOperator(string, index) {
  let operators = /[/+/-/*//]/;
  for(let i = index + 1; i < string.length; i++) {
    if(operators.test(string[i])) {
      return i;
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