import { showCooking, hideCooking, showOrder, hideOrder,
     hideMenu, showMenu, showReceipt, hideReceipt} from "./hide.js"
 import { menuOrdersPost  } from "./API.js" 
 import { selectedItems, handleReceipt } from "./menuRender.js"

const menuItems = document.querySelectorAll('.menu-item')
const cartButton = document.querySelector('.cart-button')
const moneyButton = document.querySelector('.money-button')
const openReceiptButton = document.querySelector('.receipt')
const restartbutton = document.querySelector('.return-button')
const cartReturnButton = document.querySelector('.cart-return-button')
const receiptResetButton = document.querySelector('.receipt-new-order')

let currentOrderData = null;

cartButton.addEventListener('click', function(){
    hideMenu()
    showOrder()
    document.body.style.backgroundColor = "#eeeeee"; //change white/gray

})
// money button to place the order, also need to call the api to post the order
moneyButton.addEventListener("click", function () {
    menuOrdersPost(selectedItems)
        .then(orderResponse => {
            console.log("Order successfully placed:", orderResponse);
            currentOrderData = orderResponse;

            //hide cart and show eta section
            hideOrder();
            showCooking();
            document.body.style.backgroundColor = "#605858"; // change darkgray

            //show order confirmation on the eta page
            const orderid = orderResponse.order.id;
            const orderIdElement = document.querySelector(".order-id");
            orderIdElement.innerText = `Order ID: ${orderid}`;

            //calculate time left until order is ready
            const Responsetime = new Date(orderResponse.order.eta);
            const currentTime = new Date();
            const timeDifference = Math.max(0, Responsetime - currentTime);
            const minutesLeft = Math.ceil(timeDifference / (1000 * 60));

            const timeEstimateElement = document.querySelector(".time-left");
            timeEstimateElement.innerText = `ETA: ${minutesLeft} minutes`;
        })
        .catch(error => {
            console.error("Failed to place order:", error);
        });
});
//go to menu from cart
cartReturnButton.addEventListener('click', function(){
    hideOrder()
    showMenu()
    document.body.style.backgroundColor = "#489078"; // change green
    // need a reset/clear function for the cart
})
//go to menu from cooking
restartbutton.addEventListener('click', function(){
    hideCooking()
    showMenu()
    resetOrder();
    document.body.style.backgroundColor = "#489078" // change green
})

openReceiptButton.addEventListener('click', function(){
    hideCooking()
    showReceipt()
    handleReceipt(currentOrderData)
    document.body.style.backgroundColor = "#605858"; //change white/gray

})

receiptResetButton.addEventListener('click', function(){
    hideReceipt()
    showMenu()
    resetOrder();
    document.body.style.backgroundColor = "#489078" // change green
})


//nuke everthing  //mby move this to another file
function resetOrder() {
    //clear the selectedItems array
    selectedItems.length = 0;
    
    //reset the cart counter
    const totalCounter = document.querySelector(".total-counter");
    totalCounter.style.display = "none";
    totalCounter.innerText = "0";
    
    //reset the cart display
    const cartContainer = document.querySelector("#cart-container");
    cartContainer.innerHTML = "";
    
    //reset the total price
    const totalPriceElement = document.querySelector(".total-price");
    totalPriceElement.innerText = "0 SEK";
    
    //reset the money button
    const moneyButton = document.querySelector(".money-button");
    moneyButton.disabled = true;
    moneyButton.innerText = "VARUKORGEN ÄR TOM!";
    moneyButton.style.backgroundColor = "#353131";
    
    //reset the order ID and time display
    const orderIdElement = document.querySelector(".order-id");
    const timeEstimateElement = document.querySelector(".time-left");
    orderIdElement.innerText = "";
    timeEstimateElement.innerText = "";
}
 // go to cooking from cart

/* openReceiptButton.addEventListener('click', function() {
    receiptDialog.show()
    // need to call api to get the receipt
}) */


/* receiptDialog.addEventListener('click', function(){
    event.stopPropagation()
}) */





