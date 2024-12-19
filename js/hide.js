
//mabye change this into style and display none
function hideMenu(){
    let menuContainer = document.querySelector(".menu");
    if (menuContainer) menuContainer.style.display = "none";
}

function showMenu(){
    let menuContainer = document.querySelector(".menu");
    if (menuContainer) menuContainer.style.display = "block";
}

function hideOrder(){
    let cartContainer = document.querySelector("#cart");
    if (cartContainer) cartContainer.style.display = "none";
}

function showOrder(){
    let cartContainer = document.querySelector("#cart");
    if (cartContainer) cartContainer.style.display = "block"; 
    }

function hideCooking(){
    let etaContainer = document.querySelector("#eta");
    if (etaContainer) etaContainer.style.display = "none";
    }

function showCooking(){
    let etaContainer = document.querySelector("#eta");
    if (etaContainer) etaContainer.style.display = "block";
    }


export {hideMenu, showMenu, hideOrder , showOrder , hideCooking, showCooking}