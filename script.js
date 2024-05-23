// Select various DOM elements
const billInput = document.querySelector('.amount');
const numOfpeople = document.querySelector(".people"); 
const tips = document.querySelectorAll(".tips");
const tipAmount = document.querySelector(".tip-amount");
const tipTotal = document.querySelector(".total-amount");
const resetButton = document.querySelector(".reset-btn");
const customBtn = document.querySelector("#custom");

// Set default value for number of people
numOfpeople.value = 1;

// Initialize variables to store bill value, number of people, and tip value
let billValue = 0.0;
let numpeople = 1;
let tipValue = 0.15;

// Set initial display values for tip amount and total amount
tipAmount.innerHTML = "$" + (0.0).toFixed(2);
tipTotal.innerHTML = "$" + (0.0).toFixed(2);

// Retrieve stored values from local storage when the page loads
window.addEventListener('load', () => {
    // Retrieve and set bill value if it exists in local storage
    if (localStorage.getItem('billValue')) {
        billValue = parseFloat(localStorage.getItem('billValue'));
        billInput.value = billValue;
    }
    // Retrieve and set number of people if it exists in local storage
    if (localStorage.getItem('numpeople')) {
        numpeople = parseFloat(localStorage.getItem('numpeople'));
        numOfpeople.value = numpeople;
    }
    // Retrieve and set tip value if it exists in local storage
    if (localStorage.getItem('tipValue')) {
        tipValue = parseFloat(localStorage.getItem('tipValue'));
        customBtn.value = (tipValue * 100).toFixed(2);
    }
    // Calculate tip based on retrieved values
    calculateTip();
});

// Update bill value and store it in local storage when input changes
billInput.addEventListener('input', () => {
    billValue = parseFloat(billInput.value);
    localStorage.setItem('billValue', billValue);
    calculateTip();
});

// Update number of people and store it in local storage when input changes
numOfpeople.addEventListener('input', () => {
    numpeople = parseFloat(numOfpeople.value);
    localStorage.setItem('numpeople', numpeople);
    calculateTip();
});

// Update tip value from custom input and store it in local storage when input changes
customBtn.addEventListener('input', () => {
    tipValue = parseFloat(customBtn.value) / 100;
    localStorage.setItem('tipValue', tipValue);
    tips.forEach(val => {
        val.classList.remove("active");
    });
    calculateTip();  
});

// Add event listeners to predefined tip buttons
tips.forEach(val => {
    val.addEventListener('click', (event) => {
        tips.forEach(val => {
            val.classList.remove("active");
            // Check if the clicked tip value matches the button value
            if (event.target.innerHTML == val.innerHTML) {
                val.classList.add("active");
                tipValue = parseFloat(val.innerHTML) / 100;
                localStorage.setItem('tipValue', tipValue);
            }
        });
        calculateTip();
    });
});

// Function to calculate the tip per person and total amount per person
function calculateTip() {
    if (numpeople >= 1) {
        let tipPerPerson = (tipValue * billValue) / numpeople;
        let total = (billValue / numpeople) + ( tipPerPerson );
        tipAmount.innerHTML = "$" + tipPerPerson.toFixed(2);
        tipTotal.innerHTML = "$" + total.toFixed(2);
    }
}

// Reset all values and clear local storage when the reset button is clicked
resetButton.addEventListener('click', () => {
    tipAmount.innerHTML = "$" + (0.0).toFixed(2);
    tipTotal.innerHTML = "$" + (0.0).toFixed(2);
    billInput.value = "";
    numOfpeople.value = 1;
    customBtn.value = "";
    localStorage.removeItem('billValue');
    localStorage.removeItem('numpeople');
    localStorage.removeItem('tipValue');
    billValue = 0.0;
    numpeople = 1;
    tipValue = 0.15;
    tips.forEach(val => {
        val.classList.remove("active");
    });
});
