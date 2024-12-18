import { entireMenu, menuOrdersPost } from "./API.js";

const menuContainer = document.querySelector("#menu-container");
const wonton = "wonton";
const drink = "drink";
const dip = "dip";
let selectedItems = [];


//get the menu items from the API 
async function fetchMenuItems(type) {
	const Url = `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu?type=${type}`;
	const items = await entireMenu(Url);

	if (type == wonton && items.length > 0) {
		renderMenu(items);
	} else if ((type == drink || type === dip) && items.length > 0) {
		renderSubMenu(items);
	} else {
		console.log("404");
	}
}

// render menu items
function renderMenu(items) {
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
        dottedDivider.classList.add("dotted-divider");

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


//add the selected items to the order
function addItemToOrder(event) {
    const button = event.target.closest("button");
    if (button) {
        const itemId = button.getAttribute("data-id");
        const itemPrice = button.getAttribute("data-price");
        const itemName = button.innerText;

        const item = {
            id: itemId,
            name: itemName,
            price: itemPrice
        };

        selectedItems.push(item);
        console.log("Item added:", item);
    }
}
// add event listeners to the menu items
menuContainer.addEventListener("click", addItemToOrder);
document.querySelectorAll(".submenu-selections").forEach(subMenu => {
    subMenu.addEventListener("click", addItemToOrder);
});



//  load the menu items
function loadMenu() {
    fetchMenuItems(wonton)
        .then(() => fetchMenuItems(drink))
        .then(() => fetchMenuItems(dip))
        .catch((error) => console.error(error));
}
loadMenu();


