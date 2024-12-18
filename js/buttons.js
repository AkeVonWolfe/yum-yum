import { showCooking, hideCooking, showOrder, hideOrder,
     hideMenu, showMenu
 } from "./hide.js"

const menuItems = document.querySelectorAll('.menu-item')
const cartButton = document.querySelector('.cart-button')
const moneyButton = document.querySelector('.money-button')
const receiptDialog = document.querySelector('.receipt-dialog')
const openReceiptButton = document.querySelector('.open-receipt-button')
const restartbutton = document.querySelector('.return-button')
const cartReturnButton = document.querySelector('.cart-return-button')

cartButton.addEventListener('click', function(){
    hideMenu()
    showOrder()
})

moneyButton.addEventListener('click', function(){
    hideOrder()
    showCooking()
})

cartReturnButton.addEventListener('click', function(){
    hideOrder()
    showMenu()
})

restartbutton.addEventListener('click', function(){
    hideCooking()
    showMenu()
})

moneyButton.addEventListener('click', function(){
    hideOrder()
    showCooking()
})
/* openReceiptButton.addEventListener('click', function() {
    receiptDialog.show()
    // need to call api for order with loreKeeper storing orders
}) */


/* receiptDialog.addEventListener('click', function(){
    event.stopPropagation()
}) */





