document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners to the elements
    document.getElementById('num1').addEventListener('click', function() {
        document.calc.txt.value += '1';
    });
    document.getElementById('num2').addEventListener('click', function() {
        document.calc.txt.value += '2';
    });
    document.getElementById('num3').addEventListener('click', function() {
        document.calc.txt.value += '3';
    });
    document.getElementById('num4').addEventListener('click', function() {
        document.calc.txt.value += '4';
    });
    document.getElementById('num5').addEventListener('click', function() {
        document.calc.txt.value += '5';
    });
    document.getElementById('num6').addEventListener('click', function() {
        document.calc.txt.value += '6';
    });
    document.getElementById('num7').addEventListener('click', function() {
        document.calc.txt.value += '7';
    });
    document.getElementById('num8').addEventListener('click', function() {
        document.calc.txt.value += '8';
    });
    document.getElementById('num9').addEventListener('click', function() {
        document.calc.txt.value += '9';
    });
    document.getElementById('num0').addEventListener('click', function() {
        document.calc.txt.value += '0';
    });
    document.getElementById('dot').addEventListener('click', function() {
        document.calc.txt.value += '.';
    });
    document.getElementById('backspace').addEventListener('click', function() {
        document.calc.txt.value = backspace(document.calc.txt.value);
    });
    document.getElementById('clear').addEventListener('click', function() {
        document.calc.txt.value = '';
    });
    document.querySelectorAll('.operations').forEach(function(operation) {
        operation.addEventListener('click', function() {
            document.calc.txt.value += this.textContent;
        });
    });
    document.querySelector('.equal').addEventListener('click', function() {
        document.calc.txt.value = calculation(document.calc.txt.value);
    });

    // Load history when the page loads
    loadHistory();
    // Attach event listener to the "Clear" button
    document.getElementById('clear-history-btn').addEventListener('click', clearHistory);
});

function calculation(v) {
    let para = document.createElement('p');
    let result;
    try {
        // Parse the expression manually and evaluate
        result = evaluateExpression(v);
        para.innerText = v + " = " + result;
    } catch (error) {
        para.innerText = "Error: " + error.message;
    }
    document.getElementById('history').appendChild(para);
    
    // Save history to localStorage
    saveToLocalStorage(para.innerText);

    return result;
}

// Function to manually evaluate the expression
function evaluateExpression(expression) {
    let parts = expression.split(/\b(?<!e)[+\-*/]/); // Split by operators, but not exponential notation 'e'
    let operators = expression.split(/[0-9.]+/).filter(Boolean); // Extract operators
    let result = parseFloat(parts[0]); // Initialize result with the first number

    // Iterate over parts and apply operators
    for (let i = 1; i < parts.length; i++) {
        let num = parseFloat(parts[i]);
        switch (operators[i - 1]) {
            case '+':
                result += num;
                break;
            case '-':
                result -= num;
                break;
            case '*':
                result *= num;
                break;
            case '/':
                if (num === 0) {
                    throw new Error('Division by zero');
                }
                result /= num;
                break;
            default:
                throw new Error('Invalid operator');
        }
    }

    return result;
}

function backspace(b) {
    return b.slice(0, -1);
}

function saveToLocalStorage(data) {
    // Get existing history data from localStorage or initialize it as an empty array
    let existingHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];

    // Add new data to the history array
    existingHistory.push(data);

    // Save the updated history array back to localStorage
    localStorage.setItem('calculationHistory', JSON.stringify(existingHistory));
}

function loadHistory() {
    // Load history data from localStorage
    let existingHistory = JSON.parse(localStorage.getItem('calculationHistory'));

    // Clear existing history displayed on the page
    let historyElement = document.getElementById('history');
    historyElement.innerHTML = '<h1>History</h1>';

    // Display each calculation from history
    if (existingHistory) {
        existingHistory.forEach(function(item) {
            let para = document.createElement('p');
            para.innerText = item;
            historyElement.appendChild(para);
        });
    }
}

function clearHistory() {
    // Clear history from localStorage
    localStorage.removeItem('calculationHistory');

    // Clear history displayed on the page
    let historyElement = document.getElementById('history');
    historyElement.innerHTML = '<h1>History</h1>';
}
