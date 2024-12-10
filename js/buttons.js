import { showCooking, hideCooking, showOrder, hideOrder,
    showOrder, hideOrder,
    hideMenu,
    showMenu
 } from "./hide"

const menuItems = document.querySelectorAll('.menu-item')
const cartButton = document.querySelector('.cart-button')
const moneyButton = document.querySelector('.money-button')
const receiptDialog = document.querySelector('.receipt-dialog')
const openReceiptButton = document.querySelector('.open-receipt-button')
const restartbutton = document.querySelector('.restart-button')

cartButton.addEventListener('click', function(){
    hideMenu()
    showOrder()
})

moneyButton.addEventListener('click', function(){
    hideOrder()
    showCooking()
    // delay and green to show it's accepeted
})


openReceiptButton.addEventListener('click', function() {
    receiptDialog.show()
    // need to call api for order with loreKeeper storing orders
})


/* receiptDialog.addEventListener('click', function(){
    event.stopPropagation()
}) */

restartbutton.addEventListener('click', function(){
   hideCooking()
   showMenu()
   //need to clear cart and reset   
})

// need button foreach item clicked on menu and either save

menuItems.forEach(item => {
    item.addEventListener('click', function() {
// these in variable to later send the GET /orders
  loreKeeper =+ this.item.id // need to check how this work again
// or bake in the GET/order in the click function
     })
})

// variable to store order id and amount 
let loreKeeper = {"items":[1]}


