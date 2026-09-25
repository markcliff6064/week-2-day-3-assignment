// TASK 3: CALCULATOR


// Select the calculator display.
const display = document.querySelector("#display");


// Select all buttons that contain a number or decimal point.
const numberButtons = document.querySelectorAll("[data-value]");


// Select all operator buttons.
const operatorButtons = document.querySelectorAll("[data-operator]");


// Select the equals button.
const equalsButton = document.querySelector("#equals");


// Select the clear button.
const clearButton = document.querySelector("#clear");



// CALCULATOR VARIABLES



// Stores the number the user is currently typing.
let currentNumber = "";


// Stores the previous number before an operator.
let previousNumber = null;


// Stores the selected mathematical operator.
let currentOperator = null;



// NUMBER BUTTONS


// Loop through every number button.
numberButtons.forEach(function (button) {

    // Add a click event to each button.
    button.addEventListener("click", function () {

        // Get the value stored inside data-value.
        const value = button.dataset.value;


    
        // HANDLE DECIMAL POINT
       

        if (value === ".") {

            // Do not allow more than one decimal point
            // in the same number.
            if (currentNumber.includes(".")) {
                return;
            }

            // If the number is empty and user presses ".",
            // start with 0.
            if (currentNumber === "") {
                currentNumber = "0";
            }
        }


        // Add the clicked value to the current number.
        currentNumber += value;


        // Show the current number on the display.
        display.value = currentNumber;

    });

});



// OPERATOR BUTTONS

operatorButtons.forEach(function (button) {

    // Listen for a click on each operator.
    button.addEventListener("click", function () {

        // Get the mathematical operator.
        const operator = button.dataset.operator;


        // If the user has not entered a number,
        // there is nothing to calculate.
        if (currentNumber === "" && previousNumber === null) {
            return;
        }


        // FIRST OPERATOR 

        if (previousNumber === null) {

            // Convert the current number from text to a number.
            previousNumber = parseFloat(currentNumber);

        }

      
        // CHAINED OPERATION
     
        else if (currentNumber !== "") {

            // Calculate the previous operation first.
            previousNumber = calculate(
                previousNumber,
                parseFloat(currentNumber),
                currentOperator
            );

            // Show the result.
            display.value = previousNumber;
        }


        // Store the newly selected operator.
        currentOperator = operator;


        // Clear currentNumber so the user can type
        // the next number.
        currentNumber = "";

    });

});



// EQUALS BUTTON


equalsButton.addEventListener("click", function () {

    // Make sure we have everything needed for a calculation.
    if (
        previousNumber === null ||
        currentNumber === "" ||
        currentOperator === null
    ) {
        return;
    }


    // Convert the current number into a real number.
    const secondNumber = parseFloat(currentNumber);


    // Perform the calculation.
    const result = calculate(
        previousNumber,
        secondNumber,
        currentOperator
    );


    // Show the result.
    display.value = result;


    // Store the result as the previous number.
    previousNumber = result;


    // Clear the current number.
    currentNumber = "";


    // Clear the operator.
    currentOperator = null;

});



// CALCULATION FUNCTION


function calculate(firstNumber, secondNumber, operator) {

    // Check which operator was selected.
    switch (operator) {

        case "+":
            return firstNumber + secondNumber;

        case "-":
            return firstNumber - secondNumber;

        case "*":
            return firstNumber * secondNumber;

        case "/":

            // Prevent division by zero.
            if (secondNumber === 0) {

                return "Error";
            }

            return firstNumber / secondNumber;

        default:

            return secondNumber;
    }

}


// ==========================================
// CLEAR BUTTON
// ==========================================

clearButton.addEventListener("click", function () {

    // Reset all calculator values.
    currentNumber = "";

    previousNumber = null;

    currentOperator = null;


    // Reset the display.
    display.value = "0";

});



// BONUS: KEYBOARD SUPPORT


document.addEventListener("keydown", function (event) {

    // Get the key that the user pressed.
    const key = event.key;


    
    // NUMBER KEYS

    if (key >= "0" && key <= "9") {

        // Find the button with the matching value.
        const button = document.querySelector(
            `[data-value="${key}"]`
        );

        // Simulate clicking the button.
        button.click();

    }


    
    // DECIMAL POINT
  

    else if (key === ".") {

        const button = document.querySelector(
            '[data-value="."]'
        );

        button.click();

    }


    // OPERATORS


    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {

        const button = document.querySelector(
            `[data-operator="${key}"]`
        );

        button.click();

    }


  
    // ENTER OR =
  

    else if (key === "Enter" || key === "=") {

        equalsButton.click();

    }


 
    // ESCAPE OR C
  
    else if (key === "Escape" || key.toLowerCase() === "c") {

        clearButton.click();

    }


 
    // BACKSPACE
   

    else if (key === "Backspace") {

        // Remove the last character from the current number.
        currentNumber = currentNumber.slice(0, -1);


        // If there is nothing left, show 0.
        if (currentNumber === "") {

            display.value = "0";

        } else {

            // Otherwise show the updated number.
            display.value = currentNumber;

        }

    }

});