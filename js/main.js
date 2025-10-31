
const btnPlus = document.getElementById("btnPlus");
const maModale = document.getElementById("maModale");
const fermerModale = document.getElementById("fermerModale");
const pageContent = document.getElementById("pageContent");
const header = document.querySelector("header");
const formTransaction = document.querySelector("#maModale form");
const transactionscontainer = document.getElementById("transactions");

const totalRevenus = document.getElementById("totalRevenus");
const soldeNet = document.getElementById("soldeNet");
const totalDepenses = document.getElementById("totalDepenses");

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
transactions.forEach(creerCarte);

function creerCarte(transaction) {
    const card = document.createElement("div");
    card.classList.add("col");

    card.innerHTML = `
    <div class="card p-3 shadow-sm ${transaction.type === 'revenu' ? 'bg-success text-white' : 'bg-danger text-white'}" data-id="${transaction.id}">
      <div class="d-flex justify-content-between align-items-center">
        <h5>${transaction.description}</h5>
        <div class="position-relative">
          <button class="btn btn-sm btn-light btn-menu">&#x22EE;</button>
          <div class="menu-options bg-white shadow rounded position-absolute d-none" style="right:0; top:100%; z-index:10;">
            <a href="#" class="dropdown-item btn-modifier text-dark d-block px-3 py-1">Modifier</a>
            <a href="#" class="dropdown-item btn-supprimer text-dark d-block px-3 py-1">Supprimer</a>
          </div>
        </div>
      </div>
      <p>Montant : ${transaction.montant} DH</p>
      <p>Date : ${transaction.date}</p>
    </div>
  `;


    const btnMenu = card.querySelector(".btn-menu");
    const menuOptions = card.querySelector(".menu-options");

    btnMenu.addEventListener("click", (e) => {
        e.stopPropagation();
        menuOptions.classList.toggle("d-none");
    });

    document.addEventListener("click", () => {
        menuOptions.classList.add("d-none");
    });


    const btnSupprimer = card.querySelector(".btn-supprimer");
    btnSupprimer.addEventListener("click", function (e) {
        e.preventDefault();
        supprimerTransaction(transaction.id, card);
    });


    const btnModifier = card.querySelector(".btn-modifier");
    btnModifier.addEventListener("click", function (e) {
        e.preventDefault();
        modifierTransaction(transaction, card);
    });

    transactionscontainer.appendChild(card);
}

function supprimerTransaction(id, card) {
    card.remove();
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTotals();
}

function modifierTransaction(transaction, card) {
    maModale.classList.remove("d-none");
    pageContent.classList.add("blur-bg");
    header.classList.add("blur-bg");

    formTransaction.querySelector('input[type="text"]').value = transaction.description;
    formTransaction.querySelector('input[type="number"]').value = transaction.montant;
    formTransaction.querySelector('select').value = transaction.type;
    formTransaction.querySelector('input[type="date"]').value = transaction.date;

    card.remove();
    transactions = transactions.filter(t => t.id !== transaction.id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTotals();
}

formTransaction.addEventListener("submit", function (e) {
    e.preventDefault();

    const transaction = {
        id: Date.now(),
        description: formTransaction.querySelector('input[type="text"]').value,
        montant: parseFloat(formTransaction.querySelector('input[type="number"]').value),
        type: formTransaction.querySelector('select').value,
        date: formTransaction.querySelector('input[type="date"]').value
    };

    creerCarte(transaction);

    maModale.classList.add("d-none");
    pageContent.classList.remove("blur-bg");
    header.classList.remove("blur-bg");
    formTransaction.reset();

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTotals();
});

function updateTotals() {
    let revenus = 0;
    let depenses = 0;

    transactions.forEach(t => {
        if (t.type === "revenu") revenus += t.montant;
        if (t.type === "depense") depenses += t.montant;
    });

    totalRevenus.textContent = revenus + " DH";
    totalDepenses.textContent = depenses + " DH";
    soldeNet.textContent = (revenus - depenses) + " DH";
}