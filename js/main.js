
const btnPlus = document.getElementById("btnPlus");
const maModale = document.getElementById("maModale");
const fermerModale = document.getElementById("fermerModale");
const pageContent = document.getElementById("pageContent");
const header = document.querySelector("header");


btnPlus.addEventListener("click", function() {
    maModale.classList.remove("d-none");   
    pageContent.classList.add("blur-bg"); 
    header.classList.add("blur-bg"); 
});

fermerModale.addEventListener("click", function() {
    maModale.classList.add("d-none");      
    pageContent.classList.remove("blur-bg"); 
    header.classList.remove("blur-bg"); 
});