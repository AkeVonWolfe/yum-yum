
// mabye change this into style and display none
function hideMenu(){
   let menuContainer = document.querySelectorAll('menu-page')
   menuContainer.forEach(function(element){
        element.setAttribute('hidden', true);
   })
}

function showMenu(){
    let menuContainer = document.querySelector('menu-page')
    menuContainer.forEach(function(element){
        element.removeAttribute('hidden')
    })
}
function hideOrder(){
    let orderContainer = document.querySelector('order-page')
    orderContainer.forEach(function(element){
        element.removeAttribute('hidden')
    })
}

function showOrder(){
    let orderContainer = document.querySelector('order-page')
    orderContainer.forEach(function(element){
        element.setAttribute('hidden,', true)
    })
}

function hideCooking(){
    let himCook = document.querySelector('cooking-page')
    himCook.forEach(function(element){
        element.removeAttribute('hidden')
    })
}
function showCooking(){
    let himCook = document.querySelector('cooking-page')
    himCook.forEach(function(element){
        element.setAttribute('hidden,', true)
    })

}

export {hideMenu, showMenu, hideOrder , showOrder , hideCooking, showCooking}