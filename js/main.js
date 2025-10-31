
const btnPlus = document.getElementById("btnPlus");
const maModale = document.getElementById("maModale");
const fermerModale = document.getElementById("fermerModale");
const pageContent = document.getElementById("pageContent");
const header = document.querySelector("header");


btnPlus.addEventListener("click", function() {
    maModale.classList.remove("d-none");
    pageContent.classList.add("backdrop-blur");
    header.classList.add("backdrop-blur");
});
fermerModale.addEventListener("click",function() {
    maModale.classList.add("d-none");
    pageContent.classList.remove("backdrop-blur");
    header.classList.remove("backdrop-blur");
});