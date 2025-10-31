
const btnPlus = document.getElementById("btnPlus");
const maModale = document.getElementById("maModale");
const fermerModale = document.getElementById("fermerModale");
const pageContent = document.getElementById("pageContent");
const header = document.querySelector("header");
const formTransaction = document.querySelector("#maModale form")


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

formTransaction.addEventListener("submit", function (e) {
    e.preventDefault();
    const transaction = {
        description: formTransaction.querySelector('input[type="text"]').value,
        montant: parseFloat(formTransaction. querySelector('input[type="number"]').value),
        type: formTransaction.querySelector('select').value,
        date: formTransaction.querySelector('input[type="date"]').value
    };
    console.log(transaction);
})