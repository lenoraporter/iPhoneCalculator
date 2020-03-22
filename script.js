// Step 1: Identity and mimic user intent
// User Intent: Type a number, choose an operator, input another number, press equal sign, and get a result.
// Happy Path: 2 + 5 = 7
// Edge Case: 2 + 5 * 7 - 1700 = -1663 NOT DOING THIS!

let prevEntry = 0;
let operator = null;
let currentEntry = 0;
let result = 0;

// Step 2: Select all elements needed on the screen

let display = document.querySelector('#display');
let buttons = document.querySelectorAll('.btn');
let operators = document.querySelectorAll('.operator');
updateScreen(result);

// Step 3: Create a function that listens to key-presses and lets us know the type of key pressed.

buttons.forEach(btn => {
  btn.addEventListener("click", function() {
    let btnClicked = this.innerText;
    // console.log("you clicked: ", btnClicked);
    display.value = btnClicked;

    if (btnClicked === "AC") {
      currentEntry = 0;
      // removeActiveOperator();
    } else if (btnClicked === "+/-" ) {
      currentEntry *= -1;
      // removeActiveOperator();
    } else if (btnClicked === ".") {
      currentEntry += ".";
      // removeActiveOperator();
    } else if (btnClicked === "x") {
      btn.classList.add("active");
      prevEntry = currentEntry;
      operation = "*";
      currentEntry = "";
    } else if (btnClicked === "÷") {
      btn.classList.add("active");
      prevEntry = currentEntry;
      operation = "/";
      currentEntry = "";
    } else if (btnClicked === "+") {
      prevEntry = parseFloat(currentEntry);
      btn.classList.add("active");
      operation = "+";
      currentEntry = "";
    } else if (btnClicked === "-") {
      prevEntry = parseFloat(currentEntry);
      btn.classList.add("active");
      operation = "-";
      currentEntry = "";    
    // ----- CREATE FUNCTION FOR isNumber -----
    } else if (isNumber(btnClicked)) {
      // If 0 is displayed, replace 0 with currentEntry
      // or
      // If result is displayed, reset number
      removeActiveOperator();
      if (currentEntry === 0 || currentEntry === result ) {
        currentEntry = btnClicked;
        // If numbers are displayed, add to entry.
      } else {
        currentEntry += btnClicked;
      }
    // ----- CREATE FUNCTION FOR isOperator -----
    } else if (isOperator(btnClicked)) {
      // btn.classList.add("active");
      prevEntry = currentEntry;
      operation = btnClicked;
      currentEntry = "";
    } else if (btnClicked === "%") {
      currentEntry /= 100;
    } else if (btnClicked === "=") {
      result = operate(prevEntry, operation, currentEntry);
      btn.classList.remove("active");
      operation = null;
      currentEntry = result;
    }
    // ----- CREATE FUNCTION FOR updateScreen -----
    updateScreen(currentEntry);  
  });
});

// Step 5: Create a function to teach our JavaScript program what numbers are.

function isNumber(value) {
  return !isNaN(value);
};

// Step 6: Create a function to teach our JavaScript program what operators are.

function isOperator(value) {
  return value === "÷" || value === "+" || value === "x" || value === "-";
};

// Step 7: Create a function to teach your JavaScript program how to calculate an equation.

function operate(a, operation, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch(operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
  }
};

// Step 8: Create a function to display the results to the screen.

function updateScreen(result) {
  let displayValue = result.toString();
  display.value = displayValue.substring(0, 6);
};

function removeActiveOperator() {
  operators.forEach(operator => {
    operator.classList.remove('active');
  })
}