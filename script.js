document.addEventListener("DOMContentLoaded", function () {
    const numBox = document.getElementById("numBox");
    const buttons = document.querySelectorAll(".number-button");
    const operatorButtons = document.querySelectorAll(".operator-button");
    const clearButton = document.getElementById("clear");
    const plusMinusButton = document.getElementById("posOrNeg");

    let currentInput = "0";

    function updateDisplay() {
        numBox.value = formatInput(currentInput);
        updatePlusMinusButton();
    }

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            handleNumberButtonClick(button.value);
        });
    });

    operatorButtons.forEach((button) => {
        button.addEventListener("click", function () {
            handleOperatorButtonClick(button.value);
        });
    });

    clearButton.addEventListener("click", function () {
        clearDisplay();
    });

    plusMinusButton.addEventListener("click", function () {
        togglePlusMinus();
    });

    function handleNumberButtonClick(value) {
        if (currentInput === "0" || currentInput === "Error") {
            currentInput = value;
        } else if (currentInput.length > 0) { 
            currentInput += value;
        }
        updateDisplay();
    }

    function handleOperatorButtonClick(value) {
        if (value === "=") {
            evaluateExpression();
        } else {
            currentInput += ` ${value} `;
            updateDisplay();
        }
    }

    function evaluateExpression() {
        try {
            currentInput = eval(currentInput);
            if (isFinite(currentInput)) {
                currentInput = currentInput.toFixed(2); // Display up to 6 decimal places
            }
        } catch (error) {
            currentInput = "Error";
        }
        updateDisplay();
    }

    function clearDisplay() {
        currentInput = "0";
        updateDisplay();
    }

    function togglePlusMinus() {
        currentInput = -currentInput;
        updateDisplay();
    }

    function updatePlusMinusButton() {
        plusMinusButton.disabled = currentInput === "0" || currentInput === "Error";
    }

    // Function to format the input
    function formatInput(input) {
        if (isFinite(input)) {
            return parseFloat(input).toString(); // Remove leading zeros
        }
        return input;
    }
});
