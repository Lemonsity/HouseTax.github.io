var inputBox;
var TorontoCheckBox;
var outputOntario, outputToronto, outputTotal;

const ontarioTiers = {55000: 0.005, 250000: 0.01, 400000: 0.015}
const ontariohighestRate = {ceil: 400000, rate: 0.02};
const torontoTiers = {55000: 0.005, 400000: 0.01}
const torontohighestRate = {ceil: 400000, rate: 0.02};

function initialize() {
    inputBox = document.getElementById("inputBox");
    TorontoCheckBox = document.getElementById("isToronto");
    outputOntario = document.getElementById("ontario");
    outputToronto = document.getElementById("toronto");
    outputTotal = document.getElementById("total");
}

function getTax() {
    let value = inputBox.value;
    let isToronto = TorontoCheckBox.checked;
    let totalAns = 0;
    let ontarioAns = 0;
    let prevCeil = 0
    for (currCeil in ontarioTiers) {
        if (value <= prevCeil) break;
        totalAns += (Math.min(currCeil, value) - prevCeil) * ontarioTiers[currCeil];
        prevCeil = parseInt(currCeil);
    }
    totalAns += (value > ontariohighestRate.ceil) ? (value - ontariohighestRate.ceil) * ontariohighestRate.rate : 0;
    outputOntario.innerHTML = "Ontario Tax: $" + totalAns;
    ontarioAns = totalAns;
    if (isToronto) {
        prevCeil = 0
        for (currCeil in torontoTiers) {
            if (value <= prevCeil) break;
            totalAns += (Math.min(currCeil, value) - prevCeil) * torontoTiers[currCeil];
            prevCeil = parseInt(currCeil);
        }
        totalAns += (value > torontohighestRate.ceil) ? (value - torontohighestRate.ceil) * torontohighestRate.rate : 0;
    }
    outputToronto.innerHTML = "Toronto Tax: $" + (totalAns - ontarioAns == 0) ? "0" : totalAns - ontarioAns;
    outputTotal.innerHTML = "Total Tax: $" + totalAns;
}