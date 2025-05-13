let currentInput = '';
let previousInput = '';
let operator = '';
let resultDisplayed = false;

const display = document.getElementById('display');

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Nice try :)";
  return a / b;
}

function operate(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (isNaN(a) || isNaN(b)) return '';
  switch (op) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return '';
  }
}

function updateDisplay(value) {
  display.textContent = value.toString().length > 12 ? parseFloat(value).toFixed(5) : value;
}

document.querySelectorAll('.digit').forEach(btn => {
  btn.addEventListener('click', () => {
    if (resultDisplayed) {
      currentInput = '';
      resultDisplayed = false;
    }
    currentInput += btn.textContent;
    updateDisplay(currentInput);
  });
});

document.querySelectorAll('.operator').forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentInput === '' && previousInput === '') return;
    if (previousInput && currentInput) {
      previousInput = operate(operator, previousInput, currentInput);
      updateDisplay(previousInput);
      currentInput = '';
    } else if (currentInput) {
      previousInput = currentInput;
      currentInput = '';
    }
    operator = btn.dataset.op;
    resultDisplayed = false;
  });
});

document.getElementById('equals').addEventListener('click', () => {
  if (currentInput === '' || previousInput === '') return;
  let result = operate(operator, previousInput, currentInput);
  updateDisplay(result);
  previousInput = result;
  currentInput = '';
  resultDisplayed = true;
});

document.getElementById('clear').addEventListener('click', () => {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateDisplay(0);
});

document.getElementById('decimal').addEventListener('click', () => {
  if (!currentInput.includes('.')) {
    currentInput += currentInput ? '.' : '0.';
    updateDisplay(currentInput);
  }
});

document.getElementById('backspace').addEventListener('click', () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || 0);
});

// Optional: Keyboard support
document.addEventListener('keydown', (e) => {
  if (!isNaN(e.key)) document.querySelector(`.digit:contains(${e.key})`)?.click();
  if (['+', '-', '*', '/'].includes(e.key)) {
    document.querySelector(`.operator[data-op="${e.key}"]`)?.click();
  }
  if (e.key === 'Enter' || e.key === '=') document.getElementById('equals').click();
  if (e.key === '.') document.getElementById('decimal').click();
  if (e.key === 'Backspace') document.getElementById('backspace').click();
  if (e.key.toLowerCase() === 'c') document.getElementById('clear').click();
});
