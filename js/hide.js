
// mabye change this into style and display none
function hideMenu(){
    let menuContainer = document.querySelector('.menu');
    if (menuContainer) {
        menuContainer.setAttribute('hidden', true);
    }
}

function showMenu(){
    let menuContainer = document.querySelector('.menu');
    if (menuContainer) {
        menuContainer.removeAttribute('hidden');
    }
}

function hideOrder(){
    let orderContainer = document.querySelector('.order-page');
    if (orderContainer) {
        orderContainer.setAttribute('hidden', true);
    }
}

function showOrder(){
    let orderContainer = document.querySelector('.order-page');
    if (orderContainer) {
        orderContainer.removeAttribute('hidden');
    }
}

function hideCooking(){
    let himCook = document.querySelector('.cooking-page');
    if (himCook) {
        himCook.setAttribute('hidden', true);
    }
}

function showCooking(){
    let himCook = document.querySelector('.cooking-page');
    if (himCook) {
        himCook.removeAttribute('hidden');
    }
}

export {hideMenu, showMenu, hideOrder , showOrder , hideCooking, showCooking}