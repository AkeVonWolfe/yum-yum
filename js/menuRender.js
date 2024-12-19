import { entireMenu, menuOrdersPost } from "./API.js";

const menuContainer = document.querySelector("#menu-container");
const wonton = "wonton";
const drink = "drink";
const dip = "dip";
export let selectedItems = [];



// render menu items 
function renderMenu(items) {
     // try slice instead of filter to render first 5 
       items.slice(0, 5).forEach((item) => { 
        const menuItem = document.createElement("button");
        menuItem.classList.add("menu-item");
        menuItem.setAttribute("data-price", item.price);
        menuItem.setAttribute("data-id", item.id);

        const menuItemInner = document.createElement("div");
        menuItemInner.classList.add("menu-item-inner");

        const nameElement = document.createElement("span");
        nameElement.classList.add("item-name");
        nameElement.innerText = item.name;

        const dottedDivider = document.createElement("div");
        dottedDivider.classList.add("dots");

        const priceElement = document.createElement("span");
        priceElement.innerText = `${item.price} SEK`;
        priceElement.classList.add("item-price");

        menuItemInner.appendChild(nameElement);
        menuItemInner.appendChild(dottedDivider);
        menuItemInner.appendChild(priceElement);

        const ingredientsElement = document.createElement("span");
        ingredientsElement.classList.add("ingredients");
        if (Array.isArray(item.ingredients)) {
            ingredientsElement.innerText = item.ingredients.join(", ");
        } else {
            ingredientsElement.innerText = "No ingredients available";
        }

        menuItem.appendChild(menuItemInner);
        menuItem.appendChild(ingredientsElement);

        menuContainer.appendChild(menuItem);
    });
}

//rendering the submenu items
function renderSubMenu(items) {
    const firstFiveItems = items.slice(0, 8);
    const lastFiveItems = items.slice(-3);

    const subMenuItems = [...firstFiveItems, ...lastFiveItems];

    subMenuItems.forEach((item) => {
        const subMenuItem = document.createElement("button");
        subMenuItem.classList.add("submenu-item");
        subMenuItem.innerText = item.name;
        subMenuItem.setAttribute("data-price", item.price);
        subMenuItem.setAttribute("data-id", item.id);

        const subMenuSelections = document.querySelector(
            `.submenu-selections[data-type="${item.type}"]`
        );
        if (subMenuSelections) {
            subMenuSelections.appendChild(subMenuItem);
        }
    });

    const dipItem = items.find((item) => item.type === "dip");
    const drinkItem = items.find((item) => item.type === "drink");

    if (dipItem) {
        const subMenuDipPrice = document.querySelector(".dip-price");
        subMenuDipPrice.innerText = `${dipItem.price} SEK`;
    }

    if (drinkItem) {
        const subMenuDrinkPrice = document.querySelector(".drink-price");
        subMenuDrinkPrice.innerText = `${drinkItem.price} SEK`;
    }
}



// add event listeners to the menu items
menuContainer.addEventListener("click", addItemToOrder);
document.querySelectorAll(".submenu-selections").forEach(subMenu => {
    subMenu.addEventListener("click", addItemToOrder);
});


// render selected items in the cart
function renderCartItems() {
    const cartContainer = document.querySelector("#cart-container");
    cartContainer.innerHTML = ""; // Clear previous cart items

    selectedItems.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        // Item Name
        const nameElement = document.createElement("span");
        nameElement.classList.add("cart-item-name");
        nameElement.innerText = item.name;

        // Price Display
        const priceElement = document.createElement("span");
        priceElement.classList.add("cart-item-price");
        priceElement.innerText = `${(item.price * item.quantity).toFixed(2)} SEK`;

        // Divider
        const dottedDivider = document.createElement("div");
        dottedDivider.classList.add("cart-dots");

        // Counter Container (placed below item name)
        const counterContainer = document.createElement("div");
        counterContainer.classList.add("counter-container");

        const minusButton = document.createElement("button");
        minusButton.innerText = "-";
        minusButton.classList.add("counter-button", "minus");

        const quantityDisplay = document.createElement("span");
        quantityDisplay.innerText = item.quantity; // Display current quantity
        quantityDisplay.classList.add("quantity-display");

        const plusButton = document.createElement("button");
        plusButton.innerText = "+";
        plusButton.classList.add("counter-button", "plus");

        // Append buttons to counter container
        counterContainer.appendChild(minusButton);
        counterContainer.appendChild(quantityDisplay);
        counterContainer.appendChild(plusButton);

        // Append everything to cartItem
        cartItem.appendChild(nameElement);
        cartItem.appendChild(dottedDivider);
        cartItem.appendChild(priceElement);
        cartItem.appendChild(counterContainer); // Counter placed last (below name)

        // Append to cart container
        cartContainer.appendChild(cartItem);

        // Event Listeners for Counter Buttons
        minusButton.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                // Remove the item if quantity is 0
                const index = selectedItems.findIndex((i) => i.id === item.id);
                selectedItems.splice(index, 1);
            }
            renderCartItems();
            updateTotalPrice();
            updateCounter();
        });

        plusButton.addEventListener("click", () => {
            item.quantity++;
            renderCartItems();
            updateTotalPrice();
            updateCounter();
        });
    });

    updateTotalPrice();
}



// Update total price display
function updateTotalPrice() {
    const totalPriceElement = document.querySelector(".total-price");
    const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.innerText = `${total} SEK`;

    // Update button state
    const moneyButton = document.querySelector(".money-button");
    if (total > 0) {
        moneyButton.disabled = false;
        moneyButton.innerText = "TAKE MY MONEY!";
    } else {
        moneyButton.disabled = true;
        moneyButton.innerText = "VARUKORGEN ÄR TOM!";
    }
}

// update cart when items are added
function addItemToOrder(event) {
    const button = event.target.closest("button");
    if (button) {
        const itemId = button.getAttribute("data-id");
        const itemPrice = parseFloat(button.getAttribute("data-price")); // Convert to number
        const itemName = button.querySelector(".item-name") 
            ? button.querySelector(".item-name").innerText  // Check if item name is nested
            : button.innerText; 

        // Check if the item already exists in the cart 
        const existingItem = selectedItems.find((item) => item.id === itemId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            // new item with quantity initialized to 1
            const item = {
                id: itemId,
                name: itemName,
                price: itemPrice,
                quantity: 1,
            };
            selectedItems.push(item);
        }

        console.log("Item added:", itemName);
        console.log("Current cart:", selectedItems);
        updateCounter();
        renderCartItems(); // Update cart display with new item
    }
    return selectedItems; // Return the updated selectedItems array to use in api
}
// update the counter when items are added to the cart // mabye put this in updateTotalPrice
function updateCounter() {
    const totalcounter = document.querySelector(".total-counter");
    if (selectedItems.length > 0) {
        totalcounter.style.display = "flex";
        // Calculate total quantity of all items
        const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
        totalcounter.innerText = totalQuantity;
    } else {
        totalcounter.style.display = "none";
    }
}



// fetch menu items from the API, checks the type of menu item
function fetchMenuItems(type) {
    const Url = `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=${type}`;
    return entireMenu(Url)
        .then(items => {
            if (type == wonton && items.length > 0) {
                renderMenu(items);
            } else if ((type == drink || type === dip) && items.length > 0) {
                renderSubMenu(items);
            } else {
                console.log("404");
            }
            return items; // Return items to chain promises
        })
        .catch(error => {
            console.error(`Error fetching ${type} menu:`, error);
            throw error; //  error handling chain
        });
}


//  load the menu items when the page loads
function loadMenu() {
    fetchMenuItems(wonton)
        .then(() => fetchMenuItems(drink))
        .then(() => fetchMenuItems(dip))
        .catch((error) => console.error(error));
}
loadMenu();

