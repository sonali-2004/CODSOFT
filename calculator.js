const screen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            clearScreen();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/'].includes(value)) {
            chooseOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

function appendNumber(number) {
    currentInput += number;
    updateScreen();
}

function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '*':
            computation = prev * curr;
            break;
        case '/':
            computation = prev / curr;
            break;
        default:
            return;
    }
    
    currentInput = computation;
    operator = null;
    previousInput = '';
    updateScreen();
}

function clearScreen() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateScreen();
}

function updateScreen() {
    screen.value = currentInput;
}
