
const btnPlus = document.getElementById("btnPlus");
const maModale = document.getElementById("maModale");
const fermerModale = document.getElementById("fermerModale");
const pageContent = document.getElementById("pageContent");
const header = document.querySelector("header");
const formTransaction = document.querySelector("#maModale form")
const transactionscontainer = document.getElementById("transactions");

btnPlus.addEventListener("click", function () {
    maModale.classList.remove("d-none");
    pageContent.classList.add("blur-bg");
    header.classList.add("blur-bg");
});

fermerModale.addEventListener("click", function () {
    maModale.classList.add("d-none");
    pageContent.classList.remove("blur-bg");
    header.classList.remove("blur-bg");
    formTransaction.reset();
});

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
transactions.forEach(transaction => {
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
  <div class="card p-3 shadow-sm  ${transaction.type === 'revenu' ? 'bg-success text-white' : 'bg-danger text-white'}">
    <h5>${transaction.description}</h5>
    <p>Montant : ${transaction.montant} DH</p>
    <p>Date : ${transaction.date}</p>
   </div>
    `;
    transactionscontainer.appendChild(card);
});

formTransaction.addEventListener("submit", function (e) {
    e.preventDefault();
    const transaction = {
        description: formTransaction.querySelector('input[type="text"]').value,
        montant: parseFloat(formTransaction.querySelector('input[type="number"]').value),
        type: formTransaction.querySelector('select').value,
        date: formTransaction.querySelector('input[type="date"]').value
    };
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
  <div class="card p-3 shadow-sm  ${transaction.type === 'revenu' ? 'bg-success text-white' : 'bg-danger text-white'}">
    <h5>${transaction.description}</h5>
    <p>Montant : ${transaction.montant} DH</p>
    <p>Date : ${transaction.date}</p>
   </div>
    `;
    transactionscontainer.appendChild(card);

    maModale.classList.add("d-none");
    pageContent.classList.remove("blur-bg");
    header.classList.remove("blur-bg");
    formTransaction.reset();
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    console.log(transaction);

})