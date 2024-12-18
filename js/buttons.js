import { showCooking, hideCooking, showOrder, hideOrder,
     hideMenu, showMenu
 } from "./hide.js"

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


/* openReceiptButton.addEventListener('click', function() {
    receiptDialog.show()
    // need to call api for order with loreKeeper storing orders
}) */


/* receiptDialog.addEventListener('click', function(){
    event.stopPropagation()
}) */

/* restartbutton.addEventListener('click', function(){
   hideCooking()
   showMenu()
   //need to clear cart and reset   
}) */



