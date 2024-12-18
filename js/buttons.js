import { showCooking, hideCooking, showOrder, hideOrder,
     hideMenu, showMenu
 } from "./hide.js"

 import { menuOrdersPost } from "./API.js"

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

moneyButton.addEventListener("click", async function () {
    try {
        // Prepare the data for the API
        const orderResponse = await menuOrdersPost();
        
        console.log("Order successfully placed:", orderResponse);

        // Hide cart and show ETA section
        hideCart();
        showETA();

        // Show order confirmation on the ETA page
        const orderIdElement = document.querySelector(".order-id");
        orderIdElement.innerText = `Order ID: ${orderResponse.orderId}`;

        const timeEstimateElement = document.querySelector(".time-estimate");
        timeEstimateElement.innerText = `ETA: ${orderResponse.eta} minutes`;

        // Green button feedback
        moneyButton.style.backgroundColor = "green";
        moneyButton.innerText = "BESTÄLLNING MOTTAGEN!";
    } catch (error) {
        console.error("Failed to place order:", error);
        alert("Could not place order. Please try again.");
    }
});

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





