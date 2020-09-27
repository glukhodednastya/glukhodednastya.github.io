var numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operator'),
    decimalBtn = document.getElementById('decimal'),
    sqrtBtn = document.getElementById('sqrt'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    display = document.getElementById('display'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';

for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    });
};

for (var i = 0; i < operations.length; i++) {
    var operator = operations[i];
    operator.addEventListener('click', function(e) {
        operation(e.target.textContent);
    });
};

for (var i = 0; i < clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.srcElement.id);
    });
  }

decimalBtn.addEventListener('click', decimal);

sqrtBtn.addEventListener('click', sqrt);

function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else if (MemoryNewNumber && display.value === '-') {
        display.value = '-' + number;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else if (display.value === '-') {
            display.value = '-' + number;
        } else {
            display.value += number;
        };
    };
};

function operation(op){
    var localOperationMemory = display.value;

    if (localOperationMemory === '0' && op === '-') {
        display.value = '-';
        MemoryNewNumber = false;
    } else if (MemoryNewNumber && op === '-') {
        display.value = '-';
        MemoryNewNumber = false;
    } else {
        if (MemoryNewNumber && MemoryPendingOperation !== '=') {
            display.value = MemoryCurrentNumber;
        } else {
            MemoryNewNumber = true;
            if (MemoryPendingOperation === '+') {
                MemoryCurrentNumber += parseFloat(localOperationMemory);
            } else if (MemoryPendingOperation === '-') {
                MemoryCurrentNumber -= parseFloat(localOperationMemory);
            } else if (MemoryPendingOperation === '*') {
                MemoryCurrentNumber *= parseFloat(localOperationMemory);
            } else if (MemoryPendingOperation === '/') {
                MemoryCurrentNumber /= parseFloat(localOperationMemory);
            } else if (MemoryPendingOperation === '^'){
                MemoryCurrentNumber **= parseFloat(localOperationMemory);
            } else {
                MemoryCurrentNumber = parseFloat(localOperationMemory);
            };
            display.value = parseFloat(MemoryCurrentNumber.toPrecision(15));
            MemoryPendingOperation = op;
        };
    };
};

function sqrt() {
    if (display.value.indexOf("-") === -1) {
        display.value = Math.sqrt(parseFloat(display.value));
    } else {
        display.value = 'error';
    };
};

function decimal() {
    var localDecimalMemory = display.value;
    
    if (MemoryNewNumber || display.value === '-') {
        if (display.value === '-') {
            localDecimalMemory = '-0.';
            MemoryNewNumber = false;
        } else {
            localDecimalMemory = '0.';
            MemoryNewNumber = false;
        }
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
    };
    display.value = localDecimalMemory;
};

function clear(id) {
    if (id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    };
};