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
  let firstNum = ""; 
  let secondNum = "";
  let operator = "";

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if(button.className == "number" && operator != "") {
        display.textContent += button.textContent;
        secondNum += button.textContent;
        console.log("Second num:" + secondNum);
      } else if(button.className == "number") {
        display.textContent += button.textContent;
        firstNum += button.textContent;
        console.log("First num:" + firstNum);
      } else if(button.className == "operator") {
        display.textContent += button.textContent;
        operator = button.textContent;
        console.log("Operator:" + operator);
      } else if(button.className == "equalBtn") {
        switch (operator) {
          case "+":
            display.textContent = add(+firstNum, +secondNum);
            break;
          case "-":
            display.textContent = subtract(+firstNum, +secondNum);
            break;
          case "*":
            display.textContent = multiply(+firstNum, +secondNum);
            break;
          case "/":
            display.textContent = divide(+firstNum, +secondNum);
            break;
        }
      }
    });
  });

}

showNumbers();