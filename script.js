// script.js
const apiKey = "308af789da81fdb0e8590ba4";  // Replace with your ExchangeRate-API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

async function populateCurrencyOptions() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.conversion_rates);
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (!amount || isNaN(amount)) {
        alert("Please enter a valid amount");
        return;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    const conversionRate = data.conversion_rates[toCurrency] / data.conversion_rates[fromCurrency];
    const result = amount * conversionRate;

    document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}

document.addEventListener('DOMContentLoaded', populateCurrencyOptions);
