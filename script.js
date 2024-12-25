const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const addTransactionButton = document.getElementById("addTransaction");
const transactionList = document.getElementById("transactionList");
const totalIncomeElement = document.getElementById("totalIncome");
const totalExpensesElement = document.getElementById("totalExpenses");
const netSavingElement = document.getElementById("netsaving");

let transactions = [];

addTransactionButton.addEventListener("click", () => {
    const date = dateInput.value;
    const description = descriptionInput.value.trim();
    const category = categoryInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!date || !description || !category || isNaN(amount)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const transaction = {
        date,
        description,
        category,
        amount
    };

    transactions.push(transaction);
    renderTransactions();
    updateSummary();

    // Clear inputs
    dateInput.value = "";
    descriptionInput.value = "";
    categoryInput.value = "";
    amountInput.value = "";
});

function renderTransactions() {
    transactionList.innerHTML = "";

    transactions.forEach((transaction, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${transaction.date} - ${transaction.description} (${transaction.category})</span>
            <span>${transaction.amount.toFixed(2)}</span>
            <button onclick="deleteTransaction(${index})">Delete</button>
        `;
        transactionList.appendChild(li);
    });
}

function updateSummary() {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });

    totalIncomeElement.textContent = totalIncome.toFixed(2);
    totalExpensesElement.textContent = Math.abs(totalExpenses).toFixed(2);
    netSavingElement.textContent = (totalIncome + totalExpenses).toFixed(2);
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    renderTransactions();
    updateSummary();
}
