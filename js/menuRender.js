import { entireMenu } from "./API";


// rendor out entire menu with foreach, foreach for ingredients
// list for ingredients ul? li?
// replace hard coded names as such.
entireMenu()

entireMenu.forEach(item => {
    const menuItemElement = document.createElement('div');
    menuItemElement.innerText = item.name;

    const ingredientsList = document.createElement('ul');
    item.ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('li');
        ingredientItem.innerText = ingredient;
        ingredientsList.appendChild(ingredientItem);
    });

    menuItemElement.appendChild(ingredientsList);
    document.appendChild(menuItemElement);
});

